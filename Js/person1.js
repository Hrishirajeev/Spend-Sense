const menuBtn = document.getElementById("p1MenuBtn");
const navLinks = document.getElementById("p1NavLinks");
const themeBtn = document.getElementById("p1ThemeBtn");

const body = document.getElementById("body");
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo");

const links = document.querySelectorAll(".nav-link");

// Mobile menu
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("hidden");
});

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.add("hidden");
    });
});

// Theme
function setTheme(theme) {

    const isLight = theme === "light";

    document.querySelectorAll("*").forEach(function (element) {

        // Reset inline colors first
        element.style.backgroundColor = "";
        element.style.color = "";
        element.style.borderColor = "";

        if (isLight) {
            return;
        }

        // DARK MODE

        // Backgrounds
        if (element.classList.contains("bg-[#f7f8f3]")) {
            element.style.backgroundColor = "#0d1916";
        }

        if (element.classList.contains("bg-white")) {
            element.style.backgroundColor = "#13221e";
        }

        if (element.classList.contains("bg-[#eef1e9]")) {
            element.style.backgroundColor = "#19372f";
        }

        // Text
        if (element.classList.contains("text-[#14221b]")) {
            element.style.color = "#edf5f1";
        }

        if (element.classList.contains("text-[#60756b]")) {
            element.style.color = "#91a59d";
        }

        // Borders
        if (element.classList.contains("border-[#dce2d9]")) {
            element.style.borderColor = "#263832";
        }
    });

    // Navbar
    if (!isLight) {
        navbar.style.backgroundColor = "#0d1916";
        navbar.style.borderColor = "#263832";

        logo.style.color = "#edf5f1";
        themeBtn.style.color = "#edf5f1";
        menuBtn.style.color = "#edf5f1";

        document.querySelectorAll("#navbar .nav-link").forEach(function (link) {
            link.style.color = "#edf5f1";
        });
    } else {
        navbar.style.backgroundColor = "";
        navbar.style.borderColor = "";

        logo.style.color = "";
        themeBtn.style.color = "";
        menuBtn.style.color = "";

        document.querySelectorAll("#navbar .nav-link").forEach(function (link) {
            link.style.color = "";
        });
    }

    localStorage.setItem("spendsense_theme", theme);
}


themeBtn.addEventListener("click", function () {

    const currentTheme =
        localStorage.getItem("spendsense_theme") || "light";

    const newTheme =
        currentTheme === "light" ? "dark" : "light";

    setTheme(newTheme);
});


// Load saved theme
const savedTheme =
    localStorage.getItem("spendsense_theme") || "light";

setTheme(savedTheme);

// Active navigation while scrolling
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            const currentId = entry.target.id;

            links.forEach(function (link) {
                const target = link.getAttribute("href");

                if (target === "#" + currentId) {
                    link.classList.add(
                        "text-[#52bea0]",
                        "font-semibold"
                    );
                } else {
                    link.classList.remove(
                        "text-[#52bea0]",
                        "font-semibold"
                    );
                }
            });
        });
    },
    {
        threshold: 0.35
    }
);

sections.forEach(function (section) {
    observer.observe(section);
});