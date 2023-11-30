const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.carousel-button-right');
const prevButton = document.querySelector('.carousel-button-left');
const dotsNav = document.querySelector('.carousel-nav');

const slides = Array.from(track.children);
const carouselDots = Array.from(dotsNav.children)

//slide largura
const slideWith = slides[0].getBoundingClientRect().width


function setSlidesHorizontalPosition(slide, index) {
    slide.style.left = slideWith * index + 'px'
}
slides.forEach(setSlidesHorizontalPosition)

function moveToSile(track, currentSlide, targetSlide) {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add("current-slide")
}

function updateCarouselDots(currentDot, targetDot) {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}

function handleHideShowArrows(slides, prevButton, nextButton, targetIndex) {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden')
        nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}

nextButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling

    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling

    const nextIndex = slides.findIndex((slide) => slide === nextSlide)

    moveToSile(track, currentSlide, nextSlide)
    updateCarouselDots(currentDot, nextDot)

    handleHideShowArrows(slides, prevButton, nextButton, nextIndex)
})

prevButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling

    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling

    const prevIndex = slides.findIndex((slide) => slide === prevSlide)

    moveToSile(track, currentSlide, prevSlide)
    updateCarouselDots(currentDot, prevDot)

    handleHideShowArrows(slides, prevButton, nextButton, prevIndex)
})

dotsNav.addEventListener('click', (e) => {
    //qual indicador foi clicado?
    const targetDot = e.target.closest('button');

    if (!targetDot) return

    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotsNav.querySelector('.current-slide')

    const targetIndex = carouselDots.findIndex((dot) => dot === targetDot)
    const targetSlide = slides[targetIndex]


    moveToSile(track, currentSlide, targetSlide)
    updateCarouselDots(currentDot, targetDot)


    //esconde arrow 
    handleHideShowArrows(slides, prevButton, nextButton, targetIndex)

})