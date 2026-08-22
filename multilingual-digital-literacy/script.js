// State Variables
let currentLanguage = 'en';
let completedTopics = [];
let quizActive = false;
let quizCurrentIndex = 0;
let quizUserAnswers = Array(15).fill(null);
let activeTopicId = null;
let activeTopicType = null;
let modalOpen = false;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeMoon = document.getElementById('themeMoon');
const themeSun = document.getElementById('themeSun');
const langSelect = document.getElementById('langSelect');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
const searchInput = document.getElementById('searchInput');

// Font size buttons
const fontBtnDecrease = document.getElementById('fontSizeDecrease');
const fontBtnDefault = document.getElementById('fontSizeDefault');
const fontBtnIncrease = document.getElementById('fontSizeIncrease');

// Progress Elements
const progressStat = document.getElementById('progressStat');
const progressBarFill = document.getElementById('progressBarFill');
const btnResetProgress = document.getElementById('btnResetProgress');

// URL Checker Elements
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const urlResultBox = document.getElementById('urlResultBox');
const urlRiskBadge = document.getElementById('urlRiskBadge');
const urlReasonsList = document.getElementById('urlReasonsList');

// Message Detector Elements
const phishForm = document.getElementById('phishForm');
const phishInput = document.getElementById('phishInput');
const phishResultBox = document.getElementById('phishResultBox');
const phishScoreValue = document.getElementById('phishScoreValue');
const phishRiskBadge = document.getElementById('phishRiskBadge');
const phishSignsList = document.getElementById('phishSignsList');

// Quiz Elements
const quizIntroPanel = document.getElementById('quizIntroPanel');
const quizActivePanel = document.getElementById('quizActivePanel');
const quizResultsPanel = document.getElementById('quizResultsPanel');
const btnStartQuiz = document.getElementById('btnStartQuiz');
const btnRestartQuiz = document.getElementById('btnRestartQuiz');
const btnQuizPrev = document.getElementById('btnQuizPrev');
const btnQuizNext = document.getElementById('btnQuizNext');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptionsContainer = document.getElementById('quizOptionsContainer');
const quizCurrentNum = document.getElementById('quizCurrentNum');
const quizProgressFill = document.getElementById('quizProgressFill');
const quizReviewContainer = document.getElementById('quizReviewContainer');

// Details Modal Elements
const detailsModal = document.getElementById('detailsModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
const modalMarkCompleteBtn = document.getElementById('modalMarkCompleteBtn');

// ----------------------------------------------------
// 1. INITIALIZATION & LOCAL STORAGE
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Load Theme
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'enabled') {
    document.body.classList.add('dark-mode');
    themeMoon.style.display = 'none';
    themeSun.style.display = 'block';
  }

  // Load Font Size
  const savedFontSize = localStorage.getItem('fontSize') || '16px';
  document.documentElement.style.setProperty('--root-font-size', savedFontSize);
  updateFontSizeButtons(savedFontSize);

  // Load Completed Topics
  const savedProgress = localStorage.getItem('completedTopics');
  if (savedProgress) {
    completedTopics = JSON.parse(savedProgress);
  }
  updateProgressUI();

  // Load Language
  const savedLang = localStorage.getItem('language') || 'en';
  langSelect.value = savedLang;
  changeLanguage(savedLang);

  setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
  // Dark Mode Toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Language Change
  langSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
  });

  // Mobile Menu
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
  });

  // Close Mobile Menu when link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      
      // Update active link state
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Font Size Adjustments
  fontBtnDecrease.addEventListener('click', () => setFontSize('14px'));
  fontBtnDefault.addEventListener('click', () => setFontSize('16px'));
  fontBtnIncrease.addEventListener('click', () => setFontSize('18px'));

  // Search Input
  searchInput.addEventListener('input', filterTopics);

  // Mark completion via cards checkboxes
  document.querySelectorAll('.completion-checkbox').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card opening
      const topic = btn.getAttribute('data-topic');
      toggleTopicCompletion(topic);
    });
  });

  // Open Details Modal for Learning Cards
  document.querySelectorAll('.btn-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const topic = btn.getAttribute('data-topic');
      openModal(topic, 'learning');
    });
  });

  // Open Details Modal for Cyber Safety Cards
  document.querySelectorAll('.safety-card').forEach(card => {
    card.addEventListener('click', () => {
      const safetyId = card.getAttribute('data-safety');
      openModal(safetyId, 'safety');
    });
  });

  // Modal Closures
  modalCloseBtn.addEventListener('click', closeModal);
  modalCloseActionBtn.addEventListener('click', closeModal);
  
  modalMarkCompleteBtn.addEventListener('click', () => {
    if (activeTopicId && activeTopicType === 'learning') {
      toggleTopicCompletion(activeTopicId);
      loadModalContent(activeTopicId, 'learning'); // refresh modal button
    }
  });

  // Close Modal on clicking backdrop overlay
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      closeModal();
    }
  });

  // Reset Progress Button
  btnResetProgress.addEventListener('click', resetProgress);

  // URL Safety Checker Form Submit
  urlForm.addEventListener('submit', evaluateUrl);

  // Phishing Detector Form Submit
  phishForm.addEventListener('submit', evaluateMessage);

  // Quiz Events
  btnStartQuiz.addEventListener('click', startQuiz);
  btnQuizPrev.addEventListener('click', prevQuizQuestion);
  btnQuizNext.addEventListener('click', nextQuizQuestion);
  btnRestartQuiz.addEventListener('click', startQuiz);
}

