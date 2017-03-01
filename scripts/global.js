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

    if(elem.movement){
        clearTimeout(ele.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }

    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);

    if(xpos==final_x && ypos==final_y){
        return true;
    }
    if(xpos<final_x){
      var dist=Math.ceil((final_x-xpos)/10);
      xpos=xpos+dist;
    }
    if(xpos>final_x){
       var dist=Math.ceil((xpos-final_x)/10);
       xpos=xpos-dist;
    }
    if(ypos<final_y){
        var dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }
    if(ypos>final_y){
        var dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement=setTimeout(repeat,interval);
}
function prepareSlideshow() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("intro")) return false;

    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);

    var frame=document.createElement('img');
    frame.setAttribute('src','images/frame.gif');
    frame.setAttribute('alt',"");
    frame.setAttribute('id','frame');
    slideshow.appendChild(frame);

    insertAfter(slideshow,intro);

    var links=document.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){

        links[i].onmouseover=function () {
            destination=this.getAttribute("href");
            if(destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,5);
            }

        }
    }
}
function showSection(id) {
    var sections=document.getElementsByTagName('section');
    for(var i=0;i<sections.length;i++){
        if(sections[i].getAttribute('id')!=id){
            sections[i].style.display='none';
        }else{
            sections[i].style.display="block";

        }
    }
}
function prepareInternalnav() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId=links[i].getAttribute('href').split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick=function () {
            showSection(this.destination);
            return false;
        }
    }
}


function preparePlaceholder() {
    var placeholder=document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/placeholder.png');
    placeholder.setAttribute('alt','my image gallery');
    var description=document.createElement('p');
    description.setAttribute('id','description');
    var desctext=document.createTextNode('Choose an image');
    description.appendChild(desctext);

    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);

    var gallery=document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);


}
function showPic(whichpic) {

    if(!document.getElementById("placeholder")){
        return false;
    }
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);

    if(document.getElementById("description")){
        var text=whichpic.getAttribute("title");
        var description=document.getElementById("description");
        description.firstChild.nodeValue=text;
    }
    return true;
}
function prepareGallery() {
    if(!document.getElementsByName){
        return false;
    }
    if(!document.getElementById){
        return false;
    }
    if(!document.getElementById("imagegallery")){
        return false;
    }
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");

    for(var i=0;i<links.length;i++){
        links[i].onclick=function () {
            return !showPic(this);
        }
        //links[i].onkeypress=links[i].onclick;
    }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);