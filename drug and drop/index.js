let item = document.getElementById('item')
let item2 = document.getElementById('item2')
let item3 = document.getElementById('item3')
let deleteButton = document.getElementById('delete')
let deleteButton2 = document.getElementById('delete2')
let deleteButton3 = document.getElementById('delete3')
let active = false;
let conteinerHeight = 400;
let conteinerWidth = 1000;
let itemHeight = 30;
let itemWidth = 100;

item.style.left = 0 + 'px';
item.style.top = 0 + 'px';
item2.style.left = 250 + 'px';
item2.style.top = 150 + 'px';
item3.style.left = 350 + 'px';
item3.style.top = 200 + 'px';

item.addEventListener("mousedown", dragStart, false);
item2.addEventListener("mousedown", dragStart, false);
item3.addEventListener("mousedown", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);

deleteButton.addEventListener('click', deletefnc)
deleteButton2.addEventListener('click', deletefnc)
deleteButton3.addEventListener('click', deletefnc)

function deletefnc(e) {

  e.target.parentNode.style.display = 'none'
}
let mousemove

function dragStart(clickEvent) {
  active = true;
  let currentItemStylesX = clickEvent.target.style.left
  let currentMousePositionX = clickEvent.x
  let currentItemStylesY = clickEvent.target.style.top
  let currentMousePositionY = clickEvent.y

  mousemove = function mousemove(e) {
    itemMove(event, clickEvent.target, currentItemStylesX, currentMousePositionX, currentItemStylesY, currentMousePositionY)
  }


  document.addEventListener('mousemove', mousemove)
}
function itemMove(e, target, currentItemStylesX, currentMousePositionX, currentItemStylesY, currentMousePositionY) {

  target.style.left = Math.min(Math.max(parseInt(currentItemStylesX) + (e.x - currentMousePositionX), 0), (conteinerWidth - itemWidth)) + 'px'
  target.style.top = Math.min(Math.max(parseInt(currentItemStylesY) + (e.y - currentMousePositionY), 0), (conteinerHeight - itemHeight)) + 'px'

}

function dragEnd(e) {
  document.removeEventListener('mousemove', mousemove)
}