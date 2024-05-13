// content.js
chrome.storage.sync.get(['sites'], function(result) {
    var sites = result.sites || [];
    var currentSiteParts = window.location.hostname.split('.').reverse();
    if (sites.some(site => {
      var siteParts = site.split('.').reverse();
      return siteParts.every((part, i) => part === currentSiteParts[i]);
    })) {
      setInterval(function() {
        document.body.style.filter = 'grayscale(100%)';
      }, 100);
    }
  });
  