// ----------------------------------------------------
// 2. TRANSLATION ENGINE
// ----------------------------------------------------

// Retrieve nested values from dictionaries
function getTranslation(key, lang) {
  const keys = key.split('.');
  let current = window.translations[lang];
  for (const k of keys) {
    if (current && current[k] !== undefined) {
      current = current[k];
    } else {
      return null;
    }
  }
  return current;
}

// Change active language and rewrite DOM text
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);

  // Update HTML elements containing data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getTranslation(key, lang);
    if (translation) {
      if (typeof translation === 'string') {
        el.innerHTML = translation;
      }
    }
  });

  // Update inputs with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = getTranslation(key, lang);
    if (translation && typeof translation === 'string') {
      el.setAttribute('placeholder', translation);
    }
  });

  // Render list data that needs language translations
  renderTips();
  renderEmergencySteps();

  // If quiz is running, render current question in new language
  if (quizActive) {
    renderQuizQuestion();
  }

  // Update modal contents if a modal is currently open
  if (modalOpen && activeTopicId) {
    loadModalContent(activeTopicId, activeTopicType);
  }

  // If checkers results are shown, hide them since language changed (or recheck)
  urlResultBox.style.display = 'none';
  phishResultBox.style.display = 'none';
}

// Render dynamic Quick Tips cards
function renderTips() {
  const tipsGrid = document.getElementById('tipsGrid');
  const tips = window.translations[currentLanguage].tipsList;
  if (!tipsGrid || !tips) return;

  tipsGrid.innerHTML = '';
  tips.forEach((tip, index) => {
    tipsGrid.innerHTML += `
      <div class="tip-card">
        <div class="tip-icon-bullet">${index + 1}</div>
        <div class="tip-content">
          <h4>${tip.title}</h4>
          <p>${tip.desc}</p>
        </div>
      </div>
    `;
  });
}

// Render dynamic Emergency Scam Guidance Cards
function renderEmergencySteps() {
  const emergencyGrid = document.getElementById('emergencyGrid');
  const steps = window.translations[currentLanguage].emergencySteps;
  if (!emergencyGrid || !steps) return;

  emergencyGrid.innerHTML = '';
  steps.forEach(step => {
    emergencyGrid.innerHTML += `
      <div class="emergency-card">
        <div class="emergency-step-num">${step.step}</div>
        <h4>${step.title}</h4>
        <p>${step.text}</p>
      </div>
    `;
  });
}

