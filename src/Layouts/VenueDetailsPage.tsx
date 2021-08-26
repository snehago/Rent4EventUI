import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VenueService } from "../Services/VenueService";
import DetailsCarousel from "../Components/Carousel/DetailsCarousel";
import DescriptionSection from "../Components/DetailsDescriptionSection/DescriptionSection";
import FeaturesSection from "../Components/DetailsFeaturesSection/FeaturesSection";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "./styles/venueDetails.scss";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
const venueService = new VenueService();
const VenueDetailsPage = () => {
  const [venue, setVenue] = useState<Venue|null>(null);
  const { venueId } = useParams<any>();

  useEffect(() => {
    (async ()=> {
      const [response,error] = await of(venueService.getVenueByVenueId(venueId))
      if(error) {
        alert(error.message);
      }
      if(response) {
        console.log(response);
        setVenue(response);
      }
    })();
  }, [venueId])

  return (
    <>
      <Header></Header>
      <div className="carouselContainer">
        <DetailsCarousel />
      </div>
      {venue && <DescriptionSection venue={venue} />}
      {venue && <FeaturesSection venue={venue} />}
      <Footer />
    </>
  );
};
export default VenueDetailsPage;
