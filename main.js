var isSelected = {
    "HOST":0,
    "SWITCHES":0,
    "ROUTER":0,
    "CONTROLLER":0,
    "WIRE":0
};

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}



function drop(ev){
    var pos1,pos2,pos3,pos4;
    ev.preventDefault();  
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
   
    
    
    var div=document.getElementById("workspace");
    var rect = div.getBoundingClientRect();
     
     var divposx = rect.left;/* div position pixels to calculate relative distance*/
     var divposy = rect.top;
    
    
    var posx = ev.clientX;
    var posy = ev.clientY;
    
    
    /* appended child dynamically*/
    div.appendChild(nodeCopy);
    nodeCopy.style.position="absolute";
    nodeCopy.style.left = (posx-divposx)+105;/* width/2 and height/2 to arrange in center */
    nodeCopy.style.top = (posy-divposy)+25;
    nodeCopy.id="op";
  
  
   
}




// Trigger action when the contexmenu is about to be shown

$(document).bind("contextmenu",function(e){
  e.preventDefault();
  console.log(e.pageX + "," + e.pageY);
  $("#cntnr").css("left",e.pageX);
  $("#cntnr").css("top",e.pageY);
 // $("#cntnr").hide(100);        
  $("#cntnr").fadeIn(200,startFocusOut());      
});

function startFocusOut(){
  $(document).on("click",function(){
  $("#cntnr").hide();        
  $(document).off("click");
  });
}

$("#items > li").click(function(){
$("#op").text("You have selected "+$(this).text());
});




function onrandomclick(e){
      e= e || window.event;
      console.log(e.clientX+"\t" +e.clientY);
  }

document.onmouseup = onrandomclick;

function allowDrop(ev) {
    ev.preventDefault();
}

function sele(id){
    if(id=="host"){
        isSelected.HOST = 1;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 0;
        document.getElementById(id).parentElement.style.backgroundColor = "grey";
        document.getElementById("switches").parentElement.style.backgroundColor = "white";
        document.getElementById("router").parentElement.style.backgroundColor = "white";
        document.getElementById("controller").parentElement.style.backgroundColor = "white";
        document.getElementById("wire").parentElement.style.backgroundColor = "white";
    }
    else if(id=="switches"){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 1;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 0;
        document.getElementById("host").parentElement.style.backgroundColor = "white";
        document.getElementById(id).parentElement.style.backgroundColor = "grey";
        document.getElementById("router").parentElement.style.backgroundColor = "white";
        document.getElementById("controller").parentElement.style.backgroundColor = "white";
        document.getElementById("wire").parentElement.style.backgroundColor = "white";
    }
    else if(id=="router"){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 1;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 0;
        document.getElementById("host").parentElement.style.backgroundColor = "white";
        document.getElementById("switches").parentElement.style.backgroundColor = "white";
        document.getElementById(id).parentElement.style.backgroundColor = "grey";
        document.getElementById("controller").parentElement.style.backgroundColor = "white";
        document.getElementById("wire").parentElement.style.backgroundColor = "white";
    }
    else if(id=="controller"){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 1;
        isSelected.WIRE = 0;
        document.getElementById("host").parentElement.style.backgroundColor = "white";
        document.getElementById("switches").parentElement.style.backgroundColor = "white";
        document.getElementById("router").parentElement.style.backgroundColor = "white";
        document.getElementById(id).parentElement.style.backgroundColor = "grey";
        document.getElementById("wire").parentElement.style.backgroundColor = "white";
    }
    else if(id=="wire"){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 1;
        document.getElementById("host").parentElement.style.backgroundColor = "white";
        document.getElementById("switches").parentElement.style.backgroundColor = "white";
        document.getElementById("router").parentElement.style.backgroundColor = "white";
        document.getElementById("controller").parentElement.style.backgroundColor = "white";
        document.getElementById(id).parentElement.style.backgroundColor = "grey";
    }

    console.log(isSelected);
}