"use client";
import React from 'react'
import banner1 from "./../../../../public/screens/slider/grocery-banner-2.jpeg"
import banner2  from "./../../../../public/screens/slider/grocery-banner.png"

import slider1 from "./../../../../public/screens/slider/slider-image-1.jpeg";
import slider2 from "./../../../../public/screens/slider/slider-image-2.jpeg";
import slider3 from "./../../../../public/screens/slider/slider-image-3.jpeg";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/css';



import Image  from 'next/image';


const MainSlider = () => {
  return (
    <div className='mb-10 flex '>
<div className='w-2/3'>
<Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>  
        <Image src={slider1} className='h-[400px] object-cover ' alt=''/>
 </SwiperSlide>

      <SwiperSlide>  
        <Image src={slider2} className='h-[400px] object-cover ' alt=''/>
 </SwiperSlide>

      <SwiperSlide>  
        <Image src={slider3} className='h-[400px] object-cover ' alt=''/>
 </SwiperSlide>
    </Swiper>
   
    </div>
<div className='w-1/3'>
<Image src={banner1} className='h-[200px] object-cover ' alt=''/>
<Image src={banner2} className=' h-[200px] object-cover' alt=''/>
</div>
    </div>
  )
}

export default MainSlider