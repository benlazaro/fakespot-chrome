// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action", "originalTabId": activeTab.id});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_fakespot" ) {
      chrome.tabs.create({"url": "http://fakespot.com"});      
    }
  }
);

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var activeTab = tabs[0];
          console.log("url : " + activeTab.url);
          if(activeTab.url === 'http://fakespot.com/'){
            console.log("this is fakespot website")
            chrome.tabs.sendMessage(activeTab.id, {"message": "search_product"});
          }
        });
    }
});