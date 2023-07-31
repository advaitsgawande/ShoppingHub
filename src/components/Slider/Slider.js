import React, { useState } from "react";
import "./Slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderImages } from "../../utils/images";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";

const Slider = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderImages.length;
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div className="hero-slider-item">
      <Box>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {sliderImages.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",

                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          sx={{ justifyContent: "center" }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
        />
      </Box>
    </div>
  );
};

export default Slider;
