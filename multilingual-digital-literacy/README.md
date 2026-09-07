# Multilingual Digital Literacy Content Development

Developed as a college **Community Engagement Project (CEP)**, this responsive, client-side web application aims to bridge the digital divide by offering digital literacy and cyber safety education in multiple regional Indian languages.

---

## Project Description

As digital services expand across India, millions of first-time and non-technical internet users encounter technology interfaces daily. This makes them highly vulnerable to malicious activities like phishing, financial frauds, UPI collect request scams, and malware. 

This platform serves as a beginner-friendly educational tool providing:
- Key digital concept training (computing, internet, smartphones, email, and government portals)
- Online security awareness guidelines
- High-fidelity interactive assessment tools running completely client-side.

---

## Objectives

1. **Language Inclusivity**: Address the digital accessibility gap by supporting three primary languages—English, Hindi, and Marathi—with instant interface translations.
2. **Cyber Defense Skills**: Teach basic heuristics to differentiate between safe URLs/messages and scam lures.
3. **Interactive Engagement**: Gauge understanding via a 15-question interactive evaluation system.
4. **Offline Accessibility Ready**: Implement lightweight vanilla frontend components suitable for low-connectivity environments.

---

## Features

- **Dynamic Theme & Contrast Controls**: Easily toggle between premium Light and Dark modes. Adjustable font scaling controls (`A-`, `A`, `A+`) to aid users with visual impairments.
- **Multilingual Switcher**: Translate all headings, text nodes, input placeholders, tips, quiz questions, and alert notifications instantly without page reloads (English, Hindi, Marathi).
- **Voice Assistance (Text-to-Speech)**: Integrated native speech synthesizer allowing users to listen to lesson modules and cyber safety advisories in English, Hindi, and Marathi.
- **Certificate of Completion**: Generates a verifiable, personalized certificate with official unique ID upon completing the 15-question cyber assessment, ready to print or save as PDF.
- **Interactive URL Safety Evaluator**: Checks URL links client-side for HTTPS encryption, suspicious character insertions, excessive subdomains, and scam-related keywords.
- **Heuristic Phishing Message Detector**: Evaluates text message inputs for urgency patterns, financial rewards, card details, or credential requests, assigning a risk-percentage score.
- **15-Question Interactive Quiz**: Comprehensive multilingual quiz covering digital safety. Displays instant feedback, correct/incorrect highlighting, and educational explanations for each question.
- **Client-Side Progress Tracker**: Remembers which learning units the user has marked as completed using browser `localStorage`.
- **Dynamic Content Search**: Live search bar that dynamically filters learning modules and safety warnings in real-time.
- **Emergency Scam Guidance**: An actionable, step-by-step checklist on how to respond to cybersecurity threats, including referencing India's National Cyber Crime helpline **1930**.
- **Progressive Web App (PWA) & Offline Ready**: Service worker caching and web app manifest allowing access in remote low-connectivity regions.

---

## Technologies Used

- **HTML5**: Semantic document tags to support proper screen readers and accessibility.
- **CSS3**: Premium modern design system, responsive grid layouts, and custom theme properties.
- **Vanilla JavaScript**: Dynamic event-driven state machine managing translations, speech synthesis, logic engines, and storage states.
- **Python / Flask**: Optional backend server providing certificate verification endpoints (`/api/certificate`) and standalone serving.

---

## Languages Supported

1. **English**
2. **Hindi (हिंदी)**
3. **Marathi (मराठी)**

All translations are organized inside a clean, scalable JavaScript configuration file `translations.js` for future language integrations.

---

## Project Structure

```
multilingual-digital-literacy/
├── index.html           # Main markup file (responsive structure, SVG assets, modals)
├── style.css            # Stylesheet containing design system, certificate print styles, animations
├── translations.js      # Language dictionary definitions (English, Hindi, Marathi)
├── script.js            # Core interactive application logic (TTS, Quiz, Checker, Cert)
├── sw.js                # PWA Service Worker for offline asset caching
├── manifest.json        # Web App Manifest for mobile/desktop installability
├── app.py               # Python Flask application backend & certificate API
├── requirements.txt     # Dependencies for Python Flask deployment
└── README.md            # Project documentation and specifications
```

---

## How to Run

### Option 1: Direct in Browser (Static Frontend)
1. Locate and open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Python Flask App
1. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the application:
   ```bash
   python app.py
   ```
3. Open `http://127.0.0.1:5050` in your browser.

### Option 3: Local HTTP Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

---

## Future Scope

- **More Indian Languages**: Adding languages like Tamil, Telugu, Bengali, Gujarati, and Kannada.
- **AI-Powered Voice Analysis**: Linking to client-side machine learning models to identify scam voice recordings.
- **Gamified Cyber Badges**: Level-up progression for students completing multiple safety modules.

---

## Author

- **Developer Name**: [Student Placeholder Name]
- **Project Role**: Multilingual Digital Literacy Content Development (CEP)
- **Institution**: [College/University Name Placeholder]

