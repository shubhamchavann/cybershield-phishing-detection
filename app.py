from flask import Flask, render_template, request, redirect, url_for
import sqlite3
from datetime import datetime
from detector import scan_url, scan_message

app = Flask(__name__)

# =========================================================
# DATABASE
# =========================================================

DATABASE = "cyber_shield.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            scam_type TEXT NOT NULL,
            content TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# URL SCANNER
# =========================================================

@app.route("/url-checker", methods=["GET", "POST"])
def url_checker():

    result = None

    if request.method == "POST":

        url = request.form.get("url", "").strip()

        if not url:
            result = {
                "error": "Please enter a URL."
            }

        else:
            result = scan_url(url)

    return render_template(
        "url-checker.html",
        result=result
    )


# =========================================================
# MESSAGE SCANNER
# =========================================================

@app.route("/message-checker", methods=["GET", "POST"])
def message_checker():

    result = None

    if request.method == "POST":

        message = request.form.get("message", "").strip()

        if not message:

            result = {
                "error": "Please enter a message."
            }

        else:

            result = scan_message(message)

    return render_template(
        "message-checker.html",
        result=result
    )


# =========================================================
# AWARENESS PAGE
# =========================================================

@app.route("/awareness")
def awareness():

    return render_template("awareness.html")


# =========================================================
# QUIZ
# =========================================================

@app.route("/quiz", methods=["GET", "POST"])
def quiz():

    # -----------------------------
    # QUESTIONS
    # -----------------------------

    questions = [

        {
            "question": "What is phishing?",
            "options": [
                "A computer hardware problem",
                "An attempt to trick users into revealing sensitive information",
                "A type of antivirus"
            ],
            "answer": 1
        },

        {
            "question": "Someone claiming to be from your bank asks for your OTP. What should you do?",
            "options": [
                "Give them the OTP",
                "Refuse and verify through the bank's official contact channel",
                "Send your password instead"
            ],
            "answer": 1
        },

        {
            "question": "Which is a common phishing warning sign?",
            "options": [
                "An unexpected urgent request",
                "A normal greeting from a friend",
                "A regular software update"
            ],
            "answer": 0
        },

        {
            "question": "What should you do before clicking a suspicious link?",
            "options": [
                "Click immediately",
                "Verify the URL",
                "Share it with friends"
            ],
            "answer": 1
        },

        {
            "question": "Should you share your OTP with someone who calls you?",
            "options": [
                "Yes",
                "Only if they know your name",
                "No"
            ],
            "answer": 2
        },

        {
            "question": "What does HTTPS indicate?",
            "options": [
                "The connection uses encryption",
                "The website is always safe",
                "The website cannot be hacked"
            ],
            "answer": 0
        },

        {
            "question": "Which information should you never share with strangers?",
            "options": [
                "OTP and passwords",
                "Public website address",
                "Weather information"
            ],
            "answer": 0
        },

        {
            "question": "What is smishing?",
            "options": [
                "Phishing through SMS or text messages",
                "A computer virus",
                "A type of firewall"
            ],
            "answer": 0
        },

        {
            "question": "What should you do if you receive a suspicious banking message?",
            "options": [
                "Click the link",
                "Verify using the bank's official website or app",
                "Reply with your PIN"
            ],
            "answer": 1
        },

        {
            "question": "Why do scammers create urgency?",
            "options": [
                "To make users think carefully",
                "To make users act quickly without checking",
                "To improve website speed"
            ],
            "answer": 1
        }

    ]

    # =====================================================
    # SHOW QUIZ
    # =====================================================

    if request.method == "GET":

        return render_template(
            "quiz.html",
            questions=questions,
            score=None
        )

    # =====================================================
    # CALCULATE SCORE
    # =====================================================

    score = 0

    for i, question in enumerate(questions):

        selected = request.form.get(f"q{i}")

        if selected is not None:

            try:

                if int(selected) == question["answer"]:
                    score += 1

            except ValueError:
                pass

    percentage = int((score / len(questions)) * 100)

    return render_template(
        "quiz.html",
        questions=questions,
        score=score,
        total=len(questions),
        percentage=percentage
    )


# =========================================================
# REPORT SCAM PAGE
# =========================================================

@app.route("/report-scam", methods=["GET", "POST"])
def report_scam():

    message = None

    if request.method == "POST":

        scam_type = request.form.get(
            "scam_type",
            ""
        ).strip()

        content = request.form.get(
            "content",
            ""
        ).strip()

        description = request.form.get(
            "description",
            ""
        ).strip()

        if not scam_type or not content:

            message = "Please fill in all required fields."

        else:

            conn = get_db()

            conn.execute(
                """
                INSERT INTO reports
                (scam_type, content, description, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (
                    scam_type,
                    content,
                    description,
                    datetime.now().strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
                )
            )

            conn.commit()
            conn.close()

            message = "Scam report submitted successfully."

    return render_template(
        "report-scam.html",
        message=message
    )


# =========================================================
# VIEW COMMUNITY REPORTS
# =========================================================

@app.route("/reports")
def reports():

    conn = get_db()

    reports = conn.execute(
        """
        SELECT *
        FROM reports
        ORDER BY id DESC
        """
    ).fetchall()

    conn.close()

    return render_template(
        "reports.html",
        reports=reports
    )


# =========================================================
# OFFICIAL CYBER SAFETY INFORMATION
# =========================================================

@app.route("/cyber-help")
def cyber_help():

    return render_template(
        "cyber-help.html"
    )


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    init_db()

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )