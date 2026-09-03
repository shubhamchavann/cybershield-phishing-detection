import re
from urllib.parse import urlparse


# --------------------------------------------------
# URL SCANNER
# --------------------------------------------------

SHORTENER_DOMAINS = {
    "bit.ly", "tinyurl.com", "t.co", "is.gd", "buff.ly", "ow.ly",
    "cutt.ly", "goo.gl", "tiny.cc", "bc.vc", "rebrand.ly", "qr.ae"
}

SUSPICIOUS_TLDS = {
    ".xyz", ".top", ".buzz", ".club", ".tk", ".ml", ".ga", ".cf", ".gq",
    ".cc", ".work", ".icu", ".cn", ".rest", ".fit", ".surf", ".monster",
    ".cam", ".bar", ".cfd", ".sbs", ".quest"
}

TARGET_BRANDS = [
    "sbi", "hdfc", "icici", "axis", "paytm", "phonepe", "gpay",
    "paypal", "netflix", "amazon", "apple", "google", "microsoft",
    "facebook", "instagram", "whatsapp", "telegram", "incometax",
    "uidai", "aadhaar", "irctc", "binance", "metamask", "coinbase"
]


def scan_url(url):
    score = 0
    reasons = []
    breakdown = {
        "protocol": 100,      # 100 is safe, lowers if risky
        "domain_trust": 100,
        "heuristics": 100,
        "keywords": 100
    }

    url = (url or "").strip()
    if not url:
        return {
            "score": 0,
            "status": "SAFE",
            "risk": "Safe",
            "reasons": ["No URL provided for analysis."],
            "indicators": ["No URL provided for analysis."],
            "breakdown": breakdown,
            "recommendation": "Enter a valid URL to analyze."
        }

    # Ensure url has a scheme for parsing
    has_explicit_scheme = url.startswith("http://") or url.startswith("https://")
    parse_target = url if has_explicit_scheme else "http://" + url
    url_lower = url.lower()

    # 1. Protocol Check
    if not url_lower.startswith("https://"):
        score += 15
        breakdown["protocol"] -= 40
        reasons.append("URL does not use secure HTTPS encryption protocol")

    # 2. URL Length
    if len(url) > 75:
        score += 12
        breakdown["heuristics"] -= 25
        reasons.append(f"URL is unusually long ({len(url)} characters), often used to hide the real destination")

    # 3. @ Symbol in URL (userinfo spoofing)
    if "@" in url:
        score += 25
        breakdown["heuristics"] -= 50
        reasons.append("URL contains '@' symbol, which can mislead browsers into spoofing credentials")

    # 4. Too many hyphens
    hyphen_count = url.count("-")
    if hyphen_count >= 3:
        score += 12
        breakdown["heuristics"] -= 20
        reasons.append(f"URL contains {hyphen_count} hyphens, commonly seen in lookalike phishing domains")

    # 5. IP Address Detection
    ip_pattern = r"https?://(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?"
    raw_ip_pattern = r"^(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?"
    if re.search(ip_pattern, url_lower) or re.search(raw_ip_pattern, url_lower):
        score += 35
        breakdown["domain_trust"] -= 60
        reasons.append("URL uses a raw IP address instead of a verified domain name")

    # 6. Parse Hostname & TLD
    try:
        parsed = urlparse(parse_target)
        hostname = (parsed.hostname or "").lower()
        path = parsed.path.lower()
        query = parsed.query.lower()

        # Check for URL shortener
        if hostname in SHORTENER_DOMAINS or any(hostname.endswith("." + s) for s in SHORTENER_DOMAINS):
            score += 20
            breakdown["domain_trust"] -= 30
            reasons.append(f"URL uses a URL shortening service ({hostname}) that masks the real destination")

        # Check for high-risk TLD
        for tld in SUSPICIOUS_TLDS:
            if hostname.endswith(tld):
                score += 20
                breakdown["domain_trust"] -= 35
                reasons.append(f"Domain uses high-risk / spam-heavy top-level domain ({tld})")
                break

        # Check for excessive subdomains / dots
        dot_count = hostname.count(".")
        if dot_count >= 3:
            score += 18
            breakdown["domain_trust"] -= 30
            reasons.append(f"Domain has excessive subdomains ({dot_count} dots), which may deceive users")

        # Check for Port numbers
        if parsed.port and parsed.port not in (80, 443):
            score += 15
            breakdown["heuristics"] -= 25
            reasons.append(f"URL specifies non-standard network port ({parsed.port})")

        # Check Brand Impersonation / Typosquatting in subdomain/path when not official domain
        for brand in TARGET_BRANDS:
            if brand in url_lower:
                # Check if it is the genuine main domain or spoofed
                is_genuine = hostname == f"{brand}.com" or hostname.endswith(f".{brand}.com") or \
                             hostname == f"{brand}.in" or hostname.endswith(f".{brand}.in") or \
                             hostname == f"{brand}.co.in" or hostname.endswith(f".{brand}.co.in") or \
                             hostname == f"{brand}.org" or hostname.endswith(f".{brand}.org")
                if not is_genuine and (brand in hostname or brand in path):
                    score += 30
                    breakdown["keywords"] -= 40
                    reasons.append(f"Potential brand impersonation detected targeting '{brand.upper()}' on unofficial domain")
                    break

    except Exception:
        score += 15
        reasons.append("URL syntax is malformed or could not be parsed safely")

    # 7. Suspicious Keywords
    suspicious_keywords = [
        "verify", "login", "update", "account", "password", "bank",
        "secure", "confirm", "free", "bonus", "winner", "claim",
        "kyc", "pan", "aadhaar", "reward", "lottery", "urgent",
        "recover", "suspended", "unblock", "signin", "support", "billing"
    ]

    found_keywords = [w for w in suspicious_keywords if w in url_lower]
    if found_keywords:
        score += min(len(found_keywords) * 7, 25)
        breakdown["keywords"] -= min(len(found_keywords) * 15, 50)
        reasons.append("Suspicious security/financial keywords detected: " + ", ".join(found_keywords[:5]))

    # 8. Encoded Characters & Obfuscation
    if "%" in url or "//" in url[8:]:
        score += 15
        breakdown["heuristics"] -= 25
        reasons.append("URL contains character hex encoding or deceptive double slashes")

    # Calculate final score and status
    score = max(0, min(score, 100))

    # Normalize breakdown
    for k in breakdown:
        breakdown[k] = max(10, min(100, breakdown[k]))

    if score >= 60:
        status = "HIGH RISK"
        risk = "High Risk"
        recommendation = "⛔ DANGER: Do NOT open this link. It exhibits multiple high-risk phishing indicators."
    elif score >= 25:
        status = "SUSPICIOUS"
        risk = "Suspicious"
        recommendation = "⚠️ CAUTION: This link contains suspicious patterns. Verify the sender through official channels before clicking."
    else:
        status = "LOW RISK"
        risk = "Low Risk"
        recommendation = "✅ SAFE: No obvious phishing indicators detected. Always remain vigilant with credentials."

    if not reasons:
        reasons.append("No immediate malicious heuristics found. Domain and protocol appear normal.")

    return {
        "score": score,
        "status": status,
        "risk": risk,
        "reasons": reasons,
        "indicators": reasons,
        "breakdown": breakdown,
        "recommendation": recommendation
    }


