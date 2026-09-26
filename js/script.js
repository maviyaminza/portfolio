// ============================
// Mobile Menu
// ============================

const menuToggle = document.querySelector(".navbar-toggler");
const navLinks = document.querySelector(".navbar-collapse");


// ============================
// Scroll Animation
// ============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach((section) => {

    section.classList.add("hidden");
    observer.observe(section);

});


// ============================
// Contact Form Validation
// ============================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        const name = document.getElementById("contactName");
        const email = document.getElementById("contactEmail");
        const message = document.getElementById("contactMessage");

        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const messageValue = message.value.trim();

        // Check empty fields
        if (nameValue === "" || emailValue === "" || messageValue === "") {

            event.preventDefault();

            alert("Please fill in all fields.");

            return;
        }

        // Check email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            event.preventDefault();

            alert("Please enter a valid email address.");

            return;
        }

        // If everything is valid,
        // allow the form to submit normally.

    });

}


// ============================
// Clear Contact Form on Page Load
// ============================

window.addEventListener("pageshow", () => {

    if (contactForm) {
        contactForm.reset();
    }

});
// ============================
// Back to Top Button
// ============================

const backToTop = document.createElement("button");

backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = "back-to-top";
backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

// Show button when scrolling down
window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

// Scroll back to Home when clicked
backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ============================
// Fetch Project Data
// ============================

const projectsContainer = document.getElementById("projects-container");

fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {

        projectsContainer.innerHTML = "";

        projects.forEach((project) => {

            const projectCard = document.createElement("div");

            projectCard.className = "project-card col-12 col-md-6";
            projectCard.dataset.category = project.category;

            projectCard.innerHTML = `
                <div class="project-images">

                    <a href="${project.images[0].src}" target="_blank" rel="noopener noreferrer">
                        <img
                            src="${project.images[0].src}"
                            alt="${project.images[0].alt}"
                        >
                    </a>

                    <a href="${project.images[1].src}" target="_blank" rel="noopener noreferrer">
                        <img
                            src="${project.images[1].src}"
                            alt="${project.images[1].alt}"
                        >
                    </a>

                </div>

                <div class="project-content">

                    <h3>${project.name}</h3>

                    <div class="tech-stack">
                        ${project.technologies
                            .map((tech) => `<span>${tech}</span>`)
                            .join("")}
                    </div>

                    <p>${project.description}</p>

                    <div class="project-buttons">

                        <a
                            href="${project.liveDemo}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-primary primary-btn"
                        >
                            Live Demo
                        </a>

                        <a
                            href="${project.github}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-outline-primary secondary-btn"
                        >
                            GitHub
                        </a>

                    </div>

                </div>
            `;

            projectsContainer.appendChild(projectCard);
        });

        // Re-enable project filtering after cards are loaded
        const loadedProjectCards =
            document.querySelectorAll(".project-card");

        filterButtons.forEach((button) => {

            button.addEventListener("click", () => {

                const selectedFilter = button.dataset.filter;

                filterButtons.forEach((btn) => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                loadedProjectCards.forEach((project) => {

                    const projectCategory =
                        project.dataset.category;

                    if (
                        selectedFilter === "all" ||
                        projectCategory === selectedFilter
                    ) {
                        project.classList.remove("filter-hidden");
                    } else {
                        project.classList.add("filter-hidden");
                    }

                });

            });

        });

    })
    .catch((error) => {
        console.error("Error loading projects:", error);
    });