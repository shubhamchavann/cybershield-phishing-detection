import re
from urllib.parse import urlparse
import requests
from datetime import datetime

class CyberDetector:
    def __init__(self):
        # Known target brands for phishing hijacking detection
        self.popular_brands = {
            "paypal": "paypal.com",
            "netflix": "netflix.com",
            "amazon": "amazon.com",
            "google": "google.com",
            "microsoft": "microsoft.com",
            "apple": "apple.com",
            "facebook": "facebook.com",
            "instagram": "instagram.com",
            "twitter": "twitter.com",
            "linkedin": "linkedin.com",
            "yahoo": "yahoo.com",
            "steam": "steampowered.com",
            "ebay": "ebay.com",
            "coinbase": "coinbase.com",
            "binance": "binance.com",
            "chase": "chase.com",
            "bankofamerica": "bankofamerica.com",
            "wellsfargo": "wellsfargo.com"
        }

        self.suspicious_keywords = [
            "login", "verify", "secure", "update", "account", "banking", 
            "reward", "free-gift", "winner", "signin", "credentials", 
            "password", "reset", "billing", "support", "refund", "kyc"
        ]

        self.scam_keywords = [
            "otp", "cvv", "password", "urgent", "immediately", "blocked", 
            "winner", "reward", "upi", "kyc", "gift", "lottery", "card", 
            "click", "verify", "refund", "payment", "unusual activity", 
            "unauthorized", "suspended", "action required", "compromised",
            "bank", "cash", "money", "prize", "transfer", "inherit", "claim"
        ]

        self.shorteners = [
            "bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", 
            "buff.ly", "rebrand.ly", "ouo.io", "linktr.ee", "shorte.st"
        ]

        self.suspicious_tlds = [
            ".xyz", ".top", ".tk", ".click", ".info", ".gq", ".cf", 
            ".ml", ".ga", ".buzz", ".club", ".work", ".date", ".loan",
            ".faith", ".bid", ".cricket", ".science", ".party"
        ]

    # =====================================================
    # URL CHECKER
    # =====================================================
    def check_url(self, url):
        score = 0
        reasons = []
        
        url = url.strip()
        if not url:
            return {
                "score": 0,
                "level": "Safe",
                "reasons": ["No URL entered."]
            }

        url_lower = url.lower()
        test_url = url
        if not test_url.startswith(("http://", "https://")):
            test_url = "http://" + test_url

        try:
            parsed = urlparse(test_url)
            hostname = parsed.hostname or ""
            path = parsed.path or ""
        except Exception:
            return {
                "score": 85,
                "level": "Dangerous",
                "reasons": ["Malformed URL syntax."]
            }

        # 1. HTTPS Check
        if not url_lower.startswith("https://"):
            score += 25
            reasons.append("URL does not use HTTPS encryption.")

        # 2. IP Address Domain Check
        ip_pattern = r"^(?:\d{1,3}\.){3}\d{1,3}$"
        if re.match(ip_pattern, hostname):
            score += 35
            reasons.append("URL uses a raw IP address instead of a registered domain name.")

        # 3. URL Shortener Check
        if any(shortener in hostname for shortener in self.shorteners):
            score += 25
            reasons.append("URL uses a redirection shortener, hiding the final destination.")

        # 4. Excessive Subdomains Check
        # Count parts of hostname. E.g. account.login.paypal.com.verify.xyz has 6 parts
        host_parts = hostname.split('.')
        if len(host_parts) > 4:
            score += 20
            reasons.append(f"Excessive subdomains detected ({len(host_parts) - 2} levels). This is often used to spoof brand pages.")

        # 5. Suspicious TLD Check
        if any(hostname.endswith(tld) for tld in self.suspicious_tlds):
            score += 20
            reasons.append("URL uses a cheap or high-risk top-level domain (TLD).")

        # 6. @ Symbol Check
        if "@" in url_lower:
            score += 25
            reasons.append("URL contains the '@' symbol, which ignores previous domain parts and redirects to the text after it.")

        # 7. Brand Hijacking / Mismatched Keywords Check
        # Check if the primary domain contains the brand keyword, but does not match the official domain
        # The primary domain is usually the last two components (e.g. google.com, or google.co.uk)
        primary_domain = hostname
        if len(host_parts) >= 2:
            # Simple top-level domain extension check (handle co.uk, com.br, etc.)
            if len(host_parts) >= 3 and host_parts[-2] in ["co", "com", "org", "net", "edu", "gov"]:
                primary_domain = ".".join(host_parts[-3:])
            else:
                primary_domain = ".".join(host_parts[-2:])

        for brand_key, official_domain in self.popular_brands.items():
            if brand_key in hostname and primary_domain != official_domain:
                score += 35
                reasons.append(f"Hijacked brand indicator: contains '{brand_key}' but official domain is '{official_domain}'.")
                break

        # 8. Homograph / IDN lookalike characters
        # Check if domain name has unicode characters or Punycode 'xn--' prefix
        if hostname.startswith("xn--") or not hostname.isascii():
            score += 35
            reasons.append("Internationalized Domain Name (IDN) or Punycode detected. This is a common homograph/lookalike trick (e.g. replacing 'o' with a Cyrillic character).")

        # Typo lookalikes (simple substring replacements)
        typos = [
            "paypa1", "goog1e", "rnicrosoft", "faceb00k", "instagrarn", "arnazon", "app1e"
        ]
        if any(typo in hostname for typo in typos):
            score += 30
            reasons.append("Typo-squatting or character substitution detected (e.g., '1' for 'l', 'rn' for 'm', '0' for 'o').")

        # 9. Suspicious keywords in URL path or query
        found_keywords = [word for word in self.suspicious_keywords if word in url_lower]
        if found_keywords:
            score += 15
            reasons.append(f"Urgent/security keywords in URL: {', '.join(found_keywords)}.")

        # 10. DNS Verification & Domain Age (RDAP API)
        if hostname and not re.match(ip_pattern, hostname) and hostname not in ["localhost", "127.0.0.1"]:
            try:
                # Query Cloudflare DNS API (Fast, reliable, doesn't require OS level resolver packages)
                dns_url = f"https://cloudflare-dns.com/dns-query?name={hostname}&type=A"
                headers = {"Accept": "application/dns-json"}
                response = requests.get(dns_url, headers=headers, timeout=1.5)
                
                if response.status_code == 200:
                    dns_data = response.json()
                    status = dns_data.get("Status", 0)
                    
                    if status == 3: # NXDOMAIN
                        score += 30
                        reasons.append("Domain does not exist in DNS registry (NXDOMAIN). The link points to an invalid site.")
                    elif status == 0:
                        # Domain is active, check RDAP registration info
                        rdap_url = f"https://rdap.org/domain/{primary_domain}"
                        rdap_resp = requests.get(rdap_url, timeout=1.5)
                        
                        if rdap_resp.status_code == 200:
                            rdap_data = rdap_resp.json()
                            events = rdap_data.get("events", [])
                            
                            for event in events:
                                if event.get("eventAction") == "registration":
                                    reg_date_str = event.get("eventDate", "")
                                    # Date format: 2020-03-12T10:00:00Z
                                    if reg_date_str:
                                        # Parse date
                                        reg_date_str = reg_date_str[:10]
                                        reg_date = datetime.strptime(reg_date_str, "%Y-%m-%d")
                                        age_days = (datetime.now() - reg_date).days
                                        
                                        if age_days < 90:
                                            score += 25
                                            reasons.append(f"Domain is brand new (registered {age_days} days ago). Phishing sites are rarely online longer than a few weeks.")
                                        break
            except Exception:
                # If lookup rates out or user is offline, proceed with local heuristics smoothly
                pass

        # Final Score Caps
        score = min(score, 100)
        
        # Decide Verdict
        if score >= 65:
            verdict = "Dangerous"
        elif score >= 35:
            verdict = "Suspicious"
        else:
            verdict = "Safe"

        if not reasons:
            reasons.append("No immediate phishing indicators found. Domain DNS records appear valid.")

        return {
            "score": score,
            "level": verdict,
            "reasons": reasons
        }

    # =====================================================
    # MESSAGE CHECKER
    # =====================================================
    def check_message(self, text):
        score = 0
        detected = []
        
        text_lower = text.strip().lower()
        if not text_lower:
            return {
                "score": 0,
                "level": "Safe",
                "detected": [],
                "recommendation": "Please enter a message to analyze."
            }

        # 1. Scam Keywords Check
        found_keywords = []
        for word in self.scam_keywords:
            # Match whole words or boundary substrings
            if re.search(r'\b' + re.escape(word) + r'\b', text_lower):
                score += 15
                found_keywords.append(word.upper())
                
        if found_keywords:
            detected.append(f"SUSPICIOUS TERMS DETECTED: {', '.join(found_keywords)}")

        # 2. Urgent / Pressure Tactics
        urgency_patterns = [
            r"\burging\b", r"\bhurry\b", r"\bimmediately\b", r"\baction required\b", 
            r"\bwithin \d+ hours\b", r"\blast chance\b", r"\bsuspended\b", 
            r"\bblocked\b", r"\bcompromised\b", r"\bfreeze\b", r"\bact now\b", 
            r"\bverify your identity\b"
        ]
        
        urgency_found = False
        for pattern in urgency_patterns:
            if re.search(pattern, text_lower):
                urgency_found = True
                break
                
        if urgency_found:
            score += 25
            detected.append("URGENCY / PRESSURE TACTICS: Message pressures you to act quickly.")

        # 3. URL Detection in Message
        urls = re.findall(r"https?://\S+|www\.\S+", text_lower)
        if urls:
            score += 20
            detected.append("CONTAINS URL: Phishing messages almost always direct you to click a link.")
            
            # Scan the first link inside the message and add to the message risk
            url_scan = self.check_url(urls[0])
            if url_scan["level"] == "Dangerous":
                score += 35
                detected.append(f"HIGH-RISK LINK DETECTED: The link ({urls[0]}) contains multiple phishing indicators.")
            elif url_scan["level"] == "Suspicious":
                score += 20
                detected.append(f"SUSPICIOUS LINK DETECTED: The link ({urls[0]}) shows warning signs.")

        # 4. Monetary / Prize Claims
        financial_patterns = [
            r"\brefund\b", r"\bpayment\b", r"\bwon\b", r"\blottery\b", 
            r"\bprize\b", r"\bupi\b", r"\bcash\b", r"\bmoney\b", r"\binherit\b",
            r"\bclaimed\b", r"\btransfer\b"
        ]
        
        fin_found = False
        for pattern in financial_patterns:
            if re.search(pattern, text_lower):
                fin_found = True
                break
                
        if fin_found:
            score += 15
            detected.append("FINANCIAL TRANSACTIONS / WINNINGS: Mentions money transfers, cash prizes, or refunds.")

        # 5. Generic Spoofed Senders / Threat Identifiers
        # Look for templates like "Dear Customer", "Valued customer", or SMS header indicators
        if re.search(r"dear (customer|user|member|cardholder)", text_lower) or text_lower.startswith("sender:"):
            score += 10
            detected.append("GENERIC SALUTATION: Impersonal greeting is typical of bulk scam campaigns.")

        # Caps
        score = min(score, 100)
        
        # Decide Verdict
        if score >= 60:
            verdict = "Dangerous"
        elif score >= 30:
            verdict = "Suspicious"
        else:
            verdict = "Safe"

        if score >= 60:
            recommendation = "CRITICAL: Do not click any links, download attachments, or reply to this sender. Block and delete immediately."
        elif score >= 30:
            recommendation = "WARNING: Verify the sender through official channels. Do not use contact details provided in the message."
        else:
            recommendation = "No distinct phishing or scam signals identified, but always remain cautious when verifying sender identity."

        return {
            "score": score,
            "level": verdict,
            "detected": detected,
            "recommendation": recommendation
        }