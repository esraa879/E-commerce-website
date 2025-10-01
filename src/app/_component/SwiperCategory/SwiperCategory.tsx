"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import Image from "next/image";
import { Category } from "../../../types/product.type";



const SwiperCategory = ({ categories } : {categories: Category[] }) => {


  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)} >
        {categories.map((category, idx) => (
          <SwiperSlide key={idx}>
            <Image width={500} height={500} src={category.image} alt={category.name || "category"} className="h-[200px] object-cover w-full" />
          
          <p className="my-3 text-center" >{category.name}</p>
          
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCategory;
