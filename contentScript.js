// contentScript.js

// Function to extract and scan hyperlinks on the page
function scanLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const url = link.href;
        // Send the URL to the background script for analysis
        chrome.runtime.sendMessage({ type: 'checkLink', url: url });
    });
}

// Run scanLinks when the page is loaded
document.addEventListener('DOMContentLoaded', scanLinks);
