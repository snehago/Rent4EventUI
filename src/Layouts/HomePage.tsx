import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { RootState } from "../Redux/store";
import { UserService } from "../Services/UserService";
import {SharedService} from '../Services/SharedService';
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
        user logged in :
        {JSON.stringify(user)}
        <button onClick={logout} >logout</button>
      <Footer></Footer>
    </>
  );
};
export default HomePage;
