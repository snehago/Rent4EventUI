/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import CardItem from "../Components/CardItem";
import Header from "../Components/Header";
import { VenueService } from "../Services/VenueService";
import { Collapse } from "react-collapse";
import FilterListIcon from "@material-ui/icons/FilterList";
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
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./styles/venueListPage.scss";
import { of } from "await-of";
import { Venue } from "../Shared/Interfaces/Venue";
import { EventTypeService } from "../Services/EventTypeService";
import InfiniteScroll from "react-infinite-scroller";
import CircularLoader from "../Components/CircularLoader/CircularLoader";
import swal from "sweetalert";
import queryString from "query-string";
import { UserService } from "../Services/UserService";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { SharedService } from "../Services/SharedService";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import moment from "moment";
import noResult from '../assets/illustrations/noResult.jpg'

const venueService = new VenueService();
const eventTypeService = new EventTypeService();
const userService = new UserService();
const sharedService = new SharedService();
const VenueListPage = (props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [eventType] = useState<any>(
    queryString.parse(props.location.search).even_type || null
  );
  const [searchText] = useState<any>(
    queryString.parse(props.location.search).search_text || null
  );
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
  const [filterStatus, setFilterStatus] = useState<boolean>(false);
  const [listOfWishlist, setListOfWishlist] = useState([]);
  const [listOfWishlistId, setListOfWishlistId] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      const [eventResponse, eventError] = await of(
        eventTypeService.getAllEventType()
      );
      if (eventError) {
        swal("Error", "Unable to fetch event types", "error");
      }
      if (eventResponse) {
        setEventTypes(eventResponse);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        venueService.getAllVenues(currentPage)
      );
      if (error) {
        swal("Error", "Unable to fetch venues", "error");
      }
      if (response) {
        if (response.length === 0) {
          setDisabled(true);
          return;
        }
        setOriginalVenues((prev) => [...prev, ...response]);
        setLoading(false);
        setTimeout(()=>{
          setFilters(
            Object.assign({},filters, {
              eventTypeFilter: Number(eventType) || -1,
              search: searchText || "",
            })
          );
          
        },2000);
      }
    })();
  }, [currentPage]);

  const startDateValue:Date = new Date(moment(Date.now()).format("yyyy-mm-dd"));
  
  const handleDateChange = (event: any) => {
    if (event?.target?.value && event?.target?.value[0]!== startDate) {
      setStartDate(event.target.value[0]);
    }
    if (event?.target?.value && event?.target?.value[1] !== endDate) {
      setEndDate(event.target.value[1]);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<any>) => {
    let temp: any = {};
    if (event.target.name === "priceFilter")
      temp = { ...filters, priceFilter: event.target.value };
    if (event.target.name === "capacityFilter")
      temp = { ...filters, capacityFilter: event.target.value };
    if (event.target.name === "eventTypeFilter")
      temp = { ...filters, eventTypeFilter: event.target.value };
    if (event.target.name === "search")
      temp = { ...filters, search: event.target.value };
    if (event.target.name === "sort")
      temp = { ...filters, sort: event.target.value };
    setFilters(temp);
  };
  const applyAppropiateFilters =async () => {
    
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
        if (i === "sort")tempVenues = await sort(filters[i], tempVenues);
      }
    }
    let toSearch = filters.search.trim().toUpperCase();
    if (toSearch.length !== 0) {
      tempVenues = tempVenues.filter(
        (venue) =>
          venue.title.toUpperCase().includes(toSearch) ||
          venue?.address?.city?.toUpperCase().includes(toSearch)
      );
    }
    setVenues(tempVenues);
  };
  useEffect(() => {
    applyAppropiateFilters();
  }, [filters, originalVenues,endDate]);

  const applyPriceFilter = (filterType: any, tempVenues: Venue[]) => {  
    let temp: any = [];
  
    if (filterType === 1) {
      temp = tempVenues.filter((venue) => venue.price <= 500);
    }
    if (filterType === 2) {
      temp = tempVenues.filter(
        (venue) => venue.price > 500 && venue.price <= 1000
      );
    }
    if (filterType === 3) {
      temp = tempVenues.filter(
        (venue) => venue.price > 1000 && venue.price <= 5000
      );
    }
    if (filterType === 4) {
      temp = tempVenues.filter((venue) => venue.price > 5000);
    }
    return temp;
  };

  const applyCapacityFilter = (filterType: any, tempVenues: Venue[]) => {
    let temp: any = [];
    if (filterType === 1) {
      temp = tempVenues.filter((venue) => venue.capacity <= 500);
    }
    if (filterType === 2) {
      temp = tempVenues.filter(
        (venue) => venue.capacity > 500 && venue.capacity <= 1000
      );
    }
    if (filterType === 3) {
      temp = venues.filter((venue) => venue.capacity > 1000);
    }
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

  const sort = async (filterType: any, tempVenues: Venue[]) => {
    setLoading(true);
    let temp: any = [];
    if (filterType === 2) temp =await tempVenues.sort((a, b) => a.price - b.price);
    if (filterType === 1) temp =await tempVenues.sort((a, b) => b.price - a.price);
    setLoading(false);
    return temp;
  };
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
          setListOfWishlist(wishlistResponse);
          const tempArray: any = [];
          listOfWishlist.forEach((element: any) => {
            tempArray.push(element.id);
          });
          setListOfWishlistId(tempArray);
        }
      })();
    }
  }, [user, venues, originalVenues]);

  return (
    <>
      {loading && <CircularLoader />}

      {/* header starts */}
      <header>
        <Header></Header>
      </header>
      {/* header end */}

      {/* Filter and search  starts*/}
      <div className="venue-search-division">
        <div className="dark-overlay">
          <div className="venue-search-container">
            <TextField
              id="search"
              label={null}
              name="search"
              variant="outlined"
              className="textfield"
              size="small"
              placeholder="Search a venue by typing name or city"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className="search-button"
            >
              <SearchOutlinedIcon />
              search
            </Button>
          </div>
          <div className="filter-button-container">
            <Button onClick={() => setFilterStatus(!filterStatus)}>
              <FilterListIcon /> Filter
              {filterStatus ? <ExpandLessIcon /> : <ExpandMoreIcon />}{" "}
            </Button>
          </div>
        </div>
      </div>
      <Collapse isOpened={filterStatus}>
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
          <div className="vlp-date-picker">
            <DateRangePickerComponent
              placeholder="Select Dates"
              startDate={startDateValue}
              format="dd-MMM-yy"
              onChange={handleDateChange}
            ></DateRangePickerComponent>
          </div>
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
      </Collapse>
      {/* Filter and search ends */}
      <div className="all-venues">
        {venues.length===0 &&
          <div className="no-result-container">
            <div className="no-search-text">
              No Results Found...
            </div>
            <img src={noResult} height="30%" width="30%" alt="" />
          </div>
        
        }
        { venues.length!==0 && <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!disabled}
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
              {venues?.map((venue, index) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  data-aos="fade-up"
                  data-aos-once
                  key={index * index}
                >
                  {listOfWishlistId.includes(venue.id) ? (
                    <Box>
                      <CardItem
                        id={venue.id}
                        title={venue.title}
                        description={venue.description}
                        price={venue.price}
                        host={venue.host}
                        wish={true}
                        key={venue.id}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <CardItem
                        id={venue.id}
                        title={venue.title}
                        description={venue.description}
                        price={venue.price}
                        host={venue.host}
                        wish={false}
                        key={venue.id}
                      />
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </InfiniteScroll>
}
      </div>
    </>
  );
};
export default VenueListPage;
