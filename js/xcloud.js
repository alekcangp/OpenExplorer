
var vm = new Vue({
    el: '#vmx',
    data: {
      status:'',
      open: 0,
      name: '',
      form: {'id':'','user':'','date':'','tname':'','memb':'','discr':'','link':'','item1':'','item2':'','item3':''},
      
      formx:[],
      text: 'ADD PROJECT',
      userid: '',
      likex: {},
      project: '',
      //invest
      openc:0,
      ether:0,
      timer:"...........",
      board:[],
      pool:'0xDa62096E4Bc056c79E60B7ef06176a7C2c99549e',
      prusd:'. . . . . . . . .',
      rat:{},
      convert:'EUR',
      //lottery
      nextdr: '',
      timerdr: ' ',
      pot: '',
      pott: '',
      loto: '0x837a63e5ef3d96f4a8c06006bcab2246a475c15a',
      boardlot:[],
      boardwin:[],
      accx: '',

    },

    mounted() {
      
      if (localStorage.open) {	
        this.open = localStorage.open;
         }

      if (localStorage.convert) {	
        this.convert =  JSON.parse(localStorage.convert);
          }
    },
  
    
    watch: {

      convert(newconvert) {
     const  parsed = JSON.stringify(newconvert);
     localStorage.convert = parsed;
     },
    
      open(newopen) {
      localStorage.open = newopen
      },
    
    
    },

});

//open price
axios.get('https://openexchangerates.org/api/latest.json?app_id=*').then(function(response){
  vm.rat = response.data.rates
})
priceopen();
function priceopen() {
axios.get("https://api.coingecko.com/api/v3/simple/price?ids=open-platform&vs_currencies=usd").then(function(response) { 
    vm.prusd = response.data['open-platform'].usd; setTimeout(priceopen, 60000)
});
}

function ethacc(x) {
  vm.accx = x
}

var currentTime;
var apik = '*'; 
var countx = countxx = 300;

//LOTTERY

var startDraw = 1569024000;//1568095541;// ;//1566219357;//
var pr = 604800;
var nextdr, durationdr, drawings;

upddr(); 
function upddr() {
currentTime = moment().unix();// - 3600*24*15 + 3600*23 - 60*5;// for invest and lottery
nextdr = startDraw + pr;
drawings = [nextdr];
while (currentTime >= nextdr) {
  nextdr += pr;
  drawings.push(nextdr); 
}

vm.nextdr = moment(nextdr*1000).format('lll');
durationdr = moment.duration(nextdr - currentTime, 'seconds');
lotos(nextdr, 1);

}


setInterval(function() {
 // Time Out check
 if (durationdr.asSeconds() == 0) {
   vm.timerdr = 'Drawing conducted'
  vm.boardlot = []; upddr();
} else {
  durationdr = moment.duration(durationdr.asSeconds() - 1, 'seconds');
  
  vm.timerdr = Math.floor(durationdr.asDays()) + 'd:' + durationdr.hours()+ 'h:' + durationdr.minutes()+ 'm:' + durationdr.seconds() + 's';
}}, 1000);



var contractlot = '0x395f8336289efe5d69623cfcc863516f6140229f';
var apieth = '*';
var temppot = '', temppott = '';
var boardlot = [];
var txnt = [];


//jackpot balance
 async function jackpot(draw) {
   txnt = [];
 //calc open pot
  await axios.get('https://api.ethplorer.io/getAddressHistory/'+vm.loto+'?apiKey='+apik+'&token=0x9d86b1b2554ec410eccffbf111a6994910111340&type=transfer&limit='+countxx)
  .then(function(response){
  txnt = response.data.operations;
  var sumt = 0; 
  txnt.forEach(function(item,i) { if (item.to == vm.loto && item.timestamp <= draw && item.timestamp > draw - pr) {sumt += Number(item.value)} });
  temppott = Math.round(sumt/1e8*0.9);
}).catch(function(e){});

  // calc eth pot
  await axios.get('https://api.etherscan.io/api?module=account&action=txlistinternal&address=' + vm.loto + '&sort=asc&apikey='+apieth).then(function(response){
    var txnss = response.data.result;
    var sum = 0;
    txnss.forEach(function(item,i) { if ( item.from == contractlot && item.timeStamp <= draw && item.timeStamp > draw - pr) sum += Number(item.value) });
   temppot = Math.round(sum*1e-12)/1e6;
  }).catch(function(e){});

  

}

