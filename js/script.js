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
// Project Filter
// ============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Change active button
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filter projects
        projectCards.forEach((project) => {

            const projectCategory = project.dataset.category;

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