// ----------------------------------------------------
// 3. ACCESSIBILITY & THEME CONTROLS
// ----------------------------------------------------

// Toggle Light / Dark Mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  
  if (isDark) {
    themeMoon.style.display = 'none';
    themeSun.style.display = 'block';
  } else {
    themeMoon.style.display = 'block';
    themeSun.style.display = 'none';
  }
}

// Set global root font size
function setFontSize(size) {
  document.documentElement.style.setProperty('--root-font-size', size);
  localStorage.setItem('fontSize', size);
  updateFontSizeButtons(size);
}

// Updates UI active state of font buttons
function updateFontSizeButtons(size) {
  fontBtnDecrease.classList.remove('active');
  fontBtnDefault.classList.remove('active');
  fontBtnIncrease.classList.remove('active');

  if (size === '14px') fontBtnDecrease.classList.add('active');
  else if (size === '16px') fontBtnDefault.classList.add('active');
  else if (size === '18px') fontBtnIncrease.classList.add('active');
}

// ----------------------------------------------------
// 4. PROGRESS TRACKER
// ----------------------------------------------------

// Toggle a topic's completion state
function toggleTopicCompletion(topicId) {
  const index = completedTopics.indexOf(topicId);
  if (index > -1) {
    completedTopics.splice(index, 1);
  } else {
    completedTopics.push(topicId);
  }
  localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  updateProgressUI();
}

// Refresh Progress Bar and Card Checkmarks
function updateProgressUI() {
  const totalTopics = 6;
  const count = completedTopics.length;

  // Update dashboard values
  progressStat.innerText = `${count}/${totalTopics}`;
  const percent = totalTopics > 0 ? (count / totalTopics) * 100 : 0;
  progressBarFill.style.width = `${percent}%`;

  // Update card styles
  const topicIds = ['computer', 'internet', 'email', 'payments', 'smartphone', 'govServices'];
  topicIds.forEach(id => {
    const card = document.getElementById(`card-${id}`);
    if (card) {
      if (completedTopics.includes(id)) {
        card.classList.add('completed');
      } else {
        card.classList.remove('completed');
      }
    }
  });
}

// Reset progress back to 0
function resetProgress() {
  completedTopics = [];
  localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  updateProgressUI();
  
  // Refresh active details modal button text if opened
  if (modalOpen && activeTopicId && activeTopicType === 'learning') {
    loadModalContent(activeTopicId, 'learning');
  }
}

// ----------------------------------------------------
// 5. SEARCH & FILTER
// ----------------------------------------------------

