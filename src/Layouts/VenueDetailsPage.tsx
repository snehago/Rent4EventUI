import { useParams } from "react-router-dom";
import DetailsCarousel from "../Components/Carousel/DetailsCarousel";
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
      {venueId}
    </>
  );
};
export default VenueDetailsPage;
