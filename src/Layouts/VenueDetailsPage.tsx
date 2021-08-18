import React from "react";
import { useParams } from "react-router-dom";

const VenueDetailsPage = () => {
  const { venueId } = useParams<any>();

  return (
    <>
      <div>Venue Details</div>
      {venueId}
    </>
  );
};
export default VenueDetailsPage;
