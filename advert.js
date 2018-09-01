/*There will eventually be a list of urls in a database for the extension to check through*/
var url = "https://www.facebook.com/"; 

/* Listen for external messages (messages from web-pages) */
chrome.runtime.onMessageExternal.addListener(function(url, sender) {
if (sender.url == url) {

    chrome.browserAction.setIcon({ path: "green.png" });
}

else {
    chrome.browserAction.setIcon({ path: "white.png" });
}

});
