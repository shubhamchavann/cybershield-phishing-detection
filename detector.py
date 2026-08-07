import re
from urllib.parse import urlparse


def check_url(url):

    score = 0
    reasons = []

    url = url.strip()
    url_lower = url.lower()

    # Long URL
    if len(url) > 75:
        score += 15
        reasons.append("The URL is unusually long.")

    # @ symbol
    if "@" in url:
        score += 20
        reasons.append("The URL contains an @ symbol.")

    # Too many hyphens
    if url.count("-") >= 4:
        score += 10
        reasons.append("The URL contains many hyphens.")

    # HTTPS check
    if not url_lower.startswith("https://"):
        score += 10
        reasons.append("The URL does not use HTTPS.")

    # IP address
    ip_pattern = r"(?:\d{1,3}\.){3}\d{1,3}"

    if re.search(ip_pattern, url):
        score += 25
        reasons.append(
            "An IP address is being used instead of a normal domain."
        )

    # Suspicious words
    suspicious_words = [
        "verify",
        "login",
        "update",
        "account",
        "password",
        "bank",
        "secure",
        "confirm",
        "free",
        "bonus",
        "winner",
        "claim"
    ]

    found_words = []

    for word in suspicious_words:

        if word in url_lower:
            found_words.append(word)

    if found_words:

        score += min(len(found_words) * 5, 20)

        reasons.append(
            "Suspicious URL keywords detected: "
            + ", ".join(found_words)
        )

    # Excessive subdomains
    try:

        parsed = urlparse(
            url if "://" in url else "http://" + url
        )

        hostname = parsed.hostname or ""

        if hostname.count(".") >= 3:
            score += 10
            reasons.append(
                "The domain contains multiple subdomains."
            )

    except ValueError:
        score += 15
        reasons.append("The URL structure appears invalid.")

    score = min(score, 100)

    if score >= 60:
        status = "HIGH RISK"

    elif score >= 30:
        status = "SUSPICIOUS"

    else:
        status = "LOW RISK"

    if not reasons:
        reasons.append(
            "No common phishing indicators were detected."
        )

    return {
        "score": score,
        "status": status,
        "reasons": reasons
    }
def check_message(message):

    score = 0
    reasons = []

    message_lower = message.lower().strip()

    suspicious_phrases = {
        "otp": 15,
        "upi pin": 25,
        "password": 20,
        "cvv": 25,
        "bank details": 25,
        "click here": 15,
        "urgent": 10,
        "immediately": 10,
        "account blocked": 20,
        "account suspended": 20,
        "update kyc": 20,
        "verify account": 20,
        "you have won": 20,
        "winner": 15,
        "lottery": 20,
        "claim reward": 20,
        "processing fee": 15,
        "registration fee": 15,
        "send money": 20,
        "training": 10,
    }

    for phrase, points in suspicious_phrases.items():

        if phrase in message_lower:

            score += points

            reasons.append(
                f"Suspicious phrase detected: '{phrase}'"
            )

    # Detect links inside message
    if "http://" in message_lower or "https://" in message_lower:

        score += 15
        reasons.append(
            "The message contains a website link."
        )

    # Excessive urgency
    if "urgent" in message_lower and "immediately" in message_lower:

        score += 10
        reasons.append(
            "The message uses strong urgency tactics."
        )

    score = min(score, 100)

    if score >= 60:
        status = "HIGH RISK"

    elif score >= 30:
        status = "SUSPICIOUS"

    else:
        status = "LOW RISK"

    if not reasons:
        reasons.append(
            "No common scam indicators were detected."
        )

    return {
        "score": score,
        "status": status,
        "reasons": reasons
    }