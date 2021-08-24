import React, { useEffect, useState } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { RootState } from "../Redux/store";
import {SharedService} from '../Services/SharedService';
import { UserService } from "../Services/UserService";
import { Grid } from "@material-ui/core";
import "./styles/home.scss";
import { useSelector } from "react-redux";

const sharedService = new SharedService();
const userService = new UserService();
const HomePage = () => {
  const user = useSelector((state:RootState)=> state.auth.user);

  const logout = () => {
    userService.logout();
  }
  return (
    <>
      <Header></Header>
      Home Page
      {JSON.stringify(user)}<br/>
      <button onClick={logout}>Logout</button>
      <div className="recommendedVenues">
        <Grid item xs={12} container spacing={2}>
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
      </div>
      <Footer></Footer>
    </>
  );
};
export default HomePage;
