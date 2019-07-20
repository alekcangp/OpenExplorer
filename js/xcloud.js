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
    },

    mounted() {
      
      if (localStorage.open) {	
        this.open = localStorage.open;
         }

     // if (localStorage.form) {	
      //  this.form =  JSON.parse(localStorage.form);
        //  }
    },
  
    
    watch: {

    //  form(newform) {
    //  const  parsed = JSON.stringify(newform);
    //  localStorage.form = parsed;
    //  },
    
      open(newopen) {
      localStorage.open = newopen
      },
    
    
    },

});




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
          vm.likex[parse.id] = '<div id = "like" class="fb-like" data-href="https://openexplorer.000webhostapp.com?project=' + parse.id + '" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'

        }; 

        if (vm.project != '') {
          
          vm.formx = [].concat(formxid[vm.project]); 
        
          setTimeout(function(){ $('.over').addClass('moved'); $('.over').removeClass('over');  },500);
          

         
        } else { vm.formx = formz.sort(function (a, b) { return b.date - a.date });}

        if (y == 1) {chbut(); fbupdate(200);}
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


 