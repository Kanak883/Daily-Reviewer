let dailyReviews = []; // Array to store daily reviews
let myChart; // Variable to hold the chart instance

// Function to record daily review
function recordReview() {
  if (dailyReviews.length > 0) {
    displayMessage("A review has already been recorded for today.");
    return;
  }

  const review1 = document.getElementById('question1').value;
  const review2 = document.getElementById('question2').value;
  const review3 = document.getElementById('question3').value;
  const review4 = document.getElementById('question4').value;
  const review5 = document.getElementById('question5').value;

  const averageRating = calculateAverageRating([review1, review2, review3, review4, review5]);
  
  // Create a new review object
  const newReview = {
    day: new Date().toLocaleDateString(),
    question1: review1,
    question2: review2,
    question3: review3,
    question4: review4,
    question5: review5,
    averageRating: averageRating
  };
  
  dailyReviews.push(newReview); // Add the review to the array
  saveReviewsToStorage(); // Save reviews to local storage
  displayMessage("Review recorded successfully!"); // Display success message
  updateTable(); // Update the table displaying reviews
  updateChart(); // Update the chart displaying review ratings

  // Disable input options after recording review
  document.querySelectorAll('.question-dropdown').forEach((element) => {
    element.disabled = true;
  });
}

// Function to calculate the average rating
function calculateAverageRating(reviews) {
  const total = reviews.reduce((acc, curr) => acc + parseInt(curr), 0);
  return (total / reviews.length).toFixed(1);
}

// Function to display a message
function displayMessage(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 3000);
}

// Function to update the table
function updateTable() {
  const reviewBody = document.getElementById('reviewBody');
  reviewBody.innerHTML = '';
  dailyReviews.forEach((review, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${review.day}</td>
      <td>${review.question1}</td>
      <td>${review.question2}</td>
      <td>${review.question3}</td>
      <td>${review.question4}</td>
      <td>${review.question5}</td>
      <td>${review.averageRating}</td>
      <td>
        <button onclick="deleteReview(${index})">Delete</button>
      </td>
    `;
    reviewBody.appendChild(row);
  });
}

// Function to delete a review
function deleteReview(index) {
  if (confirm("Are you sure you want to delete this review?")) {
    dailyReviews.splice(index, 1); // Remove review from array
    saveReviewsToStorage(); // Save updated reviews to local storage
    displayMessage("Review deleted successfully!"); // Display success message
    updateTable(); // Update the table displaying reviews
    updateChart(); // Update the chart displaying review ratings

    // Enable input options after deleting review
    document.querySelectorAll('.question-dropdown').forEach((element) => {
      element.disabled = false;
    });
  }
}

// Function to save reviews to local storage
function saveReviewsToStorage() {
  localStorage.setItem('dailyReviews', JSON.stringify(dailyReviews)); // Convert array to JSON and store in local storage
}

// Function to retrieve reviews from local storage
function retrieveReviewsFromStorage() {
  const storedReviews = localStorage.getItem('dailyReviews'); // Get stored reviews from local storage
  if (storedReviews) {
    dailyReviews = JSON.parse(storedReviews); // Parse JSON to array
    updateTable(); // Update the table displaying reviews
    updateChart(); // Update the chart displaying review ratings
  }
}

// Function to update the chart displaying review ratings
function updateChart() {
  if (myChart) {
    myChart.destroy(); // Destroy previous chart instance if it exists
  }

  const ctx = document.getElementById('myChart').getContext('2d'); // Get chart canvas context
  myChart = new Chart(ctx, {
    type: 'line', // Set chart type to line chart
    data: {
      labels: dailyReviews.map(review => review.day), // Generate labels for x-axis
      datasets: [{
        label: 'Average Rating', // Set dataset label
        data: dailyReviews.map(review => review.averageRating), // Use daily reviews data
        borderColor: '#007bff', // Set line color
        backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to transparent
        borderWidth: 2, // Set border width
        fill: false // Disable fill
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
            callback: function(value, index, values) { // Customize y-axis tick labels
              return value === 10 ? '10' : value === 5 ? '5' : '';
            }
          }
        }]
      }
    }
  });
}

// Call retrieveReviewsFromStorage() when the page loads to retrieve reviews from local storage
window.onload = retrieveReviewsFromStorage;
