/**
 * Created by caipf on 2017/2/20.
 */
function addLoadEvent(func) {
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else {
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+="";
        newClassName+=value;
        element.className=newClassName;
    }
}

function highlightPage() {

    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers=document.getElementsByTagName('header');
    if(headers.length==0) return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName('a');
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute('href');
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id',linktext);
        }
    }
}

function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);

    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);

    if(xpos==final_x && ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        xpos++;
    }
    if(xpos>final_x){
        xpos--;
    }
    if(ypos<final_y){
        ypos++;
    }
    if(ypos>final_y){
        ypos--;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement=setTimeout(repeat,interval);
}
addLoadEvent(highlightPage);