<?php
if (!empty($_GET['project'])) { $pro = $_GET['project'];} else {$pro = '';}
?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="target-densitydpi=device-dpi">
    <meta name="description" content="OPEN EXPLORER is a project for OPEN DApp Development Competition."/>


  <script src = "https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue.min.js"></script>
  <script src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js" async></script>
  <script src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0-beta.1/axios.js"></script>
  <script src = "https://code.jquery.com/jquery-1.7.1.min.js" type="text/javascript"></script>
  <script src = "./js/dialog.js" ></script>
  
  <link rel="icon" type="image/gif" href="./img/favicon.png" size = "any" >
  <link href = "./css/xcloud.css" type="text/css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css?family=Kelly+Slab|Marck+Script&display=swap" rel="stylesheet">
  
  <title>OPEN EXPLORER</title> 



    <script src="https://kit.fontawesome.com/377a4c7685.js"></script>
    <script src="./js/script.js"></script>
    <link href = "./css/style.css" type="text/css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Exo+2&display=swap" rel="stylesheet">
    <style>
      .sh{cursor:pointer; box-shadow:0 0 10px darkblue; border: 2px solid blue; border-radius: 5px; margin: 0 50px}
      .sh:hover{box-shadow:0 0 10px white;}
    </style>
</head>
<body>
    <div id="fb-root"></div>
    <canvas id="pixie"></canvas>
<div id = "vmx" v-cloak>
 
<nav class="main-menu">
    <div class="tab">
            <button class="tablinks" onclick="openCity(event, 'London')" id="defaultOpen">
              <img style = 'width:35px; height:35px; padding: 0; margin-top:-3px; margin-left:-3px; position:absolute;' src = './img/logo100.png'/>
              <i class="fas"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home</button>
            <button class="tablinks" onclick="openCity(event, 'Paris')"><i class="fas fa-gamepad "></i>&nbsp;&nbsp;&nbsp;&nbsp;Games</button>
            <button class="tablinks" onclick="openCity(event, 'Tokyo')"><i class="fas fa-robot"></i>&nbsp;&nbsp;&nbsp;&nbsp;The Bot</button>
            <button class="tablinks" onclick="openCity(event, 'Moscow')"><i class="fas fa-network-wired"></i>&nbsp;&nbsp;&nbsp;&nbsp;Network</button>
    </div>
</nav>


<!-- OPEN SPACE -->
      <div id="London" class="tabcontent">
        <div class = "title" style = 'width: 100%; height: 70px; text-align: center; padding: 5px 0 0 0; font-size: 40px'>
        <span>O P E N &nbsp;&nbsp;&nbsp;&nbsp; S P A C E</span>
        </div>
        <div style = "font-size: 25px; margin:0 0 25px 0">
          OPEN community portal to publish awesome DIY (Do It Yourself) applications!
        </div>
      
        <button class="button" onclick = "popup()">
            <div class="pattern">
              <div class="target inner bg1" ></div>
            </div>
            <div class="text">{{text}}</div>
        </button>

        <dialog id = "auth">
            <div style="width:30px; position: absolute; right: 0px; top: 3px; font-size: 15px;" onclick = "modalx('#auth')" class="butt">&#10007;</div>
            <b>A U T H O R I Z A T I O N</b><br>
            <div style = "margin-top:60px">
              <div class="fb-login-button"  data-width="" data-scope="public_profile" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true">
              </div>
          </div>
        </dialog>

        <dialog id = "add">

            <div style="width:30px; position: absolute; right: 0px; top: 3px; font-size: 15px;" onclick = "modalx('#add')" class="butt">&#10007;</div>
            <div id = "welcome">&nbsp;</div>
            
           <br>
            <div style = "margin-top:5px">Application name: <span style = "font-size: 13px"> (HTML tags available)</span></div>
            
            <textarea wrap="off" placeholder="" v-model = "form['tname']" ></textarea>
            <br>
            Logo: <span style = "font-size: 13px"> (HTML tags available)</span>
            <br>
            <textarea wrap="off" placeholder="" v-model = "form['memb']" ></textarea>
            <br>
            Description: <span style = "font-size: 13px"> (HTML tags available)</span>
            <br>
            <textarea style = "height: 200px; text-align: justify" placeholder="" v-model = "form['discr']"></textarea>
            <br>
            Application link:
            <br>
            <textarea wrap="off" placeholder="" v-model.trim = "form['link']" ></textarea>
            
            <div style = "font-size:15px; margin-top: 10px" v-if = "text == 'ADD PROJECT'">* One user is able add only one application.</div><div v-else>&nbsp;</div>
            <div style="width:150px;" v-on:click = "dbupdate()" class="butt">&#10003;</div>
            <div style = "margin-top:5px; width:150px; display:inline-block">
              <div class="fb-login-button"  data-width="" data-scope="public_profile" data-size="medium" data-button-type="continue_with" data-auto-logout-link="true" data-use-continue-as="true"></div>
            </div>
        
            <div style="width:150px;display:inline-block" v-on:click = "modalx('#add')" class="butt">&#10007;</div>
            <div v-if = "formxid[userid] != undefined" style="position: absolute; right: 15px; bottom: 3px; font-size: 15px;" v-on:click = "dbdel()" class="butt">Delete</div>
            
           
        </dialog>
        
        
       

        <div class = 'table'>
      
           
              <div class = 'rowh'>
                <div v-if = "vm.project ==''">
                  <div class = 'cell2' style = "max-width: 120px; min-width: 120px;" >
                    NAME
                  </div>
                  <div class = 'cell2' style = "max-width: 120px; min-width: 120px;">
                    LOGO
                  </div>
                  <div class = 'cell2' style = "width: 639px;">
                   DESCRIPTION
                  </div>
                  <div class = 'cell2' style = "max-width: 90px; min-width: 90px;">
                   LINK
                  </div>
                </div>
                <div v-else class = 'cell2' style = "width: 997px;"> 
                    <a class = "aa" onClick = "seeall()" href = "#">VIEW ALL</a>
                </div>
              </div>
          
             
          <div class = 'tbody'>
            <div id class = 'row'  v-for = "t in formx" >
             <hr style = "border-color: darkorange; size: 4px; ">
              
      
              <div>
                  <div class = 'cell' >
                    <div class = "over" style = "width: 120px; font-weight: bold; font-size: 18px; white-space: pre-wrap" v-html = "t.tname">
                    
                    </div>
                  </div>
                  <div  class = 'cell'style = "max-width: 120px; min-width: 120px; ">
                    <div class = "over" style = "white-space: pre-wrap;" v-html = "t.memb">
                      
                    </div>
                  </div>
                  <div  class = 'cell' style = " text-align: left; max-width: 617px; min-width: 617px; ">
                    <div class = "over" v-html = "t.discr" style = "white-space: pre-wrap">
                     
                    </div>
                  </div>
                  
                  <div class = 'cell' style = "max-width: 90px; min-width: 90px; ">
                    <a v-if = "t.link != ''" class = "aa" href = "#" style = "padding-bottom: 0px;" v-on:click = "function() { window.open(t.link, '_blank')}"><i class="fas fa-globe fa-lg"></i></a>
                    <br><br>
                    <div class = "over" v-html = "likex[t.id]">
                    </div>
                  </div>
              </div>
      
            </div>
          </div>   
        </div>

    </div>

