from flask import Flask, send_from_directory, request, jsonify
import os
import uuid
from datetime import datetime

# Initialize Flask app pointing to this directory for both static and template files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")


# --------------------------------------------------
# STATIC & WEB ROUTES
# --------------------------------------------------

@app.route("/")
def index():
    """Serve the primary Multilingual Digital Literacy platform."""
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    """Serve static assets (style.css, script.js, translations.js, manifest.json, sw.js)."""
    return send_from_directory(BASE_DIR, path)


# --------------------------------------------------
# API ENDPOINTS
# --------------------------------------------------

@app.route("/api/languages", methods=["GET"])
def get_languages():
    """Return available regional languages."""
    return jsonify({
        "languages": [
            {"code": "en", "name": "English", "native": "English"},
            {"code": "hi", "name": "Hindi", "native": "हिंदी"},
            {"code": "mr", "name": "Marathi", "native": "मराठी"}
        ]
    })


@app.route("/api/certificate", methods=["POST"])
def generate_certificate():
    """Generate and verify digital literacy certificate metadata."""
    data = request.get_json(silent=True) or request.form
    name = data.get("name", "Student").strip()
    score = int(data.get("score", 0))
    total = int(data.get("total", 15))
    lang = data.get("lang", "en").strip()

    percentage = round((score / total) * 100, 1)
    cert_id = f"MDL-{uuid.uuid4().hex[:8].upper()}"

    if percentage >= 85:
        grade = "Distinction - Cyber Champion"
    elif percentage >= 60:
        grade = "Passed - Digital Sentinel"
    else:
        grade = "Participation - Needs Practice"

    cert_data = {
        "certificate_id": cert_id,
        "name": name,
        "score": score,
        "total": total,
        "percentage": percentage,
        "grade": grade,
        "language": lang,
        "issued_date": datetime.now().strftime("%d %B %Y"),
        "issuer": "Multilingual Digital Literacy & Cyber Safety Initiative (CEP)",
        "verified": True
    }

    return jsonify(cert_data)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "platform": "Multilingual Digital Literacy"})


# --------------------------------------------------
# LAUNCHER
# --------------------------------------------------

if __name__ == "__main__":
    # Default port 5050 to avoid conflicts with CyberShield on port 5000
    port = int(os.environ.get("PORT", 5050))
    print(f"================================================================")
    print(f" Multilingual Digital Literacy Platform is running on:")
    print(f" http://127.0.0.1:{port}")
    print(f"================================================================")
    app.run(
        debug=True,
        host="127.0.0.1",
        port=port
    )
