import Carousel from "react-material-ui-carousel";
import "./carousel.scss";
import CarouselCard from "./CarouselCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import image1 from "../../assets/images/venue.png";
import image2 from "../../assets/images/hotel.png";
import image3 from "../../assets/images/resort.jpg";
import { useEffect, useState } from "react";

export default function DetailsCarousel({images}:any) {
  // const breakPoints = [
  //   { width: 500, itemsToShow: 1 },
  //   { width: 768, itemsToShow: 2 },
  //   { width: 1200, itemsToShow: 3 },
  //   { width: 1500, itemsToShow: 4 },
  // ];
  const [items, setItems]= useState<any>();
  useEffect(() => {
  if (images.length > 0)setItems(images);
  else setItems([]);  
  }, [images])
  
  

  return (
    <Carousel
      className="carouselStyle"
      animation="slide"
      navButtonsAlwaysVisible
      PrevIcon={<ArrowBackIosIcon />}
      NextIcon={<ArrowForwardIosIcon />}
      navButtonsProps={{
        // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          backgroundColor: "rgba(4, 4, 4, 0.3)",
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
      {items?.map((item, i) => (
        <CarouselCard key={i} item={item} />
      ))}
    </Carousel>
  );
}
