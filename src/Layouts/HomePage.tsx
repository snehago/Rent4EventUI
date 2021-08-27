import React, { useState, useEffect } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
//import { RootState } from "../Redux/store";
//import {SharedService} from '../Services/SharedService';
//import { UserService } from "../Services/UserService";
import { VenueService } from "../Services/VenueService";
import { Grid, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";
import "./styles/home.scss";
//import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";

// const sharedService = new SharedService();
//const userService = new UserService();
const venueService = new VenueService();

const HomePage = () => {
  const history = useHistory();
  const [filter, setFilter] = useState<string[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  //const user = useSelector((state:RootState)=> state.auth.user);

  useEffect(()=> {
    (async ()=> {
      console.log("use effect of home page")
      const [response, error] = await of(venueService.getAllVenues());
      if(error) {
        alert(error.message);
      }
      if(response) {
        console.log(response);
        setVenues(response);
      }
    })();
  },[])

  const handleClick = () => {
    setTimeout(() => {
      history.push("/venue-list");
    }, 1000);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(prev => [...prev,event.target.value as string]);
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
      <div className="filter-container">
        <FormControl>
          <InputLabel shrink id="event-type" className="label">
            Event Type
          </InputLabel>
          <Select
            labelId="evert-type-select"
            id="event-type-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="select"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel shrink id="location" className="label">
            Location
          </InputLabel>
          <Select
            labelId="location-select"
            id="location-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="select"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel shrink id="capacity" className="label">
            Capacity
          </InputLabel>
          <Select
            labelId="capacity-select"
            id="capacity-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="select"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel shrink id="price" className="label">
            Price
          </InputLabel>
          <Select
            labelId="price-select"
            id="price-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="select"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="search-container">
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          className="textfield"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className="search-button"
        >
          search
        </Button>
      </div>
      {/* Filter and search ends */}
      <div className="recommendedVenues">
        <div>
          <Typography className="recommendedTitle">Popular Venues</Typography>
        </div>
        <Box p={6} style={{ marginLeft: 30 }}>
          <Grid xs={12} container spacing={6}>
            {venues?.map((venue) => (
              <Grid item xs={12} md={6} lg={4}>
                <CardItem
                  id={venue.id}
                  title={venue.title}
                  description={venue.description}
                  price={venue.price}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

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
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};
export default HomePage;
