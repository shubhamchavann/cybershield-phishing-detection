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
- **Multilingual Switcher**: Translate all headings, text nodes, input placeholders, tips, quiz questions, and alert notifications instantly without page reloads.
- **Interactive URL Safety Evaluator**: Checks URL links client-side for HTTPS encryption, suspicious character insertions, excessive subdomains, and scam-related keywords.
- **Heuristic Phishing Message Detector**: Evaluates text message inputs for urgency patterns, financial rewards, card details, or credential requests, assigning a risk-percentage score.
- **15-Question Interactive Quiz**: Comprehensive multilingual quiz covering digital safety. Displays instant feedback, correct/incorrect highlighting, and educational explanations for each question.
- **Client-Side Progress Tracker**: Remembers which learning units the user has marked as completed using browser `localStorage` (no backend required).
- **Dynamic Content Search**: Live search bar that dynamically filters learning modules and safety warnings in real-time.
- **Emergency Scam Guidance**: An actionable, step-by-step checklist on how to respond to cybersecurity threats, including referencing India's National Cyber Crime helpline **1930**.

---

## Technologies Used

- **HTML5**: Semantic document tags to support proper screen readers.
- **CSS3**: Premium modern design system, responsive grid layouts, and custom theme properties.
- **Vanilla JavaScript**: Dynamic event-driven state machine managing translations, logic engines, and storage states.

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
├── index.html           # Main markup file (responsive structure and SVG assets)
├── style.css            # Stylesheet containing design system and dark theme values
├── translations.js      # Language dictionary definitions (English, Hindi, Marathi)
├── script.js            # Core interactive application logic
└── README.md            # Project documentation and specifications
```

---

## How to Run

Since the application is built entirely as a static frontend site, it does not require an active server backend or build steps.

1. Clone or download the project files.
2. Locate and open the `index.html` file in any modern web browser (e.g., Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
3. Alternatively, you can run a local server in the project folder:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```
4. Access the site via your browser at `http://localhost:8000`.

---

## Future Scope

- **Voice Assistance**: Integration of text-to-speech features for non-readers to listen to content in their native dialect.
- **More Indian Languages**: Adding languages like Tamil, Telugu, Bengali, Gujarati, and Kannada.
- **AI-Powered Analysis**: Linking to client-side machine learning models to identify scam voice recordings.
- **Offline PWA support**: Registering service workers so users can access safety guides in remote rural areas without internet connectivity.

---

## Author

- **Developer Name**: [Student Placeholder Name]
- **Project Role**: Multilingual Digital Literacy Content Development (CEP)
- **Institution**: [College/University Name Placeholder]
