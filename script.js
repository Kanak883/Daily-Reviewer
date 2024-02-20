let dailyReviews = [];
let myChart;

// Function to record daily review
function recordReview() {
  const review = document.getElementById('review').value;
  dailyReviews.push(review);
  displayMessage("Review recorded successfully!");
  updateChart();
}

// Function to display a message
function displayMessage(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 3000); // Clear the message after 3 seconds
}

// Function to update the chart
function updateChart() {
  if (myChart) {
    myChart.destroy(); // Destroy previous chart if it exists
  }
  
  // Render chart
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from(Array(dailyReviews.length).keys()).map(i => `Day ${i + 1}`),
      datasets: [{
        label: 'Daily Reviews',
        borderColor: 'blue',
        data: dailyReviews,
        fill: false
      }]
    }
  });
}

// Call updateChart() when the page loads to display the chart
window.onload = updateChart;
