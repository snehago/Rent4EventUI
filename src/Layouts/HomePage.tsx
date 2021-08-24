import React, { useEffect, useState } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { UserService } from "../Services/UserService";
import { Button, Grid, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import "../LayoutStyles/home.scss";
import { useHistory } from "react-router-dom";

const userService = new UserService();
const HomePage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await userService.login({
        email: "abc@gmail.com",
        passwordHash: "12345678",
      });
      if (response.data && response.data.success) {
        setUser(response.data.response);
      }
    })();
  }, []);

  const history = useHistory();

  const handleClick = () => {
    setTimeout(() => {
      history.push("/venue-list");
    }, 1000);
  };
  return (
    <>
      <Header></Header>
      Home Page
      {JSON.stringify(user)}
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
      <Footer></Footer>
    </>
  );
};
export default HomePage;
