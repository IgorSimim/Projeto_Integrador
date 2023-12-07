/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import './carousel.css';

export default function Carrousel(props) {

  // preicsa adaptar todo esse JS pra funcionar dentro do React

  // const track = document.querySelector('.carousel-track');
  // const nextButton = document.querySelector('.carousel-button-right');
  // const prevButton = document.querySelector('.carousel-button-left');
  // const dotsNav = document.querySelector('.carousel-nav');

  // const slides = Array.from(track.children);
  // const carouselDots = Array.from(dotsNav.children)

  // //slide largura
  // const slideWith = slides[0].getBoundingClientRect().width


  // function setSlidesHorizontalPosition(slide, index) {
  //     slide.style.left = slideWith * index + 'px'
  // }
  // slides.forEach(setSlidesHorizontalPosition)

  // function moveToSile(track, currentSlide, targetSlide) {
  //     track.style.transform = `translateX(-${targetSlide.style.left})`
  //     currentSlide.classList.remove('current-slide')
  //     targetSlide.classList.add("current-slide")
  // }

  // function updateCarouselDots(currentDot, targetDot) {
  //     currentDot.classList.remove('current-slide')
  //     targetDot.classList.add('current-slide')
  // }

  // function handleHideShowArrows(slides, prevButton, nextButton, targetIndex) {
  //     if (targetIndex === 0) {
  //         prevButton.classList.add('is-hidden')
  //         nextButton.classList.remove('is-hidden')
  //     } else if (targetIndex === slides.length - 1) {
  //         prevButton.classList.remove('is-hidden')
  //         nextButton.classList.add('is-hidden')
  //     } else {
  //         prevButton.classList.remove('is-hidden')
  //         nextButton.classList.remove('is-hidden')
  //     }
  // }

  // nextButton.addEventListener('click', (e) => {
  //     const currentSlide = track.querySelector('.current-slide')
  //     const nextSlide = currentSlide.nextElementSibling

  //     const currentDot = dotsNav.querySelector('.current-slide')
  //     const nextDot = currentDot.nextElementSibling

  //     const nextIndex = slides.findIndex((slide) => slide === nextSlide)

  //     moveToSile(track, currentSlide, nextSlide)
  //     updateCarouselDots(currentDot, nextDot)

  //     handleHideShowArrows(slides, prevButton, nextButton, nextIndex)
  // })

  // prevButton.addEventListener('click', (e) => {
  //     const currentSlide = track.querySelector('.current-slide')
  //     const prevSlide = currentSlide.previousElementSibling

  //     const currentDot = dotsNav.querySelector('.current-slide')
  //     const prevDot = currentDot.previousElementSibling

  //     const prevIndex = slides.findIndex((slide) => slide === prevSlide)

  //     moveToSile(track, currentSlide, prevSlide)
  //     updateCarouselDots(currentDot, prevDot)

  //     handleHideShowArrows(slides, prevButton, nextButton, prevIndex)
  // })

  // dotsNav.addEventListener('click', (e) => {
  //     //qual indicador foi clicado?
  //     const targetDot = e.target.closest('button');

  //     if (!targetDot) return

  //     const currentSlide = track.querySelector('.current-slide')
  //     const currentDot = dotsNav.querySelector('.current-slide')

  //     const targetIndex = carouselDots.findIndex((dot) => dot === targetDot)
  //     const targetSlide = slides[targetIndex]


  //     moveToSile(track, currentSlide, targetSlide)
  //     updateCarouselDots(currentDot, targetDot)


  //     //esconde arrow 
  //     handleHideShowArrows(slides, prevButton, nextButton, targetIndex)

  // })

  return (
    <div class="hero-section carousel-container">
      <div class="carousel-wrapper">
        <button class="carousel-button carousel-button-left is-hidden">
          <img src="public/carousel/Arrow-left.svg" alt="" />
        </button>

          <div class="carousel-track-container">
              <ul class="carousel-track">
                  <li class="carousel-slide current-slide">
                    <img class="carousel-img" src="./carousel/pet-01.png" alt="" />
                  </li>
                  <li class="carousel-slide">
                    <img class="carousel-img " src="./carousel/pet-02.jpg" alt="" />
                  </li>
                  <li class="carousel-slide">
                    <img class="carousel-img " src="./carousel/pet-03.jpg" alt="" />
                  </li>
                  <li class="carousel-slide">
                    <img class="carousel-img " src="./carousel/pet-04.jpg" alt="" />
                  </li>
                  <li class="carousel-slide">
                    <img class="carousel-img " src="./carousel/pet-05.jpg" alt="" />
                  </li>
              </ul>
          </div>

          <button class="carousel-button carousel-button-right">
              <img src="public/carousel/Arrow-right.svg" alt="" />
          </button>

          <div class="carousel-nav">
              <button class="carousel-indicator current-slide"></button>
              <button class="carousel-indicator"></button>
              <button class="carousel-indicator"></button>
              <button class="carousel-indicator"></button>
              <button class="carousel-indicator"></button>
          </div>
      </div>
    </div>
  );
}
