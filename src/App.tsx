import "./App.scss";
import { useEffect } from "react";
import AppRouter from "./App.route";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Redux/store";
import { SharedService } from "./Services/SharedService";
import { login } from "./Redux/reducers/AuthReducer";
import { User } from "./Shared/Interfaces/User";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import ScrollToTop from "react-scroll-to-top";
import GoTop from "./Components/GoToTop/GoTop";
import "./App.scss";
import Aos from "aos";
import "aos/dist/aos.css";

const sharedService = new SharedService();

const theme = createTheme({
  palette: {
    text: {
      primary: "#000000",
    },
    primary: {
      main: "#D3600C",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (sharedService.isUserLoggedIn() && !user) {
      let tempUser: User = JSON.parse(sharedService.getUser());
      dispatch(login(tempUser));
    }
  }, [user, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ScrollToTop
          smooth
          component={<GoTop />}
          id="scroll-to-top-component"
        />
        <AppRouter user={user}></AppRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
