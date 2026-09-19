var menuBtn = document.getElementById("p1MenuBtn");
var navLinks = document.getElementById("p1NavLinks");
var themeBtn = document.getElementById("p1ThemeBtn");

var body = document.getElementById("body");
var navbar = document.getElementById("navbar");
var logo = document.getElementById("logo");

var links = document.querySelectorAll(".nav-link");

// MOBILE MENU

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("max-[900px]:hidden");
});

// NAV LINK CLICK

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.add("max-[900px]:hidden");
    });
});

// THEME BUTTON

themeBtn.addEventListener("click", function () {

    var isLight = body.classList.contains("bg-[#f5f7f5]");

    // LIGHT → DARK

    if (isLight) {

        // BODY
        body.classList.remove("bg-[#f5f7f5]", "text-[#14241f]");
        body.classList.add("bg-[#0d1916]", "text-[#edf5f1]");

        // NAVBAR
        navbar.classList.remove("bg-[#f5f7f5]", "border-[#dce5df]");
        navbar.classList.add("bg-[#0d1916]", "border-[#263832]");

        // LOGO
        logo.classList.remove("text-[#14241f]");
        logo.classList.add("text-[#edf5f1]");

        // MOBILE MENU
        navLinks.classList.remove(
            "max-[900px]:bg-[#f5f7f5]",
            "max-[900px]:border-[#dce5df]"
        );
        navLinks.classList.add(
            "max-[900px]:bg-[#0d1916]",
            "max-[900px]:border-[#263832]"
        );

        // NAV LINKS
        links.forEach(function (link) {
            link.classList.remove("text-[#14241f]");
            link.classList.add("text-[#91a59d]");
        });

        // THEME BUTTON
        themeBtn.classList.remove("text-[#14241f]");
        themeBtn.classList.add("text-[#edf5f1]");

        // MENU BUTTON
        menuBtn.classList.remove("text-[#14241f]");
        menuBtn.classList.add("text-[#edf5f1]");

        // SAVE DARK MODE
        localStorage.setItem("spendsense_theme", "dark");

    }

    // DARK → LIGHT

    else {

        // BODY
        body.classList.remove("bg-[#0d1916]", "text-[#edf5f1]");
        body.classList.add("bg-[#f5f7f5]", "text-[#14241f]");

        // NAVBAR
        navbar.classList.remove("bg-[#0d1916]", "border-[#263832]");
        navbar.classList.add("bg-[#f5f7f5]", "border-[#dce5df]");

        // LOGO
        logo.classList.remove("text-[#edf5f1]");
        logo.classList.add("text-[#14241f]");

        // MOBILE MENU
        navLinks.classList.remove(
            "max-[900px]:bg-[#0d1916]",
            "max-[900px]:border-[#263832]"
        );
        navLinks.classList.add(
            "max-[900px]:bg-[#f5f7f5]",
            "max-[900px]:border-[#dce5df]"
        );

        // NAV LINKS
        links.forEach(function (link) {
            link.classList.remove("text-[#91a59d]");
            link.classList.add("text-[#14241f]");
        });

        // THEME BUTTON
        themeBtn.classList.remove("text-[#edf5f1]");
        themeBtn.classList.add("text-[#14241f]");

        // MENU BUTTON
        menuBtn.classList.remove("text-[#edf5f1]");
        menuBtn.classList.add("text-[#14241f]");

        // SAVE LIGHT MODE
        localStorage.setItem("spendsense_theme", "light");
    }
});

// LOAD SAVED THEME

var savedTheme = localStorage.getItem("spendsense_theme");

if (savedTheme === "light") {

    // BODY
    body.classList.remove("bg-[#0d1916]", "text-[#edf5f1]");
    body.classList.add("bg-[#f5f7f5]", "text-[#14241f]");

    // NAVBAR
    navbar.classList.remove("bg-[#0d1916]", "border-[#263832]");
    navbar.classList.add("bg-[#f5f7f5]", "border-[#dce5df]");

    // LOGO
    logo.classList.remove("text-[#edf5f1]");
    logo.classList.add("text-[#14241f]");

    // MOBILE MENU
    navLinks.classList.remove(
        "max-[900px]:bg-[#0d1916]",
        "max-[900px]:border-[#263832]"
    );
    navLinks.classList.add(
        "max-[900px]:bg-[#f5f7f5]",
        "max-[900px]:border-[#dce5df]"
    );

    // NAV LINKS
    links.forEach(function (link) {
        link.classList.remove("text-[#91a59d]");
        link.classList.add("text-[#14241f]");
    });

    // THEME BUTTON
    themeBtn.classList.remove("text-[#edf5f1]");
    themeBtn.classList.add("text-[#14241f]");

    // MENU BUTTON
    menuBtn.classList.remove("text-[#edf5f1]");
    menuBtn.classList.add("text-[#14241f]");
}