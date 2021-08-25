import React from "react";
import { useParams } from "react-router-dom";
import DetailsCarousel from "../Components/Carousel/DetailsCarousel";
import DescriptionSection from "../Components/DetailsDescriptionSection/DescriptionSection";
import Header from "../Components/Header";
import "./styles/venueDetails.scss";

const VenueDetailsPage = () => {
  const { venueId } = useParams<any>();

  return (
    <>
      <Header></Header>
      <div className="carouselContainer">
        <DetailsCarousel />
      </div>

      
      <DescriptionSection />

      {venueId}
    </>
  );
};
export default VenueDetailsPage;
