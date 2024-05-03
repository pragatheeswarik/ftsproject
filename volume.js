// JavaScript to fetch historical market data and create volume chart
const apiKey = 'DVQAB5GS5S8PU8P9'; // Your Alpha Vantage API key
const symbol = 'AAPL'; // Example stock symbol (Apple Inc.)
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

// Fetch historical market data
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const volumeData = extractVolumeData(data);
        createVolumeChart(volumeData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to extract volume data
function extractVolumeData(data) {
    const dates = Object.keys(data['Time Series (Daily)']).slice(0, 30); // Limit to last 30 days
    const volumeData = dates.map(date => parseInt(data['Time Series (Daily)'][date]['5. volume']));
    return volumeData;
}

// Function to create volume chart
function createVolumeChart(volumeData) {
    const ctx = document.getElementById('volumeChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: volumeData.map((_, index) => `Day ${index + 1}`),
            datasets: [{
                label: 'Volume Traded',
                data: volumeData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Volume'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Day'
                    }
                }
            }
        }
    });
}
