
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
axios.get('https://openexchangerates.org/api/latest.json?app_id=d34199d67d85445a846040c0cf621510').then(function(response){
  vm.rat = response.data.rates
})
priceopen();
function priceopen() {
axios.get("https://api.coingecko.com/api/v3/simple/price?ids=open-platform&vs_currencies=usd").then(function(response) { 
    vm.prusd = response.data['open-platform'].usd; setTimeout(priceopen, 60000)
});
}


//INVEST
  //timer
    var eventTime = 1569455999;//1569455999;//25.09.2019
    var currentTime = moment().unix();
    var leftTime = eventTime - currentTime;
    var duration = moment.duration(leftTime, 'seconds');
    var interval = 1000;
    setInterval(function(){
     // Time Out check
     if (duration.asSeconds() <= 0) {
        vm.timer = 'Competition ended.'
      clearInterval(intervalId);
    }
      //Otherwise
      duration = moment.duration(duration.asSeconds() - 1, 'seconds');
      vm.timer = Math.floor(duration.asDays()) + 'd:' + duration.hours()+ 'h:' + duration.minutes()+ 'm:' + duration.seconds() + 's';
    }, interval);

//leaderboard and balance


var contract = '0x45EFCF2613Fdc5529a0B5FEe769E2EC64bA8dd72';
var apik = 'vxgr4977bVmP23'; 
var countx = 300;

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
//alert(JSON.txns);
/*
txns = [{"timestamp":1564698469,"from":"0xd62808c0bbc51f2370a184e08a1e24d3e3be7483","to":"0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72","hash":"0x2c2fad191ea89d56f478466cebd60d95b7b6cfeea91b9b62f6bc066151d2c107","value":0.0046377887000000001,"input":"0x4583b4cd426c65780000000000000000000000000000000000000000000000000000000074657374000000000000000000000000000000000000000000000000000000007465737400000000000000000000000000000000000000000000000000000000","success":true},
{"timestamp":1564698369,"from":"0xd62808c0bbc51f2370a184e08a1e24d3e3be7484","to":"0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72","hash":"0xba","value":0.0046377887000000001,"input":"0x4583b4cd416c65784141410000000000000000000000000000000000000000000000000074657374000000000000000000000000000000000000000000000000000000007465737400000000000000000000000000000000000000000000000000000000","success":true},
{"timestamp":1564698269,"from":"0xd62808c0bbc51f2370a184e08a1e24d3e3be7485","to":"0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72","hash":"0x2c2fad191ea89d56f478466cebd60d95b7b6cfeea91b9b62f6bc066151d2c107","value":0.0046377887000000001,"input":"0x4583b4cd416c65784141000000000000000000000000000000000000000000000000000074657374000000000000000000000000000000000000000000000000000000007465737400000000000000000000000000000000000000000000000000000000","success":true},
{"timestamp":1564698169,"from":"0xd62808c0bbc51f2370a184e08a1e24d3e3be7483","to":"0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72","hash":"0x2c2fad191ea89d56f478466cebd60d95b7b6cfeea91b9b62f6bc066151d2c107","value":0.0046377887000000001,"input":"0x4583b4cd416c65780000000000000000000000000000000000000000000000000000000074657374000000000000000000000000000000000000000000000000000000007465737400000000000000000000000000000000000000000000000000000000","success":true},
{"timestamp":1564698069,"from":"0xd62808c0bbc51f2370a184e08a1e24d3e3be7481","to":"0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72","hash":"0x2c2fad191ea89d56f478466cebd60d95b7b6cfeea91b9b62f6bc066151d2c107","value":0.0046377887000000001,"input":"0x4583b4cd416c65784100000000000000000000000000000000000000000000000000000074657374000000000000000000000000000000000000000000000000000000007465737400000000000000000000000000000000000000000000000000000000","success":true},
{"timestamp":1564698469,"from":"0xd62808c0bbc51f2370a184e08a1e24d3e3be7488","to":"0x45efcf2613fdc5529a0b5fee769e2ec64ba8dd72","hash":"0xac","value":0.0046377887000000001,"input":"0x4583b4cd416c65784100000000000000000000000000000000000000000000000000000074657374000000000000000000000000000000000000000000000000000000007465737400000000000000000000000000000000000000000000000000000000","success":true}
]
*/
var temp = [], txns1 = [], txns2 = [], txns3 = []; board = [], len = 20;

for (var t of txns) {
  if (temp.indexOf(t.from) != -1 || t.success != true || t.to == contract || t.input.substr(0,10) != '0x4583b4cd' || t.value != 0.0046377887000000001 || t.timestamp > eventTime ) continue
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

}).catch(function(e){});;

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
          vm.likex[parse.id] = '<div id = "like" class="fb-like" data-href="https://openexplorer.000webhostapp.com?project=" + parse.id + " data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'

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
