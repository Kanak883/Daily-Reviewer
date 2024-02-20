let dailyReviews = [];
let myChart;

// Function to record daily review
function recordReview() {
  const review = document.getElementById('review').value;
  dailyReviews.push(review);
  saveReviewsToStorage();
  displayMessage("Review recorded successfully!");
  updateTable();
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

// Function to update the table
function updateTable() {
  const reviewBody = document.getElementById('reviewBody');
  reviewBody.innerHTML = '';
  dailyReviews.forEach((review, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${review}</td>
      <td><button onclick="deleteReview(${index})">Delete</button></td>
    `;
    reviewBody.appendChild(row);
  });
}

// Function to delete a review
function deleteReview(index) {
  if (confirm("Are you sure you want to delete this review?")) {
    dailyReviews.splice(index, 1);
    saveReviewsToStorage();
    displayMessage("Review deleted successfully!");
    updateTable();
    updateChart();
  }
}

// Function to save reviews to local storage
function saveReviewsToStorage() {
  localStorage.setItem('dailyReviews', JSON.stringify(dailyReviews));
}

// Function to retrieve reviews from local storage
function retrieveReviewsFromStorage() {
  const storedReviews = localStorage.getItem('dailyReviews');
  if (storedReviews) {
    dailyReviews = JSON.parse(storedReviews);
    updateTable();
    updateChart();
  }
}

// Function to show the graph
function showGraph() {
  updateChart();
}

// Function to update the chart
function updateChart() {
  if (myChart) {
    myChart.destroy(); // Destroy the current chart if it exists
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from(Array(dailyReviews.length).keys()).map(i => `Day ${i + 1}`),
      datasets: [{
        label: 'Reviews',
        data: dailyReviews.map(review => {
          switch (review) {
            case 'amazing':
              return 5;
            case 'verygood':
              return 4;
            case 'good':
              return 3;
            case 'justfine':
              return 2;
            case 'bad':
              return 1;
            case 'justdie':
              return 0;
          }
        }),
        borderColor: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#118AB2'], // Colors as per the options
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent fill color
        borderWidth: 2, // Default border width
        fill: false
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1,
            callback: function(value, index, values) {
              return value === 5 ? 'Amazing' : value === 4 ? 'Very Good' : value === 3 ? 'Good' : value === 2 ? 'Just Fine' : value === 1 ? 'Bad' : 'Just Die';
            }
          }
        }]
      }
    }
  });
}

// Call retrieveReviewsFromStorage() when the page loads to retrieve reviews from local storage
window.onload = retrieveReviewsFromStorage;
