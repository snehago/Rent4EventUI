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
import ReviewSection from "../Components/DetailsReviewSection/ReviewSection";
import CircularLoader from "../Components/CircularLoader/CircularLoader";
import swal from "sweetalert";

const venueService = new VenueService();
const VenueDetailsPage = () => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const { venueId } = useParams<any>();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenueByVenueId(venueId)
      );
      if (error) {
        swal("Unable to fetch venue details","error");
      }
      if (response) {
        setVenue(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        const [imagesResponse, imageError] = await of(
          venueService.getVenuePictures(response.id,response.host.id)
        );
        if(imageError) {
          swal("Error","Unable to fetch photos of venue","error");
        }
        if(imagesResponse) {
          setImages(imagesResponse);
        }
      }
      
    })();

    window.scrollTo(0, 0);
  }, [venueId]);

  return (
    <>
      {loading && <CircularLoader />}
      <Header></Header>
      <div className="carouselContainer" data-aos="fade-up">
        <DetailsCarousel  images={images} />
      </div>
      {venue && <DescriptionSection venue={venue} />}
      {venue && <FeaturesSection venue={venue} />}
      {venue && <ReviewSection />}

      <Footer />
    </>
  );
};
export default VenueDetailsPage;
