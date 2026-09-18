document.addEventListener("DOMContentLoaded", function () {
    // Get the elements we need from the HTML
    const subscriptionForm = document.getElementById("subscriptionForm");
    const serviceName = document.getElementById("serviceName");
    const servicePrice = document.getElementById("servicePrice");
    const serviceCategory = document.getElementById("serviceCategory");
    const serviceUsage = document.getElementById("serviceUsage");

    const subscriptionList = document.getElementById("subscriptionList");
    const clearSubscriptions = document.getElementById("clearSubscriptions");

    const monthlyTotal = document.getElementById("monthlyTotal");
    const yearlyTotal = document.getElementById("yearlyTotal");
    const unusedTotal = document.getElementById("unusedTotal");

    const savingPercent = document.getElementById("savingPercent");
    const savingBar = document.getElementById("savingBar");

    const leakList = document.getElementById("leakList");
    const leakAmount = document.getElementById("leakAmount");

    const reductionSlider = document.getElementById("reductionSlider");
    const reductionValue = document.getElementById("reductionValue");
    const yearlySaving = document.getElementById("yearlySaving");

    const contactForm = document.getElementById("contactForm");
    const contactName = document.getElementById("contactName");

    // Store subscriptions in an array
    let subscriptions = [];

    // Load saved subscriptions from the browser
    const savedSubscriptions = localStorage.getItem(
        "spendsenseSubscriptions"
    );

    if (savedSubscriptions) {
        subscriptions = JSON.parse(savedSubscriptions);
    }

    // Convert a number into money format
    function formatCurrency(amount) {
        return "₹" + amount.toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    // Save the current subscriptions
    function saveSubscriptions() {
        localStorage.setItem(
            "spendsenseSubscriptions",
            JSON.stringify(subscriptions)
        );
    }

    // Display all subscriptions
    function renderSubscriptions() {
        subscriptionList.innerHTML = "";

        if (subscriptions.length === 0) {
            subscriptionList.innerHTML = `
                <div class="empty-state" id="emptyState">
                    <div class="empty-icon">📋</div>
                    <h3>No subscriptions added yet</h3>
                    <p>Add your first subscription to start tracking your spending.</p>
                </div>
            `;
            return;
        }

        subscriptions.forEach(function (subscription) {
            const item = document.createElement("div");
            item.className = "subscription-item";

            let usageClass = "usage-low";

            if (subscription.usage === "High") {
                usageClass = "usage-high";
            } else if (subscription.usage === "Medium") {
                usageClass = "usage-medium";
            }

            item.innerHTML = `
                <div class="service-icon">💳</div>

                <div class="service-details">
                    <div class="service-name">${escapeHTML(subscription.name)}</div>
                    <div class="service-category">
                        ${escapeHTML(subscription.category)}
                    </div>
                </div>

                <span class="usage-badge ${usageClass}">
                    ${escapeHTML(subscription.usage)}
                </span>

                <div class="service-price">
                    ${formatCurrency(subscription.price)}
                    <small>/month</small>
                </div>

                <button
                    class="remove-subscription"
                    data-id="${subscription.id}"
                    aria-label="Remove ${escapeHTML(subscription.name)}"
                >
                    ×
                </button>
            `;

            subscriptionList.appendChild(item);
        });

        // Add remove functionality to each button
        const removeButtons = document.querySelectorAll(
            ".remove-subscription"
        );

        removeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const id = Number(button.dataset.id);

                subscriptions = subscriptions.filter(function (subscription) {
                    return subscription.id !== id;
                });

                saveSubscriptions();
                renderSubscriptions();
                updateDashboard();
            });
        });
    }

    // Calculate and display totals
    function updateDashboard() {
        let monthly = 0;
        let unused = 0;

        for (let i = 0; i < subscriptions.length; i++) {
            monthly += subscriptions[i].price;

            if (subscriptions[i].usage === "Low") {
                unused += subscriptions[i].price;
            }
        }

        const yearly = monthly * 12;

        let percentage = 0;

        if (monthly > 0) {
            percentage = (unused / monthly) * 100;
        }

        monthlyTotal.textContent = formatCurrency(monthly);
        yearlyTotal.textContent = formatCurrency(yearly);
        unusedTotal.textContent = formatCurrency(unused);

        savingPercent.textContent = Math.round(percentage) + "%";
        savingBar.style.width = Math.min(percentage, 100) + "%";

        leakAmount.textContent = formatCurrency(unused);

        renderLeakAnalysis();
        updateWhatIf();
    }

    // Display subscriptions that have low usage
    function renderLeakAnalysis() {
        leakList.innerHTML = "";

        let lowUsageFound = false;

        subscriptions.forEach(function (subscription) {
            if (subscription.usage === "Low") {
                lowUsageFound = true;

                const leakItem = document.createElement("div");
                leakItem.className = "leak-item";

                leakItem.innerHTML = `
                    <div>
                        <strong>${escapeHTML(subscription.name)}</strong>
                        <span>Low usage</span>
                    </div>

                    <strong>${formatCurrency(subscription.price)}/mo</strong>
                `;

                leakList.appendChild(leakItem);
            }
        });

        if (!lowUsageFound) {
            leakList.innerHTML = `
                <div class="leak-empty">
                    🎉 No low-usage subscriptions found.
                </div>
            `;
        }
    }

    // Calculate possible yearly savings
    function updateWhatIf() {
        const reduction = Number(reductionSlider.value);

        let monthly = 0;

        for (let i = 0; i < subscriptions.length; i++) {
            monthly += subscriptions[i].price;
        }

        const possibleMonthlySaving = monthly * (reduction / 100);
        const possibleYearlySaving = possibleMonthlySaving * 12;

        reductionValue.textContent = reduction + "%";
        yearlySaving.textContent = formatCurrency(possibleYearlySaving);
    }

    // Prevent user-entered text from being treated as HTML
    function escapeHTML(text) {
        const element = document.createElement("div");
        element.textContent = text;
        return element.innerHTML;
    }

    // Add a new subscription
    subscriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = serviceName.value.trim();
        const price = Number(servicePrice.value);
        const category = serviceCategory.value;
        const usage = serviceUsage.value;

        if (name === "" || price <= 0) {
            alert("Please enter a valid service name and price.");
            return;
        }

        const newSubscription = {
            id: Date.now(),
            name: name,
            price: price,
            category: category,
            usage: usage
        };

        subscriptions.push(newSubscription);

        saveSubscriptions();
        renderSubscriptions();
        updateDashboard();

        subscriptionForm.reset();

        alert("Subscription added successfully!");
    });

    // Clear all subscriptions
    clearSubscriptions.addEventListener("click", function () {
        if (subscriptions.length === 0) {
            return;
        }

        const confirmed = confirm(
            "Are you sure you want to remove all subscriptions?"
        );

        if (confirmed) {
            subscriptions = [];

            saveSubscriptions();
            renderSubscriptions();
            updateDashboard();
        }
    });

    // Update the What-If calculator whenever the slider moves
    reductionSlider.addEventListener("input", function () {
        updateWhatIf();
    });

    // Frontend-only contact form handling
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactName.value.trim();

        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        alert(
            "Thanks, " +
            name +
            "! Your message has been received in this prototype."
        );

        contactForm.reset();
    });

    // Run everything when the page first loads
    renderSubscriptions();
    updateDashboard();
});