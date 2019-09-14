

function FrameLoad(x){
  document.getElementById(x).style.display = 'none';
}


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

var account = '', net = 0;
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
      web3.eth.getAccounts(function(err, accounts){ ethacc(accounts); account = accounts;
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
  web3.eth.getAccounts(function(err, accounts){ ethacc(accounts); account = accounts;
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
    net = web3.version.network;
if ( net != 1 ) {mes = "<span style = 'color:red'>Switch MetaMask to Main Ethereum Network</span>"};
}catch(e){}
document.getElementById('meta').innerHTML = mes; 
document.getElementById('meta2').innerHTML = mes;

}


}

//send tx
async function initPayButton () {
  if (net == 0) {alert('Install MetaMask plugin!'); return} 
  else if (net == 1) {
    try {await ethereum.enable()} catch(e) {}
    
     // paymentAddress is where funds will be send to
      const paymentAddress = '0x837a63E5eF3D96F4A8c06006BCab2246a475C15a';
      const contract = '0x9d86b1b2554ec410eccffbf111a6994910111340';
      const amount = 1000;
      const TokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_tokens","type":"uint256"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
      const TokenInstance = web3.eth.contract(TokenABI).at(contract);
 
      TokenInstance.balanceOf(account,function(error, balance) {
      // if (error) alert(error);
        if (balance/1e8 >= amount) {
          TokenInstance.transfer.sendTransaction(paymentAddress, amount*1e8, function(error, txnHash) {
          //if (error) alert(error);
         });
        } else alert('Insufficient OPENC tokens.')
      })
    } else {
    alert('Switch MetaMask to Main Ethereum Network');
    }

}

  