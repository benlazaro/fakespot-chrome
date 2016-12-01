// content.js

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      chrome.storage.local.set({'fsProductUrl': window.location.href});
      
      // This line is new!
      chrome.runtime.sendMessage({"message": "open_fakespot"});
      
    } else if (request.message === "search_product"){
        var productUrl;
        chrome.storage.local.get('fsProductUrl', function(result){
            productUrl = result.fsProductUrl;
            console.log("HEY! : " + productUrl);
            $( "#url" ).val(productUrl);
            $( ":submit" ).click();
        });
    }
  }
);
