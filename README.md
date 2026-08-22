# PhishGuard - Phishing Scam & Fraud Detection Platform

PhishGuard is a production-quality, responsive web application built with **Python/Flask** and **SQLite** designed to analyze links, emails, and SMS alerts for cyber-security risks. It features a modern **"Liquid Glass" dark-themed UI** with glassmorphism panels, interactive neon glows, fluid CSS animations, and a rich, multi-layered heuristics engine.

---

## Key Features

1. **Dashboard Console**: Integrated hub displaying community alert tickers, dynamic statistics, scan forms, and live transaction logs.
2. **Heuristic URL Scanner**: Evaluates web domains against ten signature classes:
   - **HTTPS presence**: Flagging insecure `http://` configurations.
   - **Raw IP targeting**: Detecting direct IP address hosting (`http://192.168.1.1`).
   - **Link Shortener masking**: Flagging hidden redirection links.
   - **Subdomain inflation**: Flagging excessive dot structures.
   - **Mismatched brand keywords**: Identifying brand hijacking (e.g. `paypal-verify.com` vs. `paypal.com`).
   - **Suspicious TLD extensions**: Filtering high-abuse domains (`.xyz`, `.top`, `.tk`).
   - **Homograph lookup**: Checking for IDN Punycode scripts and Cyrillic character substitutions.
   - **Typo-squatting alerts**: Flagging numerical and structural substitutions (e.g. `goog1e.com`, `paypa1.com`).
   - **Active DNS query**: Cloudflare DNS-over-HTTPS API integration to detect non-existent domains.
   - **RDAP Registry check**: Automatically analyzing domain registration date to flag new websites (<90 days old).
3. **Message Intelligence Engine**: Pastes SMS, WhatsApp, or email content to flag urgency spikes, credential requests (OTPs, CVVs, passwords), and financial requests.
4. **Scam Reports Repository**: Enables community submissions of phishing templates and URLs directly to the SQLite backend.
5. **Interactive Education Hub**: Detailed, sliding accordions illustrating common attack strategies (credential harvesting, smishing, quishing, tech support scams) with warning indicators and examples.
6. **Authentication Center**: Built-in, secure password hashing (PBKDF2-SHA256) and Flask session cookies mapping scans to user accounts.

---

## File Structure

```text
/
├── app.py                      # Flask Server (Routes, Session authentication, JSON APIs)
├── detector.py                 # CyberDetector (URL & message heuristic analyzer)
├── database.py                 # SQLite database helper (table schema, queries, statistics)
├── requirements.txt            # Python dependencies (Flask, requests, python-dotenv)
├── static/
│   ├── css/
│   │   └── styles.css          # Liquid Glass theme styling, glows, animations
│   └── js/
│       └── script.js           # AJAX scan scripts, gauges, sessionStorage page transition loader
├── templates/
│   ├── base.html               # Shared layout structure, Lucide icons, background mesh
│   ├── index.html              # Main dashboard hub & scan consoles
│   ├── report.html             # Community threat reports page
│   ├── learn.html              # Educational tactics accordion
│   ├── login.html              # Credentials Sign In portal
│   └── signup.html             # Account Registration portal
└── README.md                   # Project documentation (this file)
```

---

## Database Schema (SQLite)

The application automatically creates `phishguard.db` on launch with three tables:
- **`users`**: Email accounts and cryptographic password hashes.
- **`scans`**: Logs of URL and text scans with risk scores, verdicts, and JSON red flags.
- **`reports`**: Community-submitted scam domains, description details, and dates.

---

## Installation & Setup

### Prerequisites
- **Python 3.8** or higher installed on your system.

### Steps
1. **Clone or Navigate to the Directory**:
   ```bash
   cd path/to/phishing_detection
   ```

2. **Initialize Virtual Environment** (Recommended):
   ```bash
   python -m venv venv
   ```

3. **Activate the Environment**:
   - **Windows PowerShell**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows Command Prompt**:
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   - **macOS / Linux Terminal**:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the Application**:
   ```bash
   python app.py
   ```

6. **Access the Console**:
   Open your browser and navigate to **`http://127.0.0.1:5000`**.

---

## Verification & Testing

To run automated checks verifying all API routes, authentication flows, form submissions, and scan heuristics:
```bash
python .gemini/antigravity-ide/brain/39404b15-c5c3-429f-9361-f28b23c2b498/scratch/test_endpoints.py
```
*(All tests will execute using an isolated temporary memory database).*
