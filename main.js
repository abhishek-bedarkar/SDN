
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
    nodeCopy.style.left = posx-divposx;/* width/2 and height/2 to arrange in center */
    nodeCopy.style.top = posy-divposy;
   div.appendChild(nodeCopy);
   
}



function onrandomclick(e){
      e= e || window.event;
      console.log(e.clientX+"\t" +e.clientY);
  }

document.onmouseup = onrandomclick;

function allowDrop(ev) {
    ev.preventDefault();
}
