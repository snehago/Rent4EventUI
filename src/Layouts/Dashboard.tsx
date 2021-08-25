import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import UserForm from "../Components/UserForm";
import './styles/dashboard.scss';

const sideBarItems: any = {
  client: ["View/Edit profile", "Booking History"]
}
const Dashboard = () => {
  const { userRole } = useParams<any>();
  const changeView = (view:string) => {
    alert(view);
  }
  return (
    <>
      <Header></Header>
      {/* <div>
        <Typography variant="h4" className="heading">
          Dashboard
        </Typography>
      </div> */}
      <div className="main">
        <div className="side-nav">
          <List component="nav" aria-label="secondary mailbox folders">
            {sideBarItems[userRole].map((text: string) => <> <ListItem onClick={()=> changeView(text)} button>
              <ListItemText primary={text} />
            </ListItem> 
            <Divider></Divider>
            </>)}
          </List>
        </div>
        <div className="main-content">
          <UserForm></UserForm>
        </div>
      </div>
      <footer className="footer">
        <Footer></Footer>
      </footer>
    </>
  );
};
export default Dashboard;
