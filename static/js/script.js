document.addEventListener("DOMContentLoaded", function () {
    
    /* =====================================================
       INTRO OVERLAY LOADER
       ===================================================== */
    const loader = document.getElementById("introLoader");
    if (loader) {
        // Check if intro has already run in this session
        if (sessionStorage.getItem("phishguard_intro_shown")) {
            loader.remove();
        } else {
            // Play animated intro, then hide and store session state
            setTimeout(function () {
                loader.classList.add("hide");
                sessionStorage.setItem("phishguard_intro_shown", "true");
                setTimeout(function () {
                    loader.remove();
                }, 800);
            }, 2500);
        }
    }

    /* =====================================================
       MOBILE NAVIGATION DRAWER
       ===================================================== */
    window.toggleMenu = function () {
        const menu = document.querySelector(".nav-links");
        if (menu) {
            menu.classList.toggle("open");
        }
    };

    // Close menu when clicking links
    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            const menu = document.querySelector(".nav-links");
            if (menu) {
                menu.classList.remove("open");
            }
        });
    });

    /* =====================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ===================================================== */
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(function (el) {
            el.classList.add("in");
        });
    }

    /* =====================================================
       TAB SYSTEM SELECTOR
       ===================================================== */
    window.switchTab = function (tabId) {
        // Remove active class from buttons
        document.querySelectorAll(".tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        
        // Hide all tab contents
        document.querySelectorAll(".tab-content").forEach(content => {
            content.classList.remove("active");
        });

        // Add active to current button
        const clickedBtn = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
        if (clickedBtn) clickedBtn.classList.add("active");

        // Show current tab content
        const activeTab = document.getElementById(tabId);
        if (activeTab) activeTab.classList.add("active");
    };

    // Parse URL query parameter to pre-select a tab (for redirect compatibility)
    const urlParams = new URLSearchParams(window.location.search);
    const targetTab = urlParams.get("tab");
    if (targetTab === "message") {
        switchTab("message-tab");
    } else if (targetTab === "url") {
        switchTab("url-tab");
    }

    /* =====================================================
       URL SCAN AJAX LOGIC
       ===================================================== */
    window.runUrlScan = function (event) {
        event.preventDefault();
        
        const urlInput = document.getElementById("scan-url");
        const loader = document.getElementById("urlLoader");
        const resultPanel = document.getElementById("urlResult");
        const btn = document.getElementById("urlScanBtn");
        
        const scanUrl = urlInput.value.strip ? urlInput.value.strip() : urlInput.value.trim();
        if (!scanUrl) return;

        // Reset UI state
        resultPanel.style.display = "none";
        loader.style.display = "flex";
        btn.disabled = true;

        fetch("/api/scan/url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: scanUrl })
        })
        .then(response => {
            if (!response.ok) throw new Error("HTTP Network Error");
            return response.json();
        })
        .then(data => {
            loader.style.display = "none";
            btn.disabled = false;
            
            // Populate score
            const score = data.score;
            const scoreValEl = document.getElementById("urlScoreVal");
            scoreValEl.textContent = `${score}%`;
            
            // Animate SVG Gauge
            const gaugeFill = document.getElementById("urlGaugeFill");
            const circumference = 251.2; // 2 * pi * r (r=40)
            const offset = circumference - (circumference * score) / 100;
            gaugeFill.style.strokeDashoffset = offset;
            
            // Set Gauge color
            let color = "var(--neon-green)";
            let badgeClass = "badge-safe";
            if (score >= 65) {
                color = "var(--neon-red)";
                badgeClass = "badge-danger";
            } else if (score >= 35) {
                color = "var(--neon-orange)";
                badgeClass = "badge-warn";
            }
            gaugeFill.style.stroke = color;
            scoreValEl.style.color = color;
            
            // Set Verdict text
            const verdictEl = document.getElementById("urlVerdict");
            verdictEl.textContent = data.level;
            verdictEl.className = ""; // clear
            verdictEl.style.color = color;
            
            // Set details summary
            const summaryEl = document.getElementById("urlSummaryText");
            if (score >= 65) {
                summaryEl.textContent = "CRITICAL: Multiple high-risk heuristics detected. Do not log credentials or share details with this site.";
            } else if (score >= 35) {
                summaryEl.textContent = "SUSPICIOUS: Warning indicators flagged. Inspect domains and check for character changes carefully.";
            } else {
                summaryEl.textContent = "SAFE: No malicious signatures matched. Domain DNS records appear active and clean.";
            }
            
            // Populate Red Flags List
            const listEl = document.getElementById("urlFlagsList");
            listEl.innerHTML = "";
            
            data.reasons.forEach(reason => {
                const li = document.createElement("li");
                li.textContent = reason;
                if (score < 35) {
                    li.className = "flag-safe";
                }
                listEl.appendChild(li);
            });

            // Display Results
            resultPanel.style.display = "block";
            
            // Dynamic Updates to Dashboard Stats & Logs
            updateDashboardMetrics(score, data.level, "url", scanUrl, badgeClass);
        })
        .catch(err => {
            loader.style.display = "none";
            btn.disabled = false;
            alert("Scan failed. Please verify your connection and try again.");
        });
    };

    /* =====================================================
       MESSAGE ANALYZER AJAX LOGIC
       ===================================================== */
    window.runMessageScan = function (event) {
        event.preventDefault();
        
        const msgTextarea = document.getElementById("scan-message");
        const loader = document.getElementById("msgLoader");
        const resultPanel = document.getElementById("msgResult");
        const btn = document.getElementById("msgScanBtn");
        
        const messageText = msgTextarea.value.trim();
        if (!messageText) return;

        // Reset UI state
        resultPanel.style.display = "none";
        loader.style.display = "flex";
        btn.disabled = true;

        fetch("/api/scan/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: messageText })
        })
        .then(response => {
            if (!response.ok) throw new Error("HTTP Network Error");
            return response.json();
        })
        .then(data => {
            loader.style.display = "none";
            btn.disabled = false;
            
            // Populate score
            const score = data.score;
            const scoreValEl = document.getElementById("msgScoreVal");
            scoreValEl.textContent = `${score}%`;
            
            // Animate SVG Gauge
            const gaugeFill = document.getElementById("msgGaugeFill");
            const circumference = 251.2;
            const offset = circumference - (circumference * score) / 100;
            gaugeFill.style.strokeDashoffset = offset;
            
            // Set Gauge color
            let color = "var(--neon-green)";
            let badgeClass = "badge-safe";
            if (score >= 60) {
                color = "var(--neon-red)";
                badgeClass = "badge-danger";
            } else if (score >= 30) {
                color = "var(--neon-orange)";
                badgeClass = "badge-warn";
            }
            gaugeFill.style.stroke = color;
            scoreValEl.style.color = color;
            
            // Set Verdict text
            const verdictEl = document.getElementById("msgVerdict");
            verdictEl.textContent = data.level;
            verdictEl.className = "";
            verdictEl.style.color = color;
            
            // Set recommendation text
            const recEl = document.getElementById("msgRecText");
            recEl.textContent = data.recommendation;
            
            // Populate Triggers List
            const listEl = document.getElementById("msgTriggersList");
            listEl.innerHTML = "";
            
            if (data.detected && data.detected.length > 0) {
                data.detected.forEach(trigger => {
                    const li = document.createElement("li");
                    li.textContent = `⚠️ ${trigger}`;
                    listEl.appendChild(li);
                });
            } else {
                const li = document.createElement("li");
                li.className = "flag-safe";
                li.textContent = "No linguistic indicators flagged.";
                listEl.appendChild(li);
            }

            // Display Results
            resultPanel.style.display = "block";
            
            // Dynamic Updates to Dashboard Stats & Logs
            const displaySnippet = messageText.length > 50 ? messageText.substring(0, 50) + "..." : messageText;
            updateDashboardMetrics(score, data.level, "msg", displaySnippet, badgeClass);
        })
        .catch(err => {
            loader.style.display = "none";
            btn.disabled = false;
            alert("Analysis failed. Please verify your connection and try again.");
        });
    };

    /* =====================================================
       REAL-TIME STATS UPDATES ON PAGE
       ==================================================== */
    function updateDashboardMetrics(score, level, type, content, badgeClass) {
        // 1. Increment total analysis count widget
        const totalEl = document.getElementById("stat-total");
        if (totalEl) {
            let total = parseInt(totalEl.textContent) || 0;
            totalEl.textContent = total + 1;
        }

        // 2. Adjust safe or threat counters
        if (level === "Safe") {
            const safeEl = document.getElementById("stat-safe");
            if (safeEl) {
                let safe = parseInt(safeEl.textContent) || 0;
                safeEl.textContent = safe + 1;
            }
        } else {
            const threatEl = document.getElementById("stat-threats");
            if (threatEl) {
                let threat = parseInt(threatEl.textContent) || 0;
                threatEl.textContent = threat + 1;
            }
        }

        // 3. Prepend to Recent Scans List panel
        const scansList = document.getElementById("recentScansList");
        if (scansList) {
            const noHist = scansList.querySelector(".no-history");
            if (noHist) noHist.remove();
            
            // Format hours:minutes
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            // Create list element
            const li = document.createElement("li");
            li.className = "history-item";
            
            const badgeTypeIcon = type === "url" ? "link" : "mail";
            const badgeTypeLabel = type === "url" ? "URL" : "MSG";
            const badgeTypeClass = type === "url" ? "url-badge" : "msg-badge";
            
            li.innerHTML = `
                <div class="history-type">
                    <span class="type-badge ${badgeTypeClass}"><i data-lucide="${badgeTypeIcon}"></i> ${badgeTypeLabel}</span>
                    <span class="history-time">${timeStr}</span>
                </div>
                <div class="history-content-val text-truncate" title="${content}">
                    ${content}
                </div>
                <div class="history-meta">
                    <span class="badge ${badgeClass}">${level} (${score}%)</span>
                </div>
            `;
            
            // Re-render Lucide Icons for the new elements
            scansList.insertBefore(li, scansList.firstChild);
            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
            
            // Maintain max 10 records shown
            if (scansList.children.length > 10) {
                scansList.lastChild.remove();
            }
        }
    }
});