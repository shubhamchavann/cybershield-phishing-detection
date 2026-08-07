// ==========================================
// CYBERSHIELD - MAIN JAVASCRIPT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupUrlScanner();
        setupMessageScanner();

    }
);


// ==========================================
// 1. URL SCANNER
// ==========================================

function setupUrlScanner() {

    const urlForm = document.getElementById("url-form");
    const urlInput = document.getElementById("url-input");

    if (!urlForm || !urlInput) {
        return;
    }

    urlForm.addEventListener("submit", function (event) {

        let url = urlInput.value.trim();

        if (url === "") {

            event.preventDefault();

            alert("Please enter a URL.");

            urlInput.focus();

            return;
        }

        // Add protocol when missing
        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://")
        ) {
            urlInput.value = "https://" + url;
        }

    });
}


// ==========================================
// 2. MESSAGE SCANNER
// ==========================================

function setupMessageScanner() {

    const messageInput =
        document.getElementById("message-input");

    const characterCount =
        document.getElementById("character-count");

    if (!messageInput) {
        return;
    }

    // Show existing character count
    if (characterCount) {

        characterCount.textContent =
            messageInput.value.length + " characters";
    }

    messageInput.addEventListener("input", function () {

        if (characterCount) {

            characterCount.textContent =
                messageInput.value.length + " characters";
        }

    });
}


// ==========================================
// 3. QUIZ
// ==========================================

function submitQuiz() {

    const correctAnswers = {
        q1: "b",
        q2: "b",
        q3: "a",
        q4: "c",
        q5: "c",
        q6: "a",
        q7: "b",
        q8: "a",
        q9: "b",
        q10: "a"
    };

    let score = 0;
    let answered = 0;

    for (let question in correctAnswers) {

        const selected = document.querySelector(
            'input[name="' + question + '"]:checked'
        );

        if (selected) {

            answered++;

            if (selected.value === correctAnswers[question]) {
                score++;
            }
        }
    }


    // Check all questions
    if (answered < 10) {

        alert("Please answer all 10 questions.");

        return;
    }


    const percentage = score * 10;

    let level;
    let message;


    if (percentage >= 80) {

        level = "Excellent Awareness";

        message =
            "Excellent! You have strong cybersecurity awareness.";
    }

    else if (percentage >= 60) {

        level = "Good Awareness";

        message =
            "Good! You understand most cybersecurity safety practices.";
    }

    else if (percentage >= 40) {

        level = "Basic Awareness";

        message =
            "You should review the Awareness section.";
    }

    else {

        level = "Needs Improvement";

        message =
            "Learn more about phishing and online fraud.";
    }


    const resultBox =
        document.getElementById("quiz-result");


    resultBox.style.display = "block";


    resultBox.innerHTML = `
        <h2>${level}</h2>

        <div class="percentage">
            ${percentage}%
        </div>

        <h3>
            Score: ${score}/10
        </h3>

        <p>
            ${message}
        </p>

        <button
            type="button"
            class="quiz-retry"
            onclick="resetQuiz()">

            Try Again

        </button>
    `;


    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ==========================================
// 4. RESET QUIZ
// ==========================================

function resetQuiz() {

    const quizForm =
        document.getElementById("cyber-quiz");

    const resultBox =
        document.getElementById("quiz-result");

    if (quizForm) {
        quizForm.reset();
    }

    if (resultBox) {
        resultBox.style.display = "none";
        resultBox.innerHTML = '';
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// 5. CLEAR URL
// ==========================================

function clearUrl() {

    const input =
        document.getElementById("url-input");

    if (input) {

        input.value = "";
        input.focus();
    }
}


// ==========================================
// 6. CLEAR MESSAGE
// ==========================================

function clearMessage() {

    const message =
        document.getElementById("message-input");

    const counter =
        document.getElementById("character-count");

    if (message) {

        message.value = "";
        message.focus();
    }

    if (counter) {

        counter.textContent =
            "0 characters";
    }
}


// ==========================================
// 7. COPY SAFETY MESSAGE
// ==========================================

function copySafetyMessage() {

    const text =
        "Never share your OTP, password, CVV or UPI PIN. " +
        "Always verify suspicious links before clicking.";

    navigator.clipboard
        .writeText(text)
        .then(function () {

            alert(
                "Cybersecurity safety message copied!"
            );

        })
        .catch(function () {

            alert(
                "Unable to copy the message."
            );

        });
}