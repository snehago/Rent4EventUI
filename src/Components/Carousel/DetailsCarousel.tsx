import { Button, Paper } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import "./carousel.scss";
import CarouselCard from "./CarouselCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function DetailsCarousel() {
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    { width: 1500, itemsToShow: 4 },
  ];

  return (
    <Carousel
      PrevIcon={<ArrowBackIosIcon />}
      NextIcon={<ArrowForwardIosIcon />}
      navButtonsProps={{
        // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          backgroundColor: "black",
          borderRadius: 0,
        },
      }}
      indicatorIconButtonProps={{
        style: {
          margin: "10px",
          padding: "-1px",
          color: "rgba(255,255,0,0)",
          border: "1px solid #D3600C",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "white",
          backgroundColor: "white",
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: "-35px",
        },
      }}
    >
      <CarouselCard number={1} />
      <CarouselCard number={2} />
      <CarouselCard number={3} />
      <CarouselCard number={4} />
      <CarouselCard number={5} />
      <CarouselCard number={6} />
    </Carousel>
  );
}
