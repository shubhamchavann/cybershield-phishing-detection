const translations = {
  en: {
    // Navigation
    logoTitle: "Digital Literacy",
    navHome: "Home",
    navLearn: "Learn",
    navSafety: "Safety",
    navQuiz: "Quiz",
    navAbout: "About",
    accessibilityLabel: "Text Size:",
    darkModeLabel: "Dark Mode",

    // Hero Section
    heroTitle: "Multilingual Digital Literacy",
    heroSubtitle: "Learn Digital Skills. Stay Safe Online. Learn in Your Language.",
    btnStartLearning: "Start Learning",
    btnTakeQuiz: "Take Quiz",

    // Search & Progress Section
    searchPlaceholder: "Search digital literacy topics (e.g., UPI, Phishing, Passwords...)",
    searchTitle: "Search Topics",
    progressLabel: "Your Learning Progress",
    progressCompleted: "Topics Completed:",
    btnResetProgress: "Reset Progress",
    markCompleted: "Mark as Completed",
    markUncompleted: "Mark as Uncompleted",

    // Common Buttons
    btnLearnMore: "Learn More",
    btnClose: "Close",
    btnNext: "Next",
    btnPrev: "Previous",
    btnRestartQuiz: "Restart Quiz",
    btnSubmitQuiz: "Submit Quiz",

    // Learning section headers
    learnHeader: "Learn Digital Skills",
    learnSub: "Master the basics of computing, internet, emails, digital payments, smartphones, and government services.",

    // Learning topics detailed content
    topics: {
      computer: {
        title: "Computer Basics",
        short: "Understand what a computer is, using a keyboard and mouse, files, folders, and basic software.",
        desc: `
          <h3>What is a Computer?</h3>
          <p>A computer is an electronic device that manipulates information or data. It has the ability to store, retrieve, and process data. You can use a computer to type documents, send email, play games, and browse the Web.</p>
          <h3>Keyboard and Mouse</h3>
          <p>The keyboard is used to enter text and commands, while the mouse is a pointing device used to navigate the screen and click on objects. Learning to click, double-click, and right-click is essential.</p>
          <h3>Files and Folders</h3>
          <p>All data on a computer is saved in "files" (like documents, images, songs). Folders are used to organize these files, just like drawers in a cabinet. You can create, rename, copy, and delete files and folders.</p>
          <h3>Basic Applications</h3>
          <p>Applications (or apps/software) are programs that let you perform tasks. Examples include Notepad/Word for typing, Paint for drawing, and Calculators.</p>
        `
      },
      internet: {
        title: "Internet Basics",
        short: "Explore the World Wide Web, using browsers, search engines, URLs, and identifying websites.",
        desc: `
          <h3>What is the Internet?</h3>
          <p>The Internet is a global network connecting billions of computers. It allows people to share information and communicate from anywhere in the world.</p>
          <h3>Web Browsers</h3>
          <p>A web browser (like Google Chrome, Microsoft Edge, Mozilla Firefox) is a software application used to access and view websites on the Internet.</p>
          <h3>Search Engines</h3>
          <p>Search engines (like Google, Bing) help you find specific information on the Internet. You type keywords or questions, and the search engine lists matching web pages.</p>
          <h3>Websites and URLs</h3>
          <p>A website is a collection of related web pages. A URL (Uniform Resource Locator) is the unique address of a web page (e.g., <code>https://www.wikipedia.org</code>). Always double check URLs before entering sensitive details.</p>
        `
      },
      email: {
        title: "Email Essentials",
        short: "Learn how to create an email account, compose and send emails, use attachments, and stay secure.",
        desc: `
          <h3>What is Email?</h3>
          <p>Electronic Mail (email) is a method of exchanging messages between people using digital devices. It is fast, cheap, and can carry documents and images.</p>
          <h3>Creating and Sending</h3>
          <p>To use email, you sign up with a provider (like Gmail, Outlook). You compose messages by entering the recipient's address (e.g., <code>user@example.com</code>), a Subject line, and the body text.</p>
          <h3>Attachments</h3>
          <p>You can send files (photos, documents, PDFs) with your email. This is called attaching a file. Be careful: only open attachments from trusted senders, as they can contain malware.</p>
          <h3>Email Safety</h3>
          <p>Never share your password. Be wary of emails asking for urgent personal or banking details—legitimate companies will never ask for credentials via email.</p>
        `
      },
      payments: {
        title: "Digital Payments",
        short: "Master UPI payments, scanning QR codes safely, net banking, and necessary financial safety checks.",
        desc: `
          <h3>Unified Payments Interface (UPI)</h3>
          <p>UPI allows you to transfer money instantly between bank accounts using a mobile app (like BHIM, Google Pay, PhonePe, Paytm). It uses a unique UPI ID and a secure 4 or 6-digit UPI PIN.</p>
          <h3>QR Codes</h3>
          <p>Quick Response (QR) codes are square-shaped barcodes. You scan them with your mobile camera to pay merchants. <strong>CRITICAL RULE: You only scan QR codes to PAY money, never to RECEIVE money.</strong></p>
          <h3>Online Banking</h3>
          <p>Net banking and Mobile banking let you manage your bank accounts via the bank's secure website or application. Always type the bank's website manually and look for <code>https://</code>.</p>
          <h3>Payment Precautions</h3>
          <p>Keep your UPI PIN secret. Never share it with anyone, not even bank employees. Enable notifications to monitor your account balance constantly.</p>
        `
      },
      smartphone: {
        title: "Smartphone Literacy",
        short: "Understand app stores, configuring app permissions, system updates, and locking your device.",
        desc: `
          <h3>Using App Stores Safely</h3>
          <p>Download apps only from official stores: Google Play Store (Android) or Apple App Store (iOS). Avoid downloading APK files from unknown websites, as they often contain viruses.</p>
          <h3>App Permissions</h3>
          <p>When you install an app, it requests permission to access parts of your phone (like Camera, Contacts, SMS, Location). Always ask yourself: Does a Calculator app really need access to my Contacts? If not, deny permission.</p>
          <h3>Device Updates</h3>
          <p>Regularly update your smartphone's operating system and applications. These updates contain critical security patches that protect you from hackers.</p>
          <h3>Screen Lock</h3>
          <p>Always secure your phone using a strong PIN, Pattern, Password, or Fingerprint/Face lock. This prevents unauthorized access if your phone is lost or stolen.</p>
        `
      },
      govServices: {
        title: "Government Digital Services",
        short: "Navigate official government portals, access digital documents, and perform secure logins.",
        desc: `
          <h3>Official Portals</h3>
          <p>Many government services are available online, including booking railway tickets (IRCTC), applying for passports, managing taxes, or verifying Aadhaar. Official Indian government websites end in <code>.gov.in</code> or <code>.nic.in</code>.</p>
          <h3>Digital Documents</h3>
          <p>Services like DigiLocker allow you to store and access official digital copies of documents (such as Driving Licenses, Aadhaar, marksheets) on your phone. These are legally recognized on par with physical documents.</p>
          <h3>Safe Login Practices</h3>
          <p>Always register your correct mobile number and email ID with government accounts. Logins are usually secured by a password and a One-Time Password (OTP) sent to your registered phone number.</p>
        `
      }
    },

    // Cyber Safety Section
    safetyHeader: "Stay Safe Online",
    safetySub: "Learn about the most common online threats, identify red flags, and understand what to do and what to avoid.",
    safetyTopics: {
      phishing: {
        title: "Phishing",
        what: "Phishing is a cyber attack where scammers send fake emails, SMS, or direct messages that look like they come from trusted organizations (banks, companies) to steal your username, password, or bank details.",
        signs: "Urgent language demanding immediate action, threats of account suspension, links to unfamiliar websites, spelling mistakes.",
        do: "Check the sender's actual email address. Verify the request through the official website or customer care number of the company.",
        dont: "Never click on links or download attachments in unexpected emails or messages claiming you need to log in to fix a problem."
      },
      fakeWebsites: {
        title: "Fake Websites",
        what: "Scammers create websites that look exactly like popular shopping sites, government portals, or bank login pages to capture your passwords or credit card details.",
        signs: "Unusual domain name (e.g., paytn.com instead of paytm.com), no secure padlock symbol, lack of 'https://' in the URL, spelling errors, grammatical mistakes.",
        do: "Type website addresses manually instead of clicking search results or chat links. Use official bookmarks for frequent sites.",
        dont: "Never input credit card credentials, passwords, or personal details on websites that have spelling errors or use 'http://' without the 's'."
      },
      scams: {
        title: "Online Scams",
        what: "Fraudulent schemes designed to trick you out of your hard-earned money. These include lottery wins, fake job offers, investment schemes promising double returns, or fake customer service helpline frauds.",
        signs: "Promises of easy/free money, jobs requiring you to pay upfront fees, requests to download remote screen-sharing apps like AnyDesk/TeamViewer.",
        do: "Report the fraud immediately to the cyber helpline (1930) or cybercrime.gov.in. Be highly skeptical of anyone offering free money.",
        dont: "Do not send money or processing fees to claim prizes, do not install any remote access apps suggested by unknown callers."
      },
      passwords: {
        title: "Strong Passwords",
        what: "Your first line of defense against cybercriminals. Hackers use automated programs to guess simple passwords in seconds.",
        signs: "Short passwords, passwords using common words (like 'password123'), passwords based on easily searchable information (your name, birthday, phone number).",
        do: "Use a mix of uppercase and lowercase letters, numbers, and special symbols (e.g., @, #, $). Keep passwords at least 12 characters long.",
        dont: "Do not use the same password for multiple accounts. Never write passwords on a notepad near your computer or share them with friends."
      },
      otp: {
        title: "OTP Safety",
        what: "A One-Time Password (OTP) is a security code sent to your phone to verify transaction or login authenticity. It is highly sensitive.",
        signs: "Callers pretending to be bank staff, telecom agents, or government workers asking you to read out a code that just arrived on your mobile.",
        do: "Read the full OTP message text. It usually states: 'Do not share this with anyone. OTP for transaction of Rs. X is...'. Make sure you requested it.",
        dont: "Never share an OTP with anyone under any circumstances. No legitimate bank employee or official will ever ask you for an OTP."
      },
      upi: {
        title: "UPI Fraud",
        what: "Scammers attempt to trick users into sending money using payment apps through fake collect requests, QR codes, or caller scams.",
        signs: "Receiving a UPI request to 'Receive Money' that prompts you to enter your UPI PIN. Callers claiming you won a lottery and need to enter PIN to claim it.",
        do: "Verify the receiver's name on your screen before typing your PIN. Remember: PIN is required ONLY to send money, NEVER to receive money.",
        dont: "Never enter your UPI PIN on a screen showing 'Receive Money' or 'Collect Request'. Never scan a QR code if you are expecting to receive funds."
      },
      socialMedia: {
        title: "Social Media Safety",
        what: "Ensuring your safety on platforms like Facebook, WhatsApp, Instagram, and YouTube. Protecting yourself from identity theft and cyberbullying.",
        signs: "Requests for money from friends whose profiles were recently cloned, strange messages containing links from friends, cyberbullying comments.",
        do: "Set your accounts to 'Private'. Be selective about who you add as a friend. Enable two-factor authentication (2FA) on your accounts.",
        dont: "Do not share sensitive details like your home address, daily routine, travel plans, or photos of boarding passes/identity cards publicly."
      },
      privacy: {
        title: "Privacy Protection",
        what: "Controlling how your personal data (name, email, phone, location, photos) is collected, stored, and shared online.",
        signs: "Websites requesting unnecessary personal information, apps asking for location access when it's not required to perform their functions.",
        do: "Regularly check the security and privacy settings on your browser and smartphone. Decline cookies on non-essential web pages.",
        dont: "Do not log in to random websites using your main Google or Facebook account unless you trust the website completely."
      }
    },
    safetyLabels: {
      what: "What it is:",
      signs: "Warning Signs:",
      do: "What to DO:",
      dont: "What NOT to DO:"
    },

    // URL Safety Checker
    urlCheckerTitle: "Check a Website URL",
    urlCheckerLabel: "Enter a URL to evaluate its safety risk:",
    urlCheckerPlaceholder: "e.g., https://example.com",
    btnCheckUrl: "Check URL",
    urlDisclaimer: "<strong>Disclaimer:</strong> This is an educational awareness tool based on client-side heuristic rules. It does not replace professional security software. It cannot guarantee absolute safety.",
    urlRiskLow: "Low Risk",
    urlRiskMedium: "Medium Risk",
    urlRiskHigh: "High Risk",
    urlResultTitle: "Risk Evaluation Result:",
    urlReasonsTitle: "Analysis Findings:",
    urlReasonsSafe: "No suspicious indicators detected. Appears safe, but always verify details.",
    urlReasonNoHttps: "No HTTPS (connection is unencrypted, exposing details).",
    urlReasonIpAddress: "Uses an IP address instead of a domain name (highly suspicious).",
    urlReasonAtSymbol: "Contains '@' symbol (often used to redirect to fake servers).",
    urlReasonTooLong: "URL is extremely long (potentially masking fake subdomains).",
    urlReasonScamKeywords: "Contains suspicious keywords associated with scams (e.g., free, login, secure, update, gift).",
    urlReasonExcessiveSubdomains: "Too many subdomains (often used to mimic official portals).",

    // Phishing Message Detector
    phishDetectorTitle: "Is This Message Safe?",
    phishDetectorLabel: "Paste a suspicious message (SMS, Email, Chat) to evaluate it:",
    phishDetectorPlaceholder: "e.g., Congratulations! You won a lottery of 1 Crore. Call this number to claim now. Send OTP...",
    btnCheckMessage: "Check Message",
    phishDisclaimer: "<strong>Disclaimer:</strong> This detector is an educational tool analyzing keyword patterns. It is not an absolute authority and may miss sophisticated scams.",
    phishScoreLabel: "Risk Score:",
    phishRiskLevelLabel: "Risk Level:",
    phishSignsTitle: "Detected Warning Signs:",
    phishNoSigns: "No common phishing indicators detected. However, exercise caution if sender is unknown.",
    phishSignUrgency: "Urgency/Threat: Demands immediate action or threatens account block.",
    phishSignFinancial: "Financial Bait: Mentions lottery, prizes, cash rewards, or loans.",
    phishSignOtpPin: "Credential Request: Directly requests OTP, PIN, password, or card numbers.",
    phishSignLink: "Contains suspicious hyperlinks or short-links.",
    phishSignBank: "Impersonates bank operations or account changes.",

    // Quiz Section
    quizTitle: "Interactive Cyber Safety Quiz",
    quizProgress: "Question",
    quizScore: "Your Score:",
    quizFeedbackExcellent: "Excellent! You have a solid understanding of digital safety and cybersecurity.",
    quizFeedbackGood: "Good job! You know the basics, but reviewing the warning signs can keep you safer.",
    quizFeedbackPoor: "Keep Learning! Digital safety is crucial. Re-read the modules and try again.",
    quizExplanationsHeader: "Question Explanations:",
    quizExplanationLabel: "Explanation:",

    // Digital Safety Tips Cards
    tipsTitle: "Quick Digital Safety Tips",
    tipsList: [
      { title: "Never Share OTP", desc: "One-Time Passwords are key to your money. Banks or companies will never ask for them." },
      { title: "UPI PIN is for Sending", desc: "You only enter your UPI PIN to transfer money. You never need a PIN to receive money." },
      { title: "Use Strong Passwords", desc: "Create long passwords using symbols, numbers, and uppercase characters. Avoid birthdays." },
      { title: "Enable Two-Factor (2FA)", desc: "Add an extra verification layer to your email and social accounts for safety." },
      { title: "Verify Website URL", desc: "Check if the site starts with https:// and the spelling matches the original brand." },
      { title: "Avoid Unknown APKs", desc: "Only install apps from Google Play Store or Apple App Store. Ignore direct download links." },
      { title: "Review App Permissions", desc: "Only give permissions that are absolutely necessary for the app to function." },
      { title: "Report Scams to 1930", desc: "If you lose money to cyber scams, immediately dial the National Helpline 1930." }
    ],

    // Emergency Scam Guidance
    emergencyTitle: "Received a Suspicious Message? Follow These Steps",
    emergencySteps: [
      { step: "1", title: "STOP", text: "Do not act in a rush, even if the message threatens urgent action or bank block." },
      { step: "2", title: "DO NOT CLICK", text: "Do not click on links, download attachments, or call numbers given in the message." },
      { step: "3", title: "SECURE SECRETS", text: "Do not share OTP, UPI PIN, ATM PIN, passwords, or bank details under any condition." },
      { step: "4", title: "VERIFY SENDER", text: "Search the official customer service number of the bank/company manually and ask them." },
      { step: "5", title: "SCREENSHOT", text: "Take a screenshot of the suspicious message and sender number as evidence." },
      { step: "6", title: "REPORT SCAM", text: "Report to the cyber crime police helpline 1930 or online at cybercrime.gov.in." },
      { step: "7", title: "CONTACT BANK", text: "If you shared details or lost money, immediately call your bank to block your cards and accounts." }
    ],

    // About Section
    aboutTitle: "About the Project",
    aboutIntro: "This multilingual digital literacy platform is an educational CEP (Community Engagement Project) initiative designed to make digital knowledge simpler and safer for everyone, especially beginners.",
    aboutObjectiveTitle: "Project Objective",
    aboutObjectiveText: "To empower non-technical citizens with basic computing skills, smart safety habits, and risk analysis tools in their native languages to defend against daily cyber threats.",
    aboutFeaturesTitle: "Key Features",
    aboutFeaturesText: "Interactive multi-language selector, core computing/internet courses, emergency scam guidelines, heuristic web URL risk checker, phishing message score detector, and a progress tracker.",
    aboutFutureTitle: "Future Scope",
    aboutFutureText: "Future iterations will expand to include voice-based screen readers, offline usage support, artificial-intelligence based scam voice analyzers, and support for additional Indian languages.",

    // Footer
    footerTitle: "Multilingual Digital Literacy Content Development",
    footerSubtitle: "Developed as a College CEP Project.",
    footerDevLabel: "Developer Details",

    // Quiz Questions Data (15 items)
    quizQuestions: [
      {
        q: "A text message claims your bank account will be blocked unless you update details via a link immediately. What should you do?",
        options: [
          "Click the link and fill in details to avoid blocking.",
          "Ignore and delete the message; call the bank's official number to verify.",
          "Forward the message to all contacts in your phone.",
          "Reply to the message with your name and account number."
        ],
        answer: 1,
        explanation: "Banks never send SMS links threatening immediate blocking. These are phishing scams to steal credentials. Always contact official support."
      },
      {
        q: "When receiving money through UPI, which of the following is true?",
        options: [
          "You must enter your UPI PIN to claim the money.",
          "You must scan a QR code to receive the money.",
          "You do NOT need to enter your UPI PIN to receive money.",
          "You must share your login password with the sender."
        ],
        answer: 2,
        explanation: "UPI PIN is only required to send or transfer money out of your account. You NEVER need to enter your PIN or scan a code to receive money."
      },
      {
        q: "Which of the following is the most secure password?",
        options: [
          "YourName123",
          "12345678",
          "Tr%8#Km_9qZp",
          "password"
        ],
        answer: 2,
        explanation: "A strong password is long (12+ characters) and mixes uppercase, lowercase, numbers, and special symbols, making it hard for software to guess."
      },
      {
        q: "A caller claims to be from your bank and asks for the OTP sent to your phone to activate a benefit. What should you do?",
        options: [
          "Share it quickly so the benefit does not expire.",
          "Refuse to share and hang up; banks never ask for OTPs over calls.",
          "Tell them only half of the OTP digits.",
          "Ask them to confirm your PIN first before sharing OTP."
        ],
        answer: 1,
        explanation: "OTPs are highly confidential. No bank employee or trusted merchant will ever ask you to read out an OTP."
      },
      {
        q: "How can you tell if a website connection is encrypted/secure?",
        options: [
          "The website has a bright colorful design.",
          "The URL starts with 'https://' and has a padlock icon.",
          "The website opens very fast.",
          "The website has no advertisements."
        ],
        answer: 1,
        explanation: "'https://' (Hypertext Transfer Protocol Secure) and the padlock icon indicate that data sent between your browser and the server is encrypted."
      },
      {
        q: "You want to download a new application on your Android phone. Where should you download it from?",
        options: [
          "A download link sent by an unknown person on WhatsApp.",
          "Google Play Store.",
          "A random website offering the app for free.",
          "A third-party file sharing forum."
        ],
        answer: 1,
        explanation: "Download apps only from official stores like Google Play Store or Apple App Store. Third-party APKs can contain dangerous spyware."
      },
      {
        q: "A flashlight app prompts you for access to your Contacts, SMS, and Microphone. What is the best action?",
        options: [
          "Allow all permissions because apps need them to work.",
          "Deny permissions since a flashlight app does not need this private data.",
          "Allow contacts but deny SMS.",
          "Uninstall the phone software."
        ],
        answer: 1,
        explanation: "Be suspicious of apps requesting permissions that do not align with their actual features. Deny suspicious permissions."
      },
      {
        q: "What does the official website address of an Indian government organization typically end with?",
        options: [
          ".com or .org",
          ".gov.in or .nic.in",
          ".net or .info",
          ".co.in or .live"
        ],
        answer: 1,
        explanation: "Official Indian government websites always use specific domains ending in .gov.in or .nic.in."
      },
      {
        q: "If you lose money due to a cyber fraud or UPI scam, what is the official national helpline number to call?",
        options: [
          "100",
          "1930",
          "1091",
          "1800"
        ],
        answer: 1,
        explanation: "1930 is the official National Cyber Crime Helpline number set by the Government of India for reporting financial cyber fraud."
      },
      {
        q: "A friend messages you on social media asking for money due to an emergency. What should you do first?",
        options: [
          "Transfer the money immediately to help them.",
          "Ignore them completely and report their account.",
          "Call your friend directly on their known phone number to verify.",
          "Ask for their bank card photos."
        ],
        answer: 2,
        explanation: "Social media profiles are frequently cloned or hacked. Always call the person directly on a trusted line to verify before sending money."
      },
      {
        q: "Why is it risky to use free public Wi-Fi at airports or cafes to do net banking?",
        options: [
          "Public Wi-Fi is very slow.",
          "Hackers can intercept data transmitted over unencrypted public networks.",
          "Public Wi-Fi is expensive.",
          "The website will not load."
        ],
        answer: 1,
        explanation: "Public Wi-Fi networks are often unsecured. Hackers can monitor traffic and steal login credentials. Use mobile data or VPNs instead."
      },
      {
        q: "What does 'Two-Factor Authentication' (2FA) do?",
        options: [
          "It forces you to create two separate accounts.",
          "It adds an extra verification check (like an OTP or app alert) besides your password.",
          "It makes your internet run twice as fast.",
          "It locks you out of your account permanently."
        ],
        answer: 1,
        explanation: "2FA ensures that even if someone guesses your password, they cannot access your account without the second verification factor (like your phone)."
      },
      {
        q: "You receive an email claiming you won a lottery of $1,000,000 but must pay a $100 processing fee. What is this?",
        options: [
          "An authentic promotion opportunity.",
          "An advance-fee scam designed to steal your processing fee.",
          "A tax refund program from the government.",
          "A customer loyalty program."
        ],
        answer: 1,
        explanation: "Any program asking you to pay money to receive a larger prize is a scam. Never pay upfront fees for prizes or lottery claims."
      },
      {
        q: "A screen sharing app (like AnyDesk or TeamViewer) allows callers to do what?",
        options: [
          "Improve your phone's network connection speed.",
          "View your screen and fully control your device remotely.",
          "Clear temporary cache memory files.",
          "Increase the battery life of your smartphone."
        ],
        answer: 1,
        explanation: "Screen sharing apps let others see everything on your screen, including passwords and banking details. Scammers use this to steal money."
      },
      {
        q: "How often should you check and install software updates on your device?",
        options: [
          "Never, updates just slow down the phone.",
          "Only when the phone stops working completely.",
          "Regularly, as updates fix critical security loopholes.",
          "Once every five years."
        ],
        answer: 2,
        explanation: "Software and operating system updates include security patches that fix vulnerabilities before hackers can exploit them. Keep devices updated."
      }
    ]
  },
  hi: {
    // Navigation
    logoTitle: "डिजिटल साक्षरता",
    navHome: "मुख्य पृष्ठ",
    navLearn: "सीखें",
    navSafety: "सुरक्षा",
    navQuiz: "क्विज",
    navAbout: "हमारे बारे में",
    accessibilityLabel: "अक्षर आकार:",
    darkModeLabel: "डार्क मोड",

    // Hero Section
    heroTitle: "बहुभाषी डिजिटल साक्षरता",
    heroSubtitle: "डिजिटल कौशल सीखें। ऑनलाइन सुरक्षित रहें। अपनी भाषा में सीखें।",
    btnStartLearning: "सीखना शुरू करें",
    btnTakeQuiz: "क्विज खेलें",

    // Search & Progress Section
    searchPlaceholder: "डिजिटल साक्षरता विषयों को खोजें (जैसे: UPI, फ़िशिंग, पासवर्ड...)",
    searchTitle: "विषय खोजें",
    progressLabel: "आपकी सीखने की प्रगति",
    progressCompleted: "पूर्ण किए गए विषय:",
    btnResetProgress: "प्रगति रीसेट करें",
    markCompleted: "पूर्ण चिह्नित करें",
    markUncompleted: "अपूर्ण चिह्नित करें",

    // Common Buttons
    btnLearnMore: "और जानें",
    btnClose: "बंद करें",
    btnNext: "आगे",
    btnPrev: "पीछे",
    btnRestartQuiz: "क्विज फिर से शुरू करें",
    btnSubmitQuiz: "क्विज सबमिट करें",

    // Learning section headers
    learnHeader: "डिजिटल कौशल सीखें",
    learnSub: "कंप्यूटर, इंटरनेट, ईमेल, डिजिटल भुगतान, स्मार्टफोन और सरकारी सेवाओं की बुनियादी बातें सीखें।",

    // Learning topics detailed content
    topics: {
      computer: {
        title: "कंप्यूटर की बुनियादी बातें",
        short: "समझें कि कंप्यूटर क्या है, कीबोर्ड और माउस का उपयोग, फ़ाइलें, फ़ोल्डर और बुनियादी सॉफ़्टवेयर।",
        desc: `
          <h3>कंप्यूटर क्या है?</h3>
          <p>कंप्यूटर एक इलेक्ट्रॉनिक उपकरण है जो जानकारी या डेटा को प्रोसेस करता है। इसमें डेटा को स्टोर करने, पुनः प्राप्त करने और प्रोसेस करने की क्षमता होती है। आप कंप्यूटर का उपयोग दस्तावेज़ टाइप करने, ईमेल भेजने, गेम खेलने और वेब ब्राउज़ करने के लिए कर सकते हैं।</p>
          <h3>कीबोर्ड और माउस</h3>
          <p>कीबोर्ड का उपयोग टेक्स्ट और कमांड दर्ज करने के लिए किया जाता है, जबकि माउस एक पॉइंटिंग डिवाइस है जिसका उपयोग स्क्रीन पर नेविगेट करने और ऑब्जेक्ट्स पर क्लिक करने के लिए किया जाता है। क्लिक, डबल-क्लिक और राइट-क्लिक सीखना आवश्यक है।</p>
          <h3>फ़ाइलें और फ़ोल्डर</h3>
          <p>कंप्यूटर पर सभी डेटा को "फ़ाइलों" (जैसे दस्तावेज़, चित्र, गाने) के रूप में सहेजा जाता है। फ़ोल्डर का उपयोग इन फ़ाइलों को व्यवस्थित करने के लिए किया जाता है, जैसे अलमारी में दराज। आप फ़ाइलें और फ़ोल्डर बना सकते हैं, नाम बदल सकते हैं, कॉपी कर सकते हैं और हटा सकते हैं।</p>
          <h3>बुनियादी ऐप्स</h3>
          <p>एप्लिकेशन (या ऐप्स/सॉफ़्टवेयर) ऐसे प्रोग्राम हैं जो आपको काम करने की अनुमति देते हैं। उदाहरणों में टाइपिंग के लिए नोटपैड/वर्ड, ड्राइंग के लिए पेंट और कैलकुलेटर शामिल हैं।</p>
        `
      },
      internet: {
        title: "इंटरनेट की बुनियादी बातें",
        short: "वर्ल्ड वाइड वेब, ब्राउज़र का उपयोग, सर्च इंजन, यूआरएल और सुरक्षित वेबसाइटों की पहचान करना सीखें।",
        desc: `
          <h3>इंटरनेट क्या है?</h3>
          <p>इंटरनेट अरबों कंप्यूटरों को जोड़ने वाला एक वैश्विक नेटवर्क है। यह लोगों को दुनिया में कहीं से भी जानकारी साझा करने और संवाद करने की अनुमति देता है।</p>
          <h3>वेब ब्राउज़र</h3>
          <p>वेब ब्राउज़र (जैसे गूगल क्रोम, माइक्रोसॉफ्ट एज, मोज़िला फ़ायरफ़ॉक्स) एक सॉफ़्टवेयर एप्लिकेशन है जिसका उपयोग इंटरनेट पर वेबसाइटों को देखने के लिए किया जाता है।</p>
          <h3>सर्च इंजन</h3>
          <p>सर्च इंजन (जैसे गूगल, बिंग) आपको इंटरनेट पर विशिष्ट जानकारी खोजने में मदद करते हैं। आप कीवर्ड या प्रश्न टाइप करते हैं, और सर्च इंजन उससे मेल खाने वाले वेब पेजों को दिखाता है।</p>
          <h3>वेबसाइट और यूआरएल (URL)</h3>
          <p>एक वेबसाइट संबंधित वेब पेजों का एक संग्रह है। यूआरएल (URL) किसी वेब पेज का अनूठा पता होता है (जैसे, <code>https://www.wikipedia.org</code>)। संवेदनशील जानकारी दर्ज करने से पहले हमेशा यूआरएल की जांच करें।</p>
        `
      },
      email: {
        title: "ईमेल की बुनियादी बातें",
        short: "ईमेल खाता बनाना, ईमेल लिखना और भेजना, अटैचमेंट का उपयोग करना और सुरक्षित रहना सीखें।",
        desc: `
          <h3>ईमेल क्या है?</h3>
          <p>इलेक्ट्रॉनिक मेल (ईमेल) डिजिटल उपकरणों का उपयोग करके लोगों के बीच संदेशों के आदान-प्रदान की एक विधि है। यह तेज़, सस्ता है और दस्तावेज़ और चित्र ले जा सकता है।</p>
          <h3>ईमेल बनाना और भेजना</h3>
          <p>ईमेल का उपयोग करने के लिए, आप किसी प्रदाता (जैसे जीमेल, आउटलुक) के साथ साइन अप करते हैं। आप प्राप्तकर्ता का पता (जैसे, <code>user@example.com</code>), एक विषय पंक्ति (Subject) और मुख्य संदेश लिखकर संदेश भेजते हैं।</p>
          <h3>अटैचमेंट (संलग्नक)</h3>
          <p>आप अपने ईमेल के साथ फ़ाइलें (फोटो, दस्तावेज़, पीडीएफ) भेज सकते हैं। इसे अटैचमेंट कहते हैं। सावधान रहें: केवल विश्वसनीय प्रेषकों के अटैचमेंट ही खोलें, क्योंकि उनमें वायरस हो सकते हैं।</p>
          <h3>ईमेल सुरक्षा</h3>
          <p>अपना पासवर्ड कभी किसी से साझा न करें। तत्काल व्यक्तिगत या बैंकिंग विवरण मांगने वाले ईमेल से सावधान रहें—वैध कंपनियां कभी भी ईमेल के माध्यम से संवेदनशील जानकारी नहीं मांगती हैं।</p>
        `
      },
      payments: {
        title: "डिजिटल भुगतान",
        short: "UPI भुगतान, सुरक्षित रूप से QR कोड स्कैन करना, नेट बैंकिंग और आवश्यक वित्तीय सुरक्षा नियमों को जानें।",
        desc: `
          <h3>यूनिफाइड पेमेंट्स इंटरफेस (UPI)</h3>
          <p>UPI आपको मोबाइल ऐप (जैसे BHIM, गूगल पे, फोनपे, पेटीएम) का उपयोग करके बैंक खातों के बीच तुरंत पैसे ट्रांसफर करने की अनुमति देता है। यह एक अनूठे UPI आईडी और एक सुरक्षित 4 या 6-अंकीय UPI पिन का उपयोग करता है।</p>
          <h3>क्यूआर (QR) कोड</h3>
          <p>क्यूआर (QR) कोड चौकोर आकार के बारकोड होते हैं। दुकानदारों को भुगतान करने के लिए आप उन्हें मोबाइल कैमरे से स्कैन करते हैं। <strong>महत्वपूर्ण नियम: आप केवल पैसे भेजने/भुगतान करने के लिए क्यूआर कोड स्कैन करते हैं, पैसे प्राप्त करने के लिए कभी नहीं।</strong></p>
          <h3>ऑनलाइन बैंकिंग</h3>
          <p>नेट बैंकिंग और मोबाइल बैंकिंग आपको बैंक की सुरक्षित वेबसाइट या ऐप के माध्यम से अपने बैंक खातों को प्रबंधित करने देती है। हमेशा बैंक की वेबसाइट को मैन्युअल रूप से टाइप करें और <code>https://</code> अवश्य देखें।</p>
          <h3>भुगतान सावधानियां</h3>
          <p>अपना UPI पिन गुप्त रखें। इसे कभी किसी के साथ साझा न करें, यहां तक कि बैंक कर्मचारियों के साथ भी नहीं। अपने खाते की गतिविधियों पर नज़र रखने के लिए एसएमएस अलर्ट चालू रखें।</p>
        `
      },
      smartphone: {
        title: "स्मार्टफोन साक्षरता",
        short: "ऐप स्टोर का उपयोग, ऐप अनुमतियों (Permissions) को समझना, सिस्टम अपडेट और फोन लॉक सुरक्षा।",
        desc: `
          <h3>आधिकारिक ऐप स्टोर</h3>
          <p>केवल आधिकारिक स्टोर से ऐप्स डाउनलोड करें: गूगल प्ले स्टोर (एंड्रॉइड) या एप्पल ऐप स्टोर (iOS)। अज्ञात वेबसाइटों से एपीके (APK) फाइलें डाउनलोड करने से बचें, क्योंकि उनमें वायरस हो सकते हैं।</p>
          <h3>ऐप अनुमतियाँ (Permissions)</h3>
          <p>जब आप कोई ऐप इंस्टॉल करते हैं, तो वह आपके फोन के हिस्सों (जैसे कैमरा, संपर्क, एसएमएस, स्थान) तक पहुंच की अनुमति मांगता है। हमेशा खुद से पूछें: क्या एक कैलकुलेटर ऐप को संपर्कों (Contacts) तक पहुंच की आवश्यकता है? यदि नहीं, तो अनुमति न दें।</p>
          <h3>स्मार्टफोन अपडेट</h3>
          <p>अपने स्मार्टफोन के ऑपरेटिंग सिस्टम और एप्लिकेशन को नियमित रूप से अपडेट करें। इन अपडेट में महत्वपूर्ण सुरक्षा पैच होते हैं जो आपको हैकर्स से बचाते हैं।</p>
          <h3>स्क्रीन लॉक</h3>
          <p>हमेशा एक मजबूत पिन, पैटर्न, पासवर्ड या फिंगरप्रिंट/फेस लॉक का उपयोग करके अपने फोन को सुरक्षित रखें। यदि आपका फोन खो जाता है या चोरी हो जाता है, तो यह अनधिकृत पहुंच को रोकता है।</p>
        `
      },
      govServices: {
        title: "सरकारी डिजिटल सेवाएं",
        short: "सरकारी पोर्टलों पर सुरक्षित लॉगिन करना, डिजिटल दस्तावेज (जैसे डिजिलॉकर) डाउनलोड करना सीखें।",
        desc: `
          <h3>आधिकारिक सरकारी पोर्टल</h3>
          <p>कई सरकारी सेवाएं ऑनलाइन उपलब्ध हैं, जैसे कि रेलवे टिकट बुक करना (IRCTC), पासपोर्ट के लिए आवेदन करना, टैक्स जमा करना या आधार का सत्यापन करना। आधिकारिक भारतीय सरकारी वेबसाइटें हमेशा <code>.gov.in</code> या <code>.nic.in</code> पर समाप्त होती हैं।</p>
          <h3>डिजिटल दस्तावेज़ (DigiLocker)</h3>
          <p>डिजिलॉकर जैसी सेवाएं आपको अपने फोन पर दस्तावेजों (जैसे ड्राइविंग लाइसेंस, आधार, मार्कशीट) की डिजिटल प्रतियां सहेजने की अनुमति देती हैं। इन्हें कानूनी रूप से भौतिक दस्तावेजों के समान मान्यता प्राप्त है।</p>
          <h3>सुरक्षित लॉगिन आदतें</h3>
          <p>हमेशा सरकारी खातों के साथ अपना सही मोबाइल नंबर और ईमेल आईडी पंजीकृत करें। लॉगिन आमतौर पर आपके पंजीकृत फोन नंबर पर भेजे गए पासवर्ड और वन-टाइम पासवर्ड (OTP) द्वारा सुरक्षित होते हैं।</p>
        `
      }
    },

    // Cyber Safety Section
    safetyHeader: "ऑनलाइन सुरक्षित रहें",
    safetySub: "सबसे आम ऑनलाइन खतरों के बारे में जानें, उनके चेतावनी संकेतों को पहचानें और जानें कि क्या करना चाहिए और क्या नहीं।",
    safetyTopics: {
      phishing: {
        title: "फ़िशिंग (Phishing)",
        what: "फ़िशिंग एक साइबर हमला है जहां स्कैमर ऐसे नकली ईमेल, एसएमएस या संदेश भेजते हैं जो वैध संगठनों (जैसे बैंक) से आते हुए दिखते हैं, ताकि आपके पासवर्ड या बैंक विवरण चुराए जा सकें।",
        signs: "तुरंत कार्रवाई की मांग करने वाली भाषा, खाता बंद होने की धमकी, अज्ञात वेबसाइटों के लिंक, वर्तनी (स्पेलिंग) की गलतियाँ।",
        do: "प्रेषक के वास्तविक ईमेल पते की जांच करें। कंपनी की आधिकारिक वेबसाइट या कस्टमर केयर नंबर के माध्यम से अनुरोध की पुष्टि करें।",
        dont: "कभी भी ऐसे अप्रत्याशित ईमेल या संदेशों में दिए गए लिंक पर क्लिक न करें या फाइलें डाउनलोड न करें जो दावा करते हैं कि खाता ठीक करने के लिए लॉगिन करें।"
      },
      fakeWebsites: {
        title: "नकली वेबसाइटें",
        what: "स्कैमर ऐसी वेबसाइटें बनाते हैं जो आपकी संवेदनशील जानकारी चुराने के लिए लोकप्रिय शॉपिंग साइटों, सरकारी पोर्टलों या बैंक लॉगिन पेजों की हुबहू नकल होती हैं।",
        signs: "असामान्य डोमेन नाम (जैसे, paytm.com की जगह paytn.com), कोई सुरक्षा लॉक प्रतीक न होना, यूआरएल में 'https://' न होना, गलत वर्तनी।",
        do: "सर्च परिणामों या चैट लिंक पर क्लिक करने के बजाय वेबसाइट का पता मैन्युअल रूप से टाइप करें। महत्वपूर्ण साइटों को बुकमार्क करें।",
        dont: "गलत स्पेलिंग वाली या 'http://' (बिना 's' के) वाली वेबसाइटों पर कभी भी अपना पासवर्ड, पिन या व्यक्तिगत विवरण दर्ज न करें।"
      },
      scams: {
        title: "ऑनलाइन धोखाधड़ी (Scams)",
        what: "लोगों को धोखा देकर पैसे ऐंठने की योजनाएं। इनमें लॉटरी जीतना, नकली नौकरी के प्रस्ताव, निवेश पर डबल रिटर्न का वादा, या नकली कस्टमर केयर धोखाधड़ी शामिल हैं।",
        signs: "मुफ्त या आसान पैसे का वादा, नौकरी के लिए अग्रिम शुल्क की मांग, एनीडेस्क (AnyDesk) या टीमव्यूअर (TeamViewer) जैसे रिमोट स्क्रीन-शेयरिंग ऐप डाउनलोड करने का दबाव।",
        do: "धोखाधड़ी की तुरंत रिपोर्ट साइबर हेल्पलाइन (1930) या cybercrime.gov.in पर करें। मुफ्त पैसे के ऑफर्स से सावधान रहें।",
        dont: "इनाम का दावा करने के लिए कभी भी पैसे न भेजें, अज्ञात कॉलर्स के कहने पर कोई भी रिमोट स्क्रीन-शेयरिंग ऐप इंस्टॉल न करें।"
      },
      passwords: {
        title: "मजबूत पासवर्ड",
        what: "साइबर अपराधियों से सुरक्षा की आपकी पहली दीवार। हैकर आसान पासवर्ड का अनुमान कुछ ही सेकंड में लगा सकते हैं।",
        signs: "छोटे पासवर्ड, सामान्य शब्द (जैसे 'password123'), आसानी से मिलने वाली जानकारी पर आधारित पासवर्ड (आपका नाम, जन्मदिन, फोन नंबर)।",
        do: "अक्षरों (बड़े और छोटे), संख्याओं और विशेष प्रतीकों (जैसे @, #, $) के मिश्रण का उपयोग करें। पासवर्ड कम से कम 12 वर्णों का रखें।",
        dont: "अलग-अलग खातों के लिए एक ही पासवर्ड का उपयोग न करें। पासवर्ड को कंप्यूटर के पास किसी डायरी में लिखकर न रखें।"
      },
      otp: {
        title: "ओटीपी (OTP) सुरक्षा",
        what: "वन-टाइम पासवर्ड (OTP) एक सुरक्षा कोड है जो आपके फोन पर लेन-देन या लॉगिन की सत्यता की पुष्टि करने के लिए भेजा जाता है। यह अत्यंत संवेदनशील है।",
        signs: "बैंक कर्मचारी, टेलीकॉम एजेंट या सरकारी अधिकारी बनकर कॉल करने वाले और आपके फोन पर आए कोड को पूछने वाले लोग।",
        do: "ओटीपी संदेश का पूरा पाठ पढ़ें। यह आमतौर पर कहता है: 'इसे किसी के साथ साझा न करें।' सुनिश्चित करें कि आपने ही लेन-देन शुरू किया है।",
        dont: "किसी भी परिस्थिति में किसी के साथ ओटीपी साझा न करें। कोई भी वैध बैंक कर्मचारी या अधिकारी कभी भी आपसे ओटीपी नहीं मांगेगा।"
      },
      upi: {
        title: "UPI धोखाधड़ी",
        what: "स्कैमर भुगतान ऐप के माध्यम से नकली मनी कलेक्ट रिक्वेस्ट, क्यूआर कोड या कॉल स्कैम के ज़रिए उपयोगकर्ताओं से पैसे ठगने का प्रयास करते हैं।",
        signs: "पैसे प्राप्त करने ('Receive Money') के लिए यूपीआई पिन दर्ज करने का अनुरोध आना। कॉलर्स का यह दावा कि इनाम पाने के लिए पिन दर्ज करना होगा।",
        do: "पिन दर्ज करने से पहले स्क्रीन पर प्राप्तकर्ता का नाम सत्यापित करें। याद रखें: पिन की आवश्यकता केवल पैसे भेजने के लिए होती है, प्राप्त करने के लिए नहीं।",
        dont: "पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन दर्ज न करें। पैसे मिलने की उम्मीद में कभी भी क्यूआर कोड स्कैन न करें।"
      },
      socialMedia: {
        title: "सोशल मीडिया सुरक्षा",
        what: "फेसबुक, व्हाट्सएप, इंस्टाग्राम आदि प्लेटफॉर्म पर अपनी सुरक्षा सुनिश्चित करना। पहचान की चोरी (Identity Theft) और साइबर धमकी से बचना।",
        signs: "दोस्तों के नाम पर बने नए नकली खातों से पैसे की मांग आना, दोस्तों से अजीब लिंक वाले संदेश प्राप्त होना।",
        do: "अपने खातों को 'प्राइवेट' पर सेट करें। केवल परिचित लोगों को ही फ्रेंड लिस्ट में जोड़ें। अपने खातों पर टू-फैक्टर ऑथेंटिकेशन (2FA) सक्षम करें।",
        dont: "अपना घर का पता, दैनिक दिनचर्या, यात्रा योजनाएं, या आधार/पहचान पत्र की तस्वीरें सार्वजनिक रूप से साझा न करें।"
      },
      privacy: {
        title: "गोपनीयता संरक्षण",
        what: "यह नियंत्रित करना कि आपका व्यक्तिगत डेटा (नाम, फोन नंबर, स्थान, फोटो) ऑनलाइन कैसे एकत्र और साझा किया जाता है।",
        signs: "वेबसाइटों द्वारा अनावश्यक व्यक्तिगत जानकारी मांगना, बिना काम के ऐप द्वारा लोकेशन (स्थान) तक पहुंच की अनुमति मांगना।",
        do: "अपने ब्राउज़र और स्मार्टफोन पर सुरक्षा और गोपनीयता सेटिंग्स की नियमित जांच करें। अनावश्यक कुकीज़ को अस्वीकार करें।",
        dont: "जब तक आप पूरी तरह से भरोसा न करें, तब तक किसी भी यादृच्छिक वेबसाइट पर अपने मुख्य गूगल या फेसबुक खाते से लॉगिन न करें।"
      }
    },
    safetyLabels: {
      what: "यह क्या है:",
      signs: "चेतावनी संकेत:",
      do: "क्या करें:",
      dont: "क्या न करें:"
    },

    // URL Safety Checker
    urlCheckerTitle: "वेबसाइट यूआरएल (URL) की जांच करें",
    urlCheckerLabel: "सुरक्षा जोखिम का मूल्यांकन करने के लिए एक यूआरएल दर्ज करें:",
    urlCheckerPlaceholder: "जैसे, https://example.com",
    btnCheckUrl: "यूआरएल जांचें",
    urlDisclaimer: "<strong>अस्वीकरण:</strong> यह एक शैक्षणिक जागरूकता उपकरण है जो बुनियादी नियमों पर आधारित है। यह पेशेवर सुरक्षा सॉफ़्टवेयर का विकल्प नहीं है।",
    urlRiskLow: "कम जोखिम (Low Risk)",
    urlRiskMedium: "मध्यम जोखिम (Medium Risk)",
    urlRiskHigh: "उच्च जोखिम (High Risk)",
    urlResultTitle: "मूल्यांकन परिणाम:",
    urlReasonsTitle: "विश्लेषण के निष्कर्ष:",
    urlReasonsSafe: "कोई संदिग्ध संकेत नहीं मिले। सुरक्षित प्रतीत होता है, लेकिन हमेशा सावधानी बरतें।",
    urlReasonNoHttps: "HTTPS नहीं है (कनेक्शन सुरक्षित नहीं है, जिससे आपकी जानकारी लीक हो सकती है)।",
    urlReasonIpAddress: "डोमेन नाम के बजाय IP पते का उपयोग किया गया है (अत्यंत संदिग्ध)।",
    urlReasonAtSymbol: "यूआरएल में '@' का प्रतीक है (अक्सर नकली सर्वर पर रीडायरेक्ट करने के लिए उपयोग किया जाता है)।",
    urlReasonTooLong: "यूआरएल बहुत लंबा है (नकली सबडोमेन छिपाने के लिए हो सकता है)।",
    urlReasonScamKeywords: "धोखाधड़ी से जुड़े संदिग्ध कीवर्ड पाए गए हैं (जैसे: free, login, secure, update, gift)।",
    urlReasonExcessiveSubdomains: "बहुत अधिक सबडोमेन हैं (नकली वेबसाइटों द्वारा उपयोग किया जाता है)।",

    // Phishing Message Detector
    phishDetectorTitle: "क्या यह संदेश सुरक्षित है?",
    phishDetectorLabel: "मूल्यांकन के लिए एक संदिग्ध संदेश (SMS, ईमेल, चैट) पेस्ट करें:",
    phishDetectorPlaceholder: "जैसे: बधाई हो! आपने 1 करोड़ की लॉटरी जीती है। दावा करने के लिए तुरंत इस नंबर पर कॉल करें और अपना ओटीपी भेजें...",
    btnCheckMessage: "संदेश जांचें",
    phishDisclaimer: "<strong>अस्वीकरण:</strong> यह डिटेक्टर कीवर्ड पैटर्न का विश्लेषण करने वाला एक शैक्षणिक उपकरण है। यह 100% सटीक होने की गारंटी नहीं देता।",
    phishScoreLabel: "जोखिम स्कोर:",
    phishRiskLevelLabel: "जोखिम स्तर:",
    phishSignsTitle: "पाए गए चेतावनी संकेत:",
    phishNoSigns: "कोई सामान्य फ़िशिंग संकेत नहीं मिले। फिर भी, यदि भेजने वाला अज्ञात है तो सावधान रहें।",
    phishSignUrgency: "जल्दबाजी/धमकी: तुरंत कार्रवाई की मांग करना या खाता ब्लॉक करने की धमकी देना।",
    phishSignFinancial: "वित्तीय प्रलोभन: लॉटरी, पुरस्कार, नकद पुरस्कार या आसान लोन का उल्लेख।",
    phishSignOtpPin: "क्रेडेंशियल का अनुरोध: सीधे ओटीपी, यूपीआई पिन, पासवर्ड या कार्ड नंबर मांगना।",
    phishSignLink: "संदेश में संदिग्ध लिंक या शॉर्ट-लिंक्स होना।",
    phishSignBank: "बैंक संचालन या खाता परिवर्तन का दिखावा करना।",

    // Quiz Section
    quizTitle: "इंटरैक्टिव साइबर सुरक्षा क्विज",
    quizProgress: "प्रश्न",
    quizScore: "आपका स्कोर:",
    quizFeedbackExcellent: "शानदार! आपको डिजिटल सुरक्षा और साइबर सुरक्षा की बहुत अच्छी समझ है।",
    quizFeedbackGood: "अच्छा प्रयास! आप बुनियादी बातें जानते हैं, लेकिन थोड़ा और सतर्क रहना आपको सुरक्षित रखेगा।",
    quizFeedbackPoor: "सीखते रहें! डिजिटल सुरक्षा बहुत महत्वपूर्ण है। कृपया पाठों को फिर से पढ़ें और प्रयास करें।",
    quizExplanationsHeader: "प्रश्नों के सही उत्तर और स्पष्टीकरण:",
    quizExplanationLabel: "स्पष्टीकरण:",

    // Digital Safety Tips Cards
    tipsTitle: "त्वरित डिजिटल सुरक्षा सुझाव",
    tipsList: [
      { title: "OTP कभी साझा न करें", desc: "वन-टाइम पासवर्ड आपके खाते की चाबी है। बैंक या कंपनियां इसे कभी नहीं मांगतीं।" },
      { title: "UPI पिन भेजने के लिए है", desc: "आप केवल पैसे भेजने के लिए पिन दर्ज करते हैं। पैसे प्राप्त करने के लिए पिन की आवश्यकता नहीं होती।" },
      { title: "मजबूत पासवर्ड बनाएं", desc: "प्रतीकों, संख्याओं और बड़े अक्षरों का उपयोग करके लंबा पासवर्ड बनाएं। जन्मदिन के उपयोग से बचें।" },
      { title: "टू-फैक्टर (2FA) सक्षम करें", desc: "सुरक्षा के लिए अपने ईमेल और सोशल खातों में सत्यापन की एक अतिरिक्त परत जोड़ें।" },
      { title: "वेबसाइट यूआरएल जांचें", desc: "जांचें कि क्या साइट https:// से शुरू होती है और उसकी स्पेलिंग ब्रांड से मेल खाती है।" },
      { title: "अयांत्रिकी APK से बचें", desc: "ऐप्स केवल प्ले स्टोर या ऐप स्टोर से ही डाउनलोड करें। अज्ञात डाउनलोड लिंक से बचें।" },
      { title: "ऐप अनुमतियों की समीक्षा करें", desc: "ऐप को केवल उतनी ही अनुमति दें जितनी उसके काम करने के लिए आवश्यक हो।" },
      { title: "धोखाधड़ी की रिपोर्ट 1930 पर करें", desc: "यदि आप साइबर धोखाधड़ी का शिकार होते हैं, तो तुरंत राष्ट्रीय हेल्पलाइन 1930 पर कॉल करें।" }
    ],

    // Emergency Scam Guidance
    emergencyTitle: "संदिग्ध संदेश मिला? इन चरणों का पालन करें",
    emergencySteps: [
      { step: "1", title: "रुकें", text: "जल्दबाजी में कोई कदम न उठाएं, भले ही संदेश में खाता ब्लॉक करने की धमकी दी गई हो।" },
      { step: "2", title: "क्लिक न करें", text: "संदेश में दिए गए लिंक पर क्लिक न करें, न ही कोई फाइल डाउनलोड करें।" },
      { step: "3", title: "गोपनीयता बनाए रखें", text: "किसी भी हालत में ओटीपी, यूपीआई पिन, एटीएम पिन या पासवर्ड साझा न करें।" },
      { step: "4", title: "सत्यापन करें", text: "बैंक या कंपनी के आधिकारिक नंबर को खुद खोजें और उनसे संपर्क कर पुष्टि करें।" },
      { step: "5", title: "स्क्रीनशॉट लें", text: "संदिग्ध संदेश और भेजने वाले के नंबर का स्क्रीनशॉट प्रमाण के रूप में सुरक्षित रखें।" },
      { step: "6", title: "रिपोर्ट दर्ज करें", text: "साइबर हेल्पलाइन 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत दर्ज करें।" },
      { step: "7", title: "बैंक से संपर्क करें", text: "यदि आपने विवरण साझा कर दिया है, तो तुरंत अपने बैंक को कॉल कर कार्ड और खाते ब्लॉक करवाएं।" }
    ],

    // About Section
    aboutTitle: "परियोजना के बारे में",
    aboutIntro: "यह बहुभाषी डिजिटल साक्षरता मंच एक शैक्षणिक सीईपी (सामुदायिक जुड़ाव परियोजना) पहल है जिसे डिजिटल ज्ञान को सभी के लिए आसान और सुरक्षित बनाने के लिए डिज़ाइन किया गया है।",
    aboutObjectiveTitle: "परियोजना का उद्देश्य",
    aboutObjectiveText: "गैर-तकनीकी नागरिकों को उनकी मातृभाषा में बुनियादी कंप्यूटर कौशल और सुरक्षा आदतें सिखाना ताकि वे साइबर खतरों से खुद को सुरक्षित रख सकें।",
    aboutFeaturesTitle: "मुख्य विशेषताएं",
    aboutFeaturesText: "बहुभाषी चयनकर्ता, बुनियादी कंप्यूटर और इंटरनेट पाठ्यक्रम, आपातकालीन स्कैम गाइडलाइंस, यूआरएल रिस्क चेकर और संदेश डिटेक्टर।",
    aboutFutureTitle: "भावी संभावनाएं",
    aboutFutureText: "भविष्य में वॉयस-आधारित स्क्रीन रीडर, ऑफ़लाइन उपयोग समर्थन, एआई-आधारित स्कैम वॉयस एनालाइज़र और अन्य भारतीय भाषाओं को शामिल किया जाएगा।"
  ,
  mr: {
    // Navigation
    logoTitle: "डिजिटल साक्षरता",
    navHome: "मुख्य पृष्ठ",
    navLearn: "शिका",
    navSafety: "सुरक्षित रहा",
    navQuiz: "क्विझ",
    navAbout: "आमच्याबद्दल",
    accessibilityLabel: "अक्षर आकार:",
    darkModeLabel: "डार्क मोड",

    // Hero Section
    heroTitle: "बहुभाषिक डिजिटल साक्षरता",
    heroSubtitle: "डिजिटल कौशल्ये शिका. ऑनलाइन सुरक्षित रहा. आपल्या भाषेत शिका.",
    btnStartLearning: "शिकण्यास सुरुवात करा",
    btnTakeQuiz: "क्विझ खेळा",

    // Search & Progress Section
    searchPlaceholder: "डिजिटल साक्षरतेचे विषय शोधा (उदा. UPI, फिशिंग, पासवर्ड...)",
    searchTitle: "विषय शोधा",
    progressLabel: "तुमची शिकण्याची प्रगती",
    progressCompleted: "पूर्ण झालेले विषय:",
    btnResetProgress: "प्रगती रीसेट करा",
    markCompleted: "पूर्ण चिन्हांकित करा",
    markUncompleted: "अपूर्ण चिन्हांकित करा",

    // Common Buttons
    btnLearnMore: "अधिक जाणून घ्या",
    btnClose: "बंद करा",
    btnNext: "पुढे",
    btnPrev: "मागे",
    btnRestartQuiz: "क्विझ पुन्हा सुरू करा",
    btnSubmitQuiz: "क्विझ सबमिट करा",

    // Learning section headers
    learnHeader: "डिजिटल कौशल्ये शिका",
    learnSub: "संगणक, इंटरनेट, ईमेल, डिजिटल पेमेंट, स्मार्टफोन आणि सरकारी सेवांच्या मूलभूत गोष्टी जाणून घ्या.",

    // Learning topics detailed content
    topics: {
      computer: {
        title: "संगणकाची मूलभूत माहिती",
        short: "संगणक म्हणजे काय, कीबोर्ड आणि माऊसचा वापर, फाईल्स, फोल्डर्स आणि मूलभूत सॉफ्टवेअर समजून घ्या.",
        desc: `
          <h3>संगणक म्हणजे काय?</h3>
          <p>संगणक (संगणक) हे एक इलेक्ट्रॉनिक उपकरण आहे जे माहिती किंवा डेटावर प्रक्रिया करते. यामध्ये डेटा साठवण्याची, पुनर्प्राप्त करण्याची आणि प्रक्रिया करण्याची क्षमता असते. आपण कागदपत्रे टाईप करण्यासाठी, ईमेल पाठवण्यासाठी, गेम खेळण्यासाठी आणि वेब ब्राउझ करण्यासाठी संगणकाचा वापर करू शकता.</p>
          <h3>कीबोर्ड आणि माऊस</h3>
          <p>कीबोर्डचा वापर मजकूर आणि कमांड टाईप करण्यासाठी केला जातो, तर माऊस हे स्क्रीनवर फिरण्यासाठी आणि ऑब्जेक्ट्सवर क्लिक करण्यासाठी वापरले जाणारे पॉईंटिंग डिव्हाइस आहे. क्लिक, double-क्लिक आणि राईट-क्लिक शिकणे आवश्यक आहे.</p>
          <h3>फाईल्स आणि फोल्डर्स</h3>
          <p>संगणकावरील सर्व डेटा "फाईल्स" (उदा. दस्तऐवज, चित्रे, गाणी) म्हणून जतन केला जातो. कपाटातील ड्रॉवरप्रमाणे या फाईल्स व्यवस्थित ठेवण्यासाठी फोल्डर्सचा वापर केला जातो.</p>
          <h3>मूलभूत ॲप्स</h3>
          <p>ॲप्लिकेशन्स (किंवा ॲप्स/सॉफ्टवेअर) हे तुम्हाला काम करण्याची अनुमती देणारे प्रोग्राम आहेत. उदाहरणांमध्ये टाईप करण्यासाठी नोटपॅड/वर्ड, ड्रॉइंगसाठी पेंट आणि कॅल्क्युलेटर समाविष्ट आहेत.</p>
        `
      },
      internet: {
        title: "इंटरनेटची मूलभूत माहिती",
        short: "वर्ल्ड वाईड वेब, ब्राउझरचा वापर, सर्च इंजिन, युआरएल आणि सुरक्षित वेबसाईट ओळखणे शिका.",
        desc: `
          <h3>इंटरनेट म्हणजे काय?</h3>
          <p>इंटरनेट हे कोट्यवधी संगणकांना जोडणारे जागतिक नेटवर्क आहे. याद्वारे लोक जगातील कोणत्याही कोपऱ्यातून माहिती शेअर करू शकतात आणि संपर्क साधू शकतात.</p>
          <h3>वेब ब्राउझर</h3>
          <p>वेब ब्राउझर (जसे की गुगल क्रोम, मायक्रोसॉफ्ट एज, मोझिला फायरफॉक्स) हे इंटरनेटवरील वेबसाईट्स पाहण्यासाठी वापरले जाणारे सॉफ्टवेअर आहे.</p>
          <h3>सर्च इंजिन</h3>
          <p>सर्च इंजिन (जसे की गुगल, बिंग) तुम्हाला इंटरनेटवर विशिष्ट माहिती शोधण्यात मदत करतात. तुम्ही कीवर्ड टाईप करता आणि सर्च इंजिन त्याशी जुळणारे वेब पेजेस दाखवते.</p>
          <h3>वेबसाईट आणि युआरएल (URL)</h3>
          <p>वेबसाईट म्हणजे संबंधित वेब पेजेसचा संग्रह होय. युआरएल (URL) हा वेब पेजचा अचूक पत्ता असतो (उदा. <code>https://www.wikipedia.org</code>). संवेदनशील माहिती भरण्यापूर्वी नेहमी युआरएल तपासा.</p>
        `
      },
      email: {
        title: "ईमेलची माहिती",
        short: "ईमेल खाते तयार करणे, ईमेल लिहिणे आणि पाठवणे, अटॅचमेंट वापरणे आणि सुरक्षित राहणे शिका.",
        desc: `
          <h3>ईमेल म्हणजे काय?</h3>
          <p>इलेक्ट्रॉनिक मेल (ईमेल) ही डिजिटल उपकरणांचा वापर करून लोकांमध्ये संदेश देवाणघेवाण करण्याची पद्धत आहे. हे जलद, स्वस्त आहे आणि याद्वारे कागदपत्रे व फोटो पाठवता येतात.</p>
          <h3>ईमेल तयार करणे आणि पाठवणे</h3>
          <p>ईमेल वापरण्यासाठी, तुम्ही जीमेल (Gmail) किंवा आऊटलूक (Outlook) वर खाते तयार करता. तुम्ही प्राप्तकर्त्याचा पत्ता (उदा. <code>user@example.com</code>), विषय (Subject) आणि संदेश लिहून ईमेल पाठवू शकता.</p>
          <h3>अटॅचमेंट (संलग्नक)</h3>
          <p>तुम्ही तुमच्या ईमेलसोबत फाईल्स (फोटो, डॉक्युमेंट्स, पीडीएफ) पाठवू शकता. याला अटॅचमेंट म्हणतात. सावध राहा: अनोळखी व्यक्तींनी पाठवलेले अटॅचमेंट्स उघडू नका, त्यात व्हायरस असू शकतात.</p>
          <h3>ईमेल सुरक्षा</h3>
          <p>तुमचा पासवर्ड कधीही कोणाला सांगू नका. तातडीने बँक खात्याची माहिती मागणाऱ्या ईमेलपासून सावध राहा—बँक कधीही ईमेलवर अशी माहिती मागत नाही.</p>
        `
      },
      payments: {
        title: "डिजिटल पेमेंट",
        short: "UPI पेमेंट, सुरक्षितपणे QR कोड स्कॅन करणे, नेट बँकिंग आणि आर्थिक सुरक्षेचे नियम जाणून घ्या.",
        desc: `
          <h3>युनिफाइड पेमेंट्स इंटरफेस (UPI)</h3>
          <p>UPI तुम्हाला मोबाईल ॲप (उदा. BHIM, गुगल पे, फोनपे, पेटीएम) वापरून बँक खात्यांमध्ये त्वरित पैसे ट्रान्सफर करण्याची परवानगी देते. हे यूपीआय आयडी आणि ४ किंवा ६ अंकी सुरक्षित यूपीआय पिनचा वापर करते.</p>
          <h3>क्यूआर (QR) कोड</h3>
          <p>क्यूआर कोड हे चौकोनी आकाराचे बारकोड असतात. पेमेंट करण्यासाठी तुम्ही मोबाईल कॅमेऱ्याने ते स्कॅन करता. <strong>महत्त्वाचा नियम: तुम्ही फक्त पैसे पाठवण्यासाठी/पेमेंट करण्यासाठी क्यूआर कोड स्कॅन करता, पैसे मिळवण्यासाठी कधीही नाही.</strong></p>
          <h3>ऑनलाइन बँकिंग</h3>
          <p>नेट बँकिंग आणि मोबाईल बँकिंग तुम्हाला बँकेच्या सुरक्षित वेबसाईट किंवा ॲपद्वारे तुमचे बँक खाते व्यवस्थापित करू देते. नेहमी बँकेची वेबसाईट स्वतः टाईप करा आणि <code>https://</code> असल्याची खात्री करा.</p>
          <h3>पेमेंटबाबत सावधानता</h3>
          <p>तुमचा यूपीआय पिन गुप्त ठेवा. तो कोणाशीही शेअर करू नका, अगदी बँकेच्या कर्मचाऱ्यांशीही नाही. खात्यावर लक्ष ठेवण्यासाठी एसएमएस अलर्ट सुरू ठेवा.</p>
        `
      },
      smartphone: {
        title: "स्मार्टफोन साक्षरता",
        short: "ॲप स्टोअरचा सुरक्षित वापर, ॲप परवानग्या (Permissions) समजून घेणे, अपडेट्स आणि स्क्रीन लॉक.",
        desc: `
          <h3>आधिकारिक ॲप स्टोअर</h3>
          <p>फक्त अधिकृत स्टोअरमधून ॲप्स डाउनलोड करा: गुगल प्ले स्टोर (Android) किंवा ॲपल ॲप स्टोअर (iOS). अनोळखी वेबसाईट्सवरून एपीके (APK) फाईल्स डाउनलोड करणे टाळा, त्यात व्हायरस असू शकतात.</p>
          <h3>ॲप परवानग्या (Permissions)</h3>
          <p>जेव्हा तुम्ही एखादे ॲप इन्स्टॉल करता, तेव्हा ते तुमच्या फोनच्या भागांमध्ये (कॅमेरा, कॉन्टॅक्ट्स, एसएमएस, लोकेशन) प्रवेश करण्याची परवानगी मागते. नेहमी विचार करा: कॅल्क्युलेटर ॲपला संपर्काची गरज आहे का? नसेल, तर परवानगी नाकारा.</p>
          <h3>स्मार्टफोन अपडेट्स</h3>
          <p>तुमच्या स्मार्टफोनची ऑपरेटिंग सिस्टम आणि ॲप्लिकेशन्स नियमितपणे अपडेट करा. या अपडेट्समध्ये महत्त्वाचे सुरक्षा पॅचेस असतात जे तुमचे हॅकर्सपासून संरक्षण करतात.</p>
          <h3>स्क्रीन लॉक</h3>
          <p>तुमचा फोन नेहमी पिन, पॅटर्न, पासवर्ड किंवा फिंगरप्रिंट लॉकने सुरक्षित ठेवा. फोन हरवला किंवा चोरीला गेल्यास यामुळे गैरवापर टाळता येतो.</p>
        `
      },
      govServices: {
        title: "सरकारी डिजिटल सेवा",
        short: "सरकारी पोर्टलवर सुरक्षित लॉगिन करणे, डिजिटल कागदपत्रे (उदा. डिजिलॉकर) डाउनलोड करणे शिका.",
        desc: `
          <h3>अधिकृत सरकारी पोर्टल</h3>
          <p>अनेक सरकारी सेवा ऑनलाइन उपलब्ध आहेत, जसे की रेल्वे तिकीट बुकिंग (IRCTC), पासपोर्ट अर्ज, कर भरणे किंवा आधार पडताळणी. अधिकृत भारतीय सरकारी वेबसाईट्स नेहमी <code>.gov.in</code> या <code>.nic.in</code> वर संपतात.</p>
          <h3>डिजिटल कागदपत्रे (DigiLocker)</h3>
          <p>डिजिलॉकर सारख्या सेवा तुम्हाला ड्रायव्हिंग लायसन्स, आधार, मार्कशीट यांसारखी कागदपत्रे तुमच्या फोनवर डिजिटल स्वरूपात साठवू देतात. या कागदपत्रांना कायदेशीर मान्यता आहे.</p>
          <h3>सुरक्षित लॉगिन सवयी</h3>
          <p>सरकारी खात्यांसोबत तुमचा योग्य मोबाईल नंबर आणि ईमेल आयडी नोंदवा. लॉगिन सहसा पासवर्ड आणि वन-टाइम पासवर्ड (OTP) द्वारे सुरक्षित केले जाते.</p>
        `
      }
    },

    // Cyber Safety Section
    safetyHeader: "ऑनलाइन सुरक्षित रहा",
    safetySub: "सर्वात सामान्य ऑनलाइन धोके जाणून घ्या, त्यांचे चेतावणी संकेत ओळखा आणि काय करावे व काय टाळावे हे समजून घ्या.",
    safetyTopics: {
      phishing: {
        title: "फिशिंग (Phishing)",
        what: "फिशिंग हा एक सायबर हल्ला आहे जिथे स्कॅमर्स तुमच्या खात्याचा पासवर्ड किंवा बँक तपशील चोरण्यासाठी बँक किंवा नामांकित कंपन्यांसारखे दिसणारे बनावट ईमेल, एसएमएस किंवा मेसेज पाठवतात.",
        signs: "तातडीने कारवाई करण्याची मागणी करणारी भाषा, खाते बंद करण्याची धमकी, अनोळखी वेबसाईटच्या लिंक्स, शुद्धलेखनाच्या चुका.",
        do: "पाठवणाऱ्याचा खरा ईमेल पत्ता तपासा. कंपनीच्या अधिकृत वेबसाईट किंवा कस्टमर केअर नंबरद्वारे खात्री करा.",
        dont: "खाते सुरळीत करण्यासाठी लॉगिन करा असा दावा करणाऱ्या मेसेजमधील लिंक्सवर कधीही क्लिक करू नका."
      },
      fakeWebsites: {
        title: "बनावट वेबसाईट्स",
        what: "स्कॅमर्स हुबेहूब मूळ वेबसाईटसारख्या दिसणाऱ्या बनावट वेबसाईट्स बनवतात जेणेकरून तुमची बँक माहिती किंवा क्रेडिट कार्डचे तपशील चोरता येतील.",
        signs: "असामान्य डोमेन नाव (उदा. paytm.com ऐवजी paytn.com), सुरक्षेचे कुलूप चिन्ह नसणे, युआरएलमध्ये 'https://' नसणे, स्पेलिंगच्या चुका.",
        do: "सर्च रिझल्ट्सवर क्लिक करण्याऐवजी वेबसाईटचा पत्ता स्वतः टाईप करा. नेहमी वापरल्या जाणाऱ्या साईट्स बुकमार्क करा.",
        dont: "स्पेलिंगच्या चुका असलेल्या किंवा 'http://' (शेवटी 's' नसलेल्या) वेबसाईट्सवर कधीही तुमचे पासवर्ड, पिन किंवा इतर माहिती टाकू नका."
      },
      scams: {
        title: "ऑनलाइन स्कॅम्स",
        what: "लोकांना फसवून पैसे उकळण्याच्या योजना. यामध्ये लॉटरी जिंकणे, बनावट नोकरीच्या ऑफर, गुंतवणुकीवर दुप्पट परतावा किंवा बनावट कस्टमर केअर फसवणूक यांचा समावेश होतो.",
        signs: "फुकट पैशांचे आमिष, नोकरीसाठी आगाऊ शुल्काची मागणी, AnyDesk किंवा TeamViewer सारखे स्क्रीन-शेअरिंग ॲप डाउनलोड करण्याचा दबाव.",
        do: "फसवणुकीची त्वरित तक्रार सायबर हेल्पलाइन (१९३०) किंवा cybercrime.gov.in वर करा. फुकट पैशांच्या ऑफरपासून सावध रहा.",
        dont: "बक्षीस मिळवण्यासाठी कधीही पैसे पाठवू नका, अनोळखी व्यक्तींच्या सांगण्यावरून कोणतेही स्क्रीन-शेअरिंग ॲप इन्स्टॉल करू नका."
      },
      passwords: {
        title: "मजबूत पासवर्ड",
        what: "सायबर गुन्हेगारांपासून संरक्षणाची तुमची पहिली भिंत. हॅकर्स सोप्या पासवर्डचा अंदाज काही सेकंदात लावू शकतात.",
        signs: "लहान पासवर्ड, सामान्य शब्द (उदा. 'password123'), सहज शोधता येणाऱ्या माहितीवर आधारित पासवर्ड (तुमचे नाव, वाढदिवस, फोन नंबर).",
        do: "अक्षरे (मोठी आणि लहान), अंक आणि विशेष चिन्हांचे (@, #, $) मिश्रण वापरा. पासवर्ड किमान १२ अक्षरांचा असावा.",
        dont: "वेगवेगळ्या खात्यांसाठी एकच पासवर्ड वापरू नका. पासवर्ड लिहून कॉम्प्युटरजवळ ठेवू नका."
      },
      otp: {
        title: "ओटीपी (OTP) सुरक्षा",
        what: "वन-टाइम पासवर्ड (OTP) हा व्यवहार किंवा लॉगिनची खात्री करण्यासाठी तुमच्या फोनवर पाठवला जाणारा सुरक्षा कोड आहे. हा अत्यंत संवेदनशील आहे.",
        signs: "बँक कर्मचारी, टेलीकॉम एजंट किंवा सरकारी अधिकारी असल्याचे सांगून कॉल करणारे आणि तुमच्या फोनवर आलेला कोड मागणारे लोक.",
        do: "ओटीपी संदेश का मजकूर नीट वाचा. त्यामध्ये सहसा लिहिले असते: 'हा कोड कोणाशीही शेअर करू नका.' तुम्ही स्वतः व्यवहार सुरू केला असल्यास खात्री करा.",
        dont: "कोणत्याही परिस्थितीत कोणाशीही ओटीपी शेअर करू नका. बँक कर्मचारी कधीही ओटीपी मागत नाहीत."
      },
      upi: {
        title: "UPI फसवणूक",
        what: "स्कॅमर्स पेमेंट ॲप्सद्वारे बनावट मनी कलेक्ट रिक्वेस्ट, क्यूआर कोड किंवा कॉलद्वारे वापरकर्त्यांची फसवणूक करण्याचा प्रयत्न करतात.",
        signs: "पैसे मिळवण्यासाठी ('Receive Money') यूपीआई पिन टाकण्याची विनंती येणे. बक्षीस मिळवण्यासाठी पिन टाकण्यास सांगणे.",
        do: "पिन टाकण्यापूर्वी स्क्रीनवर प्राप्तकर्त्याचे नाव तपासा. लक्षात ठेवा: पिन फक्त पैसे पाठवण्यासाठी लागतो, मिळवण्यासाठी नाही.",
        dont: "पैसे मिळवण्यासाठी कधीही यूपीआय पिन टाकू नका. पैसे मिळणार या आशेने कधीही क्यूआर कोड स्कॅन करू नका."
      },
      socialMedia: {
        title: "Social Media सुरक्षा",
        what: "फेसबुक, व्हॉट्सॲप, इंस्टाग्राम इत्यादींवर स्वतःचे संरक्षण करणे. ओळखीची चोरी (Identity Theft) आणि सायबर धमक्यांपासून वाचणे.",
        signs: "मित्रांच्या नावाने तयार केलेल्या बनावट खात्यांवरून पैशांची मागणी येणे, मित्रांकडून विचित्र लिंक्स असलेले मेसेज मिळणे.",
        do: "तुमची खाती 'प्रायव्हेट' वर सेट करा. फक्त ओळखीच्या लोकांनाच फ्रेंड लिस्टमध्ये जोडा. टू-फॅक्टर ऑथेंटिकेशन (2FA) सक्षम करा.",
        dont: "तुमचा घरचा पत्ता, रोजची दिनचर्या, प्रवासाचे नियोजन किंवा ओळखपत्रांचे फोटो सोशल मीडियावर शेअर करू नका."
      },
      privacy: {
        title: "गोपनीयता संरक्षण",
        what: "तुमचा वैयक्तिक डेटा (नाव, फोन नंबर, स्थान, फोटो) ऑनलाइन कसा गोळा आणि शेअर केला जातो यावर नियंत्रण ठेवणे.",
        signs: "वेबसाईट्सद्वारे अनावश्यक वैयक्तिक माहिती मागणे, ॲप्सद्वारे लोकेशन प्रवेशाची परवानगी मागणे.",
        do: "तुमच्या ब्राउझर आणि स्मार्टफोनवरील सुरक्षा व गोपनीयता सेटिंग्ज नियमित तपासा. अनावश्यक कुकीज नाकारा.",
        dont: "पूर्ण विश्वास असल्याशिवाय कोणत्याही वेबसाईट्सवर तुमच्या मुख्य गुगल किंवा फेसबुक खात्याने लॉगिन करू नका."
      }
    },
    safetyLabels: {
      what: "हे काय आहे:",
      signs: "चेतावणी संकेत:",
      do: "काय करावे:",
      dont: "क्या करू नये:"
    },

    // URL Safety Checker
    urlCheckerTitle: "वेबसाईट युआरएल (URL) तपासा",
    urlCheckerLabel: "सुरक्षा जोखमीचे मूल्यमापन करण्यासाठी युआरएल प्रविष्ट करा:",
    urlCheckerPlaceholder: "उदा. https://example.com",
    btnCheckUrl: "युआरएल तपासा",
    urlDisclaimer: "<strong>अस्वीकरण:</strong> हे एक शैक्षणिक जागरूकता साधन आहे जे मूलभूत नियमांवर आधारित आहे. हे व्यावसायिक सुरक्षा सॉफ्टवेअरला पर्याय नाही.",
    urlRiskLow: "कमी जोखीम (Low Risk)",
    urlRiskMedium: "मध्यम जोखीम (Medium Risk)",
    urlRiskHigh: "उच्च जोखीम (High Risk)",
    urlResultTitle: "मूल्यमापन निकाल:",
    urlReasonsTitle: "विश्लेषणाचे निष्कर्ष:",
    urlReasonsSafe: "कोणतेही संशयास्पद संकेत आढळले नाहीत. सुरक्षित वाटते, पण नेहमी काळजी घ्या.",
    urlReasonNoHttps: "HTTPS नाही (कनेक्शन सुरक्षित नाही, ज्यामुळे तुमची माहिती लीक होऊ शकते).",
    urlReasonIpAddress: "डोमेन नावाऐवजी IP पत्त्याचा वापर केला आहे (अत्यंत संशयास्पद).",
    urlReasonAtSymbol: "युआरएलमध्ये '@' चे चिन्ह आहे (अनेकदा बनावट सर्व्हरवर नेण्यासाठी वापरले जाते).",
    urlReasonTooLong: "युआरएल खूप मोठे आहे (बनावट सबडोमेन लपवण्यासाठी असू शकते).",
    urlReasonScamKeywords: "धोखाधड़ीशी संबंधित संशयास्पद कीवर्ड आढळले आहेत (उदा: free, login, secure, update, gift).",
    urlReasonExcessiveSubdomains: "खूप जास्त सबडोमेन आहेत (बनावट वेबसाईट्सद्वारे वापरले जाते).",

    // Phishing Message Detector
    phishDetectorTitle: "हा मेसेज सुरक्षित आहे का?",
    phishDetectorLabel: "मूल्यांकनसाठी संशयास्पद संदेश (SMS, ईमेल, चॅट) पेस्ट करा:",
    phishDetectorPlaceholder: "उदा. अभिनंदन! तुम्ही १ कोटीची लॉटरी जिंकली आहे. दावा करण्यासाठी त्वरित या नंबरवर कॉल करा आणि तुमचा ओटीपी पाठवा...",
    btnCheckMessage: "मेसेज तपासा",
    phishDisclaimer: "<strong>अस्वीकरण:</strong> हे डिटेक्टर कीवर्ड पॅटर्नचे विश्लेषण करणारे एक शैक्षणिक साधन आहे. हे १००% अचूकतेची हमी देत नाही.",
    phishScoreLabel: "जोखीम स्कोअर:",
    phishRiskLevelLabel: "जोखीम पातळी:",
    phishSignsTitle: "आढळलेले चेतावणी संकेत:",
    phishNoSigns: "फिशिंगचे कोणतेही सामान्य संकेत आढळले नाहीत. तरीही, मेसेज पाठवणारा अनोळखी असल्यास सावध रहा.",
    phishSignUrgency: "घाई/धमकी: त्वरित कारवाईची मागणी करणे किंवा खाते ब्लॉक करण्याची धमकी देणे.",
    phishSignFinancial: "आर्थिक आमिष: लॉटरी, बक्षिसे, रोख रक्कम किंवा सुलभ कर्जाचा उल्लेख.",
    phishSignOtpPin: "माहितीची मागणी: थेट ओटीपी, यूपीआय पिन, पासवर्ड किंवा कार्ड नंबर मागणे.",
    phishSignLink: "मेसेजमध्ये संशयास्पद लिंक्स किंवा शॉर्ट-लिंक्स असणे.",
    phishSignBank: "बँक किंवा खाते बदलाचे सोंग घेणे.",

    // Quiz Section
    quizTitle: "सायबर सुरक्षा क्विझ",
    quizProgress: "प्रश्न",
    quizScore: "तुमचा स्कोअर:",
    quizFeedbackExcellent: "उत्कृष्ट! तुम्हाला डिजिटल सुरक्षा आणि सायबर सुरक्षेची खूप चांगली माहिती आहे.",
    quizFeedbackGood: "चांगला प्रयत्न! तुम्हाला मूलभूत गोष्टी माहित आहेत, पण अधिक सतर्क राहणे आवश्यक आहे.",
    quizFeedbackPoor: "शिकत रहा! डिजिटल सुरक्षा अत्यंत महत्त्वाची आहे. कृपया पाठ पुन्हा वाचा आणि प्रयत्न करा.",
    quizExplanationsHeader: "प्रश्नांचे स्पष्टीकरण:",
    quizExplanationLabel: "स्पष्टीकरण:",

    // Digital Safety Tips Cards
    tipsTitle: "डिजिटल सुरक्षेचे महत्त्वाचे सल्ले",
    tipsList: [
      { title: "OTP शेअर करू नका", desc: "वन-टाइम पासवर्ड ही तुमच्या खात्याची चावी आहे. बँक किंवा कंपन्या कधीही तो मागत नाहीत." },
      { title: "UPI पिन फक्त पाठवण्यासाठी", desc: "पैसे पाठवण्यासाठीच पिन टाकावा लागतो. पैसे मिळवण्यासाठी पिनची गरज नसते." },
      { title: "मजबूत पासवर्ड वापरा", desc: "चिन्हे, अंक आणि मोठ्या अक्षरांचा वापर करून मोठा पासवर्ड बनवा. वाढदिवस वापरणे टाळा." },
      { title: "टू-फॅक्टर (2FA) सुरू करा", desc: "सुरक्षेसाठी तुमच्या ईमेल आणि सोशल खात्यांवर अतिरिक्त पडताळणी सुरू करा." },
      { title: "वेबसाईट युआरएल तपासा", desc: "साईट https:// ने सुरू होते का आणि स्पेलिंग ब्रँडशी जुळते का हे तपासा." },
      { title: "अनोळखी APK टाळा", desc: "ॲप्स फक्त प्ले स्टोअर किंवा ॲप स्टोअरवरूनच डाउनलोड करा. अनोळखी लिंक्स टाळा." },
      { title: "ॲप परवानग्या तपासा", desc: "ॲपला फक्त त्याच्या कामासाठी आवश्यक असलेलीच परवानगी द्या." },
      { title: "तक्रार १९३० वर करा", desc: "सायबर फसवणूक झाल्यास त्वरित राष्ट्रीय सायबर हेल्पलाइन १९३० वर कॉल करा." }
    ],

    // Emergency Scam Guidance
    emergencyTitle: "संशयास्पद मेसेज आला? या पायऱ्या फॉलो करा",
    emergencySteps: [
      { step: "1", title: "थांबा", text: "घाईघाईत कोणतीही कृती करू नका, भलेही खात्यात बिघाड किंवा ब्लॉक करण्याची धमकी असली तरीही." },
      { step: "2", title: "क्लिक करू नका", text: "मेसेजमधील कोणत्याही लिंकवर क्लिक करू नका किंवा फाईल डाउनलोड करू नका." },
      { step: "3", title: "माहिती गुप्त ठेवा", text: "कोणत्याही परिस्थितीत ओटीपी, यूपीआय पिन, एटीएम पिन किंवा पासवर्ड शेअर करू नका." },
      { step: "4", title: "खात्री करा", text: "बँक किंवा कंपनीचा अधिकृत नंबर स्वतः शोधून त्यांच्याशी संपर्क साधा व खात्री करा." },
      { step: "5", title: "स्क्रीनशॉट घ्या", text: "पुरावा म्हणून संशयास्पद मेसेज आणि पाठवणाऱ्याच्या नंबरचा स्क्रीनशॉट काढून ठेवा." },
      { step: "6", title: "तक्रार करा", text: "सायबर हेल्पलाइन १९३० वर कॉल करा किंवा cybercrime.gov.in वर तक्रार नोंदवा." },
      { step: "7", title: "बँकेशी संपर्क साधा", text: "जर तुम्ही माहिती शेअर केली असेल, तर त्वरित बँकेशी संपर्क साधून कार्ड व खाते ब्लॉक करा." }
    ],

    // About Section
    aboutTitle: "प्रकल्पाविषयी",
    aboutIntro: "हे बहुभाषिक डिजिटल साक्षरता प्लॅटफॉर्म एक शैक्षणिक सीईपी (कम्युनिटी एंगेजमेंट प्रोजेक्ट) उपक्रम आहे जो डिजिटल ज्ञान सर्वांसाठी सोपे आणि सुरक्षित करण्यासाठी डिझाइन केला आहे.",
    aboutObjectiveTitle: "प्रकल्पाचे उद्दिष्ट",
    aboutObjectiveText: "तांत्रिक पार्श्वभूमी नसलेल्या नागरिकांना त्यांच्या मातृभाषेत संगणक कौशल्ये आणि सुरक्षिततेच्या सवयी शिकवणे जेणेकरून ते सायबर धोक्यांपासून स्वतःचा बचाव करू शकतील.",
    aboutFeaturesTitle: "मुख्य विशेषताएं",
    aboutFeaturesText: "बहुभाषिक निवडकर्ता, संगणक व इंटरनेटचे मूलभूत अभ्यासक्रम, सायबर सुरक्षा मार्गदर्शक तत्त्वे, युआरएल रिस्क चेकर आणि मेसेज डिटेक्टर.",
    aboutFutureTitle: "भावी क्षमता",
    aboutFutureText: "भविष्यत व्हॉईस-आधारित स्क्रीन रीडर, ऑफलाइन वापर, एआय-आधारित स्कॅम व्हॉईस ॲनालायझर आणि इतर भारतीय भाषांचा समावेश केला जाईल.",

    // Footer
    footerTitle: "बहुभाषिक डिजिटल साक्षरता प्रकल्प",
    footerSubtitle: "Developed as a College CEP Project.",
    footerDevLabel: "Developer Details",

    // Quiz Questions Data (15 items)
    quizQuestions: [
      {
        q: "एका संदेशात दावा केला आहे की तुमचे बँक खाते त्वरित ब्लॉक केले जाईल जोपर्यंत तुम्ही दिलेल्या लिंकवर माहिती अपडेट करत नाही. तुम्ही काय कराल?",
        options: [
          "ब्लॉक होऊ नये म्हणून लिंकवर क्लिक करून माहिती भरू.",
          "मेसेजकडे दुर्लक्ष करून तो डिलीट करू आणि बँकेच्या अधिकृत नंबरवर खात्री करू.",
          "हा मेसेज तुमच्या सर्व संपर्कांना फॉरवर्ड करू.",
          "मेसेजला तुमचे नाव आणि खाते नंबर रिप्लाय करू."
        ],
        answer: 1,
        explanation: "बँक कधीही त्वरित खाते ब्लॉक करण्याची धमकी देणारे एसएमएस लिंक्स पाठवत नाही. हे फिशिंग स्कॅम असू शकतात. नेहमी अधिकृत बँकेशी संपर्क साधा."
      },
      {
        q: "UPI द्वारे पैसे प्राप्त करताना खालीलपैकी कोणते विधान खरे आहे?",
        options: [
          "पैसे मिळवण्यासाठी तुम्हाला तुमचा UPI पिन टाकावा लागेल.",
          "पैसे मिळवण्यासाठी तुम्हाला क्यूआर कोड स्कॅन करावा लागेल.",
          "पैसे मिळवण्यासाठी तुम्हाला तुमचा UPI पिन टाकण्याची गरज नाही.",
          "तुम्हाला पाठवणाऱ्यासोबत तुमचा लॉगिन पासवर्ड शेअर करावा लागेल."
        ],
        answer: 2,
        explanation: "यूपीआय पिन फक्त पैसे पाठवण्यासाठी किंवा ट्रान्सफर करण्यासाठी लागतो. पैसे मिळवण्यासाठी कधीही पिन टाकण्याची किंवा क्यूआर कोड स्कॅन करण्याची गरज नसते."
      },
      {
        q: "खालीलपैकी सर्वात सुरक्षित पासवर्ड कोणता आहे?",
        options: [
          "तुमचेनाव१२३",
          "१२३४५६७८",
          "Tr%8#Km_9qZp",
          "password"
        ],
        answer: 2,
        explanation: "मजबूत पासवर्ड लांब असतो आणि त्यात मोठी-लहान अक्षरे, संख्या आणि विशेष चिन्हे यांचे मिश्रण असते जे सॉफ्टवेअरला ओळखणे कठीण जाते."
      },
      {
        q: "एका कॉलरने बँकेचा कर्मचारी असल्याचे सांगून फायदा मिळवण्यासाठी तुमच्या फोनवर आलेला OTP विचारला. तुम्ही काय कराल?",
        options: [
          "फायदा मिळवण्यासाठी तो सांगू.",
          "सांगण्यास नकार देऊन कॉल कट करू; बँक कधीही कॉलवर ओटीपी मागत नाही.",
          "त्यांना फक्त अर्धेच अंक सांगू.",
          "त्यांना आधी तुमचा पिन विचारू मग ओटीपी सांगू."
        ],
        answer: 1,
        explanation: "ओटीपी अत्यंत गोपनीय असतात. कोणताही बँक कर्मचारी किंवा अधिकारी कॉलवर ओटीपी मागत नाही."
      },
      {
        q: "वेबसाईट कनेक्शन सुरक्षित/एनक्रिप्टेड आहे हे तुम्ही कसे ओळखाल?",
        options: [
          "वेबसाईटचे डिझाइन खूप रंगीबेरंगी असते.",
          "URL ची सुरुवात 'https://' ने होते आणि कुलूपचे चिन्ह असते.",
          "वेबसाईट खूप वेगाने उघडते.",
          "वेबसाईटवर कोणत्याही जाहिराती नसतात."
        ],
        answer: 1,
        explanation: "'https://' आणि कुलूपचे चिन्ह दर्शवते की तुमची माहिती सुरक्षित आणि एनक्रिप्टेड पद्धतीने ट्रान्सफर होत आहे."
      },
      {
        q: "तुम्हाला तुमच्या अँड्रॉइड फोनवर नवीन ॲप डाउनलोड करायचे आहे. तुम्ही ते कुठून डाउनलोड कराल?",
        options: [
          "व्हॉट्सॲपवर अनोळखी व्यक्तीने पाठवलेल्या लिंकवरून.",
          "गुगल प्ले स्टोअरवरून.",
          "फुकट ॲप देणाऱ्या कोणत्याही वेबसाईटवरून.",
          "इतर फाईल शेअरिंग फोरमवरून."
        ],
        answer: 1,
        explanation: "नेहमी अधिकृत स्टोअर जसे की गुगल प्ले स्टोअर किंवा ॲपल ॲप स्टोअरवरूनच ॲप्स डाउनलोड करावेत."
      },
      {
        q: "एका फ्लॅशलाइट ॲपने तुमच्या कॉन्टॅक्ट्स, एसएमएस आणि मायक्रोफोनच्या परवानग्या मागितल्या. योग्य कृती काय असेल?",
        options: [
          "ॲप चालण्यासाठी सर्व परवानग्या देऊ.",
          "परवानग्या नाकारू, कारण फ्लॅशलाइट ॲपला या गोपनीय माहितीची गरज नसते.",
          "संपर्क परवानगी देऊ पण एसएमएस नाकारू.",
          "फोनचे सॉफ्टवेअर अनइन्स्टॉल करू."
        ],
        answer: 1,
        explanation: "ॲप्सना त्यांच्या कामाशी संबंधित नसलेल्या परवानग्या नाकाराव्यात. फ्लॅशलाइट ॲपला संपर्कांची गरज नसते."
      },
      {
        q: "भारतीय सरकारी संस्थेच्या अधिकृत वेबसाईटचा पत्ता सहसा कशाने संपतो?",
        options: [
          ".com किंवा .org",
          ".gov.in किंवा .nic.in",
          ".net किंवा .info",
          ".co.in किंवा .live"
        ],
        answer: 1,
        explanation: "भारतीय सरकारी वेबसाईट्स नेहमी .gov.in किंवा .nic.in ने संपतात."
      },
      {
        q: "सायबर फसवणूक किंवा युपीआय स्कॅममध्ये पैसे गमावल्यास तक्रार करण्यासाठी अधिकृत राष्ट्रीय हेल्पलाइन नंबर कोणता आहे?",
        options: [
          "१००",
          "१९३०",
          "१०९१",
          "१८००"
        ],
        answer: 1,
        explanation: "१९३० हा केंद्र सरकारचा अधिकृत सायबर गुन्हे राष्ट्रीय हेल्पलाइन नंबर आहे."
      },
      {
        q: "सोशल मीडियावर एका मित्राने तातडीची अडचण सांगून पैशांची मागणी केली. तुम्ही सर्वात आधी काय कराल?",
        options: [
          "मदत करण्यासाठी लगेच पैसे ट्रान्सफर करू.",
          "त्यांच्याकडे पूर्ण दुर्लक्ष करू आणि रिपोर्ट करू.",
          "मित्राला त्याच्या माहित असलेल्या नंबरवर कॉल करून खात्री करू.",
          "त्यांच्या बँक कार्डचा फोटो मागू."
        ],
        answer: 2,
        explanation: "Social Media प्रोफाईल हॅक किंवा क्लोन होऊ शकतात. खात्री केल्याशिवाय कोणालाही पैसे पाठवू नका."
      },
      {
        q: "विमानतळ किंवा कॅफेमधील मोफत सार्वजनिक वाय-फाय वर नेट बँकिंग करणे का धोक्याचे आहे?",
        options: [
          "सार्वजनिक वाय-फाय खूप हळू असतो.",
          "हॅकर्स असुरक्षित नेटवर्कवरून जाणारी तुमची माहिती चोरू शकतात.",
          "सार्वजनिक वाय-फाय महाग असतो.",
          "वेबसाईट लोड होणार नाही."
        ],
        answer: 1,
        explanation: "सार्वजनिक वाय-फाय सुरक्षित नसतात. हॅकर्स त्यावर पाळ ठेवून पासवर्ड आणि बँकिंग तपशील चोरू शकतात."
      },
      {
        q: "टू-फॅक्टर ऑथेंटिकेशन (2FA) काय करते?",
        options: [
          "यामुळे दोन वेगळी खाती तयार करावी लागतात.",
          "हे पासवर्ड व्यतिरिक्त एक अतिरिक्त पडताळणी स्तर (जसे की ओटीपी) जोडते.",
          "यामुळे इंटरनेट दुप्पट वेगाने चालते.",
          "हे खाते कायमचे बंद करते."
        ],
        answer: 1,
        explanation: "2FA मुळे पासवर्ड माहित असला तरी दुसऱ्या पडताळणीशिवाय (उदा. मोबाईलवरील ओटीपी) कोणालाही लॉगिन करता येत नाही."
      },
      {
        q: "तुम्हा ईमेल आला की तुम्ही १,०००,००० डॉलरची लॉटरी जिंकली आहे पण दावा करण्यासाठी १०० डॉलर प्रोसेसिंग फी द्यावी लागेल. हे काय आहे?",
        options: [
          "एक खरी संधी.",
          "प्रक्रिया शुल्काच्या नावाखाली पैसे उकळणारा स्कॅम.",
          "शासकीय कर परतावा कार्यक्रम.",
          "ग्राहकांसाठी निष्ठा कार्यक्रम."
        ],
        answer: 1,
        explanation: "इनाम किंवा लॉटरी देण्यासाठी आगाऊ पैशांची मागणी करणे हा फसवणुकीचा प्रकार आहे. कधीही पैसे पाठवू नका."
      },
      {
        q: "स्क्रीन शेअरिंग ॲप (उदा. AnyDesk किंवा TeamViewer) कॉलरला काय करू देते?",
        options: [
          "तुमच्या फोनचा नेटवर्क स्पीड वाढवू देते.",
          "तुमची स्क्रीन पाहू आणि फोन पूर्णपणे नियंत्रित करू देते.",
          "फोनमधील कॅशे मेमरी फाईल्स साफ करू देते.",
          "स्मार्टफोनची बॅटरी वाढवू देते."
        ],
        answer: 1,
        explanation: "स्क्रीन शेअरिंग ॲपमुळे समोरचा व्यक्ती तुमच्या स्क्रीनवरील सर्व काही (पासवर्ड, ओटीपी) पाहू शकतो आणि फोन हाताळू शकतो."
      },
      {
        q: "तुम्ही तुमच्या फोनमधील सॉफ्टवेअर अपडेट्स कधी तपासले आणि इन्स्टॉल केले पाहिजेत?",
        options: [
          "कधीच नाही, अपडेट्स फोन स्लो करतात.",
          "जेव्हा फोन पूर्णपणे बंद पडेल तेव्हा.",
          "नियमितपणे, कारण अपडेट्स सुरक्षा त्रुटी दूर करतात.",
          "पाच वर्षातून एकदा."
        ],
        answer: 2,
        explanation: "सॉफ्टवेअर अपडेट्समध्ये महत्त्वाचे सुरक्षा पॅचेस असतात जे हॅकर्सपासून तुमच्या फोनचे रक्षण करतात."
      }
    ]
  }
};
window.translations = translations;

