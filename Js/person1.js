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

    const colorMap = isLight
        ? {
            "bg-[#0d1916]": "bg-[#f5f7f5]",
            "bg-[#101d1a]": "bg-[#eef3f0]",
            "bg-[#13221e]": "bg-white",
            "bg-[#19372f]": "bg-[#e1eee9]",
            "bg-[#0a1412]": "bg-[#e8eeeb]",

            "text-[#edf5f1]": "text-[#14241f]",
            "text-[#91a59d]": "text-[#5f716a]",

            "border-[#263832]": "border-[#d3ded9]",
            "border-[#365048]": "border-[#b9cbc3]"
        }
        : {
            "bg-[#f5f7f5]": "bg-[#0d1916]",
            "bg-[#eef3f0]": "bg-[#101d1a]",
            "bg-white": "bg-[#13221e]",
            "bg-[#e1eee9]": "bg-[#19372f]",
            "bg-[#e8eeeb]": "bg-[#0a1412]",

            "text-[#14241f]": "text-[#edf5f1]",
            "text-[#5f716a]": "text-[#91a59d]",

            "border-[#d3ded9]": "border-[#263832]",
            "border-[#b9cbc3]": "border-[#365048]"
        };

    document.querySelectorAll("*").forEach(function (element) {
        Object.entries(colorMap).forEach(function ([oldClass, newClass]) {
            if (element.classList.contains(oldClass)) {
                element.classList.remove(oldClass);
                element.classList.add(newClass);
            }
        });
    });

    localStorage.setItem("spendsense_theme", theme);
}

themeBtn.addEventListener("click", function () {
    const currentTheme =
        localStorage.getItem("spendsense_theme") || "dark";

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    setTheme(newTheme);
});

// Load saved theme
const savedTheme =
    localStorage.getItem("spendsense_theme") || "dark";

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