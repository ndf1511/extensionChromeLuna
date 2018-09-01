  chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {schemes: ['https']},
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });
 
  var contador1=1;
  var cont=0;
  var id=100;

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {

    chrome.storage.sync.set({'Url': changeInfo.url}, function(){
    });
    if(cont==0){
      if(changeInfo.url.includes("trata") || changeInfo.url.includes("ninos-y-ninas") || changeInfo.url.includes("packcp")|| changeInfo.url.includes("teens")){
        if(confirm("¿Sabes lo que estas haciendo? \n ¿Te puedo ayudar?")){
          chrome.tabs.create({url: 'http://lunaibmlu.000webhostapp.com/'});
          chrome.system.network.getNetworkInterfaces(function(interfaces){
            alert(interfaces.address);
          });
        }else{
          var contador2 =contador1++;
          if(contador2<=2){
            chrome.storage.sync.set({'Contador': contador2}, function() {
            });
            chrome.storage.sync.get('Contador', function (obj) {
            });
          }else{
            if(contador2>=3){
              alert("Creo que necesitas ayuda, dejame hacerlo");
              chrome.tabs.create({url: 'http://lunaibmlu.000webhostapp.com/'});
              getMyLocalIP(function(ip_array) { 
                alert("Tengo rastreada tu IP: "+ip_array.join('\n '));
              });
            }
          }
        }
      }
    }
  });  

 

  function getMyLocalIP(mCallback) {
    var all_ip = [];

    var RTCPeerConnection = window.RTCPeerConnection ||
    window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    var pc = new RTCPeerConnection({
     iceServers: []
   });

    pc.createDataChannel('');

    pc.onicecandidate = function(e) {

      if (!e.candidate) {
       mCallback(all_ip);
       return;
     }
     var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
     if (all_ip.indexOf(ip) == -1)
      all_ip.push(ip);
  };
  pc.createOffer(function(sdp) {
    pc.setLocalDescription(sdp);
  }, function onerror() {});
}




