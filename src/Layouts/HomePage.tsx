/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { VenueService } from "../Services/VenueService";
import {
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import "./styles/home.scss";
import { useHistory } from "react-router";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
import Caraousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CircularLoader from "../Components/CircularLoader/CircularLoader";
import Aos from "aos";
import "aos/dist/aos.css";
import weddingEventTypeImage from '../assets/images/weddingEventType.png';
import meetingEventTypeImage from "../assets/images/meetingEventType.jpg";
import photoshootEventTypeImage from "../assets/images/photoshootEventType.jpeg";
import productionEventTypeImage from "../assets/images/productionEventType.jpg";
import swal from "sweetalert";
import { v4 } from "uuid";
import { UserService } from "../Services/UserService";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { SharedService } from "../Services/SharedService";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import MainStepsSection from "../Components/StepsSection/MainStepsSection";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
//import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
const userService = new UserService();
const sharedService = new SharedService();

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // const user: any = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const [filters, setFilters] = useState<any>({
    capacityFilter: -1,
    priceFilter: -1,
    locationFilter: -1,
    eventTypeFilter: -1,
    search: "",
  });
  
  const [originalVenues, setOriginalVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [listOfWishlist, setListOfWishlist] = useState([]);
  const [listOfWishlistId, setListOfWishlistId] = useState<any[]>([]);
  // const [userId, setUserId] = useState<any>();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

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
          console.log(wishlistResponse);
          setListOfWishlist(wishlistResponse);
          console.log("ListOfWishlist", listOfWishlist);
          const tempArray: any = [];
          listOfWishlist.forEach((element: any) => {
            tempArray.push(element.id);
          });
          setListOfWishlistId(tempArray);
          console.log("ListOfWishlistId", listOfWishlistId);
        }
      })();
    }
  }, [user, venues, originalVenues]);


  useEffect(() => {
    (async () => {
      const [response, error] = await of(venueService.getPromotedVenues());
      if (error) {
        swal("Unable to fetch venues", "error");
      }
      if (response) {
        console.log(response);
        setTimeout(() => {
          setVenues(response);
          setLoading(false);
        }, 2000);

        setOriginalVenues(response);
      }
    })();

    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    setTimeout(() => {
      history.push("/venue-list");
    }, 1000);
  };

  const handleFilterChange = (event: React.ChangeEvent<any>) => {
    let temp: any = {};
    if (event.target.name === "search")
      temp = { ...filters, search: event.target.value };
    setFilters(temp);
  };

  const applyAppropiateFilters = () => {
    history.push(`/venue-list?search_text=${filters.search}`);
  }


  return (
    <>
      {loading && <CircularLoader />}
      {/* header starts */}
      <header>
        <Header></Header>
      </header>
      {/* header end */}

      {/* banner starts */}
      <div className="banner">
        <div className="banner-background">
          <div className="banner-heading">
            <Typography variant="h5" className="home-search-heading">
              <b>Find your perfect Venue!</b>
            </Typography>
          </div>
          <div className="banner-subheading">
            Browse and price out thousands of venues.
          </div>
          <div className="home-search-container">
            <TextField
              id="search"
              name="search"
              label={null}
              variant="outlined"
              className="home-textfield"
              size="small"
              placeholder="Search a venue by typing name or city"
              onChange={handleFilterChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className="home-search-button"
              onClick={applyAppropiateFilters}
            >
              <SearchOutlinedIcon /> &nbsp; search
            </Button>
          </div>
          {/* <div className="banner-button-container">
            <Button href="/user/register/host" className="banner-host-button">
              Become a Host &nbsp; <SupervisorAccountOutlinedIcon />
            </Button>
          </div> */}
        </div>
      </div>
      {/* banner ends */}

      {/* Event type cards */}
      <Container className="hp-event-type-filter-container">
        <Typography variant="h5" className="hp-event-type-filter-heading">
          Search according to your need
        </Typography>
        <Grid spacing={2} container lg={12}>
          <Grid item lg={3}>
            <CardMedia
              component="img"
              image={weddingEventTypeImage}
              height="100%"
              className="hp-event-type-icon"
              onClick={() => history.push("/venue-list?even_type=1")}
            />
            <Typography className="hp-event-type-filter-heading">
              Wedding
            </Typography>
          </Grid>
          <Grid item lg={3}>
            <CardMedia
              component="img"
              image={meetingEventTypeImage}
              height="100%"
              className="hp-event-type-icon"
              onClick={() => history.push("/venue-list?even_type=5")}
            />
            <Typography className="hp-event-type-filter-heading">
              Meetings
            </Typography>
          </Grid>
          <Grid item lg={3}>
            <CardMedia
              component="img"
              image={productionEventTypeImage}
              height="100%"
              className="hp-event-type-icon"
              onClick={() => history.push("/venue-list?even_type=3")}
            />
            <Typography className="hp-event-type-filter-heading">
              Production
            </Typography>
          </Grid>
          <Grid item lg={3}>
            <CardMedia
              component="img"
              image={photoshootEventTypeImage}
              height="100%"
              className="hp-event-type-icon"
              onClick={() => history.push("/venue-list?even_type=2")}
            />
            <Typography className="hp-event-type-filter-heading">
              Photo shoot
            </Typography>
          </Grid>
        </Grid>
      </Container>
      {/* event type cads ends here */}
      <div className="recommendedVenues">
        <div>
          <Typography className="recommendedTitle">Popular Venues</Typography>
        </div>
        <div
          className="recommended-venue-box"
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
              <Box p={3}>
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
        <div className="exploreButton" data-aos="fade-up" data-aos-once>
          <IconButton
            onClick={handleClick}
            className="home-explore-more-button"
          >
            Explore More
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>

      {/* <Container>
        <Grid lg={12}>
          <Grid lg={6}>
            <Typography variant="h4">Try Hosting</Typography>
            <Typography variant="body1" >Earn extra income and unlock new opportunities by sharing your space.</Typography>
          </Grid>
          <Grid lg={6}>

          </Grid>
        </Grid>
      </Container> */}

      <div>
        <MainStepsSection />
      </div>
      <footer className="home-footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default HomePage;
