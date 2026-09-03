/**
 * CYBER SHIELD - Threat Intelligence & Phishing Defense Platform
 * Interactive Frontend Engine & Animation System
 */

document.addEventListener("DOMContentLoaded", function () {
    initBootScreen();
    initCyberCanvas();
    initNavScroll();
    initMobileMenu();
    initHeroScannerTabs();
    initSamplePills();
    initRealtimeScanners();
    initStatsCounters();
    initQuizInteractivity();
    initReportsFilterAndUpvote();
    initIncidentChecklists();
});


/* --------------------------------------------------
   1. STARTING CYBER BOOT INTRO SCREEN
   -------------------------------------------------- */
function initBootScreen() {
    const bootScreen = document.getElementById("boot-screen");
    if (!bootScreen) return;

    // Check if user already saw intro in current session (optional - can also run once or allow skip)
    const hasSeenBoot = sessionStorage.getItem("cybershield_booted");
    const skipBtn = document.getElementById("skip-boot-btn");

    function dismissBoot() {
        bootScreen.classList.add("fade-out");
        sessionStorage.setItem("cybershield_booted", "true");
        setTimeout(() => {
            if (bootScreen.parentNode) bootScreen.parentNode.removeChild(bootScreen);
        }, 800);
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", dismissBoot);
    }

    if (hasSeenBoot) {
        dismissBoot();
        return;
    }

    const logTerminal = document.getElementById("boot-log-terminal");
    const progressFill = document.getElementById("boot-progress-fill");
    const progressPercent = document.getElementById("boot-progress-percent");

    const bootSteps = [
        { text: "Initializing Cyber Shield Core v3.4...", ok: true, delay: 200, progress: 20 },
        { text: "Loading Neural Phishing Heuristics & Brand DB...", ok: true, delay: 600, progress: 45 },
        { text: "Synchronizing Zero-Day Threat Intelligence...", ok: true, delay: 1000, progress: 70 },
        { text: "Verifying Anti-Spoofing & SMS Fraud Matrix...", ok: true, delay: 1400, progress: 90 },
        { text: "SYSTEM ARMED. ALL SHIELDS OPERATIONAL.", ok: true, delay: 1800, progress: 100 }
    ];

    bootSteps.forEach(step => {
        setTimeout(() => {
            if (!bootScreen.classList.contains("fade-out")) {
                if (logTerminal) {
                    const line = document.createElement("div");
                    line.className = "boot-line";
                    line.innerHTML = `<span class="status-ok">✔</span> <span>${step.text}</span>`;
                    logTerminal.appendChild(line);
                    logTerminal.scrollTop = logTerminal.scrollHeight;
                }
                if (progressFill) progressFill.style.width = `${step.progress}%`;
                if (progressPercent) progressPercent.innerText = `${step.progress}%`;
            }
        }, step.delay);
    });

    setTimeout(() => {
        dismissBoot();
    }, 2400);
}


/* --------------------------------------------------
   2. INTERACTIVE CYBER PARTICLE CANVAS
   -------------------------------------------------- */
function initCyberCanvas() {
    const canvas = document.getElementById("cyber-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.color = Math.random() > 0.4 ? "rgba(0, 240, 255, " : "rgba(138, 43, 226, ";
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 3;
                    this.y -= (dy / dist) * force * 3;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ")";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00f0ff";
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / 110)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}


/* --------------------------------------------------
   3. HEADER & MOBILE NAVIGATION
   -------------------------------------------------- */
function initNavScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

function initMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("main-nav-menu");

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            toggleBtn.innerHTML = navMenu.classList.contains("open") ? "✕" : "☰";
        });
    }
}


/* --------------------------------------------------
   4. HERO QUICK SCANNER TABS & SAMPLE PRESETS
   -------------------------------------------------- */
