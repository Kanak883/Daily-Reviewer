// Sample data for demonstration
let dailyReviews = [];
let weeklySummaries = [];

// Function to record daily review
function recordReview() {
  const review = document.getElementById('review').value;
  dailyReviews.push(review);
  updateChart();
}

// Function to update the chart
function updateChart() {
  // Clear previous data
  weeklySummaries = [];
  
  // Calculate weekly summaries
  for (let i = 0; i < dailyReviews.length; i += 7) {
    const weekData = dailyReviews.slice(i, i + 7);
    const goodCount = weekData.filter(item => item === 'good').length;
    const neutralCount = weekData.filter(item => item === 'neutral').length;
    const badCount = weekData.filter(item => item === 'bad').length;
    weeklySummaries.push({ good: goodCount, neutral: neutralCount, bad: badCount });
  }

  // Render chart
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from(Array(weeklySummaries.length).keys()).map(i => `Week ${i + 1}`),
      datasets: [{
        label: 'Good',
        borderColor: 'green',
        data: weeklySummaries.map(summary => summary.good),
        fill: false
      }, {
        label: 'Neutral',
        borderColor: 'orange',
        data: weeklySummaries.map(summary => summary.neutral),
        fill: false
      }, {
        label: 'Bad',
        borderColor: 'red',
        data: weeklySummaries.map(summary => summary.bad),
        fill: false
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Initial chart rendering
updateChart();
