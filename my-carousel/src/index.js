import style from "./styles.css"

//create sliders
window.onload = function () {
  createCarousel({
    carouselId: 'carousel-1',
    arrows: true,
  })
}
function createCarousel(data) {
  let carousel = document.getElementById(data.carouselId)
  carousel.children[0].style.maxWidth = `${carousel.children[0].children.length * 100}%`
  carousel.children[0].style.minWidth = `${carousel.children[0].children.length * 100}%`
  carousel.children[0].style.left = `0`
  carouselTouchFunctionality(carousel)
  if (data.arrows) {
    let rightArrow = document.createElement('span')
    let leftArrow = document.createElement('span')
    rightArrow.classList.add('right-arrow')
    leftArrow.classList.add('left-arrow')
    carousel.appendChild(rightArrow)
    carousel.appendChild(leftArrow)
  }
}

let currentCarousel = {
  carousel: null,
  carouselWidth: 0,
  trackWidth: 0,
  itemWidth: 0,
  currentItem: null,
  items: [],
  track: null,
  length: 0
}
let cursorPosition = null
let cursorMovePosition = null
let cloningElement = false
let isAnimation = {}

function carouselTouchFunctionality(carousel) {
  carousel.dataset.maxItem = `${carousel.children[0].children.length - 1}`
  carousel.dataset.currentItem = '0'
  isAnimation[carousel.id] = false
  setItemsId(carousel.children[0].children)

  carousel.addEventListener('mousedown', buttonDown, false)
}
function buttonDown(e) {
  console.log(e)
  e.preventDefault()
  if (e.target.parentNode.parentNode.classList.contains('carousel-item-wrap')) {
    currentCarousel.carousel = e.target.parentNode.parentNode.parentNode
    if (!isAnimation[currentCarousel.carousel.id]) {
      // Getting information about the current slider
      cursorPosition = e.pageX
      cursorMovePosition = e.pageX
      currentCarousel.currentItem = parseFloat(e.target.parentNode.dataset.id)
      currentCarousel.carouselWidth = parseFloat(getComputedStyle(currentCarousel.carousel).width.split('.')[0])
      currentCarousel.trackWidth = currentCarousel.carousel.children[0].offsetWidth
      currentCarousel.itemWidth = currentCarousel.carousel.children[0].children[0].offsetWidth
      currentCarousel.track = currentCarousel.carousel.children[0]
      currentCarousel.items = currentCarousel.track.children
    }
  } else if (e.target.classList && e.target.classList.contains('right-arrow')) {

    let carousel = e.target.parentNode
    let track = carousel.children[0]
    let currentItem = parseInt(carousel.dataset.currentItem)
    let isMaxItem = false
    if (currentItem === parseInt(carousel.dataset.maxItem)) {
      isMaxItem = true
      let firstElement = track.children[0]
      track.appendChild(firstElement)
      setItemsId(track.children)
      track.style.left = `-${carousel.offsetWidth * (currentItem - 1)}px`
    }
    let nextPosition = (isMaxItem ? currentItem : currentItem + 1) * carousel.offsetWidth
    let currentPosition = parseInt(track.style.left.split('.')[0].match(/[0-9]/g).join(''))
    e.target.parentNode.dataset.currentItem = `${isMaxItem ? currentItem : currentItem + 1}`
    sliderAnimation(currentPosition, nextPosition, track, true)
  } else if (e.target.classList && e.target.classList.contains('left-arrow')) {
    let carousel = e.target.parentNode
    let track = carousel.children[0]
    let currentItem = parseInt(carousel.dataset.currentItem)
    if (currentItem === 0) {
      // get the last element and add this element to the beginning
      let lastElement = track.children[track.children.length - 1]
      track.insertBefore(lastElement, track.children[0])
      setItemsId(track.children)
      track.style.left = `-${carousel.offsetWidth + carousel.offsetLeft}px`
      carousel.dataset.currentItem = `${currentItem++}`
    }
    let nextPosition = (currentItem - 1) * carousel.offsetWidth
    let currentPosition = parseInt(track.style.left.split('.')[0].match(/[0-9]/g).join(''))
    carousel.dataset.currentItem = `${currentItem - 1}`
    sliderAnimation(currentPosition, nextPosition, track)

  }
}

function clearVariables() {
  currentCarousel.carousel = null
  currentCarousel.track = 0
  cursorPosition = null
  currentCarousel.currentItem = null
  cursorMovePosition = 0
  cloningElement = false
}

// animates slide transition
function sliderAnimation(currentPosition, nextPosition, currentCarouselTrack, isLast) {
  let speed = 2
  if (!isAnimation[currentCarouselTrack.parentNode.id]) {
    isAnimation[currentCarouselTrack.parentNode.id] = true
    let timer = setInterval(() => {
      if (isLast) {
        if (nextPosition - currentPosition > 250) {
          currentPosition += 14
        } else if (nextPosition - currentPosition > 150) {
          currentPosition += 10
          speed = 6
        } else {
          speed = 8
          currentPosition += 5
        }
        if (currentPosition <= nextPosition) {
          isAnimation[currentCarouselTrack.parentNode.id] = true
          setPosition(currentPosition)
        } else {
          isAnimation[currentCarouselTrack.parentNode.id] = false
          setPosition(nextPosition)
          clearInterval(timer)
          return
        }
      } else {
        if (currentPosition - nextPosition > 250) {
          currentPosition -= 14
        } else if (currentPosition - nextPosition > 150) {
          speed = 6
          currentPosition -= 10
        } else {
          speed = 8
          currentPosition -= 5
        }
        if (currentPosition >= nextPosition) {
          isAnimation[currentCarouselTrack.parentNode.id] = true
          setPosition(currentPosition)
        } else {
          isAnimation[currentCarouselTrack.parentNode.id] = false
          setPosition(nextPosition)
          clearInterval(timer)
          return
        }
      }
    }, speed)

    function setPosition(position) {
      currentCarouselTrack.style.left = `-${position}px`
    }
  }
}

// changes attributes id of slider elements
function setItemsId(arrayOfItems) {
  for (let i = 0; i < arrayOfItems.length; i++) {
    arrayOfItems[i].dataset.id = `${i}`
  }
}