function initHeroScannerTabs() {
    const tabBtns = document.querySelectorAll(".scanner-tab-btn");
    const urlForm = document.getElementById("hero-url-form");
    const msgForm = document.getElementById("hero-msg-form");

    if (!tabBtns.length || !urlForm || !msgForm) return;

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const mode = btn.getAttribute("data-tab");
            if (mode === "url") {
                urlForm.style.display = "block";
                msgForm.style.display = "none";
            } else {
                urlForm.style.display = "none";
                msgForm.style.display = "block";
            }
        });
    });
}

function initSamplePills() {
    const samplePills = document.querySelectorAll(".sample-pill");
    samplePills.forEach(pill => {
        pill.addEventListener("click", () => {
            const targetId = pill.getAttribute("data-target");
            const sampleText = pill.getAttribute("data-sample");
            const inputElem = document.getElementById(targetId);

            if (inputElem && sampleText) {
                inputElem.value = sampleText;
                inputElem.focus();

                // Trigger animated glow on input
                inputElem.style.borderColor = "#00ff9d";
                inputElem.style.boxShadow = "0 0 25px rgba(0, 255, 157, 0.4)";
                setTimeout(() => {
                    inputElem.style.borderColor = "";
                    inputElem.style.boxShadow = "";
                }, 800);

                // Auto submit if requested via data attribute
                if (pill.getAttribute("data-autosubmit") === "true") {
                    const form = inputElem.closest("form");
                    if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
                }
            }
        });
    });
}


/* --------------------------------------------------
   5. REAL-TIME INTERACTIVE SCANNER (ASYNC / HUD)
   -------------------------------------------------- */
function initRealtimeScanners() {
    // 1. URL Scanner Form
    const urlScannerForms = document.querySelectorAll(".ajax-url-scanner");
    urlScannerForms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const input = form.querySelector("input[name='url']");
            const resultBox = document.getElementById("scanner-result-box");
            const submitBtn = form.querySelector("button[type='submit']");
            const urlVal = input ? input.value.trim() : "";

            if (!urlVal) return;

            // Scanning state
            const origBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span class="boot-icon-spin">⚡</span> Analyzing Heuristics...`;
            submitBtn.disabled = true;

            try {
                const response = await fetch("/api/scan-url", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: urlVal })
                });

                if (!response.ok) throw new Error("Analysis failed");
                const data = await response.json();
                renderScanResult(data, "url", resultBox);
            } catch (err) {
                console.error("Scan error:", err);
                form.submit(); // fallback to standard submit
            } finally {
                submitBtn.innerHTML = origBtnHtml;
                submitBtn.disabled = false;
            }
        });
    });

    // 2. Message Scanner Form
    const msgScannerForms = document.querySelectorAll(".ajax-msg-scanner");
    msgScannerForms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const textarea = form.querySelector("textarea[name='message']");
            const resultBox = document.getElementById("scanner-result-box");
            const submitBtn = form.querySelector("button[type='submit']");
            const msgVal = textarea ? textarea.value.trim() : "";

            if (!msgVal) return;

            const origBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span class="boot-icon-spin">⚡</span> Inspecting Message...`;
            submitBtn.disabled = true;

            try {
                const response = await fetch("/api/scan-message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: msgVal })
                });

                if (!response.ok) throw new Error("Analysis failed");
                const data = await response.json();
                renderScanResult(data, "message", resultBox);
            } catch (err) {
                console.error("Scan error:", err);
                form.submit();
            } finally {
                submitBtn.innerHTML = origBtnHtml;
                submitBtn.disabled = false;
            }
        });
    });
}

