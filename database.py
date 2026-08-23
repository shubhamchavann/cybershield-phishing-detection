import mysql.connector


# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_connection():

    return mysql.connector.connect(

        host="localhost",
        user="root",
        password="12345",
        database="phishing_detection",
        port=3306
    )


# ==========================================
# CREATE REPORT TABLE
# ==========================================

def create_table():

    db = get_connection()

    cursor = db.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scam_reports (

            id INT AUTO_INCREMENT PRIMARY KEY,

            scam_type VARCHAR(100) NOT NULL,

            scam_text TEXT NOT NULL,

            phone VARCHAR(30),

            suspicious_url TEXT,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    db.commit()

    cursor.close()

    db.close()


# ==========================================
# SAVE REPORT
# ==========================================

def save_report(
    scam_type,
    scam_text,
    phone,
    suspicious_url
):

    db = get_connection()

    cursor = db.cursor()

    query = """
        INSERT INTO scam_reports
        (
            scam_type,
            scam_text,
            phone,
            suspicious_url
        )
        VALUES (%s, %s, %s, %s)
    """

    values = (
        scam_type,
        scam_text,
        phone,
        suspicious_url
    )

    cursor.execute(
        query,
        values
    )

    db.commit()

    cursor.close()

    db.close()


# ==========================================
# GET ALL REPORTS
# ==========================================

def get_reports():

    db = get_connection()

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            scam_type,
            scam_text,
            phone,
            suspicious_url,
            created_at
        FROM scam_reports
        ORDER BY created_at DESC
    """)

    reports = cursor.fetchall()

    cursor.close()

    db.close()

    return reports


# ==========================================
# CREATE TABLE WHEN FILE STARTS
# ==========================================

create_table()