<!-- OPEN GAMES -->
      <div id="Paris" class="tabcontent">
          <div class = "title" style = 'width: 100%; height: 70px; text-align: center; padding: 5px 0 0 0; font-size: 40px'>
            <span>O P E N &nbsp;&nbsp;&nbsp;&nbsp; G A M E S</span>
            </div>

            <div style = "width:100%; height: 100%; text-align: center; padding: 100px 0 0 0">
            <img  src = "./img/game1.jpg" onclick = "opengame('game1')" class = "sh"/>
            
            <img  src = "./img/game2.jpg" onclick = "opengame('game2')" class = "sh"/>
            </div>
           
               
           
      </div>
      <div id="Tokyo" class="tabcontent">
          <div class = "title" style = 'width: 100%; height: 70px; text-align: center; padding: 5px 0 0 0; font-size: 40px'>
            <span>O P E N &nbsp;&nbsp;&nbsp;&nbsp; B O T</span>
            </div>
      </div>
      <div id="Moscow" class="tabcontent">
          <div class = "title" style = 'width: 100%; height: 70px; text-align: center; padding: 5px 0 0 0; font-size: 40px'>
            <span>O P E N &nbsp;&nbsp;&nbsp;&nbsp; N E T W O R K</span>
            </div>
      </div>

      
     
      <div style = 'position: absolute; right: 10px;bottom: 30px;text-align: right'>
        <span style = 'color:cornflowerblue; font-size: 16px; '>powered by</span> <br><img  src = './img/logo1.png'/>  
      </div>
    
</div> 




 <script>
      function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }
      
      document.getElementById("defaultOpen").click();

       
</script>


<script src = "./js/xcloud.js"></script>

      <script>
         vm.project = "<?php echo $pro ?>"
         
                  window.fbAsyncInit = function() {
                   var err = 0;
                   FB.init({
                      appId      : '778193619243863',
                      cookie     : true,
                      xfbml      : true,
                      version    : 'v3.3'
                    });
                    FB.AppEvents.logPageView(); 
                    FB.getLoginStatus(function(response) {chbut();});
                    setTimeout(chbut, 2000);
                        
                   
                    FB.Event.subscribe('auth.login', function(response) {
                        if (vm.open == '#auth' && err == 0) {modalx('#auth'); fbupdate(1000); popup(); } else {err = 0; } // err ложное событие login 
                        chbut();
                      });
          
                    FB.Event.subscribe('auth.logout', function(response) {err = 1; 
                        if (vm.open == '#add') {modalx('#add'); }
                      vm.text = 'ADD PROJECT'; vm.userid = '';
                      });   
                  
                  };
          
                  (function(d, s, id){
                     var js, fjs = d.getElementsByTagName(s)[0];
                     if (d.getElementById(id)) {return;}
                     js = d.createElement(s); js.id = id;
                     js.src = "https://connect.facebook.net/en_US/sdk.js";
                     fjs.parentNode.insertBefore(js, fjs);
                   }(document, 'script', 'facebook-jssdk'));
        </script>


          
        <script>      
          //button
          const buttons = document.querySelectorAll('.button');
          buttons.forEach((button) => {
            let target = button.querySelector('.target');
            function handleMove(e) {
              const x = -50 + (e.pageX - button.offsetLeft - 300 / 2) / 3;
              const y = -10 + (e.pageY - button.offsetTop - 100 / 2) / 3;
          
              target.style.setProperty('--x', `${ x }px`)
              target.style.setProperty('--y', `${ y }px`)
            }
            button.addEventListener('mousemove', (e) => {
              handleMove(e);
            });
            button.addEventListener('touchmove', (e) => {
              handleMove(e.changedTouches[0]);
            });
          });
        </script>
 
</body>
</html>