import React, { useEffect, useState } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { RootState } from "../Redux/store";
import {SharedService} from '../Services/SharedService';
import { UserService } from "../Services/UserService";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import "./styles/home.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const sharedService = new SharedService();
const userService = new UserService();
const HomePage = () => {
  const history = useHistory();
  const user = useSelector((state:RootState)=> state.auth.user);

  const handleClick = () => {
    setTimeout(() => {
      history.push("/venue-list");
    }, 1000);
  };

  return (
    <>
      {/* header starts */}
      <header>
        <Header></Header>
      </header>
      {/* header end */}

      <div>
        <div className="banner">
          <div className="text-division">
            <Typography variant="h5" >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Typography>
          </div>
        </div>
      </div>

      <div className="recommendedVenues">
        <div>
          <Typography className="recommendedTitle">Popular Venues</Typography>
        </div>
        <Box p={5} style={{ marginLeft: 30 }}>
          <Grid xs={12} container spacing={5}>
            <Grid item xs={6} lg={4}>
              <CardItem />
            </Grid>
            <Grid item xs={6} lg={4}>
              <CardItem />
            </Grid>
            <Grid item xs={6} lg={4}>
              <CardItem />
            </Grid>
            <Grid item xs={6} lg={4}>
              <CardItem />
            </Grid>
            <Grid item xs={6} lg={4}>
              <CardItem />
            </Grid>
            <Grid item xs={6} lg={4}>
              <CardItem />
            </Grid>
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