//leaderboard
async function leader(draw) {
var temp = [], tempt = [], txns1 = [], txns3 = [], len = 15, txns = [];
boardlot = [];  
/*
await axios.get("https://api.ethplorer.io/getAddressInfo/"+contractlot+"?apiKey="+apik).then(function(response){
  countx = response.data.countTxs;
}).catch(function(e){});
await axios.get("https://api.ethplorer.io/getAddressInfo/"+vm.loto+"?apiKey="+apik).then(function(response){
  countxx = response.data.countTxs;
}).catch(function(e){});
*/
//all txns
await axios.get('https://api.ethplorer.io/getAddressTransactions/'+contractlot+'?apiKey='+apik+'&limit='+countx).then(function(response){
txns = response.data; 
}).catch(function(e){});

//await axios.get('https://api.ethplorer.io/getAddressHistory/'+vm.loto+'?apiKey='+apik+'&token=0x9d86b1b2554ec410eccffbf111a6994910111340&type=transfer&limit='+countxx)
//.then(function(response){
//txnt = response.data.operations; 
//}).catch(function(e){});

//calc eth
for (var t of txns) {
 
  if (temp.indexOf(t.from) != -1 || t.success != true || t.input.substr(0,10) != '0x6192e129' || t.value != 0.0111476506 || t.timestamp <= draw-pr || t.timestamp > draw) continue
  temp.push(t.from);
  var sum = 0; 
  txns.forEach(function(item,i){if (item.from == t.from) sum += item.value});
  txns1.push({"timestamp":t.timestamp,"from":t.from,"hash":t.hash,"value":sum, "name":hex2a(t.input.substr(10,64)), "fund":"ETH" });
}

//calc tokens
for (var t of txnt) {
  if (tempt.indexOf(t.from) != -1 || t.to != vm.loto || t.value < 1000*1e8 || t.timestamp <= draw-pr || t.timestamp > draw) continue
  tempt.push(t.from);
  
  var sum = 0; 
  txnt.forEach(function(item,i){if (item.from == t.from) sum += Number(item.value)});
  txns1.push({"timestamp":t.timestamp,"from":t.from,"hash":t.transactionHash,"value":Math.round(sum/1e8), "name":t.from, "fund":"OPEN" });
}


  txns3 = txns1.sort(function (a, b) { return b.hash - a.hash });
 
 

  if (txns3.length > len) len = txns3.length;
  for (var i = 0; i < len; ++i){
     if (i < txns3.length) {
      boardlot.push({'time':txns3[i].timestamp,'num':i+1,'name':txns3[i].name, 'payed':Math.round(txns3[i].value*1e6)/1e6,'from':txns3[i].from,'hash':txns3[i].hash, "fund":txns3[i].fund });
        } else {
          boardlot.push({'time':'','num':i+1,'name':'','payed':'','from':'','hash':'', 'fund':''}); 
        }   
    }  
  
}



async function lotos(dr, h) {
//jackpot balance
await jackpot(dr);
vm.pot = temppot;
vm.pott = temppott;
//leaderboard
await leader(dr);
vm.boardlot = boardlot;
(h == 1) ? winhis() : {};
setTimeout(function() {lotos(nextdr, 0)}, 30000);
}

async function winhis() {
  
  var boardwin = [],  mem = [], memt = [];
  for (var i = drawings.length-2; i>=0; --i) {
      var  thash = '', thasht = '', pot = '', pott = '', blot = [], pay = 'processing...', payt = 'processing...';
      await jackpot(drawings[i]);
      pot = temppot;
      pott = temppott;
      if (pot == 0 && pott == 0) continue;
      await leader(drawings[i]);
      blot = boardlot[0];
      //find payout eth
      if (pot > 0)
         axios.get('https://api.ethplorer.io/getAddressTransactions/'+vm.loto+'?apiKey='+apik+'&limit='+countxx).then(function(response){
        var txns = response.data;
        for (t of txns) {
          if (t.to == blot.from && mem.indexOf(t.hash) == -1 && t.timestamp > blot.time) {pay = Math.round(t.value*1e6)/1e6; thash = t.hash; mem.push(t.hash); break}
         }
        }).catch(function(e){})
      else pay = 0;

      //find payout open
      if (pott > 0) 
         for (t of txnt) {
         if (t.to == blot.from && memt.indexOf(t.hash) == -1 && t.timestamp > blot.time) {payt = Math.round(t.value/1e8); thasht = t.hash; memt.push(t.hash); break}
        }
      else payt = 0;

      boardwin.push({'draw':moment(drawings[i]*1000).format('ll'), 'name':(blot.fund == 'OPEN') ? '' : blot.name, 'address':blot.from, 'hash':blot.hash, 'hashpay':thash,  'hashpayt':thasht, 'pot':pot, 'pott':pott, 'payout':pay, 'payoutt':payt});    
  }

  var len = 5-boardwin.length;
  for (var i = 0; i < len; ++i) {
    boardwin.push({'draw':'', 'name':'', 'address':'', 'hash':'', 'hashpay':'', 'hashpayt':'', 'pot':'', 'pott':'', 'payout':'', 'payoutt':''});
  }
  vm.boardwin = boardwin;
 
}



