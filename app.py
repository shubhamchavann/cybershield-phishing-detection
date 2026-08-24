from flask import Flask, render_template, request
import sqlite3
from datetime import datetime

from detector import scan_url, scan_message


app = Flask(__name__)

DATABASE = "cyber_shield.db"


# =================================================
# DATABASE
# =================================================

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
            target TEXT NOT NULL,
            description TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


# =================================================
# HOME
# =================================================

@app.route("/")
def home():
    return render_template("index.html")


# =================================================
# URL SCANNER
# =================================================

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


# =================================================
# MESSAGE SCANNER
# =================================================

@app.route("/message-checker", methods=["GET", "POST"])
def message_checker():

    result = None
    message = ""

    if request.method == "POST":

        message = request.form.get(
            "message",
            ""
        ).strip()

        if message:
            result = scan_message(message)

    return render_template(
        "message_checker.html",
        result=result,
        message=message
    )


# =================================================
# AWARENESS
# =================================================

@app.route("/awareness")
def awareness():

    return render_template(
        "awareness.html"
    )


# =================================================
# QUIZ
# =================================================

@app.route("/quiz", methods=["GET", "POST"])
def quiz():

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
                "A website you regularly use"
            ],
            "answer": 0
        },

        {
            "question": "Should you share your UPI PIN with someone?",
            "options": [
                "Yes",
                "Only with bank employees",
                "No"
            ],
            "answer": 2
        },

        {
            "question": "What should you check before clicking a suspicious link?",
            "options": [
                "The domain name",
                "The screen brightness",
                "The phone wallpaper"
            ],
            "answer": 0
        },

        {
            "question": "What does HTTPS generally indicate?",
            "options": [
                "The connection uses encryption",
                "The website is always legitimate",
                "The website cannot be hacked"
            ],
            "answer": 0
        },

        {
            "question": "What should you do if you receive a suspicious banking message?",
            "options": [
                "Click the link immediately",
                "Verify through the bank's official website or app",
                "Forward it to everyone"
            ],
            "answer": 1
        },

        {
            "question": "Which information should you never share through an unsolicited message?",
            "options": [
                "OTP and PIN",
                "Weather information",
                "Public news"
            ],
            "answer": 0
        },

        {
            "question": "What is smishing?",
            "options": [
                "Phishing through SMS or text messages",
                "A type of computer virus",
                "A secure login method"
            ],
            "answer": 0
        },

        {
            "question": "What is the safest response to an unexpected prize message?",
            "options": [
                "Pay the processing fee",
                "Share your bank details",
                "Verify independently and avoid suspicious links"
            ],
            "answer": 2
        }
    ]

    score = None

    if request.method == "POST":

        score = 0

        for index, question in enumerate(questions):

            answer = request.form.get(
                f"question_{index}"
            )

            if answer is not None:

                try:
                    answer = int(answer)

                    if answer == question["answer"]:
                        score += 1

                except ValueError:
                    pass

    return render_template(
        "quiz.html",
        questions=questions,
        score=score
    )


# =================================================
# REPORT SCAM
# =================================================

@app.route("/report", methods=["GET", "POST"])
def report():

    success = False

    if request.method == "POST":

        category = request.form.get(
            "category",
            ""
        ).strip()

        target = request.form.get(
            "target",
            ""
        ).strip()

        description = request.form.get(
            "description",
            ""
        ).strip()

        if category and target and description:

            connection = get_db()

            connection.execute(
                """
                INSERT INTO reports
                (category, target, description, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (
                    category,
                    target,
                    description,
                    datetime.now().strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
                )
            )

            connection.commit()
            connection.close()

            success = True

    return render_template(
        "report.html",
        success=success
    )


# =================================================
# VIEW COMMUNITY REPORTS
# =================================================

@app.route("/reports")
def reports():

    connection = get_db()

    reports_data = connection.execute(
        """
        SELECT *
        FROM reports
        ORDER BY id DESC
        """
    ).fetchall()

    connection.close()

    return render_template(
        "reports.html",
        reports=reports_data
    )


# =================================================
# OFFICIAL CYBER INFORMATION
# =================================================

@app.route("/cyber-help")
def cyber_help():

    return render_template(
        "cyber_help.html"
    )


# =================================================
# START APPLICATION
# =================================================

if __name__ == "__main__":

    init_db()

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )