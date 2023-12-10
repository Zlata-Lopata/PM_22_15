async function getData() {
    const response = await fetch('./app/json/data.json');
    const data = await response.json();
    return data;
}

async function buildChart() {
    try {
        const data = await getData();
        const labels = data.map(item => item.element);
        const values = data.map(item => item.count);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Count',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        barThickness: 50, // Ширина стовпчика
                        barPercentage: 0.5, // Процент відводу на відстань між стовпчиками
                        categoryPercentage: 1.0 // Процент відводу на відстань між групами стовпчиків
                    }
                }
            }
        });

        // Виведення загальної кількості елементів
        const total = values.reduce((acc, value) => acc + value, 0);
        console.log('Total:', total);
    } catch (e) {
        console.error(e);
    }
}

// Виклик функції для побудови графіку
buildChart();