//INVEST
  //timer
    var eventTime = 1569455999;//1569455999;//25.09.2019
    
    var leftTime = eventTime - currentTime;
    var duration = moment.duration(leftTime, 'seconds');

    setInterval(function intervalId() {
     // Time Out check
     if (duration.asSeconds() <= 0) {
        vm.timer = 'Competition ended.'
      clearInterval(intervalId);
    }
      //Otherwise
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      vm.timer = Math.floor(duration.asDays()) + 'd:' + duration.hours()+ 'h:' + duration.minutes()+ 'm:' + duration.seconds() + 's';
    }, 1000);

//leaderboard and balance

var contract = '0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72';

pools(); 
setInterval(pools, 30000);

 async function pools() {
//pool balance
  await axios.get("https://api.ethplorer.io/getAddressInfo/"+vm.pool+"?apiKey="+apik).then(function(response){
    vm.ether = Math.round(response.data.ETH.balance*1e6)/1e6;
   
    for (var i of response.data.tokens) {
      var amo = i.balance * 1e-8;
      if (i.tokenInfo.address == '0x9d86b1b2554ec410eccffbf111a6994910111340' && amo > 50000) {
        vm.openc = Math.round(amo);
        break
      }
    }
  }).catch(function(e){});

 
  await axios.get("https://api.ethplorer.io/getAddressInfo/"+contract+"?apiKey="+apik).then(function(response){
    countx = response.data.countTxs;
  }).catch(function(e){});
//all txns
axios.get('https://api.ethplorer.io/getAddressTransactions/'+contract+'?apiKey='+apik+'&limit='+countx).then(function(response){
var txns = response.data;

var temp = [], txns1 = [], txns2 = [], txns3 = []; board = [], len = 20;

for (var t of txns) {
  if (temp.indexOf(t.from) != -1 || t.success != true || t.input.substr(0,10) != '0x4583b4cd' || t.value != 0.0046377887000000001 || t.timestamp > eventTime ) continue
  temp.push(t.from);
  var sum = 0; 
  txns.forEach(function(item,i){if (item.from == t.from) sum += item.value});
  txns1.push({"timestamp":t.timestamp,"from":t.from,"hash":t.hash,"value":sum, "name":hex2a(t.input.substr(10,64)), "tg":hex2a(t.input.substr(74,64)), "email":hex2a(t.input.substr(138))});
}
  txns2 = txns1.sort(function (a, b) { return a.timestamp - b.timestamp });
  txns3 = txns2.sort(function (a, b) { return b.value - a.value });

//lottery winner
try {
  var lottery = txns3.slice(3).sort(function (a, b) { return b.hash - a.hash })[0].from;
}catch(e){};
 

  if (txns3.length > len) len = txns3.length;
  for (var i = 0; i < len; ++i){
     var deth = 0, dopen = 0;
    
     if (i < txns3.length) {
     
         if (i == 0) {deth = vm.ether*0.5; dopen = vm.openc*0.5 } else if (i == 1 || i == 2) {deth = vm.ether*0.2; dopen = vm.openc*0.2} 
         else if (txns3[i].from == lottery) {deth = vm.ether*0.1; dopen = vm.openc*0.1};
      board.push({'num':i+1,'name':txns3[i].name, 'tg':txns3[i].tg, 'email':txns3[i].email, 'invest':Math.round(txns3[i].value*1e6)/1e6,'deth':Math.round(deth*1e6)/1e6,'dopen':Math.round(dopen),
      'from':txns3[i].from,'hash':txns3[i].hash });
        } else {
          board.push({'num':i+1,'name':'','tg':'','email':'','invest':'','deth':'','dopen':'','from':'','hash':''}); 
        }
        
    }
   
    vm.board = board;

}).catch(function(e){});

}






