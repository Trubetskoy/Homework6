let dragItem = document.getElementById('item')
let dragItem2 = document.getElementById('item2')
let dragItem3 = document.getElementById('item3')

let container = document.getElementById('container')
let deleteButton = document.getElementById('delete')
let deleteButton2 = document.getElementById('delete2')
let deleteButton3 = document.getElementById('delete3')

let MaxWidth = container.clientWidth
let MaxHeight = container.clientHeight

 
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 100;
let yOffset = 150;
let xOffset2 = 200;
let yOffset2 = 170;
let xOffset3 = 600;
let yOffset3 = 150;


dragItem.style.transform = "translate3d(" + xOffset + "px, " + yOffset + "px, 0)";
dragItem2.style.transform = "translate3d(" + xOffset2 + "px, " + yOffset2 + "px, 0)";
dragItem3.style.transform = "translate3d(" + xOffset3 + "px, " + yOffset3 + "px, 0)";

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);
deleteButton.addEventListener ('click', deletefnc)
deleteButton2.addEventListener ('click', deletefnc)
deleteButton3.addEventListener ('click', deletefnc)

function deletefnc (e) {
  console.log (e)
  e.target.parentNode.style.display = 'none'
}

function dragStart(e) {
  if (e.target === dragItem){
    initialX = e.pageX - xOffset;
    initialY = e.pageY - yOffset;
    active = true;
  }
  if (e.target === dragItem2){
    initialX = e.pageX - xOffset2;
    initialY = e.pageY - yOffset2;
    active = true;
  }
  if (e.target === dragItem3){
    initialX = e.pageX - xOffset3;
    initialY = e.pageY - yOffset3;
    active = true;
  }


    if (e.target.lastElementChild.id === 'delete') {
        e.target.lastElementChild.id = 'deleteHide'
  }
    else if (e.target.lastElementChild.id === 'deleteHide') {
             e.target.lastElementChild.id = 'delete'
  }
    if (e.target.lastElementChild.id === 'delete2') {
    e.target.lastElementChild.id = 'deleteHide2'
  }
    else if (e.target.lastElementChild.id === 'deleteHide2') {
         e.target.lastElementChild.id = 'delete2'
  }
    if (e.target.lastElementChild.id === 'delete3') {
      e.target.lastElementChild.id = 'deleteHide3'
  }
    else if (e.target.lastElementChild.id === 'deleteHide3') {
       e.target.lastElementChild.id = 'delete3'
  }
  
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
 
  if (active) {
      e.preventDefault();
     
      currentX = Math.max(Math.min(e.clientX - initialX, MaxWidth - e.target.clientWidth), 0)
      currentY = Math.max(Math.min(e.clientY - initialY, MaxHeight - e.target.clientHeight), 0)
         

    if (e.target === dragItem){
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, dragItem);
    }

    if (e.target === dragItem2){
      xOffset2 = currentX;
      yOffset2 = currentY;
      setTranslate(currentX, currentY, dragItem2);
    }

    if (e.target === dragItem3){
      xOffset3 = currentX;
      yOffset3 = currentY;
      setTranslate(currentX, currentY, dragItem3);
    }
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}