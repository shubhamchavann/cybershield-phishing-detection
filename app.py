from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
import os

from detector import scan_url, scan_message


app = Flask(__name__)

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "database.db")


# --------------------------------------------------
# DATABASE CONNECTION & INITIALIZATION
# --------------------------------------------------

def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    connection = get_db()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            contact TEXT,
            severity TEXT DEFAULT 'High',
            upvotes INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Safe Schema Migrations for existing database.db
    cursor = connection.execute("PRAGMA table_info(reports)")
    columns = [row["name"] for row in cursor.fetchall()]
    
    if "severity" not in columns:
        connection.execute("ALTER TABLE reports ADD COLUMN severity TEXT DEFAULT 'High'")
    if "upvotes" not in columns:
        connection.execute("ALTER TABLE reports ADD COLUMN upvotes INTEGER DEFAULT 0")

    # Seed sample reports if table is empty so community hub is rich
    cursor = connection.execute("SELECT COUNT(*) as count FROM reports")
    row = cursor.fetchone()
    if row and row["count"] == 0:
        sample_reports = [
            (
                "Banking Fraud",
                "Fake SBI Reward Points APK Message",
                "Received an SMS stating 'Dear Customer, your SBI 9,980 reward points are expiring today. Redeem cash in your account by installing SBI-Rewards.apk from bit.ly/sbi-claim-98'. The app requests SMS permissions to steal OTPs.",
                "http://sbi-reward-points.xyz/login",
                "Critical",
                28
            ),
            (
                "Electricity Scam",
                "Urgent Power Cut Notice Threat",
                "SMS claiming 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous month bill was not updated. Immediately contact Electricity Officer at 98765xxxxx'. They asked to install AnyDesk app.",
                "+91 98765-43210",
                "High",
                42
            ),
            (
                "Job Scam",
                "Part-Time YouTube Video Liking Job on Telegram",
                "WhatsApp message from unknown international number offering Rs. 3000/day for liking YouTube videos. After paying initial Rs. 150 reward, they asked to invest Rs. 10,000 into a fake crypto task platform.",
                "@FastTaskEarn_Global (Telegram)",
                "High",
                19
            ),
            (
                "UPI Fraud",
                "Fake Olx QR Code 'Payment' Trap",
                "Buyer on OLX agreed to buy furniture immediately and sent a QR code saying 'Scan this QR code to receive Rs. 15,000 in your bank account'. Scanning it actually creates a debit payment request!",
                "fraud-merchant@upi",
                "High",
                35
            )
        ]

        connection.executemany("""
            INSERT INTO reports (category, title, description, contact, severity, upvotes)
            VALUES (?, ?, ?, ?, ?, ?)
        """, sample_reports)

    connection.commit()
    connection.close()


# --------------------------------------------------
# WEB ROUTES
# --------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/url-checker", methods=["GET", "POST"])
def url_checker():
    result = None
    url = ""

    if request.method == "POST":
        url = request.form.get("url", "").strip()
        if url:
            result = scan_url(url)

    return render_template(
        "url_checker.html",
        result=result,
        url=url
    )


@app.route("/message-checker", methods=["GET", "POST"])
def message_checker():
    result = None
    message = ""

    if request.method == "POST":
        message = request.form.get("message", "").strip()
        if message:
            result = scan_message(message)

    return render_template(
        "message_checker.html",
        result=result,
        message=message
    )


@app.route("/awareness")
def awareness():
    return render_template("awareness.html")


@app.route("/quiz", methods=["GET", "POST"])
def quiz():
    score = None
    submitted = False

    correct_answers = {
        "q1": "b",
        "q2": "b",
        "q3": "a",
        "q4": "c",
        "q5": "b",
        "q6": "a",
        "q7": "c",
        "q8": "b",
        "q9": "a",
        "q10": "c"
    }

    if request.method == "POST":
        score = 0
        for question, answer in correct_answers.items():
            user_answer = request.form.get(question)
            if user_answer == answer:
                score += 1
        submitted = True

    return render_template(
        "quiz.html",
        score=score,
        submitted=submitted
    )


@app.route("/report", methods=["GET", "POST"])
def report():
    success = False

    if request.method == "POST":
        category = request.form.get("category", "").strip()
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()
        contact = request.form.get("contact", "").strip()
        severity = request.form.get("severity", "High").strip()

        if category and title and description:
            connection = get_db()
            connection.execute("""
                INSERT INTO reports (category, title, description, contact, severity)
                VALUES (?, ?, ?, ?, ?)
            """, (category, title, description, contact, severity))
            connection.commit()
            connection.close()
            success = True

    return render_template(
        "report.html",
        success=success
    )


@app.route("/reports")
def reports():
    connection = get_db()
    reports_data = connection.execute("""
        SELECT *
        FROM reports
        ORDER BY id DESC
    """).fetchall()
    connection.close()

    return render_template(
        "reports.html",
        reports=reports_data
    )


@app.route("/cyber-help")
def cyber_help():
    return render_template("cyber_help.html")


@app.route("/result")
def result():
    return render_template("result.html")


# --------------------------------------------------
# JSON API ENDPOINTS (FOR REAL-TIME INTERACTIVE HUD)
# --------------------------------------------------

@app.route("/api/scan-url", methods=["POST"])
def api_scan_url():
    data = request.get_json(silent=True) or request.form
    url = data.get("url", "").strip() if data else ""
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    result = scan_url(url)
    return jsonify(result)


@app.route("/api/scan-message", methods=["POST"])
def api_scan_message():
    data = request.get_json(silent=True) or request.form
    message = data.get("message", "").strip() if data else ""
    if not message:
        return jsonify({"error": "No message text provided"}), 400
    result = scan_message(message)
    return jsonify(result)


@app.route("/api/upvote-report/<int:report_id>", methods=["POST"])
def api_upvote_report(report_id):
    try:
        connection = get_db()
        connection.execute("UPDATE reports SET upvotes = upvotes + 1 WHERE id = ?", (report_id,))
        connection.commit()
        row = connection.execute("SELECT upvotes FROM reports WHERE id = ?", (report_id,)).fetchone()
        upvotes = row["upvotes"] if row else 0
        connection.close()
        return jsonify({"success": True, "upvotes": upvotes})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# --------------------------------------------------
# START APPLICATION
# --------------------------------------------------

if __name__ == "__main__":
    init_db()
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )