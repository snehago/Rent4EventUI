import React from "react";
import { useParams } from "react-router-dom";
import DetailsCarousel from "../Components/Carousel/DetailsCarousel";
import Header from "../Components/Header";

const VenueDetailsPage = () => {
  const { venueId } = useParams<any>();

  return (
    <>
      <Header></Header>
      <div style={{marginTop:"10%"}}>
        <DetailsCarousel />
      </div>

      {venueId}
    </>
  );
};
export default VenueDetailsPage;
