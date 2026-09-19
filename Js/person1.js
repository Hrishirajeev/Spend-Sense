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

// =================================
// HERO ELEMENTS
// =================================

var heroTitle = document.getElementById("heroTitle");
var heroText = document.getElementById("heroText");
var heroSecondaryBtn = document.getElementById("heroSecondaryBtn");
var heroCard = document.getElementById("heroCard");
var heroCircleInner = document.getElementById("heroCircleInner");
var heroMonth = document.getElementById("heroMonth");
var heroCardText = document.getElementById("heroCardText");



function setHeroTheme(theme) {

    if (theme === "dark") {

        heroTitle.style.setProperty("color", "#edf5f1", "important");
        heroText.style.setProperty("color", "#91a59d", "important");

        heroSecondaryBtn.style.setProperty("border-color", "#263832", "important");
        heroSecondaryBtn.style.setProperty("color", "#edf5f1", "important");

        heroCard.style.setProperty("background-color", "#142420", "important");
        heroCard.style.setProperty("border-color", "#263832", "important");

        heroCircleInner.style.setProperty("background-color", "#142420", "important");

        heroMonth.style.setProperty("color", "#91a59d", "important");

        heroCardText.style.setProperty("color", "#91a59d", "important");
        heroCardText.style.setProperty("border-top-color", "#263832", "important");
        heroSecondaryBtn.style.setProperty("border-color", "#263832", "important");

    heroSecondaryBtn.onmouseover = function() {
    this.style.setProperty("border-color", "#ffffff", "important");
    };

heroSecondaryBtn.onmouseout = function() {
    this.style.setProperty("border-color", "#263832", "important");
};

    } else {

        heroTitle.style.setProperty("color", "#14241f", "important");
        heroText.style.setProperty("color", "#5b6b65", "important");

        heroSecondaryBtn.style.setProperty("border-color", "#dce5df", "important");
        heroSecondaryBtn.style.setProperty("color", "#14241f", "important");

        heroCard.style.setProperty("background-color", "#ffffff", "important");
        heroCard.style.setProperty("border-color", "#dce5df", "important");

        heroCircleInner.style.setProperty("background-color", "#ffffff", "important");

        heroMonth.style.setProperty("color", "#5b6b65", "important");

        heroCardText.style.setProperty("color", "#5b6b65", "important");
        heroCardText.style.setProperty("border-top-color", "#dce5df", "important");

        heroSecondaryBtn.style.setProperty("border-color", "#dce5df", "important");

heroSecondaryBtn.onmouseover = function() {
    this.style.setProperty("border-color", "#000000", "important");
};

heroSecondaryBtn.onmouseout = function() {
    this.style.setProperty("border-color", "#dce5df", "important");
};
    }
}


function setTheme(theme) {

    if (theme === "dark") {

        body.classList.remove(
            "bg-[#f5f7f5]",
            "text-[#14241f]"
        );

        body.classList.add(
            "bg-[#0d1916]",
            "text-[#edf5f1]"
        );


        navbar.classList.remove(
            "bg-[#f5f7f5]",
            "border-[#dce5df]"
        );

        navbar.classList.add(
            "bg-[#0d1916]",
            "border-[#263832]"
        );


        logo.classList.remove("text-[#14241f]");
        logo.classList.add("text-[#edf5f1]");


        navLinks.classList.remove(
            "max-[900px]:bg-[#f5f7f5]",
            "max-[900px]:border-[#dce5df]"
        );

        navLinks.classList.add(
            "max-[900px]:bg-[#0d1916]",
            "max-[900px]:border-[#263832]"
        );


        links.forEach(function(link) {
            link.classList.remove("text-[#14241f]");
            link.classList.add("text-[#91a59d]");
        });


        themeBtn.classList.remove("text-[#14241f]");
        themeBtn.classList.add("text-[#edf5f1]");


        menuBtn.classList.remove("text-[#14241f]");
        menuBtn.classList.add("text-[#edf5f1]");


        setHeroTheme("dark");

    } else {

        body.classList.remove(
            "bg-[#0d1916]",
            "text-[#edf5f1]"
        );

        body.classList.add(
            "bg-[#f5f7f5]",
            "text-[#14241f]"
        );


        navbar.classList.remove(
            "bg-[#0d1916]",
            "border-[#263832]"
        );

        navbar.classList.add(
            "bg-[#f5f7f5]",
            "border-[#dce5df]"
        );


        logo.classList.remove("text-[#edf5f1]");
        logo.classList.add("text-[#14241f]");


        navLinks.classList.remove(
            "max-[900px]:bg-[#0d1916]",
            "max-[900px]:border-[#263832]"
        );

        navLinks.classList.add(
            "max-[900px]:bg-[#f5f7f5]",
            "max-[900px]:border-[#dce5df]"
        );


        links.forEach(function(link) {
            link.classList.remove("text-[#91a59d]");
            link.classList.add("text-[#14241f]");
        });


        themeBtn.classList.remove("text-[#edf5f1]");
        themeBtn.classList.add("text-[#14241f]");


        menuBtn.classList.remove("text-[#edf5f1]");
        menuBtn.classList.add("text-[#14241f]");


        setHeroTheme("light");
    }

    localStorage.setItem("spendsense_theme", theme);
}


// THEME BUTTON

themeBtn.addEventListener("click", function() {

    var currentTheme = localStorage.getItem("spendsense_theme");

    if (currentTheme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }

});


// LOAD SAVED THEME

var savedTheme = localStorage.getItem("spendsense_theme");

if (savedTheme === "dark") {
    setTheme("dark");
} else {
    setTheme("light");
}