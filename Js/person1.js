/* ================================
   MOBILE MENU
================================ */

var menuBtn =
    document.getElementById("p1MenuBtn");

var navLinks =
    document.getElementById("p1NavLinks");


menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("open");

});



/* ================================
   CLOSE MOBILE MENU
================================ */

var navItems =
    navLinks.querySelectorAll("a");


navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

    });

}); 

/* ================================
   DARK / LIGHT MODE
================================ */

var themeBtn =
    document.getElementById("p1ThemeBtn");


themeBtn.addEventListener("click", function () {

    var currentTheme =
        document.documentElement.getAttribute("data-theme");


    if (currentTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "spendsense_theme",
            "dark"
        );

    }

    else {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        localStorage.setItem(
            "spendsense_theme",
            "light"
        );

    }

});



/* ================================
   LOAD SAVED MODE
================================ */

var savedTheme =
    localStorage.getItem("spendsense_theme");


if (savedTheme) {

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

}