// popup.js
document.getElementById('add').addEventListener('click', addSite);
document.getElementById('site').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addSite();
  }
});

function addSite() {
  var site = document.getElementById('site').value.trim();
  if (site) { // Check if the input is not empty
    chrome.storage.sync.get(['sites'], function(result) {
      var sites = result.sites || [];
      if (!sites.includes(site)) {
        sites.push(site);
        chrome.storage.sync.set({sites: sites}, function() {
          console.log('Site added to greyscale list.');
          loadSites();
        });
      } else {
        console.log('Site already in the list.');
      }
    });
  } else {
    console.log('Invalid site.');
  }
}

  
  function loadSites() {
    chrome.storage.sync.get(['sites'], function(result) {
      var sites = result.sites || [];
      var siteList = document.getElementById('siteList');
      siteList.innerHTML = '';
      sites.forEach(function(site, index) {
        var li = document.createElement('li');
        li.className = 'site';
        li.textContent = site;
        var deleteButton = document.createElement('span');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'X';
        deleteButton.title = 'Remove from greyscale list';
        deleteButton.addEventListener('click', function() {
          sites.splice(index, 1);
          chrome.storage.sync.set({sites: sites}, loadSites);
        });
        li.appendChild(deleteButton);
        siteList.appendChild(li);
      });
    });
  }
  
  loadSites();
  