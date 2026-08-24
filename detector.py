import re
from urllib.parse import urlparse


# -------------------------------------------------
# URL SCANNER
# -------------------------------------------------

def scan_url(url):
    """
    Analyze a URL for common phishing indicators.
    Returns risk score, risk level and detected indicators.
    """

    if not url:
        return {
            "score": 0,
            "risk": "Invalid",
            "indicators": ["No URL was entered."]
        }

    url = url.strip()

    # Add scheme if user does not provide one
    test_url = url

    if not test_url.startswith(("http://", "https://")):
        test_url = "http://" + test_url

    parsed = urlparse(test_url)

    score = 0
    indicators = []

    # ---------------------------------------------
    # 1. Check HTTPS
    # ---------------------------------------------

    if parsed.scheme != "https":
        score += 15
        indicators.append("The URL does not use HTTPS.")

    # ---------------------------------------------
    # 2. Check @ symbol
    # ---------------------------------------------

    if "@" in url:
        score += 20
        indicators.append(
            "The URL contains @, which can hide the actual destination."
        )

    # ---------------------------------------------
    # 3. Check IP address
    # ---------------------------------------------

    hostname = parsed.hostname or ""

    ip_pattern = r"^\d{1,3}(\.\d{1,3}){3}$"

    if re.match(ip_pattern, hostname):
        score += 25
        indicators.append(
            "The URL uses an IP address instead of a normal domain."
        )

    # ---------------------------------------------
    # 4. Check suspicious keywords
    # ---------------------------------------------

    suspicious_words = [
        "login",
        "verify",
        "verification",
        "secure",
        "account",
        "update",
        "password",
        "bank",
        "confirm",
        "wallet",
        "bonus",
        "free",
        "reward",
        "urgent",
        "claim"
    ]

    found_words = []

    lower_url = url.lower()

    for word in suspicious_words:
        if word in lower_url:
            found_words.append(word)

    if found_words:
        score += min(len(found_words) * 5, 25)

        indicators.append(
            "Suspicious keywords found: "
            + ", ".join(found_words)
        )

    # ---------------------------------------------
    # 5. Check URL length
    # ---------------------------------------------

    if len(url) > 100:
        score += 10
        indicators.append("The URL is unusually long.")

    # ---------------------------------------------
    # 6. Check many subdomains
    # ---------------------------------------------

    if hostname.count(".") >= 3:
        score += 15
        indicators.append(
            "The domain contains many subdomains."
        )

    # ---------------------------------------------
    # 7. Check hyphens
    # ---------------------------------------------

    if hostname.count("-") >= 2:
        score += 10
        indicators.append(
            "The domain contains multiple hyphens."
        )

    # ---------------------------------------------
    # Limit score
    # ---------------------------------------------

    score = min(score, 100)

    # ---------------------------------------------
    # Risk level
    # ---------------------------------------------

    if score >= 60:
        risk = "High Risk"

    elif score >= 30:
        risk = "Suspicious"

    else:
        risk = "Low Risk"

    if not indicators:
        indicators.append(
            "No obvious phishing indicators were detected."
        )

    return {
        "score": score,
        "risk": risk,
        "indicators": indicators
    }


# -------------------------------------------------
# MESSAGE SCANNER
# -------------------------------------------------

def scan_message(message):
    """
    Analyze a text message for common phishing indicators.
    """

    if not message:
        return {
            "score": 0,
            "risk": "Invalid",
            "indicators": ["No message was entered."]
        }

    text = message.strip().lower()

    score = 0
    indicators = []

    # ---------------------------------------------
    # Suspicious keywords
    # ---------------------------------------------

    keywords = [
        "otp",
        "password",
        "verify",
        "verification",
        "click here",
        "urgent",
        "account blocked",
        "account suspended",
        "bank",
        "refund",
        "prize",
        "winner",
        "reward",
        "lottery",
        "kyc",
        "upi",
        "cvv",
        "pin",
        "claim now"
    ]

    found_keywords = []

    for word in keywords:
        if word in text:
            found_keywords.append(word)

    if found_keywords:
        score += min(len(found_keywords) * 7, 45)

        indicators.append(
            "Suspicious words found: "
            + ", ".join(found_keywords)
        )

    # ---------------------------------------------
    # Check URLs
    # ---------------------------------------------

    if "http://" in text or "https://" in text:
        score += 20
        indicators.append(
            "The message contains a website link."
        )

    # ---------------------------------------------
    # Urgency
    # ---------------------------------------------

    urgency_words = [
        "urgent",
        "immediately",
        "act now",
        "within 24 hours",
        "last chance",
        "expires today"
    ]

    if any(word in text for word in urgency_words):
        score += 15
        indicators.append(
            "The message creates a sense of urgency."
        )

    # ---------------------------------------------
    # Financial information
    # ---------------------------------------------

    financial_words = [
        "cvv",
        "upi pin",
        "pin",
        "bank account",
        "card number",
        "password",
        "otp"
    ]

    if any(word in text for word in financial_words):
        score += 20
        indicators.append(
            "The message asks for sensitive financial or login information."
        )

    # ---------------------------------------------
    # Limit score
    # ---------------------------------------------

    score = min(score, 100)

    # ---------------------------------------------
    # Risk level
    # ---------------------------------------------

    if score >= 60:
        risk = "High Risk"

    elif score >= 30:
        risk = "Suspicious"

    else:
        risk = "Low Risk"

    if not indicators:
        indicators.append(
            "No obvious phishing indicators were detected."
        )

    return {
        "score": score,
        "risk": risk,
        "indicators": indicators
    }