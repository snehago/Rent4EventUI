import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddVenue from "../Components/AddVenueForm/AddVenue";
import BookingList from "../Components/BookingList";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Profile from "../Components/ProfileForm/Profile";
import './styles/dashboard.scss';

const sideBarItems: any = {
  client: [
    {
      id: 1,
      value: "View/Edit profile",
    },
    {
      id: 2,
      value: "Booking History",
    },
  ],
  host: [
    {
      id: 1,
      value: "View/Edit profile",
    },
    {
      id: 3,
      value: "Add/Edit Venue",
    },
  ],
};
const Dashboard = () => {
  const { userRole } = useParams<any>();
  const [selected, setSelected] = useState<number>(1);
  const changeView = (id: number) => {
    setSelected(id);
  }
  return (
    <>
      <Header></Header>
      <div className="main">
        <div className="side-nav">
          <List component="nav" aria-label="secondary mailbox folders">
            {sideBarItems[userRole].map(({id, value}:any) => <> <ListItem key={id} id={selected===id?'active':id} onClick={()=> changeView(id)} button>
              <ListItemText primary={value} />
            </ListItem> 
            <Divider></Divider>
            </>)}
          </List>
        </div>

        <div className="main-content">
          {selected===1 && <Profile userRole={userRole} />}
          {selected===2 && <BookingList></BookingList>}
          {selected===3 && <AddVenue/>}
        </div>
      
      </div>
      
      <footer className="dashboard-footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default Dashboard;
