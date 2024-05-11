// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the status message element
    const statusElement = document.getElementById('status');

    // Get the report button
    const reportBtn = document.getElementById('reportBtn');

    // Listen for clicks on the report button
    reportBtn.addEventListener('click', function() {
        // Open a new tab for reporting
        chrome.tabs.create({ url: 'https://example.com/report' });
    });

    // Send a message to the background script to get the current status
    chrome.runtime.sendMessage({ type: 'getStatus' }, response => {
        // Update the status message based on the response
        if (response && response.safe) {
            statusElement.textContent = 'No harmful link detected';
        } else {
            statusElement.textContent = 'Potentially harmful links found!';
            statusElement.style.color = '#ff0000';
        }
    });
});