# --------------------------------------------------
# MESSAGE SCANNER
# --------------------------------------------------

def scan_message(message):
    score = 0
    reasons = []
    breakdown = {
        "financial_threat": 100,
        "urgency_level": 100,
        "phishing_links": 100,
        "social_engineering": 100
    }

    text = (message or "").strip()
    if not text:
        return {
            "score": 0,
            "status": "SAFE",
            "risk": "Safe",
            "reasons": ["No message text provided for analysis."],
            "indicators": ["No message text provided for analysis."],
            "breakdown": breakdown,
            "recommendation": "Paste a message to analyze."
        }

    text_lower = text.lower()

    # 1. Sensitive Credentials / Financial Tokens
    sensitive_words = {
        "otp": 25,
        "cvv": 25,
        "pin": 20,
        "password": 20,
        "upi pin": 25,
        "netbanking": 15,
        "debit card": 15,
        "credit card": 15,
        "card number": 15
    }

    found_sensitive = [k for k in sensitive_words if k in text_lower]
    if found_sensitive:
        points = sum(sensitive_words[k] for k in found_sensitive)
        score += min(points, 40)
        breakdown["financial_threat"] -= min(points * 2, 70)
        reasons.append("Asks for sensitive credentials/banking tokens: " + ", ".join(found_sensitive))

    # 2. Urgency & Account Threat Triggers
    urgency_terms = [
        "urgent", "immediately", "right now", "within 24 hours",
        "final warning", "account blocked", "account suspended",
        "electricity will be disconnected", "power will be cut",
        "sim will be deactivated", "pan deactivated", "kyc expired",
        "last chance", "action required"
    ]

    found_urgency = [t for t in urgency_terms if t in text_lower]
    if found_urgency:
        score += min(len(found_urgency) * 12, 35)
        breakdown["urgency_level"] -= min(len(found_urgency) * 25, 75)
        reasons.append("High urgency / fear coercion tactics detected: " + ", ".join(found_urgency))

    # 3. Lure / Reward / Lottery / Work From Home Scam
    scam_lures = [
        "winner", "won", "lottery", "cashback", "claim your prize",
        "free gift", "instant bonus", "work from home", "part time job",
        "daily income", "investment 100% return", "crypto giveaway",
        "task payment", "telegram group", "earn 5000 daily"
    ]

    found_lures = [l for l in scam_lures if l in text_lower]
    if found_lures:
        score += min(len(found_lures) * 12, 30)
        breakdown["social_engineering"] -= min(len(found_lures) * 25, 70)
        reasons.append("Lucrative lure / lottery / job scam patterns detected: " + ", ".join(found_lures))

    # 4. APK / Unknown File Mentions
    if ".apk" in text_lower or "download app" in text_lower or "install app" in text_lower:
        score += 25
        breakdown["social_engineering"] -= 40
        reasons.append("Mentions installing external APK or third-party application")

    # 5. Link / URL embedded
    url_regex = r"(https?://\S+|www\.\S+|bit\.ly/\S+|tinyurl\.com/\S+|\S+\.(?:xyz|top|buzz|club|cc|icu)/\S*)"
    found_urls = re.findall(url_regex, text, re.IGNORECASE)
    if found_urls:
        score += 15
        breakdown["phishing_links"] -= 35
        reasons.append(f"Message contains {len(found_urls)} embedded link(s) prompting immediate action")

    # 6. Authority Impersonation
    authorities = ["sbi", "hdfc", "icici", "rbi", "income tax department", "electricity board", "police", "customs"]
    found_auth = [a for a in authorities if a in text_lower]
    if found_auth:
        score += 10
        breakdown["social_engineering"] -= 20
        reasons.append("Claims to represent authorized institution: " + ", ".join(found_auth))

    # Calculate final score and status
    score = max(0, min(score, 100))

    # Normalize breakdown
    for k in breakdown:
        breakdown[k] = max(10, min(100, breakdown[k]))

    if score >= 60:
        status = "HIGH RISK"
        risk = "High Risk"
        recommendation = "⛔ HIGH RISK FRAUD: Never click links, share OTP/PIN, or pay money for this message."
    elif score >= 25:
        status = "SUSPICIOUS"
        risk = "Suspicious"
        recommendation = "⚠️ SUSPICIOUS MESSAGE: Exercise extreme caution. Do not share personal details or scan unknown QR codes."
    else:
        status = "LOW RISK"
        risk = "Low Risk"
        recommendation = "✅ LOW RISK: No obvious scam indicators detected. Always confirm unknown senders."

    if not reasons:
        reasons.append("No typical scam or phishing patterns detected in the text content.")

    return {
        "score": score,
        "status": status,
        "risk": risk,
        "reasons": reasons,
        "indicators": reasons,
        "breakdown": breakdown,
        "recommendation": recommendation
    }