function renderScanResult(data, type, container) {
    if (!container) return;

    let riskClass = "safe";
    let statusText = data.status || "LOW RISK";
    if (data.score >= 60) riskClass = "danger";
    else if (data.score >= 25) riskClass = "warning";

    // Calculate circular stroke offset (circumference ~ 345)
    const maxOffset = 345;
    const strokeOffset = maxOffset - (data.score / 100) * maxOffset;

    let indicatorsHtml = "";
    if (data.indicators && data.indicators.length > 0) {
        indicatorsHtml = data.indicators.map(ind => {
            let itemClass = "good";
            let icon = "✔";
            if (riskClass === "danger") { itemClass = "risk"; icon = "⛔"; }
            else if (riskClass === "warning") { itemClass = "warn"; icon = "⚠️"; }
            return `<li class="indicator-item ${itemClass}"><span>${icon}</span> <span>${ind}</span></li>`;
        }).join("");
    } else {
        indicatorsHtml = `<li class="indicator-item good"><span>✔</span> <span>No malicious indicators found.</span></li>`;
    }

    let breakdownHtml = "";
    if (data.breakdown) {
        breakdownHtml = Object.entries(data.breakdown).map(([key, val]) => {
            const label = key.replace("_", " ").toUpperCase();
            return `
                <div class="breakdown-item">
                    <div class="breakdown-item-header">
                        <span>${label}</span>
                        <span>${val}%</span>
                    </div>
                    <div class="breakdown-bar-track">
                        <div class="breakdown-bar-fill" style="width: ${val}%;"></div>
                    </div>
                </div>
            `;
        }).join("");
    }

    container.innerHTML = `
        <div class="result-hud-panel">
            <div class="result-threat-header">
                <div class="gauge-wrapper">
                    <svg class="gauge-svg" viewBox="0 0 120 120">
                        <circle class="gauge-bg" cx="60" cy="60" r="50"></circle>
                        <circle class="gauge-meter ${riskClass}" id="hud-gauge-circle" cx="60" cy="60" r="50" style="stroke-dashoffset: ${maxOffset};"></circle>
                    </svg>
                    <div class="gauge-content">
                        <div class="gauge-score ${riskClass}">${data.score}</div>
                        <div class="gauge-label">RISK SCORE</div>
                    </div>
                </div>
                <div class="threat-meta-details">
                    <div class="threat-status-badge ${riskClass}">
                        <span>●</span> THREAT STATUS: ${statusText}
                    </div>
                    <h2>${type === 'url' ? 'URL Threat Analysis Report' : 'Message Fraud Analysis Report'}</h2>
                    <p class="threat-recommendation">${data.recommendation || ''}</p>
                </div>
            </div>

            ${breakdownHtml ? `
                <div class="breakdown-section">
                    <h4 class="breakdown-title">📊 Multi-Vector Threat Breakdown</h4>
                    <div class="breakdown-grid">
                        ${breakdownHtml}
                    </div>
                </div>
            ` : ''}

            <div class="indicators-section">
                <h4 class="breakdown-title">🔍 Heuristic Indicators & Findings</h4>
                <ul class="indicators-list">
                    ${indicatorsHtml}
                </ul>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap;">
                <a href="/report" class="btn btn-sm danger">🚨 Report This Threat</a>
                <button type="button" class="btn btn-sm secondary" onclick="navigator.clipboard.writeText('Threat Score: ' + ${data.score} + '/100 | Status: ' + '${statusText}'); alert('Summary copied to clipboard!');">📋 Copy Threat Report</button>
            </div>
        </div>
    `;

    container.style.display = "block";
    container.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Animate the gauge dial smoothly
    setTimeout(() => {
        const gaugeCircle = document.getElementById("hud-gauge-circle");
        if (gaugeCircle) {
            gaugeCircle.style.strokeDashoffset = strokeOffset;
        }
    }, 100);
}

// Global clearForm helper
window.clearForm = function () {
    const forms = document.querySelectorAll("form");
    forms.forEach(f => f.reset());
    const resultBox = document.getElementById("scanner-result-box");
    if (resultBox) resultBox.innerHTML = "";
};


/* --------------------------------------------------
   6. STATS NUMBER COUNTER ANIMATION
   -------------------------------------------------- */