//SPACE
var formxid = {};

//check status
function popup() {

if (vm.text == 'LOADING...') return;

FB.api('/me', function(response) {
 vm.name = response.name;
 vm.userid = response.id;
 
    if (vm.name != undefined) {
      document.getElementById('welcome').innerHTML = '<b>WELCOME, ' + vm.name + '</b>'; 
     // welcome();
     
        if (formxid[vm.userid] != undefined) vm.form = formxid[vm.userid];
    //fbupdate();
      modalv('#add');
      
    } else {modalv('#auth')} 
   
 });

} 

// select modal
function modalv(x) {
 
var dialog = document.querySelector(x);
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
    vm.open = x
    
   
  
}

function modalx(x) { 
    var dialog = document.querySelector(x);
        dialogPolyfill.registerDialog(dialog);
        dialog.close(); 

       
          //alert(JSON.stringify(vm.form));
        vm.open = '';
      
    }

function dbupdate() {
vm.text = 'LOADING...';
modalx('#add');
var idx = '';

FB.api('/me', function(response) {
  if (response.id != undefined) {;
    idx = response.id;  
    vm.name = response.name; 
   
    if (vm.text == 'ADD PROJECT' || idx != vm.form.id) {
    vm.form['date'] = moment().unix();
    vm.form['user'] = vm.name;
    vm.form['id'] = idx;
    }

for (g in vm.form) {
  vm.form[g] = vm.form[g].toString().replace(/[\"\']/g, "&quot;").replace(/\n/g, "<br>").replace(/\\/g, "&bsol;");
}

   
 $.ajax({
    type:'post',
    url:'/update.php',
    data: {idu: idx, form: JSON.stringify(vm.form)}, 
    cash: false,
    success: function(d) { if (d != 1) {alert('Error data loading!');} dbread(1); 
    }
  });
  } else { modalv('#auth'); return}
});

}


function dbdel() {
  
  
  modalx('#add');
  vm.text = 'ADD PROJECT';
  var idx = '';
  
  FB.api('/me', function(response) {
    if (response.id != undefined) {;
      idx = response.id;  
      vm.name = response.name; 
     
   $.ajax({
      type:'post',
      url:'/del.php',
      data: {uid: idx}, 
      cash: false,
      success: function(d) {  dbread(2); 
      }
    });
    } else { modalv('#auth'); return}
  });
  
  }


dbread(0);

function dbread(y) {
  
  var formz=[];
  
   if (y != 2) vm.text = 'LOADING...';
    $.ajax({
      type:'post',
      url:'/read.php',
      data: {}, 
      cash: false,
      success: function(r){   
        try{ 
        var rr = JSON.parse(r);//.replace(/\\r/g, "\\\\r").replace(/\\t/g, "\\\\t").replace(/\\n/g, "<br>"));
        }catch(e){ chbut(); alert('Data temporarily unreachable!')}
    //  alert(JSON.stringify(rr));
        for ( f of rr) {
          try{
         var parse = JSON.parse(f);
          }catch(e){alert('Invalid character!'); continue ;}

          for (g in parse) {
            parse[g] = parse[g].toString().replace(/&quot;/g, "\"").replace(/<br>/g, "\n").replace(/&bsol;/g, "\\");
          }

          formz.push(parse);
          formxid[parse.id] = parse;
          vm.likex[parse.id] = '<div id = "like" class="fb-like"  data-href="https://openexplorer.tech?project=' + parse.id + '" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'
          
        }; 

        if (vm.project != '') {
          
          vm.formx = [].concat(formxid[vm.project]); 
        
          setTimeout(function(){ $('.over').addClass('moved'); $('.over').removeClass('over');  },500);
          

         
        } else { vm.formx = formz.sort(function (a, b) { return b.date - a.date });}

        if (y == 1) {chbut(); fbupdate(500);}
      }
       
    });  
} 

function chbut() {
  FB.api('/me', function(response) {
    vm.userid = response.id; 
  if (formxid[vm.userid] != undefined) {
    vm.text = 'EDIT PROJECT'
  } else { vm.text = 'ADD PROJECT'}
})
}

function fbupdate(t) {setTimeout(function() {FB.XFBML.parse()}, t)}

function seeall() {
  setTimeout(function(){ $('.moved').addClass('over');$('.moved').removeClass('moved');  },500);
  vm.project = '';
  dbread(1);
  }
