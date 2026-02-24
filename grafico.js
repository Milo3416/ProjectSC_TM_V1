document.addEventListener('DOMContentLoaded', function() {
    // Manejo de Navegación de Secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    function updateActiveState(hash) {
        if (!hash || !document.querySelector(hash)) hash = '#introduccion';
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
        contentSections.forEach(section => section.classList.toggle('active', '#' + section.id === hash));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            history.pushState(null, null, targetId);
            updateActiveState(targetId);
        });
    });

    window.addEventListener('popstate', () => updateActiveState(window.location.hash));
    updateActiveState(window.location.hash);

    // Manejo de Paneles Interactivos (Tabs)
    const panels = document.querySelectorAll('.interactive-panel');
    panels.forEach(panel => {
        const topicLinks = panel.querySelectorAll('.topic-link');
        const contentContainer = panel.querySelector('.topic-content-container');
        topicLinks.forEach(link => {
            link.addEventListener('click', () => {
                panel.querySelector('.topic-link.active')?.classList.remove('active');
                contentContainer.querySelector('.topic-content.active')?.classList.remove('active');
                link.classList.add('active');
                const targetId = link.getAttribute('data-target');
                contentContainer.querySelector(`#${targetId}`)?.classList.add('active');
            });
        });
    });

    // --- Inicialización de Gráficos ---

    // 1. Gráfico de Mercado
    const marketCtx = document.getElementById('marketGrowthChart');
    if (marketCtx) {
        new Chart(marketCtx, {
            type: 'bar',
            data: {
                labels: ['2025', '2034 (Proyección)'],
                datasets: [{
                    label: 'Valor del Mercado (Billones USD)',
                    data: [29.6, 50.6],
                    backgroundColor: ['rgba(0, 150, 70, 0.6)', 'rgba(255, 198, 41, 0.6)'],
                    borderColor: ['rgb(0, 150, 70)', 'rgb(255, 198, 41)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: { 
                    title: { display: true, text: 'Crecimiento del Mercado de Seguros en México (CAGR ~6.1%)' },
                    legend: { display: false }
                }
            }
        });
    }

    // 2. Gráfico de ROI (Potencial de Mejora)
    const roiCtx = document.getElementById('roiChart');
    if (roiCtx) {
        new Chart(roiCtx, {
            type: 'bar',
            data: {
                labels: [
                    "Retención Clientes",
                    "Reducción Retrabajo",
                    "Automatización",
                    "Reducción Abandono",
                    "Mejora FCR"
                ],
                datasets: [
                    {
                        label: "Conservador",
                        data: [45, 80, 42.5, 30, 16],
                        backgroundColor: 'rgba(21, 37, 80, 0.6)'
                    },
                    {
                        label: "Probable",
                        data: [50, 90, 50, 35, 18.8],
                        backgroundColor: 'rgba(254, 69, 26, 0.7)'
                    },
                    {
                        label: "Optimista",
                        data: [55, 100, 57.5, 40, 21.6],
                        backgroundColor: 'rgba(232, 9, 41, 0.8)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: { display: true, text: 'Potencial de Mejora por Dimensión (Escenarios %)' }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: v => v + '%' } }
                }
            }
        });
    }
});