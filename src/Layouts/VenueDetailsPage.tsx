/* eslint-disable react-hooks/exhaustive-deps */
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
//import ReviewSection from "../Components/DetailsReviewSection/ReviewSection";
import CircularLoader from "../Components/CircularLoader/CircularLoader";
import swal from "sweetalert";
import { Box, Container, Typography } from "@material-ui/core";
import Caraousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { v4 } from "uuid";
import CardItem from "../Components/CardItem";
import { SharedService } from "../Services/SharedService";
import { UserService } from "../Services/UserService";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { User } from "../Shared/Interfaces/User";
import PriceSection from "../Components/DetailsDescriptionSection/PriceSection";
import { AnalyticsService } from "../Services/AnalyticsServices";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const venueService = new VenueService();
const sharedService = new SharedService();
const userService = new UserService();
const analyticsService = new AnalyticsService();
const VenueDetailsPage = () => {
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [venue, setVenue] = useState<Venue | null>(null);
  const { venueId } = useParams<any>();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [listOfWishlist, setListOfWishlist] = useState([]);
  const [listOfWishlistId, setListOfWishlistId] = useState<any[]>([]);
  const [noOfBookings, setNoOfBookings] = useState(0);

  useEffect(() => {
    if (sharedService.isUserLoggedIn()) {
      (async () => {
        const [wishlistResponse, wishlistError] = await of(
          userService.getWishlistOfUser(user)
        );
        if (wishlistError) {
          // swal("Unable to fetch Wishlist", "error");
        }
        if (wishlistResponse) {

          setListOfWishlist(wishlistResponse);

          const tempArray: any = [];
          listOfWishlist.forEach((element: any) => {
            tempArray.push(element.id);
          });
          setListOfWishlistId(tempArray);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(venueService.getPromotedVenues());
      if (error) {
        swal("Error", "Unable to fetch venues", "error");
      }
      if (response) {
        setTimeout(() => {
          setVenues(response);
          setLoading(false);
        }, 2000);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        analyticsService.getNoOfBookingsForVenue(venueId)
      );
      if (error) {
        swal("Unable to fetch No Of Bookings", "error");
      }
      if (response) {
        setNoOfBookings(response.response);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getVenueByVenueId(venueId)
      );
      if (error) {
        swal("Unable to fetch venue details", "error");
      }
      if (response) {
        setVenue(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        const [imagesResponse, imageError] = await of(
          venueService.getVenuePictures(response.id, response.host.id)
        );
        if (imageError) {
          swal("Error", "Unable to fetch photos of venue", "error");
        }
        if (imagesResponse) {
          setImages(imagesResponse);
        }
      }
    })();

    window.scrollTo(0, 0);
  }, [venueId]);

  return (
    <>
      <div className="details-page-container">
        {loading && <CircularLoader />}
        <Header></Header>
        <div className="carouselContainer" data-aos="fade-up">
          <DetailsCarousel images={images} />
        </div>
        {venue && (
          <>
            <div className="vdp-description-section">
              <div className="vdp-description">
                <DescriptionSection venue={venue} noOfBookings={noOfBookings} />
              </div>
              <div className="vdp-price">
                <PriceSection venue={venue} />
              </div>
            </div>
          </>
        )}
        {venue && <FeaturesSection venue={venue} />}
        {/* {venue && <ReviewSection />} */}

        <div className="vdp-recommended-venues">
          <Typography className="vdp-recommended-title" align="center">
            Recommended Venues
          </Typography>
          <div
            className="vdp-recommended-venue-box"
            data-aos="slide-up"
            data-aos-once
          >
            <Caraousel
              key={v4()}
              swipeable={true}
              showDots={false}
              responsive={responsive}
              infinite={true}
              keyBoardControl={true}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {venues?.map((venue) => (
                <Box p={5}>
                  {listOfWishlistId.includes(venue.id) ? (
                    <div>
                      <CardItem
                        id={venue.id}
                        title={venue.title}
                        description={venue.description}
                        price={venue.price}
                        host={venue.host}
                        wish={true}
                      />
                    </div>
                  ) : (
                    <CardItem
                      id={venue.id}
                      title={venue.title}
                      description={venue.description}
                      price={venue.price}
                      host={venue.host}
                      wish={false}
                      key={v4()}
                    />
                  )}
                </Box>
              ))}
            </Caraousel>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default VenueDetailsPage;
