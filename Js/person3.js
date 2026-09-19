document.addEventListener("DOMContentLoaded", () => {
    const $ = id => document.getElementById(id);

    const form = $("subscriptionForm");
    const nameInput = $("serviceName");
    const priceInput = $("servicePrice");
    const categoryInput = $("serviceCategory");
    const usageInput = $("serviceUsage");

    const list = $("subscriptionList");
    const clearButton = $("clearSubscriptions");
    const leakList = $("leakList");

    const monthlyTotal = $("monthlyTotal");
    const activeCount = $("activeCount");
    const unusedTotal = $("unusedTotal");
    const leakAmount = $("leakAmount");

    const heroMonthly = $("heroMonthly");
    const heroCount = $("heroCount");
    const heroLeak = $("heroLeak");
    const heroPercent = $("heroPercent");
    const heroBar = $("heroBar");
    const heroYearlyLeak = $("heroYearlyLeak");

    const goalAmount = $("goalAmount");
    const goalSaved = $("goalSaved");
    const goalPercent = $("goalPercent");
    const goalBar = $("goalBar");
    const insights = $("insights");

    let subscriptions = JSON.parse(
        localStorage.getItem("spendsenseSubscriptions") || "[]"
    );

    let currentFilter = "all";
    let categoryChart;
    let trendChart;
    let leakChart;

    const colors = {
        Entertainment: "#157653",
        Productivity: "#f59b00",
        Music: "#7c83ff",
        Education: "#e36ca1",
        Other: "#55a6a0"
    };

    function money(value) {
        return "₹" + Number(value).toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });
    }

    function save() {
        localStorage.setItem(
            "spendsenseSubscriptions",
            JSON.stringify(subscriptions)
        );
    }

    function escapeHTML(value) {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    }

    function getTotals() {
        const monthly = subscriptions.reduce(
            (sum, item) => sum + Number(item.price),
            0
        );

        const unused = subscriptions
            .filter(item => item.usage === "low")
            .reduce((sum, item) => sum + Number(item.price), 0);

        return {
            monthly,
            yearly: monthly * 12,
            unused
        };
    }

    function renderList() {
        list.innerHTML = "";

        const filtered = subscriptions.filter(item => {
            if (currentFilter === "all") return true;
            return item.usage === currentFilter;
        });

        if (!filtered.length) {
            list.innerHTML = `
                <div class="rounded-2xl border border-dashed border-[#dce2d9] p-8 text-center text-[#60756b]">
                    No subscriptions in this category.
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const usageText = {
                high: "Frequent",
                medium: "Sometimes",
                low: "Rarely used"
            }[item.usage];

            const badgeClass =
                item.usage === "low"
                    ? "bg-[#fff0cc] text-[#d98700]"
                    : "bg-[#dcefe7] text-[#157653]";

            const element = document.createElement("div");

            element.className =
                "flex items-center gap-4 rounded-2xl border border-[#dce2d9] bg-white p-4";

            element.innerHTML = `
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcefe7] font-bold text-[#157653]">
                    ${escapeHTML(item.name.charAt(0).toUpperCase())}
                </div>

                <div class="min-w-0 flex-1">
                    <strong class="block truncate">${escapeHTML(item.name)}</strong>
                    <span class="text-sm text-[#60756b]">
                        ${escapeHTML(item.category)}
                    </span>
                </div>

                <span class="rounded-lg px-3 py-2 text-xs font-bold ${badgeClass}">
                    ${usageText}
                </span>

                <strong>${money(item.price)}</strong>

                <button
                    type="button"
                    class="remove-btn px-2 text-xl text-[#60756b] hover:text-red-500"
                    data-id="${item.id}"
                >
                    ×
                </button>
            `;

            list.appendChild(element);
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);

                subscriptions = subscriptions.filter(
                    item => item.id !== id
                );

                save();
                updateEverything();
            });
        });
    }

    function updateStats() {
        const totals = getTotals();

        monthlyTotal.textContent = money(totals.monthly);
        activeCount.textContent = subscriptions.length;
        unusedTotal.textContent = money(totals.unused);

        heroMonthly.textContent = money(totals.monthly);
        heroCount.textContent = subscriptions.length;
        heroLeak.textContent = money(totals.unused);
        heroYearlyLeak.textContent = money(totals.unused * 12);

        const percent = totals.monthly
            ? Math.round((totals.unused / totals.monthly) * 100)
            : 0;

        heroPercent.textContent = percent + "%";
        heroBar.style.width = Math.min(percent, 100) + "%";
    }

    function updateCategoryChart() {
        const totals = {};

        subscriptions.forEach(item => {
            totals[item.category] =
                (totals[item.category] || 0) + Number(item.price);
        });

        const labels = Object.keys(totals);
        const values = Object.values(totals);

        if (categoryChart) categoryChart.destroy();

        categoryChart = new Chart($("categoryChart"), {
            type: "doughnut",
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: labels.map(
                        label => colors[label] || "#55a6a0"
                    ),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "58%",
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        const legend = $("categoryLegend");
        legend.innerHTML = "";

        labels.forEach(label => {
            legend.innerHTML += `
                <div class="flex items-center gap-2">
                    <span
                        class="h-3 w-3 rounded-full"
                        style="background:${colors[label] || "#55a6a0"}"
                    ></span>
                    <span>${escapeHTML(label)}</span>
                </div>
            `;
        });
    }

    function updateTrendChart() {
        const monthly = getTotals().monthly;

        if (trendChart) trendChart.destroy();

        trendChart = new Chart($("trendChart"), {
            type: "bar",
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                datasets: [{
                    data: [
                        monthly * 0.92,
                        monthly * 0.98,
                        monthly * 0.95,
                        monthly * 1.02,
                        monthly * 1.01,
                        monthly
                    ],
                    backgroundColor: [
                        "#157653",
                        "#157653",
                        "#157653",
                        "#157653",
                        "#157653",
                        "#157653"
                    ],
                    borderRadius: 8,
                    borderSkipped: false,
                    barThickness: 42
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    }

    function updateLeakChart() {
        const totals = getTotals();

        const percent = totals.monthly
            ? Math.round((totals.unused / totals.monthly) * 100)
            : 0;

        if (leakChart) leakChart.destroy();

        leakChart = new Chart($("leakChart"), {
            type: "doughnut",
            data: {
                labels: ["Potential leak", "Other spending"],
                datasets: [{
                    data: [
                        percent,
                        Math.max(100 - percent, 0)
                    ],
                    backgroundColor: [
                        "#f59b00",
                        "#e9eee7"
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "72%",
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: [{
                id: "centerText",
                afterDraw(chart) {
                    const { ctx } = chart;
                    const x = chart.width / 2;
                    const y = chart.height / 2;

                    ctx.save();
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#14221b";
                    ctx.font = "bold 38px Arial";
                    ctx.fillText(percent + "%", x, y);

                    ctx.fillStyle = "#60756b";
                    ctx.font = "13px Arial";
                    ctx.fillText("of monthly spend", x, y + 28);
                    ctx.restore();
                }
            }]
        });

        leakList.innerHTML = "";

        const leaks = subscriptions.filter(item => item.usage === "low");

        if (!leaks.length) {
            leakList.innerHTML = `
                <div class="rounded-2xl border border-[#dce2d9] bg-white p-5 text-[#60756b]">
                    No rarely-used subscriptions found.
                </div>
            `;
        } else {
            leaks.forEach(item => {
                leakList.innerHTML += `
                    <div class="flex items-center justify-between rounded-2xl border border-[#dce2d9] bg-white p-4">
                        <span>${escapeHTML(item.name)}</span>
                        <strong class="text-[#f59b00]">${money(item.price)}/mo</strong>
                    </div>
                `;
            });
        }

        leakAmount.textContent = money(totals.unused);
    }

    function updateGoal() {
        const goal = Math.max(Number(goalAmount.value) || 0, 1);
        const saved = getTotals().unused * 12;

        const percent = Math.min(
            Math.round((saved / goal) * 100),
            100
        );

        goalSaved.textContent = money(saved);
        goalPercent.textContent = percent + "%";
        goalBar.style.width = percent + "%";
    }

    function updateInsights() {
        const totals = getTotals();

        const yearly = totals.yearly;
        const yearlyUnused = totals.unused * 12;

        insights.innerHTML = `
            <div class="rounded-2xl bg-[#eef1e9] p-5">
                ✓ You currently track ${subscriptions.length} subscription${subscriptions.length === 1 ? "" : "s"}.
            </div>

            <div class="rounded-2xl bg-[#eef1e9] p-5">
                ✓ ${money(totals.unused)} per month is linked to subscriptions marked as rarely used.
            </div>

            <div class="rounded-2xl bg-[#eef1e9] p-5">
                ✓ Your current recurring spending equals approximately ${money(yearly)} per year.
            </div>

            <div class="rounded-2xl bg-[#eef1e9] p-5">
                ✓ Reviewing rarely-used services could represent up to ${money(yearlyUnused)} in annual spending.
            </div>
        `;
    }

    function updateEverything() {
        renderList();
        updateStats();
        updateCategoryChart();
        updateTrendChart();
        updateLeakChart();
        updateGoal();
        updateInsights();
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const price = Number(priceInput.value);

        if (!name || price <= 0) {
            alert("Please enter a valid service name and price.");
            return;
        }

        subscriptions.push({
            id: Date.now(),
            name,
            price,
            category: categoryInput.value,
            usage: usageInput.value
        });

        save();
        form.reset();
        updateEverything();
    });

    clearButton.addEventListener("click", () => {
        if (!subscriptions.length) return;

        if (confirm("Remove all subscriptions?")) {
            subscriptions = [];
            save();
            updateEverything();
        }
    });

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;

            document.querySelectorAll(".filter-btn").forEach(item => {
                item.classList.remove("bg-[#dcefe7]", "text-[#157653]");
                item.classList.add("border", "border-[#dce2d9]");
            });

            button.classList.add("bg-[#dcefe7]", "text-[#157653]");
            button.classList.remove("border", "border-[#dce2d9]");

            renderList();
        });
    });

    goalAmount.addEventListener("input", updateGoal);

    $("contactForm").addEventListener("submit", event => {
        event.preventDefault();

        const name = $("contactName").value.trim();

        alert(
            `Thanks, ${name}! Your message has been received in this prototype.`
        );

        event.target.reset();
    });

    updateEverything();
});