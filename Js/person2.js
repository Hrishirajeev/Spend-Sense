document.addEventListener("DOMContentLoaded", () => {
    /*
     * Smooth scrolling
     * Makes navigation feel connected instead of jumping between sections.
     */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /*
     * Section reveal
     * Sections/cards gently appear as the user reaches them.
     */
    const revealItems = document.querySelectorAll(
        "section > div, section article"
    );

    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(35px)";
        item.style.transition =
            "opacity 700ms ease, transform 700ms ease";
    });


    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );


    revealItems.forEach(item => {
        revealObserver.observe(item);
    });
});