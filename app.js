document.addEventListener("DOMContentLoaded", () => {
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
});

// ========== CATEGORY BUTTONS ==========
const categoryButtons = document.querySelectorAll(".category-btn");
const eventItems = document.querySelectorAll(".event-item");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;

        eventItems.forEach(item => {
            if (category === "all" || item.dataset.category === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});


    // ========== QUICK LINKS ==========
    document.querySelectorAll(".quick-links a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const sectionId = link.dataset.open;
            const targetBtn = document.querySelector(
                `.nav-btn[data-section="${sectionId}"]`
            );
            if (targetBtn) targetBtn.click();
        });
    });

    // ========== LOGIN ==========
    const loginForm = document.getElementById("login-form");
    const loginStatus = document.getElementById("login-status");
    const keepSessionCheckbox = document.getElementById("keep-session");

    if (loginForm && loginStatus && keepSessionCheckbox) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            const emailInput = document.getElementById("login-email");
            if (!emailInput) return;

            const email = emailInput.value.trim();

            if (!email.endsWith("@atu.ie")) {
                loginStatus.textContent =
                    "Please use your ATU email (example@atu.ie).";
                loginStatus.className = "status-text error";
                return;
            }

            loginStatus.textContent = keepSessionCheckbox.checked
                ? `Logged in as ${email} · session kept active.`
                : `Logged in as ${email}.`;
            loginStatus.className = "status-text success";

            // after login Timetable
            const timetableBtn = document.querySelector(
                '.nav-btn[data-section="timetable"]'
            );
            if (timetableBtn) timetableBtn.click();
        });
    }

    // ========== TIMETABLE: FILTER BY DAY ==========
    const dayFilter = document.getElementById("day-filter");
    const timetableRows = document.querySelectorAll("#timetable-body tr");

    if (dayFilter && timetableRows.length) {
        dayFilter.addEventListener("change", () => {
            const value = dayFilter.value;
            timetableRows.forEach(row => {
                const rowDay = row.dataset.day;
                const show = value === "all" || value === rowDay;
                row.style.display = show ? "" : "none";
            });
        });
    }

    // ========== NEWS: VIEW DETAILS ==========
    const newsCards = document.querySelectorAll(".news-card");
    const newsDetails = document.getElementById("news-details");
    const newsDetailsTitle = document.getElementById("news-details-title");
    const newsDetailsBody = document.getElementById("news-details-body");

    if (newsCards.length && newsDetails && newsDetailsTitle && newsDetailsBody) {
        newsCards.forEach(card => {
            const btn = card.querySelector(".view-details-btn");
            if (!btn) return;

            btn.addEventListener("click", () => {
                const title =
                    card.dataset.title || card.querySelector("h3")?.textContent;
                newsDetailsTitle.textContent = title || "News details";
                newsDetailsBody.textContent =
                    "Extra information about: " +
                    (title || "this item") +
                    ". In a real app this text would come from the news API.";
                newsDetails.classList.remove("hidden");
                newsDetails.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    // ========== EVENTS: VIEW DETAILS ==========
    const eventButtons = document.querySelectorAll(".event-item");
    const eventDetails = document.getElementById("event-details");
    const eventDetailsTitle = document.getElementById("event-details-title");
    const eventDetailsWhen = document.getElementById("event-details-when");
    const eventDetailsDesc = document.getElementById("event-details-desc");

    if (
        eventButtons.length &&
        eventDetails &&
        eventDetailsTitle &&
        eventDetailsWhen &&
        eventDetailsDesc
    ) {
        eventButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                eventDetailsTitle.textContent = btn.dataset.title || "Event";
                eventDetailsWhen.textContent = btn.dataset.when || "";
                eventDetailsDesc.textContent = btn.dataset.desc || "";
                eventDetails.classList.remove("hidden");
                eventDetails.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }

    const detailsView = document.getElementById("details-view");
    const detailsTitle = document.getElementById("details-title");
    const detailsDescription = document.getElementById("details-description");
    const closeDetails = document.getElementById("close-details");
    const allDetailButtons = document.querySelectorAll(".details-btn");

    allDetailButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const parent = e.target.closest("[data-id], [data-target]");
        const id = parent.dataset.id || parent.dataset.target;

        // Fake placeholder content
        detailsTitle.textContent = "Details for: " + id;
        detailsDescription.textContent = "This is a placeholder description for " + id + ".";

        detailsView.classList.remove("details-hidden");
    });
    });

closeDetails.addEventListener("click", () => {
    detailsView.classList.add("details-hidden");
    });


    // ========== CONTACTS: SEARCH + FILTER ==========
    const contactSearch = document.getElementById("contact-search");
    const deptFilter = document.getElementById("department-filter");
    const contactCards = document.querySelectorAll(".contact-card");

    function updateContactsVisibility() {
        const query = (contactSearch?.value || "").toLowerCase();
        const dept = deptFilter?.value || "all";

        contactCards.forEach(card => {
            const name = (card.dataset.name || "").toLowerCase();
            const cardDept = card.dataset.dept || "all";
            const matchesText = name.includes(query);
            const matchesDept = dept === "all" || dept === cardDept;
            card.style.display = matchesText && matchesDept ? "" : "none";
        });
    }

    if (contactSearch && deptFilter && contactCards.length) {
        contactSearch.addEventListener("input", updateContactsVisibility);
        deptFilter.addEventListener("change", updateContactsVisibility);
    }

    // Pin favourites (☆ → ★)
    document.querySelectorAll(".pin-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const pinned = btn.classList.toggle("pinned");
            btn.textContent = pinned ? "★" : "☆";
        });
    });

    // ========== ACCESSIBILITY: A+ ==========
    const accessibilityToggle = document.getElementById("accessibility-toggle");
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener("click", () => {
            document.body.classList.toggle("large-text");
        });
    }
});
