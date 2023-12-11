'use client';
import Image from 'next/image'
import carouselImgPet01 from '@/public/carousel/pet-01.png'
import carouselImgPet02 from '@/public/carousel/pet-02.jpg'
import carouselImgPet03 from '@/public/carousel/pet-03.jpg'
import carouselImgPet04 from '@/public/carousel/pet-04.jpg'
import carouselImgPet05 from '@/public/carousel/pet-05.jpg'

import "./carousel.css";  

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function CarouselComponent() {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 1
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 1
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            <Image
                src={carouselImgPet01}
                className='carousel_image'
                alt=''
            />
            <Image
                src={carouselImgPet02}
                className='carousel_image'
                alt=''
            />
            <Image
                src={carouselImgPet03}
                className='carousel_image'
                alt=''
            />
            <Image
                src={carouselImgPet04}
                className='carousel_image'
                alt=''
            />
            <Image
                src={carouselImgPet05}
                className='carousel_image'
                alt=''
            />
        </Carousel>
    )
} 