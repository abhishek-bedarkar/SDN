function init_Enviroment(){
    imgHost = document.getElementById("imgHost");
    imgHost.addEventListener("dragstart",dragimage,false);
    imgSwitch = document.getElementById("imgSwitch");
    imgSwitch.addEventListener("dragstart",dragimage,false);
    imgRouter = document.getElementById("imgRouter");
    imgRouter.addEventListener("dragstart",dragimage,false);
    imgController = document.getElementById("imgController");
    imgController.addEventListener("dragstart",dragimage,false);
    workspace = document.getElementById("workspace");
    workspace.addEventListener("dragenter",function(e){e.preventDefault();},false);
    workspace.addEventListener("dragover",function(e){e.preventDefault();},false);
    workspace.addEventListener("drop",dropimage,false);
    hostArray = [];
    hostInfoArray = [];
    switchArray = [];
    routerArray = [];
    controllerArray = [];
    isSelected = {
        "HOST":0,
        "SWITCHES":0,
        "ROUTER":0,
        "CONTROLLER":0,
        "WIRE":0
    };
    wire=[];
    comp_selected=0;
    defaultHostInfo = function(hName,controllerPort,ControllerType,Protocol,IPAddress)
    {
        this.Name = hName;
        this.ControllerPort = controllerPort;
        this.ControllerType = ControllerType;
        this.Protocol = Protocol;
        this.IPAddress = IPAddress;
    }
    hostCounter = 0;
    switchCounter = 0;
    routerCounter = 0;
    controllerCounter = 0;
}
function tooltip(e){
    var name = e.target.getAttribute('id')
    if(name.startsWith('img')){
        if(name.startsWith('imgHost'))
            document.getElementById(name).setAttribute("title","Host");
        if(name.startsWith('imgSwitch'))
            document.getElementById(name).setAttribute("title","Switch");
        if(name.startsWith('imgRouter'))
            document.getElementById(name).setAttribute("title","Router");
        if(name.startsWith('imgController'))
            document.getElementById(name).setAttribute("title","controller");
        if(name.startsWith('imgWire'))
            document.getElementById(name).setAttribute("title","Setup Wire Connection");
    }
    else{
        document.getElementById(name).setAttribute("title",name);
    }
}
function dragimage(e){
    e.dataTransfer.setData('Text',e.target.getAttribute('id'));
    selectImage(e);
}
function remove(child){
    var name = child.getAttribute('id');
    console.log(name);
    if(name.startsWith('host')){
        removeVoidSpaces(hostArray,name);
        deleteVoidSpaces(hostInfoArray,name); //deletion of info obj from hostinfoarray array
        hostArray.pop();
        
    }
    else if(name.startsWith('switch')){
        removeVoidSpaces(switchArray,name);
        switchArray.pop();
    }
    else if(name.startsWith('router')){
        removeVoidSpaces(routerArray,name);
        routerArray.pop();
    }
    else if(name.startsWith('controller')){
        removeVoidSpaces(controllerArray,name);
        controllerArray.pop();
    }
    
}
function removeVoidSpaces(Array,name){
    var flag = 0;
        var ind = Array.indexOf(name);   
        Array[ind] = 'R';
        for(i=0;i<(Array.length-1);i++){
            if(Array[i]=='R'){
                flag = 1;
            }
            if(flag == 1){
                Array[i]=Array[i+1];
            }
        }
}
function deleteVoidSpaces(Array,name){
    
    var flag = 0;
    var c = 0;
        var ind;
        for(i=0;i<hostInfoArray.length;i++){
            if(hostInfoArray[i].Name == name){
                ind = i;
                c=1;
            }
               
        }
        if(c==0){
            return;
        }
        hostInfoArray[ind] = 'R';
        for(i=0;i<(Array.length-1);i++){
            if(Array[i]=='R'){
                flag = 1;
            }
            if(flag == 1){
                Array[i]=Array[i+1];
            }
        }
    hostInfoArray.pop();
}
function openModal(modalname){
    console.log("open model");
    
      if(modalname.startsWith('host')){
        hostmodal = document.getElementById('hostModal');
        hostmodal.style.display = 'block';
        document.getElementById('HMName').value = modalname;
        var chk = 0;  
        var inx;  
        for(k=0;k<hostInfoArray.length;k++){
            if(hostInfoArray[k].Name.startsWith(modalname)){
                chk = 1;
                idx = k;
            }
        }  
        if(chk == 0){
            document.getElementById('HMControllerPort').value = null;
            document.getElementById('HMIPAddress').value = null;
        }
        else{
            var o = hostInfoArray[idx];
            document.getElementById('HMControllerPort').value = o.ControllerPort;
            document.getElementById('HMIPAddress').value = o.IPAddress;
            if(o.Protocol=='SSL')
                document.getElementById('HmProtocol').selectedIndex = 0;
            else
                document.getElementById('HmProtocol').selectedIndex = 1;
            if(o.ControllerType=="Ovs Controller")
                document.getElementById('HMControllerType').selectedIndex = 0;
            else if(o.ControllerType=="In band Controller")
                document.getElementById('HMControllerType').selectedIndex = 1;
            else if(o.ControllerType=="Remote Controller")
                document.getElementById('HMControllerType').selectedIndex = 2;
            else if(o.ControllerType=="Open flow Reference")
                document.getElementById('HMControllerType').selectedIndex = 3;
   
        }
    }
}
function hostSaveClicked(){
    console.log("Saved details of : "+name);
    var dupname = document.getElementById('HMName').value;
    var dupcontrollerport = document.getElementById('HMControllerPort').value;
    var ct = document.getElementById('HMControllerType');
    var dupcontrollertype = ct.options[ct.selectedIndex].text;
    var p = document.getElementById('HmProtocol');
    var dupprotocol = p.options[p.selectedIndex].text;
    var dupipaddress = document.getElementById('HMIPAddress').value;
    var obj = new defaultHostInfo(dupname,dupcontrollerport,dupcontrollertype,dupprotocol,dupipaddress);
    console.log(obj);
    var indx = hostInfoArray.length;
    for(k=0;k<hostInfoArray.length;k++){
        if(hostInfoArray[k].Name.startsWith(dupname))
            indx = k;
    }
    hostInfoArray[indx] = obj;
    
    console.log("index : "+hostArray.indexOf(dupname));
    closeModal('hostModal');
}
function closeModal(namepassed){
    var Div1 = document.getElementById(namepassed);
    Div1.style.display = 'none';
}
function show(e){
   // console.log(document.getElementById(e.target.getAttribute('id')).parentElement.getAttribute('id')+" / "+document.getElementById(e.target.getAttribute('id')).getAttribute('id')); 
    
    if(isSelected.WIRE==1 && document.getElementById(e.target.getAttribute('id')).parentElement.getAttribute('id').startsWith('workspace')){
        
        
       // wire drawing code
        if(wire[0]==null){
           wire[0]=e.target.getAttribute("id");
        }
        else{
            wire[1]=e.target.getAttribute("id");
            console.log(wire[0]);
            console.log(wire[1]);
            
            if(wire[0]!=wire[1]){
                
                var w0=wire[0];
                var w1=wire[1];
                var comp_1 = document.getElementById(w0).getBoundingClientRect();
                var comp_2 = document.getElementById(w1).getBoundingClientRect();
                
                // check who is upside
                if(comp_1.top<comp_2.top){
                    // comp1 and upside
                     var jg = new jsGraphics("b");    
                    jg.setColor("red");
                        //jg.drawLine(comp_1.left +comp_1.width/2,comp_1.top+comp_1.right,comp_2.left+comp_2.width/2,comp_2.top);
                    jg.drawLine(comp_1.left+comp_1.width/2,comp_1.top+comp_1.height,comp_2.left+comp_2.width/2,comp_2.top);    
                    jg.paint();
                    
                    
                   
                   }
                else if(comp_1.top>comp_2.top){
                    // comp 2 upside
                    console.log("under process");
                    
                     var jg1 = new jsGraphics("b");    
                    jg1.setColor("red");
                        //jg.drawLine(comp_1.left +comp_1.width/2,comp_1.top+comp_1.right,comp_2.left+comp_2.width/2,comp_2.top);
                    jg1.drawLine(comp_2.left+comp_2.width/2,comp_2.top+comp_2.height,comp_1.left+comp_1.width/2,comp_1.top);    
                    jg1.paint();
                        
                        }
                
                ;
               }
            wire[0]=wire[1]=null;
           }
           
        
        return;
      
    }
    
    if(e.which == 1){
        if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('host')
          ||e.target.getAttribute('id').startsWith('imgHost')){
            toggleHighlight("imgHost");
            openModal(document.getElementById(e.target.getAttribute('id')).getAttribute('id'));
        }
        else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('switch')
               ||e.target.getAttribute('id').startsWith('imgSwitch')){
            toggleHighlight("imgSwitch");
        }
        else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('router')
               ||e.target.getAttribute('id').startsWith('imgRouter')){
            toggleHighlight("imgRouter");
        }
        else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('controller')
               ||e.target.getAttribute('id').startsWith('imgController')){
            toggleHighlight("imgController");
        }
        else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('wire')
               ||e.target.getAttribute('id').startsWith('imgWire')){
            toggleHighlight("imgWire");
        }
        
    }
    else if(e.which == 3){
        if(document.getElementById(e.target.getAttribute('id')).parentElement.getAttribute('id').startsWith("workspace")){
            if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('host')
              ||e.target.getAttribute('id').startsWith('imgHost')){
                toggleHighlight("imgHost");
            }
            else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('switch')
                   ||e.target.getAttribute('id').startsWith('imgSwitch')){
                toggleHighlight("imgSwitch");
            }
            else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('router')
                   ||e.target.getAttribute('id').startsWith('imgRouter')){
                toggleHighlight("imgRouter");
            }
            else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('controller')
                   ||e.target.getAttribute('id').startsWith('imgController')){
                toggleHighlight("imgController");
            }
            else if(document.getElementById(e.target.getAttribute('id')).getAttribute('id').startsWith('wire')
                   ||e.target.getAttribute('id').startsWith('imgWire')){
                toggleHighlight("imgWire");
            }
            //alert(document.getElementById(e.target.getAttribute('id')).parentElement.getAttribute('id'));
           
            var parent = document.getElementById(e.target.getAttribute('id')).parentElement;
            var child = document.getElementById(e.target.getAttribute('id'));
            
          //  console.log(parent+":"+child)
            var garbage = parent.removeChild(child);
            remove(child);
            
        }
    }
    console.log("click event : "+e.which);
}


