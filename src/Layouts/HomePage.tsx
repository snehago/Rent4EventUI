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
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';

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
            <Typography variant="h5">
              Your Venue Is Where The Magical Journey Begins
            </Typography>
          </div>
          <div className="banner-subheading">
            Ready to paint a visual picture for your clients? Power up your
            venue with Rent4Event. It is one of the best and convenient way to
            showcase your venue as an event hotspot
          </div>
          <div className="banner-button-container">
            <Button href="/user/register/host" className="banner-host-button">
              Become a Host &nbsp; <SupervisorAccountOutlinedIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* banner ends */}

      {/* Filter and search  starts*/}
      {/* <div className="home-filter-container">
        <FormControl>
          <InputLabel shrink id="event-type" className="home-label">
            Event Type
          </InputLabel>
          <Select
            labelId="evert-type-select"
            name="eventTypeFilter"
            id="event-type-select"
            value={filters.eventTypeFilter}
            onChange={handleFilterChange}
            className="home-select"
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {eventTypes?.map((event: any) => (
              <MenuItem value={event.id}>{event.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel shrink id="location" className="home-label">
            Location
          </InputLabel>
          <Select
            labelId="location-select"
            id="location-select"
            name="locationFilter"
            value={filters.locationFilter}
            onChange={handleFilterChange}
            className="home-select"
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {cities?.map((city) => (
              <MenuItem
                key={city.stateCode + city.countryCode}
                value={city.name}
              >
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel shrink id="capacity" className="home-label">
            Capacity
          </InputLabel>
          <Select
            labelId="capacity-select"
            id="capacity-select"
            name="capacityFilter"
            value={filters.capacityFilter}
            onChange={handleFilterChange}
            className="home-select"
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>0-500</MenuItem>
            <MenuItem value={2}>500-1000</MenuItem>
            <MenuItem value={3}>&gt;1000</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel shrink id="price" className="home-label">
            Price
          </InputLabel>
          <Select
            labelId="price-select"
            id="price-select"
            name="priceFilter"
            value={filters.priceFilter}
            onChange={handleFilterChange}
            className="home-select"
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            <MenuItem key={1} value={1}>
              100-500
            </MenuItem>
            <MenuItem key={2} value={2}>
              500-1000
            </MenuItem>
            <MenuItem key={3} value={3}>
              1000-5000
            </MenuItem>
            <MenuItem key={4} value={4}>
              &gt;5000
            </MenuItem>
          </Select>
        </FormControl>
      </div> */}
      <div className="home-search-container">
        <TextField
          id="search"
          name="search"
          label="Search"
          variant="outlined"
          className="home-textfield"
          size="small"
          onChange={handleFilterChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className="home-search-button"
          onClick={applyAppropiateFilters}
        >
          <SearchOutlinedIcon /> &nbsp;
          search
          
        </Button>
      </div>
      {/* Filter and search ends */}

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
          <Button
            onClick={handleClick}
            size="large"
            variant="outlined"
            className="btnStyle"
          >
            Explore More!
          </Button>
        </div>


      </div>

      <div>
        <MainStepsSection  />
      </div>
      <footer className="home-footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default HomePage;
