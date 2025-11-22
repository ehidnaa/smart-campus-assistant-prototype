// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

    // ========== NAVIGATION ==========
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".app-section");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.section;

            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            sections.forEach(sec => {
                sec.classList.toggle("active", sec.id === target);
            });
        });
    });

    // ========== QUICK LINKS ==========
    document.querySelectorAll(".quick-links a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const sectionId = link.dataset.open;
            const targetBtn = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
            if (targetBtn) targetBtn.click();
        });
    });

    // ========== LOGIN ==========
    const loginForm = document.getElementById("login-form");
    const loginStatus = document.getElementById("login-status");
    const keepSessionCheckbox = document.getElementById("keep-session");

    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            const emailInput = document.getElementById("login-email");

            if (!emailInput.value.endsWith("@atu.ie")) {
                loginStatus.textContent = "Please use your ATU email (example@atu.ie).";
                loginStatus.className = "status-text error";
                return;
            }

            loginStatus.textContent = keepSessionCheckbox.checked
                ? `Logged in as ${emailInput.value} · session kept active.`
                : `Logged in as ${emailInput.value}.`;
            loginStatus.className = "status-text success";

            document.querySelector('.nav-btn[data-section="timetable"]').click();
        });
    }

    // ========== TIMETABLE FILTER ==========
    const dayFilter = document.getElementById("day-filter");
    const timetableRows = document.querySelectorAll("#timetable-body tr");

    if (dayFilter) {
        dayFilter.addEventListener("change", () => {
            const value = dayFilter.value;
            timetableRows.forEach(row => {
                const show = value === "all" || row.dataset.day === value;
                row.style.display = show ? "" : "none";
            });
        });
    }

    // ========== SPRINT 2: NEWS ==========
    const categoryButtons = document.querySelectorAll('.news-categories .chip');
    const newsCards = document.querySelectorAll('.news-card');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            categoryButtons.forEach(b => b.classList.remove('chip-active'));
            btn.classList.add('chip-active');

            newsCards.forEach(card => {
                const match = category === "all" || card.dataset.category === category;
                card.style.display = match ? "" : "none";
            });
        });
    });

    // DETAILS DATA
    const NEWS_DETAILS = {
        'news-1': { title: 'Library extended hours', body: 'From next week the library will be open until 10pm...' },
        'news-2': { title: 'New Student Hub portal', body: 'The new portal combines timetables, fees, support...' },
        'news-3': { title: 'IT Career Fair in Galway', body: 'Meet employers from international tech companies...' }
    };

    const EVENT_DETAILS = {
        'event-1': { title: 'First-year welcome meetup', body: 'Informal meetup for new students...' },
        'event-2': { title: 'Exam preparation workshop', body: 'Learn revision schedules and study techniques...' },
        'event-3': { title: 'Hackathon weekend', body: '24-hour hackathon with prizes and food...' }
    };

    // ========== NEWS DETAILS ==========
    const newsDetailsPanel = document.getElementById('news-details');
    const newsDetailsTitle = document.getElementById('news-details-title');
    const newsDetailsBody = document.getElementById('news-details-body');
    const closeNewsDetailsBtn = document.getElementById('close-news-details');

    document.querySelectorAll('[data-open-news]').forEach(btn => {
        btn.addEventListener('click', () => {
            const data = NEWS_DETAILS[btn.dataset.openNews];
            if (!data) return;
            newsDetailsTitle.textContent = data.title;
            newsDetailsBody.textContent = data.body;
            newsDetailsPanel.hidden = false;
            newsDetailsPanel.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (closeNewsDetailsBtn) {
        closeNewsDetailsBtn.addEventListener('click', () => {
            newsDetailsPanel.hidden = true;
        });
    }

    // ========== EVENT DETAILS ==========
    const eventDetailsPanel = document.getElementById('event-details');
    const eventDetailsTitle = document.getElementById('event-details-title');
    const eventDetailsBody = document.getElementById('event-details-body');
    const closeEventDetailsBtn = document.getElementById('close-event-details');

    document.querySelectorAll('[data-open-event]').forEach(btn => {
        btn.addEventListener('click', () => {
            const data = EVENT_DETAILS[btn.dataset.openEvent];
            if (!data) return;
            eventDetailsTitle.textContent = data.title;
            eventDetailsBody.textContent = data.body;
            eventDetailsPanel.hidden = false;
            eventDetailsPanel.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (closeEventDetailsBtn) {
        closeEventDetailsBtn.addEventListener('click', () => {
            eventDetailsPanel.hidden = true;
        });
    }

    // ========== CONTACTS ==========
    const contactSearch = document.getElementById("contact-search");
    const deptFilter = document.getElementById("department-filter");
    const contactCards = document.querySelectorAll(".contact-card");

    function updateContacts() {
        const query = (contactSearch?.value || "").toLowerCase();
        const dept = deptFilter?.value || "all";

        contactCards.forEach(card => {
            const matchesText = card.dataset.name.toLowerCase().includes(query);
            const matchesDept = dept === "all" || card.dataset.dept === dept;
            card.style.display = matchesText && matchesDept ? "" : "none";
        });
    }

    if (contactSearch && deptFilter) {
        contactSearch.addEventListener("input", updateContacts);
        deptFilter.addEventListener("change", updateContacts);
    }

    // PIN CONTACT
    document.querySelectorAll(".pin-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const pinned = btn.classList.toggle("pinned");
            btn.textContent = pinned ? "★" : "☆";
        });
    });
    
    const mapPlaceholder = document.querySelector(".map-placeholder");

    if (mapPlaceholder) {
    mapPlaceholder.addEventListener("click", () => {
        alert("Interactive map planned for Sprint 3.");
    });
    }

    // ========== ACCESSIBILITY ==========
    const accessibilityToggle = document.getElementById("accessibility-toggle");
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener("click", () =>
            document.body.classList.toggle("large-text")
        );
    }
});
