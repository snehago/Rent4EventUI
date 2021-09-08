import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddVenue from "../Components/AddVenueForm/AddVenue";
import BookingList from "../Components/BookingList";
import Header from "../Components/Header";
import HostVenuesList from "../Components/HostVenuesList";
import Profile from "../Components/ProfileForm/Profile";
import "./styles/dashboard.scss";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import AnalyticsPage from "../Components/AnalyticsSection/AnalyticsPage";
import DonutLargeOutlinedIcon from '@material-ui/icons/DonutLargeOutlined';
import ManageFacilities from "../Components/ManageFacilities";
import ManageEventTypes from "../Components/ManageEventTypes";
import ManageUsers from "../Components/ManageUsers";
import { v4 } from "uuid";

const sideBarItems: any = {
  client: [
    {
      id: 2,
      value: "Booking History",
      icon: <HistoryOutlinedIcon />,
    },
    {
      id: 1,
      value: "My profile",
      icon: <PersonOutlineOutlinedIcon />,
    },
  ],
  host: [
    {
      id: 4,
      value: "My Venues",
      icon: <RoomOutlinedIcon />,
    },
    {
      id: 3,
      value: "Add Venue",
      icon: <AddBoxOutlinedIcon />,
    },
    {
      id: 1,
      value: "My profile",
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      id: 5,
      value: "Analytics",
      icon: <DonutLargeOutlinedIcon />,
    },
  ],
  admin: [
    {
      id: 6,
      value: "Manage Facilities",
      icon: <RoomOutlinedIcon />,
    },
    {
      id: 7,
      value: "Manage Event types",
      icon: <AddBoxOutlinedIcon />,
    },
    {
      id: 8,
      value: "Manage Users",
      icon: <PersonOutlineOutlinedIcon />,
    },
  ],
};
const Dashboard = () => {
  const { userRole } = useParams<any>();
  const [selected, setSelected] = useState<number>(0);
  const changeView = (id: number) => {
    setSelected(id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userRole === "client") setSelected(2);
    if (userRole === "host") setSelected(4);
    if (userRole === "admin") setSelected(6);
  }, [userRole]);

  return (
    <>
      <Header></Header>
      <div className="main">
        <div className="side-nav">
          <List component="nav" aria-label="secondary mailbox folders">
            {sideBarItems[userRole].map(({ id, value, icon }: any) => (
              <>
                {" "}
                <ListItem
                  key={id}
                  id={selected === id ? "active" : id}
                  onClick={() => changeView(id)}
                  button
                >
                  {icon}&nbsp;
                  <ListItemText primary={value} />
                </ListItem>
                <Divider></Divider>
              </>
            ))}
          </List>
        </div>

        <div className="main-content">
          {selected === 1 && <Profile userRole={userRole} />}
          {selected === 2 && <BookingList></BookingList>}
          {selected === 3 && <AddVenue />}
          {selected === 4 && <HostVenuesList changeView={changeView} />}
          {selected === 5 && <AnalyticsPage key={v4()} />}
          {selected === 6 && <ManageFacilities/>}
          {selected === 7 && <ManageEventTypes/> }
          {selected === 8 && <ManageUsers />}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
