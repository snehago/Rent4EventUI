import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { RootState } from "../Redux/store";

const HomePage = () => {
  const user = useSelector((state:RootState)=> state.auth.user);
  return (
    <>
      <Header></Header>
        user logged in :
        {JSON.stringify(user)}
      <Footer></Footer>
    </>
  );
};
export default HomePage;
