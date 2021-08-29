import React, { useState, useEffect } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { VenueService } from "../Services/VenueService";
import { EventTypeService } from "../Services/EventTypeService";
import { Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import "./styles/home.scss";
import { useHistory } from "react-router";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
import Caraousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import ScrollToTop from "react-scroll-to-top";
import GoTop from "../Components/GoToTop/GoTop";

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
const eventTypeService = new EventTypeService();

const HomePage = () => {
  const history = useHistory();
  const [filters, setFilters] = useState<any>({
    capacityFilter:-1,
    priceFilter:-1,
    locationFilter:-1,
    eventTypeFilter: -1,
    search: ""
  });
  const [venues, setVenues] = useState<Venue[]>([]);
  const [eventTypes, setEventTypes]= useState([]);
  const [originalVenues, setOriginalVenues] = useState<Venue[]>([]);

  useEffect(() => {
    (async () => {
      const [eventResponse, eventError] = await of(eventTypeService.getAllEventType());
      if (eventError) {
        alert(eventError.message);
      }
      if (eventResponse) {
        console.log(eventResponse);
        setEventTypes(eventResponse);
      }
    })();
  }, []);

  useEffect(()=>{
    applyAppropiateFilters();
  },[filters])
  useEffect(()=> {
    (async ()=> {
      const [response, error] = await of(venueService.getPromotedVenues());
      if(error) {
        alert(error.message);
      }
      if(response) {
        console.log(response);
        setVenues(response);
        setOriginalVenues(response);
      }
    })();
  },[])

  const handleClick = () => {
    setTimeout(() => {
      history.push("/venue-list");
    }, 1000);
  };

  const handleFilterChange =(event: React.ChangeEvent<any>) => {
    console.log(event.target);
    let temp:any={};
    if(event.target.name ==="priceFilter")temp={...filters, priceFilter: event.target.value};
    if (event.target.name === "capacityFilter")temp ={ ...filters, capacityFilter: event.target.value };
    if (event.target.name === "eventTypeFilter")temp ={ ...filters, eventTypeFilter: event.target.value };
    if (event.target.name === "locationFilter")temp ={ ...filters, locationFilter: event.target.value };
    if (event.target.name === "search")
      temp = { ...filters, search: event.target.value };
    setFilters(temp);
  };
  const applyAppropiateFilters = () => {
    console.log(filters);
    let tempVenues = originalVenues;
    for(let i of Object.keys(filters)) {
      if(filters[i]=== -1 )continue;
      else {
        if (i === "priceFilter") tempVenues=applyPriceFilter(filters[i],tempVenues);
        if (i === "capacityFilter")tempVenues=applyCapacityFilter(filters[i], tempVenues);
        if (i === "eventTypeFilter")tempVenues=applyEventTypeFilter(filters[i], tempVenues);
      }
    }
    let toSearch = filters.search.trim().toUpperCase();
    if(toSearch.length!==0) {
      tempVenues = tempVenues.filter(
        (venue) =>
          venue.title.toUpperCase().includes(toSearch)
      );
    }
    setVenues(tempVenues);
  }
  const applyPriceFilter =(filterType:any, tempVenues:Venue[] ) => {
  console.log("priceFilter");
  let temp:any=[];
  console.log(typeof(filterType),filterType);
  if(filterType === 1)temp= tempVenues.filter((venue)=> venue.price<=500);
  if (filterType === 2)
    temp = tempVenues.filter((venue) => venue.price > 500 && venue.price <= 1000);
  if (filterType === 3)
      temp = tempVenues.filter(
        (venue) => venue.price > 1000 && venue.price <= 5000
      );
  if (filterType === 4)
    temp = tempVenues.filter((venue) => venue.price > 5000);
  return temp;
};

const applyCapacityFilter =(filterType:any, tempVenues:Venue[]) => {
  let temp: any = [];
  console.log("capacity",filterType);
  if (filterType === 1)temp = tempVenues.filter((venue) => venue.capacity <= 500);
  if (filterType === 2)temp = tempVenues.filter(
      (venue) => venue.capacity > 500 && venue.capacity <= 1000
    );
  if (filterType === 3)temp = venues.filter((venue) => venue.capacity > 1000);
  console.log("capacity",temp.length);
  return temp;
};
const applyEventTypeFilter =(filterType:any, tempVenues:Venue[]) => {
  let temp: any = [];
  temp = tempVenues.filter((venue) =>
    venue.listOfEventTypes.filter(
      (eventType: any) => eventType.id === filterType
    ).length >0
  );
  return temp;
};
  return (
    <>
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
              Your Venue Is Where The Magic Happens And The Exciting Journey
              Begins
            </Typography>
          </div>
          <div className="banner-subheading">
            Ready to paint a visual picture for your clients? Power up your
            venue with Rent4Event. It is one of the best and convenient way to
            showcase your venue as an event hotspot
          </div>
          <div className="banner-button-container">
            <Button href="/user/register/host" className="banner-host-button">
              Become a Host
            </Button>
          </div>
        </div>
      </div>
      {/* banner ends */}

      {/* Filter and search  starts*/}
      <div className="home-filter-container">
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
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
      </div>
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
          onClick ={applyAppropiateFilters}
        >
          search
        </Button>
      </div>
      {/* Filter and search ends */}
      <div className="recommendedVenues">
        <div>
          <Typography className="recommendedTitle">Popular Venues</Typography>
        </div>
        <div className="recommended-venue-box">
          <Caraousel
            swipeable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            keyBoardControl={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {venues?.map((venue) => (
              <Box p={3}>
                <CardItem
                  id={venue.id}
                  title={venue.title}
                  description={venue.description}
                  price={venue.price}
                />
              </Box>
            ))}
          </Caraousel>
        </div>

        <div className="exploreButton">
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
      <footer className="home-footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default HomePage;
