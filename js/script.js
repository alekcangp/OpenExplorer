


function opengame(fold) {
window.open('./'+fold+'/index.html', fold, 'width=600,height=600,top='+(screen.height/2-300)+',left='+(screen.width/2-300)+',menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
}

//https://api.ethplorer.io/getAddressTransactions/0x45EFCF2613Fdc5529a0B5FEe769E2EC64bA8dd72?apiKey=vxgr4977bVmP23&limit=300

 //fix bug widget
//const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
//if (isChrome) {widg("-90px"); } else {widg("-10px")}
//function widg(x) {
   // setTimeout(function(){document.getElementById('open').style.marginTop = x},100)
//}

// hex to string decode
function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


//check metamask
//window.addEventListener('load', 
setInterval(meta,5000);

function meta() {
   if (typeof web3 !== 'undefined') {
    web3.eth.getAccounts(function(err, accounts){
    if (err != null) document.getElementById('meta').innerHTML = "An error occurred";
    else if (accounts.length == 0) document.getElementById('meta').innerHTML = "Log in to MetaMask";
    else document.getElementById('meta').innerHTML = "&nbsp";
    });
    } else {
      document.getElementById('meta').innerHTML = "Install MetaMask and refresh page";
     
    }
  }//)
 


  