import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { UserService } from "../Services/UserService";
import { useState } from "react";
import { of } from "await-of";
import Header from "../Components/Header";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import CardItem from "../Components/CardItem";
import InfiniteScroll from "react-infinite-scroller";
import Footer from "../Components/Footer";

const userService = new UserService();
function WishlistPage() {
  const user: any = useSelector((state: RootState) => state.auth.user);

  const [listOfWishlist, setListOfWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(userService.getWishlistOfUser(user));
      if (error) {
        // alert(error.message);
      }
      if (response) {
        console.log("RES:", response);
      }

      setListOfWishlist(response);
      console.log(listOfWishlist);
    })();

    window.scrollTo(0, 0);
  }, [user]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <Header />
      {/* Filter and search  starts*/}
      <div className="venue-search-division">
        <div className="dark-overlay">
          <br />
          <br />
          <div className="venue-search-text-area">
            <Typography variant="h4" className="venue-search-heading">
              <b>Your Wishlist!</b>
            </Typography>
            <br />
          </div>
        </div>
      </div>

      <div className="all-venues">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          //   hasMore={!disabled}
          initialLoad={false}
          loader={
            <Grid style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Grid>
          }
          useWindow
        >
          <Box className="venue-box">
            <Grid xs={12} container spacing={8} className="venue-grid">
              {listOfWishlist?.map((venue: any, id) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  data-aos="fade-up"
                  data-aos-once
                >
                  <CardItem
                    id={id}
                    title={venue.title}
                    description={venue.description}
                    price={venue.price}
                    host={venue.host}
                    wish={true}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </InfiniteScroll>
      </div>

      <Footer />
    </div>
  );
}

export default WishlistPage;
