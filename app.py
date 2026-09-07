from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import sqlite3
import os
import json
from datetime import datetime

from detector import scan_url, scan_message


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "cybershield-matrix-defense-secret-2026")

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

if os.environ.get("VERCEL"):
    DATABASE = "/tmp/database.db"
    bundled_db = os.path.join(os.path.dirname(os.path.abspath(__file__)), "database.db")
    if not os.path.exists(DATABASE) and os.path.exists(bundled_db):
        import shutil
        try:
            shutil.copyfile(bundled_db, DATABASE)
        except Exception:
            pass
else:
    DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "database.db")


# --------------------------------------------------
# MASTER QUIZ QUESTIONS DEFINITION
# --------------------------------------------------

QUIZ_QUESTIONS = [
    {
        "id": "q1",
        "num": 1,
        "question": "What is the primary objective of a phishing attack?",
        "options": {
            "a": "To physically damage computer hardware",
            "b": "To trick users into revealing sensitive credentials, OTPs, or financial data",
            "c": "To improve internet browsing speed"
        },
        "answer": "b"
    },
    {
        "id": "q2",
        "num": 2,
        "question": "A caller claims to be your bank manager and urgently requests your OTP to stop an unauthorized transaction. What should you do?",
        "options": {
            "a": "Provide the OTP immediately to protect your funds",
            "b": "Refuse firmly and verify directly with the bank via official channels",
            "c": "Ask them to send an email first before giving the OTP"
        },
        "answer": "b"
    },
    {
        "id": "q3",
        "num": 3,
        "question": "Which of the following is a classic psychological red flag of a social engineering scam?",
        "options": {
            "a": "Manufactured extreme urgency (e.g. \"Account blocked in 15 minutes\")",
            "b": "A routine monthly newsletter from a subscribed service",
            "c": "An automated password reset email you requested yourself"
        },
        "answer": "a"
    },
    {
        "id": "q4",
        "num": 4,
        "question": "What is the safest action before clicking an unknown link received via SMS?",
        "options": {
            "a": "Click it rapidly before it expires",
            "b": "Forward it to family members to test if it works",
            "c": "Inspect the exact domain URL using a security scanner like CyberShield"
        },
        "answer": "c"
    },
    {
        "id": "q5",
        "num": 5,
        "question": "Is it ever safe to share your 3-digit card CVV or UPI PIN with customer support agents?",
        "options": {
            "a": "Yes, if they provide an official employee ID",
            "b": "No, CVV and UPI PIN must NEVER be disclosed to anyone under any circumstance",
            "c": "Only if they are calling from a toll-free number"
        },
        "answer": "b"
    },
    {
        "id": "q6",
        "num": 6,
        "question": "What does the padlock icon and HTTPS protocol signify on a website?",
        "options": {
            "a": "Encrypted transit between your browser and the server (though the site itself could still be fraudulent)",
            "b": "A 100% guarantee that the business is authentic and cannot be a scam",
            "c": "That the website has free antivirus protection built-in"
        },
        "answer": "a"
    },
    {
        "id": "q7",
        "num": 7,
        "question": "A buyer on an online marketplace asks you to \"scan a QR code\" to receive money for an item. What will happen?",
        "options": {
            "a": "You will immediately receive the cash in your wallet",
            "b": "Scanning a QR code never asks for UPI PIN",
            "c": "Entering your UPI PIN after scanning will DEBIT money FROM your account!"
        },
        "answer": "c"
    },
    {
        "id": "q8",
        "num": 8,
        "question": "You receive an APK file attachment via WhatsApp claiming to be an official electricity bill discount app. What should you do?",
        "options": {
            "a": "Install it immediately to save on utility bills",
            "b": "Never install APK files from unknown chats as they can intercept your SMS and OTPs",
            "c": "Install and grant all permissions"
        },
        "answer": "b"
    },
    {
        "id": "q9",
        "num": 9,
        "question": "What is the dedicated national cyber financial fraud emergency helpline number in India?",
        "options": {
            "a": "1930 (Citizen Financial Cyber Fraud Reporting System)",
            "b": "100",
            "c": "911"
        },
        "answer": "a"
    },
    {
        "id": "q10",
        "num": 10,
        "question": "An unknown sender offers you Rs. 3,000 per day for simple YouTube video liking tasks on Telegram. What type of scam is this?",
        "options": {
            "a": "A legitimate freelance marketing opportunity",
            "b": "A government sponsored work from home scheme",
            "c": "A task-based advance fee investment scam designed to steal your savings"
        },
        "answer": "c"
    }
]


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

    connection.execute("""
        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL DEFAULT 10,
            correct_count INTEGER NOT NULL,
            incorrect_count INTEGER NOT NULL,
            percentage REAL NOT NULL,
            answers_json TEXT NOT NULL,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    # Seed realistic initial quiz attempts if quiz_attempts table is empty
    cursor = connection.execute("SELECT COUNT(*) as count FROM quiz_attempts")
    quiz_count_row = cursor.fetchone()
    
    # Accurate seed profiles: (name, wrong_options_map, timestamp)
    seed_profiles = [
        ("Shubham Chavan", {6: "b"}, "2026-09-07 19:40:15"),           # 9/10 (90%) - 1 wrong: Q6
        ("Aarav Sharma", {2: "a", 7: "a"}, "2026-09-07 18:22:04"),    # 8/10 (80%) - 2 wrong: Q2, Q7
        ("Priya Patel", {}, "2026-09-07 16:15:30"),                    # 10/10 (100%) - 0 wrong
        ("Rahul Deshmukh", {2: "a", 6: "b", 9: "b"}, "2026-09-06 21:05:12"), # 7/10 (70%) - 3 wrong: Q2, Q6, Q9
        ("Ananya Verma", {3: "b", 8: "a"}, "2026-09-06 14:30:45")     # 8/10 (80%) - 2 wrong: Q3, Q8
    ]

    def build_attempt_payload(wrong_map):
        answers = []
        corr = 0
        incorr = 0
        for q in QUIZ_QUESTIONS:
            qnum = q["num"]
            qid = q["id"]
            correct_key = q["answer"].lower()
            if qnum in wrong_map:
                sel_key = wrong_map[qnum].lower()
                is_c = False
                incorr += 1
            else:
                sel_key = correct_key
                is_c = True
                corr += 1
            answers.append({
                "num": qnum,
                "id": qid,
                "question": q["question"],
                "selected_key": sel_key.upper(),
                "selected_text": q["options"].get(sel_key, ""),
                "correct_key": correct_key.upper(),
                "correct_text": q["options"].get(correct_key, ""),
                "is_correct": is_c
            })
        return answers, corr, incorr

    if not quiz_count_row or quiz_count_row["count"] == 0:
        for p_name, wrong_map, p_time in seed_profiles:
            answers, corr, incorr = build_attempt_payload(wrong_map)
            pct = round((corr / 10.0) * 100, 1)
            connection.execute("""
                INSERT INTO quiz_attempts (user_name, score, total_questions, correct_count, incorrect_count, percentage, answers_json, completed_at)
                VALUES (?, ?, 10, ?, ?, ?, ?, ?)
            """, (p_name, corr, corr, incorr, pct, json.dumps(answers), p_time))
    else:
        # Check and repair any existing attempt records that have mismatched telemetry
        cur = connection.execute("SELECT id, user_name, answers_json FROM quiz_attempts")
        existing_rows = cur.fetchall()
        for erow in existing_rows:
            uname = erow["user_name"]
            # If it's one of the seed profiles, ensure its answers_json is strictly accurate
            match_seed = next((sp for sp in seed_profiles if sp[0].lower() == uname.lower()), None)
            if match_seed:
                answers, corr, incorr = build_attempt_payload(match_seed[1])
                pct = round((corr / 10.0) * 100, 1)
                connection.execute("""
                    UPDATE quiz_attempts 
                    SET score = ?, correct_count = ?, incorrect_count = ?, percentage = ?, answers_json = ?
                    WHERE id = ?
                """, (corr, corr, incorr, pct, json.dumps(answers), erow["id"]))
            elif erow["answers_json"]:
                try:
                    ans_list = json.loads(erow["answers_json"])
                    calc_corr = sum(1 for a in ans_list if a.get("is_correct"))
                    calc_total = len(ans_list) or 10
                    calc_incorr = calc_total - calc_corr
                    calc_pct = round((calc_corr / calc_total) * 100, 1)
                    connection.execute("""
                        UPDATE quiz_attempts 
                        SET score = ?, correct_count = ?, incorrect_count = ?, percentage = ?, total_questions = ?
                        WHERE id = ?
                    """, (calc_corr, calc_corr, calc_incorr, calc_pct, calc_total, erow["id"]))
                except Exception:
                    pass

    connection.commit()
    connection.close()


try:
    init_db()
except Exception as e:
    print(f"Database initialization note: {e}")


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
    user_name = ""
    correct_count = 0
    incorrect_count = 0
    percentage = 0.0

    if request.method == "POST":
        user_name = request.form.get("user_name", "").strip() or "Cyber Participant"
        answers_data = []

        for q in QUIZ_QUESTIONS:
            qid = q["id"]
            user_choice = request.form.get(qid, "").strip().lower()
            correct_choice = q["answer"].lower()
            is_correct = (user_choice == correct_choice)

            if is_correct:
                correct_count += 1
            else:
                incorrect_count += 1

            selected_text = q["options"].get(user_choice, "No option selected")
            correct_text = q["options"].get(correct_choice, "")

            answers_data.append({
                "num": q["num"],
                "id": qid,
                "question": q["question"],
                "selected_key": user_choice.upper() if user_choice else "N/A",
                "selected_text": selected_text,
                "correct_key": correct_choice.upper(),
                "correct_text": correct_text,
                "is_correct": is_correct
            })

        score = correct_count
        total = len(QUIZ_QUESTIONS)
        percentage = round((correct_count / total) * 100, 1)

        # Save to database
        try:
            connection = get_db()
            connection.execute("""
                INSERT INTO quiz_attempts (user_name, score, total_questions, correct_count, incorrect_count, percentage, answers_json)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (user_name, score, total, correct_count, incorrect_count, percentage, json.dumps(answers_data)))
            connection.commit()
            connection.close()
        except Exception as err:
            print(f"Error saving quiz attempt: {err}")

        submitted = True

    return render_template(
        "quiz.html",
        score=score,
        total=len(QUIZ_QUESTIONS),
        correct_count=correct_count,
        incorrect_count=incorrect_count,
        percentage=percentage,
        user_name=user_name,
        submitted=submitted,
        questions=QUIZ_QUESTIONS
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
# ADMIN AUTHENTICATION & QUIZ ANALYTICS ROUTES
# --------------------------------------------------

@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    """Admin Login Portal."""
    if session.get("is_admin"):
        return redirect(url_for("admin_quiz_analytics"))

    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session["is_admin"] = True
            return redirect(url_for("admin_quiz_analytics"))
        else:
            error = "Invalid administrator credentials. Access Denied."

    return render_template("admin_login.html", error=error)


@app.route("/admin/logout")
def admin_logout():
    """Admin Logout."""
    session.pop("is_admin", None)
    return redirect(url_for("home"))


@app.route("/admin")
def admin_root():
    """Redirect to Quiz Analytics or Login."""
    if not session.get("is_admin"):
        return redirect(url_for("admin_login"))
    return redirect(url_for("admin_quiz_analytics"))


@app.route("/admin/quiz-analytics")
def admin_quiz_analytics():
    """Admin Quiz Analytics & Threat Intelligence Dashboard."""
    if not session.get("is_admin"):
        return redirect(url_for("admin_login"))

    connection = get_db()
    cursor = connection.cursor()

    # 1. Overall Statistics
    cursor.execute("""
        SELECT 
            COUNT(*) as total_attempts,
            COUNT(DISTINCT LOWER(user_name)) as total_participants,
            COALESCE(SUM(correct_count), 0) as total_correct,
            COALESCE(SUM(incorrect_count), 0) as total_incorrect,
            COALESCE(AVG(score), 0) as avg_score,
            COALESCE(AVG(percentage), 0) as avg_percentage
        FROM quiz_attempts
    """)
    stats_row = cursor.fetchone()

    total_attempts = stats_row["total_attempts"] if stats_row else 0
    total_participants = stats_row["total_participants"] if stats_row else 0
    total_correct = stats_row["total_correct"] if stats_row else 0
    total_incorrect = stats_row["total_incorrect"] if stats_row else 0
    avg_score = round(stats_row["avg_score"], 1) if stats_row else 0.0
    avg_percentage = round(stats_row["avg_percentage"], 1) if stats_row else 0.0

    # 2. Participant Results (sorted most recent first)
    cursor.execute("""
        SELECT id, user_name, score, total_questions, correct_count, incorrect_count, percentage, answers_json, completed_at
        FROM quiz_attempts
        ORDER BY id DESC
    """)
    attempts_rows = cursor.fetchall()
    attempts = []
    for row in attempts_rows:
        attempts.append({
            "id": row["id"],
            "user_name": row["user_name"],
            "score": row["score"],
            "total_questions": row["total_questions"],
            "correct_count": row["correct_count"],
            "incorrect_count": row["incorrect_count"],
            "percentage": row["percentage"],
            "answers": json.loads(row["answers_json"]) if row["answers_json"] else [],
            "completed_at": row["completed_at"]
        })

    # 3. Question-wise Analytics
    question_analytics = []
    for q in QUIZ_QUESTIONS:
        q_num = q["num"]
        q_text = q["question"]
        correct_key = q["answer"].lower()

        option_counts = {"a": 0, "b": 0, "c": 0}
        correct_for_q = 0
        total_for_q = len(attempts)

        for att in attempts:
            ans_list = att["answers"]
            for ans in ans_list:
                if ans.get("num") == q_num or ans.get("id") == q["id"]:
                    sel = ans.get("selected_key", "").lower()
                    if sel in option_counts:
                        option_counts[sel] += 1
                    if ans.get("is_correct"):
                        correct_for_q += 1
                    break

        acc_pct = round((correct_for_q / total_for_q) * 100, 1) if total_for_q > 0 else 0.0

        # Percentages per option for bar graphs
        opt_pct = {}
        for k, v in option_counts.items():
            opt_pct[k] = round((v / total_for_q) * 100, 1) if total_for_q > 0 else 0.0

        question_analytics.append({
            "num": q_num,
            "question": q_text,
            "options": q["options"],
            "correct_key": correct_key.upper(),
            "correct_text": q["options"].get(correct_key, ""),
            "counts": {
                "a": option_counts["a"],
                "b": option_counts["b"],
                "c": option_counts["c"]
            },
            "pcts": opt_pct,
            "correct_count": correct_for_q,
            "total_count": total_for_q,
            "accuracy_pct": acc_pct
        })

    connection.close()

    return render_template(
        "admin_quiz_analytics.html",
        total_participants=total_participants,
        total_attempts=total_attempts,
        total_correct=total_correct,
        total_incorrect=total_incorrect,
        avg_score=avg_score,
        avg_percentage=avg_percentage,
        attempts=attempts,
        question_analytics=question_analytics
    )


@app.route("/api/admin/quiz-attempt/<int:attempt_id>")
def api_quiz_attempt_detail(attempt_id):
    """API to fetch single user quiz attempt details for View Details modal."""
    if not session.get("is_admin"):
        return jsonify({"error": "Unauthorized"}), 403

    connection = get_db()
    row = connection.execute("SELECT * FROM quiz_attempts WHERE id = ?", (attempt_id,)).fetchone()
    connection.close()

    if not row:
        return jsonify({"error": "Attempt not found"}), 404

    return jsonify({
        "id": row["id"],
        "user_name": row["user_name"],
        "score": row["score"],
        "total_questions": row["total_questions"],
        "correct_count": row["correct_count"],
        "incorrect_count": row["incorrect_count"],
        "percentage": row["percentage"],
        "answers": json.loads(row["answers_json"]) if row["answers_json"] else [],
        "completed_at": row["completed_at"]
    })


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