function filterTopics() {
  const query = searchInput.value.toLowerCase().trim();

  // 1. Filter Learning Cards
  const learningCards = document.querySelectorAll('.learning-card');
  learningCards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const shortDesc = card.querySelector('p').innerText.toLowerCase();
    
    if (title.includes(query) || shortDesc.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // 2. Filter Cyber Safety Cards
  const safetyCards = document.querySelectorAll('.safety-card');
  safetyCards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const shortDesc = card.querySelector('p').innerText.toLowerCase();

    if (title.includes(query) || shortDesc.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// ----------------------------------------------------
// 6. TOPICS DETAILS MODAL
// ----------------------------------------------------

function openModal(topicId, type) {
  activeTopicId = topicId;
  activeTopicType = type;
  modalOpen = true;

  loadModalContent(topicId, type);

  detailsModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  detailsModal.classList.remove('open');
  document.body.style.overflow = '';
  modalOpen = false;
  activeTopicId = null;
  activeTopicType = null;
}

// Populates modal contents based on type and language
function loadModalContent(topicId, type) {
  modalBody.innerHTML = '';
  const lang = currentLanguage;

  if (type === 'learning') {
    modalTitle.innerHTML = window.translations[lang].topics[topicId].title;
    modalBody.innerHTML = window.translations[lang].topics[topicId].desc;
    
    // Manage completion button in modal
    modalMarkCompleteBtn.style.display = 'inline-block';
    
    const isCompleted = completedTopics.includes(topicId);
    if (isCompleted) {
      modalMarkCompleteBtn.innerText = window.translations[lang].markUncompleted;
      modalMarkCompleteBtn.className = 'btn btn-outline';
    } else {
      modalMarkCompleteBtn.innerText = window.translations[lang].markCompleted;
      modalMarkCompleteBtn.className = 'btn btn-secondary';
    }
  } else if (type === 'safety') {
    const labels = window.translations[lang].safetyLabels;
    const safetyData = window.translations[lang].safetyTopics[topicId];

    modalTitle.innerHTML = safetyData.title;
    modalMarkCompleteBtn.style.display = 'none'; // No progress marking on safety topics

    modalBody.innerHTML = `
      <div class="safety-modal-section what">
        <h4>${labels.what}</h4>
        <div class="safety-block safety-block-info">${safetyData.what}</div>
      </div>
      <div class="safety-modal-section signs">
        <h4>${labels.signs}</h4>
        <div class="safety-block safety-block-warning">${safetyData.signs}</div>
      </div>
      <div class="safety-modal-section do">
        <h4>${labels.do}</h4>
        <div class="safety-block safety-block-success">${safetyData.do}</div>
      </div>
      <div class="safety-modal-section dont">
        <h4>${labels.dont}</h4>
        <div class="safety-block safety-block-danger">${safetyData.dont}</div>
      </div>
    `;
  }
}

// ----------------------------------------------------
// 7. INTERACTIVE WEBSITE URL SAFETY CHECKER
// ----------------------------------------------------

function evaluateUrl(e) {
  e.preventDefault();
  const rawUrl = urlInput.value.trim();
  if (!rawUrl) return;

  const findings = [];
  let isEncrypted = true;

  // Normalize input URL (ensure prefix exists for protocol parsing)
  let testUrl = rawUrl;
  if (!/^https?:\/\//i.test(testUrl)) {
    testUrl = 'http://' + testUrl;
  }

  try {
    const parsed = new URL(testUrl);
    const domain = parsed.hostname.toLowerCase();

    // Check 1: HTTPS protocol check
    if (parsed.protocol !== 'https:') {
      isEncrypted = false;
      findings.push(window.translations[currentLanguage].urlReasonNoHttps);
    }

    // Check 2: IP Address in domain check
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ipPattern.test(domain)) {
      findings.push(window.translations[currentLanguage].urlReasonIpAddress);
    }

    // Check 3: At '@' character check
    if (rawUrl.includes('@')) {
      findings.push(window.translations[currentLanguage].urlReasonAtSymbol);
    }

    // Check 4: URL length check (>75 chars)
    if (rawUrl.length > 75) {
      findings.push(window.translations[currentLanguage].urlReasonTooLong);
    }

    // Check 5: Suspicious scam keywords check
    const scamKeywords = ['secure-login', 'bank-update', 'free-gift', 'lottery', 'pay-now', 'verification', 'claim-reward', 'gift-card', 'update-details'];
    const matchedScamKeywords = scamKeywords.filter(keyword => rawUrl.toLowerCase().includes(keyword));
    if (matchedScamKeywords.length > 0) {
      findings.push(window.translations[currentLanguage].urlReasonScamKeywords + ` (${matchedScamKeywords.join(', ')})`);
    }

    // Check 6: Excessive subdomains check (e.g. login.update.secureserver.fakebank.com)
    const dotCount = (domain.match(/\./g) || []).length;
    if (dotCount > 3) {
      findings.push(window.translations[currentLanguage].urlReasonExcessiveSubdomains);
    }

  } catch (err) {
    // Treat invalid URL structure as high risk
    findings.push("Malformed or invalid URL string structure.");
  }

  // Risk categorization logic
  let riskLevel = 'low';
  let badgeText = window.translations[currentLanguage].urlRiskLow;
  let badgeClass = 'risk-low';

  if (findings.length === 1) {
    riskLevel = 'medium';
    badgeText = window.translations[currentLanguage].urlRiskMedium;
    badgeClass = 'risk-badge risk-medium';
  } else if (findings.length >= 2) {
    riskLevel = 'high';
    badgeText = window.translations[currentLanguage].urlRiskHigh;
    badgeClass = 'risk-badge risk-high';
  } else {
    badgeClass = 'risk-badge risk-low';
  }

  // Populate results
  urlRiskBadge.className = badgeClass;
  urlRiskBadge.innerText = badgeText;
  urlReasonsList.className = 'result-reasons';

  if (findings.length === 0) {
    urlReasonsList.classList.add('safe');
    urlReasonsList.innerHTML = `<li>${window.translations[currentLanguage].urlReasonsSafe}</li>`;
  } else {
    urlReasonsList.innerHTML = findings.map(reason => `<li>${reason}</li>`).join('');
  }

  urlResultBox.style.display = 'block';
  // Scroll to result details box smoothly
  urlResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ----------------------------------------------------
// 8. INTERACTIVE PHISHING MESSAGE DETECTOR
// ----------------------------------------------------

function evaluateMessage(e) {
  e.preventDefault();
  const text = phishInput.value.trim().toLowerCase();
  if (!text) return;

  const indicators = [];
  let score = 0;

  // 1. Urgency / threat check
  const urgencyWords = [
    'urgently', 'immediate', 'block', 'suspend', 'expires', 'action required', 'last chance', 'disabled', 'security warning',
    'तुरंत', 'बंद', 'ब्लॉक', 'निष्क्रिय', 'तात्काळ', 'लगेच', 'तात्तरीने', 'तातडीने'
  ];
  const hasUrgency = urgencyWords.some(word => text.includes(word));
  if (hasUrgency) {
    score += 25;
    indicators.push(window.translations[currentLanguage].phishSignUrgency);
  }

  // 2. Financial baits / prizes check
  const financialWords = [
    'lottery', 'won', 'crore', 'lakh', 'cash', 'prize', 'gift', 'reward', 'bonus', 'loan', 'free',
    'लॉटरी', 'जिता', 'नकद', 'इनाम', 'बक्षीस', 'फुकट', 'लोन', 'बक्षीस', 'रक्कम', 'लाख', 'मोफत'
  ];
  const hasFinancial = financialWords.some(word => text.includes(word));
  if (hasFinancial) {
    score += 25;
    indicators.push(window.translations[currentLanguage].phishSignFinancial);
  }

  // 3. Credentials / OTP check
  const credentialsWords = [
    'otp', 'pin', 'password', 'cvv', 'share with', 'tell me', 'read out', 'card number',
    'ओटीपी', 'पासवर्ड', 'पिन', 'साझा', 'शेअर'
  ];
  const hasCredentials = credentialsWords.some(word => text.includes(word));
  if (hasCredentials) {
    score += 25;
    indicators.push(window.translations[currentLanguage].phishSignOtpPin);
  }

  // 4. Link presence check
  const linkPattern = /https?:\/\/[^\s]+|bit\.ly|[a-z0-9-]+\.[a-z]{2,3}\/[a-z0-9-]+|tinyurl/i;
  const hasLink = linkPattern.test(text);
  if (hasLink) {
    score += 15;
    indicators.push(window.translations[currentLanguage].phishSignLink);
  }

  // 5. Impersonating Bank operations
  const bankWords = [
    'bank', 'card blocked', 'kyc', 'pan card', 'update kyc', 'netbanking',
    'बैंक', 'बँक', 'केवाईसी', 'पॅन'
  ];
  const hasBank = bankWords.some(word => text.includes(word));
  if (hasBank) {
    score += 10;
    indicators.push(window.translations[currentLanguage].phishSignBank);
  }

  // Calculate risk indicators
  let riskBadgeText = window.translations[currentLanguage].urlRiskLow;
  let badgeClass = 'risk-badge risk-low';

  if (score >= 70) {
    riskBadgeText = window.translations[currentLanguage].urlRiskHigh;
    badgeClass = 'risk-badge risk-high';
  } else if (score >= 25) {
    riskBadgeText = window.translations[currentLanguage].urlRiskMedium;
    badgeClass = 'risk-badge risk-medium';
  }

  // Format final UI elements
  phishScoreValue.innerText = `${score}/100`;
  phishRiskBadge.className = badgeClass;
  phishRiskBadge.innerText = riskBadgeText;

  if (indicators.length === 0) {
    phishSignsList.innerHTML = `<li>${window.translations[currentLanguage].phishNoSigns}</li>`;
  } else {
    phishSignsList.innerHTML = indicators.map(sign => `<li>${sign}</li>`).join('');
  }

  phishResultBox.style.display = 'block';
  phishResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ----------------------------------------------------
// 9. INTERACTIVE MULTILINGUAL QUIZ
// ----------------------------------------------------

function startQuiz() {
  quizActive = true;
  quizCurrentIndex = 0;
  quizUserAnswers = Array(15).fill(null);

  // Hide Intro, Results and display Active quiz section
  quizIntroPanel.style.display = 'none';
  quizResultsPanel.style.display = 'none';
  quizActivePanel.style.display = 'block';

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const lang = currentLanguage;
  const questions = window.translations[lang].quizQuestions;
  const question = questions[quizCurrentIndex];

  // Update question numbers and progress bar width
  quizCurrentNum.innerText = quizCurrentIndex + 1;
  const progressPercent = ((quizCurrentIndex + 1) / 15) * 100;
  quizProgressFill.style.width = `${progressPercent}%`;

  // Render question text
  quizQuestionText.innerText = question.q;

  // Render 4 choices
  quizOptionsContainer.innerHTML = '';
  question.options.forEach((optionText, index) => {
    const isSelected = quizUserAnswers[quizCurrentIndex] === index;
    const optionElement = document.createElement('div');
    optionElement.className = `quiz-option ${isSelected ? 'selected' : ''}`;
    optionElement.innerHTML = `
      <span class="quiz-radio"></span>
      <span>${optionText}</span>
    `;
    optionElement.addEventListener('click', () => selectQuizOption(index));
    quizOptionsContainer.appendChild(optionElement);
  });

  // Manage navigation button titles
  if (quizCurrentIndex === 0) {
    btnQuizPrev.style.visibility = 'hidden';
  } else {
    btnQuizPrev.style.visibility = 'visible';
  }

  if (quizCurrentIndex === 14) {
    btnQuizNext.innerText = window.translations[lang].btnSubmitQuiz;
  } else {
    btnQuizNext.innerText = window.translations[lang].btnNext;
  }
}

function selectQuizOption(optionIndex) {
  quizUserAnswers[quizCurrentIndex] = optionIndex;
  
  // Rerender active choices immediately
  const options = quizOptionsContainer.querySelectorAll('.quiz-option');
  options.forEach((opt, idx) => {
    if (idx === optionIndex) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });
}

function prevQuizQuestion() {
  if (quizCurrentIndex > 0) {
    quizCurrentIndex--;
    renderQuizQuestion();
  }
}

function nextQuizQuestion() {
  const lang = currentLanguage;

  // Force an option selection before proceeding
  if (quizUserAnswers[quizCurrentIndex] === null) {
    alert(lang === 'hi' ? 'कृपया आगे बढ़ने से पहले एक विकल्प चुनें।' : 
          lang === 'mr' ? 'कृपया पुढे जाण्यापूर्वी एक पर्याय निवडा.' : 
          'Please select an option before proceeding.');
    return;
  }

  if (quizCurrentIndex < 14) {
    quizCurrentIndex++;
    renderQuizQuestion();
  } else {
    submitQuiz();
  }
}

function submitQuiz() {
  quizActive = false;
  quizActivePanel.style.display = 'none';

  const lang = currentLanguage;
  const questions = window.translations[lang].quizQuestions;
  let correctCount = 0;

  // Calculate score count
  quizUserAnswers.forEach((ansIndex, qIndex) => {
    if (ansIndex === questions[qIndex].answer) {
      correctCount++;
    }
  });

  // Setup result texts and styles based on final score
  const scoreDisplay = document.getElementById('quizScoreValue');
  const resultMsg = document.getElementById('quizResultMessage');
  const resultDesc = document.getElementById('quizResultDesc');

  scoreDisplay.innerText = `${correctCount}/15`;

  if (correctCount >= 12) {
    resultMsg.innerText = window.translations[lang].quizFeedbackExcellent;
    resultDesc.innerText = lang === 'hi' ? 'शानदार! आपको डिजिटल सुरक्षा और साइबर सुरक्षा की बहुत अच्छी समझ है।' : 
                           lang === 'mr' ? 'उत्कृष्ट! तुम्हाला डिजिटल सुरक्षा आणि सायबर सुरक्षेची खूप चांगली माहिती आहे.' :
                           'Excellent! You have a solid understanding of digital safety and cybersecurity.';
    scoreDisplay.style.color = 'var(--success)';
  } else if (correctCount >= 7) {
    resultMsg.innerText = window.translations[lang].quizFeedbackGood;
    resultDesc.innerText = lang === 'hi' ? 'अच्छा प्रयास! आप बुनियादी बातें जानते हैं, लेकिन थोड़ा और सतर्क रहना आपको सुरक्षित रखेगा।' : 
                           lang === 'mr' ? 'चांगला प्रयत्न! तुम्हाला मूलभूत गोष्टी माहित आहेत, पण अधिक सतर्क राहणे आवश्यक आहे.' :
                           'Good job! You know the basics, but reviewing the warning signs can keep you safer.';
    scoreDisplay.style.color = 'var(--warning)';
  } else {
    resultMsg.innerText = window.translations[lang].quizFeedbackPoor;
    resultDesc.innerText = lang === 'hi' ? 'सीखते रहें! डिजिटल सुरक्षा बहुत महत्वपूर्ण है। कृपया पाठों को फिर से पढ़ें और प्रयास करें।' : 
                           lang === 'mr' ? 'शिकत रहा! डिजिटल सुरक्षा अत्यंत महत्त्वाची आहे. कृपया पाठ पुन्हा वाचा आणि प्रयत्न करा.' :
                           'Keep Learning! Digital safety is crucial. Re-read the modules and try again.';
    scoreDisplay.style.color = 'var(--danger)';
  }

  // Populate detailed question feedback review
  quizReviewContainer.innerHTML = '';
  questions.forEach((q, idx) => {
    const userChoice = quizUserAnswers[idx];
    const correctChoice = q.answer;
    const isCorrect = userChoice === correctChoice;

    const reviewItem = document.createElement('div');
    reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;

    reviewItem.innerHTML = `
      <div class="review-q">${idx + 1}. ${q.q}</div>
      <div class="review-a" style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
        <span>${lang === 'hi' ? 'आपका उत्तर:' : lang === 'mr' ? 'तुमचे उत्तर:' : 'Your Answer:'}</span> ${q.options[userChoice]} 
        ${isCorrect ? '✓' : '✗'}
      </div>
      ${!isCorrect ? `
        <div class="review-a" style="color: var(--success); margin-bottom: 0.5rem;">
          <span>${lang === 'hi' ? 'सही उत्तर:' : lang === 'mr' ? 'योग्य उत्तर:' : 'Correct Answer:'}</span> ${q.options[correctChoice]}
        </div>
      ` : ''}
      <div class="review-explanation">
        <strong>${window.translations[lang].quizExplanationLabel}</strong> ${q.explanation}
      </div>
    `;
    quizReviewContainer.appendChild(reviewItem);
  });

  quizResultsPanel.style.display = 'block';
  // Scroll quiz panel header into viewport view smoothly
  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}
