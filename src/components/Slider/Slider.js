import React from "react";
import "./Slider.scss";
import { sliderImages } from "../../utils/images";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const Slider = () => {
  return (
    <div className="hero-slider-item">
      <Box>
        <Swiper
          modules={[Autoplay]}
          autoplay
          spaceBetween={800}
          slidesPerView={1}
        >
          {sliderImages.map((img) => (
            <SwiperSlide>
              <img src={img} alt="Slide" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default Slider;
