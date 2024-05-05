// contentScript.js

// Extract all the links (URLs) from the current tab
const links = Array.from(document.querySelectorAll('a')).map(link => link.href);

// Send the links to the background script for analysis
chrome.runtime.sendMessage({ type: 'links', data: links });
