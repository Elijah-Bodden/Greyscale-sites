// content.js
chrome.storage.sync.get(['sites'], function(result) {
    var sites = result.sites || [];
    var currentSite = window.location.hostname;
    if (sites.includes(currentSite)) {
      document.body.style.filter = 'grayscale(100%)';
    }
  });
  