function selectImage(e){
    
    var id1 = e.target.getAttribute('id');
    console.log(document.getElementById(id1).parentElement.getAttribute('id')+" / "+document.getElementById(id1).getAttribute('id'));  
    toggleHighlight(id1);
    
}
function toggleHighlight(id1){
    if(id1.startsWith("imgHost")){
        isSelected.HOST = 1;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 0;
        document.getElementById(id1).parentElement.style.backgroundColor = "#C0C0C0";
        document.getElementById("imgSwitch").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgRouter").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgController").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgWire").parentElement.style.backgroundColor = "beige";
    }
    else if(id1.startsWith("imgSwitch")){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 1;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 0;
        document.getElementById("imgHost").parentElement.style.backgroundColor = "beige";
        document.getElementById(id1).parentElement.style.backgroundColor = "#C0C0C0";
        document.getElementById("imgRouter").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgController").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgWire").parentElement.style.backgroundColor = "beige";
    }
    else if(id1.startsWith("imgRouter")){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 1;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 0;
        document.getElementById("imgHost").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgSwitch").parentElement.style.backgroundColor = "beige";
        document.getElementById(id1).parentElement.style.backgroundColor = "#C0C0C0";
        document.getElementById("imgController").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgWire").parentElement.style.backgroundColor = "beige";
    }
    else if(id1.startsWith("imgController")){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 1;
        isSelected.WIRE = 0;
        document.getElementById("imgHost").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgSwitch").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgRouter").parentElement.style.backgroundColor = "beige";
        document.getElementById(id1).parentElement.style.backgroundColor = "#C0C0C0";
        document.getElementById("imgWire").parentElement.style.backgroundColor = "beige";
    }
    else if(id1.startsWith("imgWire")){
        isSelected.HOST = 0;
        isSelected.SWITCHES = 0;
        isSelected.ROUTER = 0;
        isSelected.CONTROLLER = 0;
        isSelected.WIRE = 1;
        document.getElementById("imgHost").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgSwitch").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgRouter").parentElement.style.backgroundColor = "beige";
        document.getElementById("imgController").parentElement.style.backgroundColor = "beige";
        document.getElementById(id1).parentElement.style.backgroundColor = "#C0C0C0";
    }

    console.log(isSelected);
}
function getNewId(id){
    var dummyId;
    if(id == 'imgHost'){
        dummyId = "host"+hostCounter;
        hostArray[hostArray.length]=dummyId;
        hostCounter++;
    }
    else if(id == 'imgSwitch'){
        dummyId = "switch"+switchCounter;
        switchArray[switchArray.length]=dummyId;
        switchCounter++;
    }
    else if(id == 'imgRouter'){
        dummyId = "router"+routerCounter;
        routerArray[routerArray.length]=dummyId;
        routerCounter++;
    }
    else if(id == 'imgController'){
        dummyId = "controller"+controllerCounter;
        controllerArray[controllerArray.length]=dummyId;
        controllerCounter++;
    }
    return dummyId;
}
function dropimage(e){
    var pos1,pos2,pos3,pos4;
    e.preventDefault();
    var id = e.dataTransfer.getData("Text");
    nodecopy = document.getElementById(id).cloneNode(true);
    
    NewID = getNewId(id);
    nodecopy.setAttribute("id",NewID);
    
    console.log("Id of new Node : "+nodecopy.getAttribute('id'));
    console.log("ID of original image : "+id);
 
    var rect = workspace.getBoundingClientRect();
    var divposx = rect.left;/* div position pixels to calculate relative distance*/
    var divposy = rect.top;
    
    
    var posx = e.clientX;
    var posy = e.clientY;
    e.target.appendChild(nodecopy);
    nodecopy.style.position="absolute";
    nodecopy.style.left = (posx-divposx)+105;/* width/2 and height/2 to arrange in center */
    nodecopy.style.top = (posy-divposy)+25;
    
}

function preventContextMenu(event){
    event.preventDefault();
}
document.oncontextmenu = preventContextMenu;
window.addEventListener("load",init_Enviroment,false);
