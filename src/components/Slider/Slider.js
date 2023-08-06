import React, { useState } from "react";
import "./Slider.scss";
import { sliderImages } from "../../utils/images";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const Slider = () => {
  //  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderImages.length;

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
              <img src={img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default Slider;
