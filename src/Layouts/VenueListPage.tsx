import React, { useState, useEffect } from "react";
import CardItem from "../Components/CardItem";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { VenueService } from "../Services/VenueService";
import {
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import "./styles/venueListPage.scss";
import { useHistory } from "react-router";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";

const venueService = new VenueService();

const VenueListPage = () => {
  const history = useHistory();
  const [filter, setFilter] = useState<string[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      console.log("use effect of home page");
      const [response, error] = await of(
        venueService.getAllVenues(currentPage)
      );
      if (error) {
        alert(error.message);
      }
      if (response) {
        if (response.length === 0) {
          setDisabled(true);
          return;
        }
        setVenues((prev) => [...prev, ...response]);
      }
    })();

    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleClick = () => {
    setTimeout(() => {
      history.push("/venue-list");
    }, 1000);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter((prev) => [...prev, event.target.value as string]);
  };

  return (
    <>
      {/* header starts */}
      <header>
        <Header></Header>
      </header>
      {/* header end */}

      {/* Filter and search  starts*/}
      <div className="venue-search-container">
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

      <div className="venue-filter-container">
        <FormControl>
          <InputLabel shrink id="event-type" className="venue-label">
            Event Type
          </InputLabel>
          <Select
            labelId="evert-type-select"
            id="event-type-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="location" className="venue-label">
            Location
          </InputLabel>
          <Select
            labelId="location-select"
            id="location-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="capacity" className="venue-label">
            Capacity
          </InputLabel>
          <Select
            labelId="capacity-select"
            id="capacity-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="price" className="venue-label">
            Price
          </InputLabel>
          <Select
            labelId="price-select"
            id="price-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
      <div className="venue-filter-container">
        <FormControl>
          <InputLabel shrink id="event-type" className="venue-label">
            Event Type
          </InputLabel>
          <Select
            labelId="evert-type-select"
            id="event-type-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="location" className="venue-label">
            Location
          </InputLabel>
          <Select
            labelId="location-select"
            id="location-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="capacity" className="venue-label">
            Capacity
          </InputLabel>
          <Select
            labelId="capacity-select"
            id="capacity-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="price" className="venue-label">
            Price
          </InputLabel>
          <Select
            labelId="price-select"
            id="price-select"
            value={filter[0]}
            onChange={handleChange}
            displayEmpty
            className="venue-select"
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
      {/* Filter and search ends */}
      <div className="all-venues">
        <Box className="venue-box">
          <Grid xs={12} container spacing={8} className="venue-grid">
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
      </div>
      <div className="venue-load-more-button-container">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={disabled}
        >
          load more..
        </Button>
      </div>
      <footer className="venue-footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default VenueListPage;
