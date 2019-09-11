


function opengame(fold) {
window.open('./'+fold+'/index.html', fold, 'width=600,height=600,top='+(screen.height/2-300)+',left='+(screen.width/2-300)+',menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
}



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

var int = setInterval(meta,5000);

function metlog() {
  ethereum.enable();
}

function meta() {
try {
// Modern dapp browsers...
if (window.ethereum) {
  window.web3 = new Web3(ethereum);
 
      // Acccounts now exposed
      web3.eth.getAccounts(function(err, accounts){ ethacc(accounts);
        if (err != null) mes = "An error occurred";
        else if (accounts.length == 0) {mes = "<b onclick = 'metlog()' class = 'point' style = 'color:blue'>Click here to login with Metamask</b>";  }
        else mes = '<span style = "color:green"><i class="far fa-check-square"></i> ' + accounts + '</span>';
        messs(mes);
        });
}
// Legacy dapp browsers...
else if (window.web3) {
  window.web3 = new Web3(web3.currentProvider);
  // Acccounts always exposed
  web3.eth.getAccounts(function(err, accounts){ ethacc(accounts);
    if (err != null) mes = "An error occurred";
    else if (accounts.length == 0) {mes = "<span style = 'color:blue'>Login to Metamask</span>";  }
    else mes = '<span style = "color:green"><i class="far fa-check-square"></i> '+accounts+'</span>';
    messs(mes);
    });
}
// Non-dapp browsers...
else {
  mes = "<span style = 'color:red'>Install MetaMask and refresh page</span>"; messs(mes); clearInterval(int);//"Non-Ethereum browser detected";
}

}catch(e){}

function messs(mes) {
  try {
document.getElementById('meta').innerHTML = mes; 
document.getElementById('meta2').innerHTML = mes;
}catch(e){}
}


}

  