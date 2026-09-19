// Person 1 JavaScript
// Handles:
// 1. Mobile menu
// 2. Dark / light mode
// 3. Saved theme choice
// 4. Active navigation link while scrolling

const menuBtn = document.getElementById("p1MenuBtn");
const navLinks = document.getElementById("p1NavLinks");
const themeBtn = document.getElementById("p1ThemeBtn");

const body = document.getElementById("body");
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo");

const links = document.querySelectorAll(".nav-link");


// -----------------------------
// MOBILE MENU
// -----------------------------

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("max-[900px]:hidden");
});


// Close mobile menu after clicking a link

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.add("max-[900px]:hidden");
    });
});


// -----------------------------
// THEME
// -----------------------------

function setTheme(theme) {

    const isLight = theme === "light";

    if (isLight) {

        // Body
        body.classList.remove(
            "bg-[#0d1916]",
            "text-[#edf5f1]"
        );

        body.classList.add(
            "bg-[#f5f7f5]",
            "text-[#14241f]"
        );


        // Navbar
        navbar.classList.remove(
            "bg-[#0d1916]",
            "border-[#263832]"
        );

        navbar.classList.add(
            "bg-[#f5f7f5]",
            "border-[#dce5df]"
        );


        // Logo
        logo.classList.remove("text-[#edf5f1]");
        logo.classList.add("text-[#14241f]");


        // Mobile menu
        navLinks.classList.remove(
            "max-[900px]:bg-[#0d1916]",
            "max-[900px]:border-[#263832]"
        );


        navLinks.classList.add(
            "max-[900px]:bg-[#f5f7f5]",
            "max-[900px]:border-[#dce5df]"
        );


        // Navigation links
        links.forEach(function (link) {
            link.classList.remove("text-[#91a59d]");
            link.classList.add("text-[#14241f]");
        });


        // Buttons
        themeBtn.classList.remove("text-[#edf5f1]");
        themeBtn.classList.add("text-[#14241f]");

        menuBtn.classList.remove("text-[#edf5f1]");
        menuBtn.classList.add("text-[#14241f]");

    } else {

        // Body
        body.classList.remove(
            "bg-[#f5f7f5]",
            "text-[#14241f]"
        );

        body.classList.add(
            "bg-[#0d1916]",
            "text-[#edf5f1]"
        );


        // Navbar
        navbar.classList.remove(
            "bg-[#f5f7f5]",
            "border-[#dce5df]"
        );

        navbar.classList.add(
            "bg-[#0d1916]",
            "border-[#263832]"
        );


        // Logo
        logo.classList.remove("text-[#14241f]");
        logo.classList.add("text-[#edf5f1]");


        // Mobile menu
        navLinks.classList.remove(
            "max-[900px]:bg-[#f5f7f5]",
            "max-[900px]:border-[#dce5df]"
        );

        navLinks.classList.add(
            "max-[900px]:bg-[#0d1916]",
            "max-[900px]:border-[#263832]"
        );


        // Navigation links
        links.forEach(function (link) {
            link.classList.remove("text-[#14241f]");
            link.classList.add("text-[#91a59d]");
        });


        // Buttons
        themeBtn.classList.remove("text-[#14241f]");
        themeBtn.classList.add("text-[#edf5f1]");

        menuBtn.classList.remove("text-[#14241f]");
        menuBtn.classList.add("text-[#edf5f1]");
    }

    // Save user's choice
    localStorage.setItem("spendsense_theme", theme);
}


// Theme button

themeBtn.addEventListener("click", function () {

    const currentTheme =
        localStorage.getItem("spendsense_theme") || "dark";

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    setTheme(newTheme);
});


// Load saved theme when page opens

const savedTheme =
    localStorage.getItem("spendsense_theme") || "dark";

setTheme(savedTheme);


// -----------------------------
// ACTIVE NAVIGATION LINK
// -----------------------------

const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                links.forEach(function (link) {

                    const linkTarget =
                        link.getAttribute("href");

                    if (linkTarget === "#" + currentId) {

                        link.classList.add(
                            "text-[#52bea0]",
                            "font-semibold"
                        );

                        link.classList.remove(
                            "text-[#91a59d]",
                            "text-[#14241f]"
                        );

                    } else {

                        link.classList.remove(
                            "text-[#52bea0]",
                            "font-semibold"
                        );

                        const theme =
                            localStorage.getItem(
                                "spendsense_theme"
                            ) || "dark";

                        if (theme === "light") {
                            link.classList.add(
                                "text-[#14241f]"
                            );
                        } else {
                            link.classList.add(
                                "text-[#91a59d]"
                            );
                        }
                    }
                });
            }
        });
    },
    {
        threshold: 0.35
    }
);


// Watch page sections

sections.forEach(function (section) {
    sectionObserver.observe(section);
});