import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className='relative'>
            <div className="absolute w-full h-80 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={5000}>
                <div className="w-full h-96">
                    <Image loading='lazy' src='https://links.papareact.com/gi1' alt='img1' objectFit='cover' layout='fill' />
                </div>
                <div className="w-full h-96">
                    <Image loading='lazy' src='https://links.papareact.com/6ff' alt='img2' objectFit='cover' layout='fill' />
                </div>
                <div className="w-full h-96">
                    <Image loading='lazy' src='https://links.papareact.com/7ma' alt='img3' objectFit='cover' layout='fill' />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner