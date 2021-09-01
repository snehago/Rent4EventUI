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
  CircularProgress,
} from "@material-ui/core";
import "./styles/venueListPage.scss";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
import { EventTypeService } from "../Services/EventTypeService";
import InfiniteScroll from "react-infinite-scroller";
import { useRef } from "react";
import CircularLoader from "../Components/CircularLoader/CircularLoader";

const venueService = new VenueService();
const eventTypeService = new EventTypeService();
const VenueListPage = () => {
  const [filters, setFilters] = useState<any>({
    capacityFilter: -1,
    priceFilter: -1,
    locationFilter: -1,
    eventTypeFilter: -1,
    to: Date.now(),
    from: Date.now(),
    sort: -1,
    facilityFilter: -1,
    search: "",
  });
  const [venues, setVenues] = useState<Venue[]>([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [originalVenues, setOriginalVenues] = useState<Venue[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const timeoutForLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    (async () => {
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

        setTimeout(() => {
          setOriginalVenues((prev) => [...prev, ...response]);
          setLoading(false);
        }, 2000);
      }
    })();

    // window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    (async () => {
      const [eventResponse, eventError] = await of(
        eventTypeService.getAllEventType()
      );
      if (eventError) {
        alert(eventError.message);
      }
      if (eventResponse) {
        console.log(eventResponse);
        setEventTypes(eventResponse);
      }
    })();
  }, []);

  useEffect(() => {
    applyAppropiateFilters();
  }, [filters, originalVenues]);

  const handleFilterChange = (event: React.ChangeEvent<any>) => {
    console.log(event.target);
    let temp: any = {};
    if (event.target.name === "priceFilter")
      temp = { ...filters, priceFilter: event.target.value };
    if (event.target.name === "capacityFilter")
      temp = { ...filters, capacityFilter: event.target.value };
    if (event.target.name === "eventTypeFilter")
      temp = { ...filters, eventTypeFilter: event.target.value };
    if (event.target.name === "locationFilter")
      temp = { ...filters, locationFilter: event.target.value };
    if (event.target.name === "facilityFilter")
      temp = { ...filters, facilityFilter: event.target.value };
    if (event.target.name === "to")
      temp = { ...filters, to: event.target.value };
    if (event.target.name === "from")
      temp = { ...filters, from: event.target.value };
    if (event.target.name === "search")
      temp = { ...filters, search: event.target.value };
    if (event.target.name === "sort")
      temp = { ...filters, sort: event.target.value };
    setFilters(temp);
  };
  const applyAppropiateFilters = () => {
    console.log(filters);
    let tempVenues = originalVenues;
    for (let i of Object.keys(filters)) {
      if (filters[i] === -1) continue;
      else {
        if (i === "priceFilter")
          tempVenues = applyPriceFilter(filters[i], tempVenues);
        if (i === "capacityFilter")
          tempVenues = applyCapacityFilter(filters[i], tempVenues);
        if (i === "eventTypeFilter")
          tempVenues = applyEventTypeFilter(filters[i], tempVenues);
      }
    }
    let toSearch = filters.search.trim().toUpperCase();
    if (toSearch.length !== 0) {
      tempVenues = tempVenues.filter((venue) =>
        venue.title.toUpperCase().includes(toSearch)
      );
    }
    setVenues(tempVenues);
  };
  const applyPriceFilter = (filterType: any, tempVenues: Venue[]) => {
    setLoading(true);
    console.log("priceFilter");
    let temp: any = [];
    console.log(typeof filterType, filterType);
    if (filterType === 1) {
      temp = tempVenues.filter((venue) => venue.price <= 500);
      timeoutForLoading();
    }
    if (filterType === 2) {
      temp = tempVenues.filter(
        (venue) => venue.price > 500 && venue.price <= 1000
      );
      timeoutForLoading();
    }
    if (filterType === 3) {
      temp = tempVenues.filter(
        (venue) => venue.price > 1000 && venue.price <= 5000
      );
      timeoutForLoading();
    }
    if (filterType === 4) {
      temp = tempVenues.filter((venue) => venue.price > 5000);
      timeoutForLoading();
    }
    return temp;
  };

  const applyCapacityFilter = (filterType: any, tempVenues: Venue[]) => {
    let temp: any = [];
    setLoading(true);
    console.log("capacity", filterType);
    if (filterType === 1) {
      temp = tempVenues.filter((venue) => venue.capacity <= 500);
      timeoutForLoading();
    }
    if (filterType === 2) {
      temp = tempVenues.filter(
        (venue) => venue.capacity > 500 && venue.capacity <= 1000
      );
      timeoutForLoading();
    }
    if (filterType === 3) {
      temp = venues.filter((venue) => venue.capacity > 1000);
      timeoutForLoading();
    }
    console.log("capacity", temp.length);
    return temp;
  };
  const applyEventTypeFilter = (filterType: any, tempVenues: Venue[]) => {
    let temp: any = [];
    temp = tempVenues.filter(
      (venue) =>
        venue.listOfEventTypes.filter(
          (eventType: any) => eventType.id === filterType
        ).length > 0
    );
    return temp;
  };

  return (
    <>
      {loading && <CircularLoader />}

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
          name="search"
          variant="outlined"
          className="textfield"
          size="small"
          onChange={handleFilterChange}
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
            name="eventTypeFilter"
            value={filters.eventTypeFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="location" className="venue-label">
            Location
          </InputLabel>
          <Select
            labelId="location-select"
            id="location-select"
            name="locationFilter"
            value={filters.locationFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="capacity" className="venue-label">
            Capacity
          </InputLabel>
          <Select
            labelId="capacity-select"
            id="capacity-select"
            name="capacityFilter"
            value={filters.capacityFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="price" className="venue-label">
            Price
          </InputLabel>
          <Select
            labelId="price-select"
            id="price-select"
            name="priceFilter"
            value={filters.priceFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="venue-select"
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
      <div className="venue-filter-container">
        <FormControl>
          <TextField
            label="to"
            InputLabelProps={{ shrink: true }}
            id="to-date"
            name="to"
            value={filters.to}
            onChange={handleFilterChange}
            type="date"
            className="venue-select"
          />
        </FormControl>

        <FormControl>
          <TextField
            label="from"
            InputLabelProps={{ shrink: true }}
            id="from-date"
            value={filters.from}
            onChange={handleFilterChange}
            type="date"
            className="venue-select"
          />
        </FormControl>

        <FormControl>
          <InputLabel shrink id="facility-label" className="venue-label">
            Facility
          </InputLabel>
          <Select
            labelId="facility-label"
            id="facility-select"
            name="facilityFilter"
            value={filters.facilityFilter}
            onChange={handleFilterChange}
            displayEmpty
            className="venue-select"
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
          <InputLabel shrink id="sort-label" className="venue-label">
            Sort By Price
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            displayEmpty
            className="venue-select"
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>High to Low</MenuItem>
            <MenuItem value={2}>Low to High</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* Filter and search ends */}
      <div className="all-venues" data-aos="zoom-in">
        <InfiniteScroll
          pageStart={0}
          loadMore={() => setCurrentPage((prev) => prev + 1)}
          hasMore={!disabled}
          initialLoad={false}
          loader={
            <Grid style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Grid>
          }
          useWindow={false}
        >
          <Box className="venue-box" data-aos="zoom-in">
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
        </InfiniteScroll>
      </div>

      <footer className="venue-footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default VenueListPage;
