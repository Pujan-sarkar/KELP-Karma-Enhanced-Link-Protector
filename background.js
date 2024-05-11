// background.js

// Function to check the safety of URLs using an API
async function checkLinks(links) {
    const safetyResults = [];
    for (const link of links) {
        const safetyInfo = await fetchSafetyInfo(link);
        safetyResults.push({ url: link, safe: safetyInfo.safe });
    }
    return safetyResults;
}

// Function to fetch safety information for a single URL
async function fetchSafetyInfo(url) {
    // Here you would call the API to check the safety of the URL
    // Replace 'YOUR_API_KEY' and 'API_ENDPOINT' with your actual API key and endpoint
    const response = await fetch(`API_ENDPOINT?url=${encodeURIComponent(url)}&key=YOUR_API_KEY`);
    const data = await response.json();
    return { safe: data.safe }; // Assuming the API returns whether the URL is safe or not
}

// Listener for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'links') {
        const links = message.data;
        checkLinks(links)
            .then(results => {
                const harmfulLinks = results.filter(result => !result.safe);
                // Update the popup based on the presence of harmful links
                if (harmfulLinks.length > 0) {
                    chrome.action.setBadgeText({ text: '!' });
                    chrome.action.setBadgeBackgroundColor({ color: '#ff0000' });
                    chrome.action.setTitle({ title: 'Potentially Harmful Links Found!' });
                } else {
                    chrome.action.setBadgeText({ text: '' });
                    chrome.action.setTitle({ title: 'No Harmful Links Detected' });
                }
            })
            .catch(error => {
                console.error('Error checking links:', error);
            });
    }
});
