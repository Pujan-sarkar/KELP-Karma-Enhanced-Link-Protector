// popup.js

// Function to update the content of the popup based on the scan result
function updatePopup(result) {
    const resultElement = document.getElementById('result');
    if (result) {
        resultElement.textContent = "Potentially harmful links detected!";
        resultElement.style.color = "#dc3545"; // Red color for negative result
    } else {
        resultElement.textContent = "No potentially harmful links detected.";
        resultElement.style.color = "#28a745"; // Green color for positive result
    }
}

// Simulate a result (true for harmful link detected, false otherwise)
const harmfulLinkDetected = false; // Change this value to simulate different results
updatePopup(harmfulLinkDetected);
