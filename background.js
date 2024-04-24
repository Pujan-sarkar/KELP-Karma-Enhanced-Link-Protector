// background.js

// Function to check if a URL is potentially harmful
function checkLink(url) {
    // Perform checks using an API or database of known malicious websites
    // For simplicity, let's assume a hardcoded list of malicious URLs
    const maliciousUrls = ['example.com/malicious', 'malware.io'];

    if (maliciousUrls.includes(url)) {
        // Alert the user about the potentially harmful link
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'alert', url: url });
        });
    }
}

// Listener for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'checkLink') {
        checkLink(message.url);
    }
});
