const navLinks = document.querySelectorAll('.top-nav .nav-link');
const sections = document.querySelectorAll('.content-section');

function showSectionByHash(hash) {
    const targetHash = hash || '#introduccion';

    sections.forEach((section) => {
        section.classList.remove('active');
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
    });

    const targetSection = document.querySelector(targetHash);
    const targetNav = document.querySelector(`.top-nav .nav-link[href="${targetHash}"]`);

    if (targetSection) {
        targetSection.classList.add('active');
    }

    if (targetNav) {
        targetNav.classList.add('active');
    }
}

navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const hash = this.getAttribute('href');
        history.replaceState(null, null, hash);
        showSectionByHash(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

window.addEventListener('load', () => {
    showSectionByHash(window.location.hash || '#introduccion');
});

document.querySelectorAll('.interactive-panel').forEach((panel) => {
    const links = panel.querySelectorAll('.topic-link');
    const contents = panel.querySelectorAll('.topic-content');

    links.forEach((link) => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');

            links.forEach((item) => item.classList.remove('active'));
            contents.forEach((content) => content.classList.remove('active'));

            link.classList.add('active');

            const content = panel.querySelector(`#${target}`);
            if (content) {
                content.classList.add('active');
            }
        });
    });
});

const marketCtx = document.getElementById('marketGrowthChart');
if (marketCtx) {
    new Chart(marketCtx, {
        type: 'bar',
        data: {
            labels: [
                'FCR / Resolución',
                'Costo de atención',
                'CSAT / NPS',
                'Retención',
                'AHT'
            ],
            datasets: [{
                label: 'Áreas de impacto prioritarias',
                data: [85, 78, 82, 80, 76],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return ` Prioridad estratégica: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value;
                        }
                    }
                }
            }
        }
    });
}

const roiCtx = document.getElementById('roiChart');
if (roiCtx) {
    new Chart(roiCtx, {
        type: 'bar',
        data: {
            labels: [
                'Automatización',
                'Reducción AHT',
                'Mejora FCR',
                'Conversión digital'
            ],
            datasets: [{
                label: 'Impacto estimado (%)',
                data: [40, 25, 20, 15],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 45
                }
            }
        }
    });
}