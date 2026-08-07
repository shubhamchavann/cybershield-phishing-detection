from flask import Flask, render_template, request

app = Flask(__name__)

from flask import Flask, render_template, request
from detector import check_url, check_message
app = Flask(__name__)

import os
import mysql.connector
# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db_connection():

    connection = mysql.connector.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASSWORD", ""),
        database=os.environ.get(
            "DB_NAME",
            "phishing_detection"
        ),
        port=int(
            os.environ.get("DB_PORT", "3306")
        )
    )

    return connection


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/url-checker", methods=["GET", "POST"])
def url_checker():

    result = None

    if request.method == "POST":

        url = request.form.get("url", "")

        result = check_url(url)

    return render_template(
        "url_checker.html",
        result=result
    )

@app.route("/message-checker", methods=["GET", "POST"])
def message_checker():

    result = None
    message = ""

    if request.method == "POST":

        message = request.form.get("message", "")

        result = check_message(message)

    return render_template(
        "message_checker.html",
        result=result,
        message=message
    )


@app.route("/awareness")
def awareness():
    return render_template("awareness.html")


@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


if __name__ == "__main__":
    app.run(debug=True)

db = get_db_connection()

cursor = db.cursor()

# Your database work here

cursor.close()
db.close()


@app.route("/save-scan", methods=["POST"])
def save_scan():

    db = get_db_connection()

    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO url_scans (url, risk_level)
        VALUES (%s, %s)
        """,
        ("https://example.com", "HIGH")
    )

    db.commit()

    cursor.close()
    db.close()

    return "Saved successfully"