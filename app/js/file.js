async function getData() {
    const response = await fetch('/json/data.json');
    const data = await response.json();
    return data;
}

async function buildChart() {
    try {
        const data = (await getData())[0];
        const labels = data.map(item => item.element);
        const values = data.map(item => item.count);
        console.log(labels, values)
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
                        grid:{display: false},
                        display: false
                    },
                    x: {
                        barThickness: 15, // Ширина стовпчика
                        barPercentage: 4, // Процент відводу на відстань між стовпчиками
                        categoryPercentage: 1.0, // Процент відводу на відстань між групами стовпчиків
                        grid:{display: false},
                    },
                },
                plugins: {
                    legend: false
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


async function buildChart_2() {
    try {
        const data = (await getData())[1];
        const labels = data.map(item => item.day);
        const values = data.map(item => item.number);
        console.log(labels, values)
        const ctx = document.getElementById('lineChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Count',
                    data: values,
                    borderColor: '' + 'rgba(75, 192, 192, 1)',
                    borderWidth: 3,
                    pointStyle: 'circle', // Додаємо виколоті точки
                    pointRadius: 4, // Розмір виколотих точок
                    pointBorderColor: 'rgba(75, 192, 192, 1)', // Колір виколотих точок
                    pointBackgroundColor: '#fff' // Колір заливки виколотих точок

                }]
            },
            options: {
                scales: {
                    y: {
                        grid:{display: false},
                        display: false
                    },
                    x: {
                        grid:{display: false},
                    },
                },
                plugins: {
                    legend: false
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
buildChart_2();


// Отримуємо доступ до елементу canvas та його контекст
const labels_1 = data.map(item => item.day);
const values_1 = data.map(item => item.number);
console.log(labels_1, values_1)
const canvas = document.getElementById('lineChart').getContext('2d');
// Функція для малювання лінійної діаграми
function drawLineChart(data) {
    // Встановлюємо стиль та ширину лінії
    context.strokeStyle = '#2dcb71';
    context.lineWidth = 2;

    // Починаємо малювання
    context.beginPath();

    // Встановлюємо початкову точку
    context.moveTo(0, canvas.height - data[0]);

    // Малюємо лінії для кожного значення в масиві
    for (var i = 1; i < data.length; i++) {
        context.lineTo(i * (canvas.width / (data.length - 1)), canvas.height - data[i]);
    }

    // Закінчуємо малювання та виводимо на екран
    context.stroke();
}

// Викликаємо функцію для малювання діаграми з заданими даними
drawLineChart(data);


