import re
from urllib.parse import urlparse


# =========================================================
# URL SCANNER
# =========================================================

def scan_url(url):

    score = 0
    indicators = []

    url = url.strip()

    # -----------------------------------------
    # Check if URL is empty
    # -----------------------------------------

    if not url:
        return {
            "score": 0,
            "risk": "UNKNOWN",
            "indicators": ["No URL provided"]
        }

    # -----------------------------------------
    # Add http if protocol is missing
    # -----------------------------------------

    check_url = url

    if not check_url.startswith(("http://", "https://")):
        check_url = "http://" + check_url

    # -----------------------------------------
    # Parse URL
    # -----------------------------------------

    try:
        parsed = urlparse(check_url)
        hostname = parsed.hostname or ""
    except Exception:
        hostname = ""

    # -----------------------------------------
    # Check HTTPS
    # -----------------------------------------

    if check_url.startswith("http://"):

        score += 10

        indicators.append(
            "URL does not use HTTPS"
        )

    # -----------------------------------------
    # Check @ symbol
    # -----------------------------------------

    if "@" in check_url:

        score += 20

        indicators.append(
            "URL contains @ symbol"
        )

    # -----------------------------------------
    # Check IP address
    # -----------------------------------------

    ip_pattern = r"^(?:\d{1,3}\.){3}\d{1,3}$"

    if re.match(ip_pattern, hostname):

        score += 25

        indicators.append(
            "URL uses an IP address instead of a domain name"
        )

    # -----------------------------------------
    # Suspicious words
    # -----------------------------------------

    suspicious_words = [

        "login",
        "verify",
        "verification",
        "account",
        "secure",
        "security",
        "update",
        "confirm",
        "password",
        "bank",
        "free",
        "gift",
        "winner",
        "prize",
        "urgent",
        "suspended"

    ]

    url_lower = check_url.lower()

    for word in suspicious_words:

        if word in url_lower:

            score += 5

            indicators.append(
                f"Suspicious word detected: '{word}'"
            )

    # -----------------------------------------
    # Check URL length
    # -----------------------------------------

    if len(check_url) > 100:

        score += 10

        indicators.append(
            "URL is unusually long"
        )

    # -----------------------------------------
    # Check too many subdomains
    # -----------------------------------------

    if hostname.count(".") >= 3:

        score += 10

        indicators.append(
            "URL contains many subdomains"
        )

    # -----------------------------------------
    # Check hyphen
    # -----------------------------------------

    if hostname.count("-") >= 2:

        score += 5

        indicators.append(
            "Domain contains multiple hyphens"
        )

    # -----------------------------------------
    # Limit score to 100
    # -----------------------------------------

    if score > 100:
        score = 100

    # -----------------------------------------
    # Determine risk
    # -----------------------------------------

    if score >= 60:

        risk = "HIGH RISK"

    elif score >= 30:

        risk = "MEDIUM RISK"

    else:

        risk = "LOW RISK"

    # -----------------------------------------
    # If nothing suspicious detected
    # -----------------------------------------

    if not indicators:

        indicators.append(
            "No major phishing indicators detected"
        )

    # -----------------------------------------
    # Return result
    # -----------------------------------------

    return {

        "score": score,

        "risk": risk,

        "indicators": indicators,

        "url": url

    }


# =========================================================
# MESSAGE SCANNER
# =========================================================

def scan_message(message):

    score = 0
    indicators = []

    message = message.strip()

    # -----------------------------------------
    # Empty message
    # -----------------------------------------

    if not message:

        return {

            "score": 0,

            "risk": "UNKNOWN",

            "indicators": ["No message provided"]

        }

    text = message.lower()

    # -----------------------------------------
    # Suspicious phishing keywords
    # -----------------------------------------

    suspicious_words = {

        "otp": 20,

        "password": 20,

        "cvv": 20,

        "pin": 15,

        "urgent": 10,

        "immediately": 10,

        "verify": 10,

        "account blocked": 15,

        "account suspended": 15,

        "click here": 10,

        "login": 10,

        "bank": 10,

        "prize": 10,

        "winner": 10,

        "refund": 10,

        "lottery": 15,

        "limited time": 10

    }

    # -----------------------------------------
    # Check keywords
    # -----------------------------------------

    for word, points in suspicious_words.items():

        if word in text:

            score += points

            indicators.append(

                f"Suspicious phrase detected: '{word}'"

            )

    # -----------------------------------------
    # Check URL inside message
    # -----------------------------------------

    url_pattern = r"https?://[^\s]+"

    urls = re.findall(
        url_pattern,
        message
    )

    if urls:

        score += 10

        indicators.append(
            "Message contains a clickable URL"
        )

    # -----------------------------------------
    # Check urgency
    # -----------------------------------------

    urgency_words = [

        "act now",

        "urgent",

        "immediately",

        "within 24 hours",

        "account will be blocked",

        "last chance"

    ]

    for phrase in urgency_words:

        if phrase in text:

            score += 10

            indicators.append(

                f"Urgency detected: '{phrase}'"

            )

    # -----------------------------------------
    # Check request for sensitive information
    # -----------------------------------------

    sensitive_phrases = [

        "share your otp",

        "send otp",

        "share password",

        "send password",

        "enter your cvv",

        "send your pin",

        "verify your account"

    ]

    for phrase in sensitive_phrases:

        if phrase in text:

            score += 15

            indicators.append(

                f"Sensitive information request: '{phrase}'"

            )

    # -----------------------------------------
    # Limit score
    # -----------------------------------------

    if score > 100:

        score = 100

    # -----------------------------------------
    # Determine risk
    # -----------------------------------------

    if score >= 60:

        risk = "HIGH RISK"

    elif score >= 30:

        risk = "MEDIUM RISK"

    else:

        risk = "LOW RISK"

    # -----------------------------------------
    # No indicators
    # -----------------------------------------

    if not indicators:

        indicators.append(

            "No major phishing indicators detected"

        )

    # -----------------------------------------
    # Return result
    # -----------------------------------------

    return {

        "score": score,

        "risk": risk,

        "indicators": indicators,

        "message": message

    }