function initStatsCounters() {
    const statElements = document.querySelectorAll(".stat-number[data-count]");
    if (!statElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute("data-count"), 10);
                const suffix = el.getAttribute("data-suffix") || "";
                let current = 0;
                const step = Math.max(Math.floor(target / 40), 1);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.innerText = current.toLocaleString() + suffix;
                }, 30);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => observer.observe(el));
}


/* --------------------------------------------------
   7. INTERACTIVE QUIZ ENGINE
   -------------------------------------------------- */
function initQuizInteractivity() {
    const quizForm = document.querySelector(".quiz-interactive-form");
    if (!quizForm) return;

    const radioInputs = quizForm.querySelectorAll("input[type='radio']");
    const progressFill = document.getElementById("quiz-live-progress");
    const progressText = document.getElementById("quiz-progress-text");

    const totalQuestions = 10;

    radioInputs.forEach(radio => {
        radio.addEventListener("change", () => {
            const answeredCount = new Set(
                Array.from(quizForm.querySelectorAll("input[type='radio']:checked")).map(r => r.name)
            ).size;

            const percentage = Math.round((answeredCount / totalQuestions) * 100);

            if (progressFill) progressFill.style.width = `${percentage}%`;
            if (progressText) progressText.innerText = `${answeredCount} of ${totalQuestions} Answered (${percentage}%)`;

            // Micro-animation on selected card
            const parentLabel = radio.closest(".option-label");
            if (parentLabel) {
                const allLabels = radio.closest(".options-group").querySelectorAll(".option-label");
                allLabels.forEach(l => l.style.borderColor = "");
                parentLabel.style.borderColor = "var(--primary)";
                parentLabel.style.background = "var(--primary-dim)";
            }
        });
    });
}


/* --------------------------------------------------
   8. SCAM REPORTS FILTER & UPVOTING
   -------------------------------------------------- */
function initReportsFilterAndUpvote() {
    // 1. Filter Pills
    const filterPills = document.querySelectorAll(".filter-pill");
    const reportCards = document.querySelectorAll(".report-item-card");

    if (filterPills.length && reportCards.length) {
        filterPills.forEach(pill => {
            pill.addEventListener("click", () => {
                filterPills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");

                const category = pill.getAttribute("data-filter");

                reportCards.forEach(card => {
                    const cardCat = card.getAttribute("data-category") || "";
                    if (category === "all" || cardCat.toLowerCase().includes(category.toLowerCase())) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // 2. Search Filter
    const searchInput = document.getElementById("reports-search-input");
    if (searchInput && reportCards.length) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            reportCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(query) ? "block" : "none";
            });
        });
    }

    // 3. Upvote Click
    const upvoteButtons = document.querySelectorAll(".upvote-btn");
    upvoteButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const reportId = btn.getAttribute("data-id");
            if (!reportId || btn.classList.contains("upvoted")) return;

            try {
                const response = await fetch(`/api/upvote-report/${reportId}`, { method: "POST" });
                const data = await response.json();
                if (data.success) {
                    const countSpan = btn.querySelector(".upvote-count");
                    if (countSpan) countSpan.innerText = data.upvotes;
                    btn.classList.add("upvoted");
                    btn.style.color = "var(--danger)";
                    btn.style.borderColor = "var(--danger)";
                }
            } catch (err) {
                console.error("Upvote error:", err);
            }
        });
    });
}


/* --------------------------------------------------
   9. INCIDENT RESPONSE CHECKLISTS
   -------------------------------------------------- */
function initIncidentChecklists() {
    const checklistItems = document.querySelectorAll(".incident-check");
    checklistItems.forEach(item => {
        item.addEventListener("change", (e) => {
            const parent = item.closest(".incident-card");
            if (parent) {
                const total = parent.querySelectorAll(".incident-check").length;
                const checked = parent.querySelectorAll(".incident-check:checked").length;
                const bar = parent.querySelector(".incident-progress-bar");
                if (bar) {
                    bar.style.width = `${Math.round((checked / total) * 100)}%`;
                }
            }
        });
    });
}