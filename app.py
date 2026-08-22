from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import hashlib
import os
from detector import CyberDetector
import database as db

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "phishguard-secure-secret-key-2026")

# Initialize SQLite database schema
db.init_db()

detector = CyberDetector()

# ==========================================
# AUTHENTICATION HELPERS
# ==========================================

def hash_password(password):
    """Securely hash a password using standard PBKDF2 with SHA-256."""
    salt = os.urandom(16)
    pw_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    return salt.hex() + ":" + pw_hash.hex()

def verify_password(stored_pw, provided_pw):
    """Verify a password hash against the user's provided password."""
    try:
        salt_hex, hash_hex = stored_pw.split(":")
        salt = bytes.fromhex(salt_hex)
        pw_hash = hashlib.pbkdf2_hmac('sha256', provided_pw.encode(), salt, 100000)
        return pw_hash.hex() == hash_hex
    except Exception:
        return False

# Inject active page variable and user info in Jinja context
@app.context_processor
def inject_globals():
    return {
        "active_page": None
    }

# ==========================================
# WEB PAGE ROUTING
# ==========================================

@app.route("/")
@app.route("/dashboard")
def home():
    """Render the dashboard hub with recent scans and dynamic database stats."""
    # Fetch stats
    stats = db.get_stats()
    
    # Fetch scan history (personalized if logged in, otherwise global)
    if session.get("user_id"):
        recent_scans = db.get_scans_by_user(session["user_id"])
    else:
        recent_scans = db.get_recent_scans(limit=10)
        
    return render_template(
        "index.html",
        stats=stats,
        recent_scans=recent_scans,
        active_page="home"
    )

@app.route("/report", methods=["GET", "POST"])
def report_scam():
    """Render the scam submission form and process threat logs."""
    success = False
    user_id = session.get("user_id") # Nullable if guest
    
    if request.method == "POST":
        report_type = request.form.get("report_type")
        description = request.form.get("description", "")
        
        if report_type == "url":
            content = request.form.get("content_url", "").strip()
        else:
            content = request.form.get("content_message", "").strip()
            
        if content:
            db.save_report(user_id, report_type, content, description)
            success = True
            
    # Fetch all reported threats to display on side panel
    reports = db.get_all_reports()
    
    return render_template(
        "report.html",
        reports=reports,
        success=success,
        active_page="report"
    )

@app.route("/learn")
@app.route("/awareness")
def awareness():
    """Render educational awareness and tactics accordion."""
    return render_template("learn.html", active_page="learn")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Authenticate registered users."""
    error = None
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        
        user = db.get_user_by_email(email)
        if user and verify_password(user["password_hash"], password):
            session["user_id"] = user["id"]
            session["user_email"] = user["email"]
            return redirect(url_for("home"))
        else:
            error = "Invalid email or password. Please verify credentials."
            
    return render_template("login.html", error=error, active_page="login")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    """Register new threat console user account."""
    error = None
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        confirm_password = request.form.get("confirm_password", "")
        
        if not email or not password:
            error = "All fields are required."
        elif len(password) < 8:
            error = "Password must be at least 8 characters long."
        elif password != confirm_password:
            error = "Passwords do not match."
        else:
            hashed = hash_password(password)
            user_id = db.create_user(email, hashed)
            if user_id:
                session["user_id"] = user_id
                session["user_email"] = email
                return redirect(url_for("home"))
            else:
                error = "An account with this email already exists."
                
    return render_template("signup.html", error=error, active_page="login")

@app.route("/logout")
def logout():
    """Destroy user session logs."""
    session.clear()
    return redirect(url_for("home"))

# Backward compatibility redirects for legacy paths
@app.route("/url-checker")
@app.route("/url")
def url_checker():
    """Redirect to dashboard with URL tab focused."""
    return redirect(url_for("home", tab="url"))

@app.route("/messages")
def messages():
    """Redirect to dashboard with Message tab focused."""
    return redirect(url_for("home", tab="message"))

@app.route("/quiz")
def quiz():
    """Redirect quiz link to learning resources."""
    return redirect(url_for("awareness"))

# ==========================================
# HEURISTIC ANALYZER JSON ENDPOINTS (AJAX)
# ==========================================

@app.route("/api/scan/url", methods=["POST"])
def api_scan_url():
    """Perform real-time heuristic URL scan and record log in database."""
    data = request.get_json() or {}
    url = data.get("url", "").strip()
    
    if not url:
        return jsonify({"error": "No URL provided"}), 400
        
    result = detector.check_url(url)
    user_id = session.get("user_id") # Nullable if guest
    
    # Save log to DB
    db.save_scan(
        user_id=user_id,
        scan_type="url",
        input_content=url,
        risk_score=result["score"],
        verdict=result["level"],
        red_flags=result["reasons"]
    )
    
    return jsonify(result)

@app.route("/api/scan/message", methods=["POST"])
def api_scan_message():
    """Perform language heuristic check on message contents and log."""
    data = request.get_json() or {}
    message = data.get("message", "").strip()
    
    if not message:
        return jsonify({"error": "No message body provided"}), 400
        
    result = detector.check_message(message)
    user_id = session.get("user_id") # Nullable if guest
    
    # Save log to DB
    db.save_scan(
        user_id=user_id,
        scan_type="message",
        input_content=message[:200] + ("..." if len(message) > 200 else ""),
        risk_score=result["score"],
        verdict=result["level"],
        red_flags=result["detected"]
    )
    
    return jsonify(result)

# ==========================================
# SYSTEM EXECUTION
# ==========================================

if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )