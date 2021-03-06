import { Redirect, Route, Switch } from "react-router-dom";
import CancellationPolicy from "./Layouts/CancellationPolicy";
import CheckoutPage from "./Layouts/CheckoutPage";
import Dashboard from "./Layouts/Dashboard";
import ErrorPage from "./Layouts/ErrorPage";
import FooterServices from "./Layouts/FooterServices";
import HomePage from "./Layouts/HomePage";
import LoginPage from "./Layouts/LoginPage";
import PrivacyPolicy from "./Layouts/PrivacyPolicy";
import RegistrationPage from "./Layouts/RegistrationPage";
import RegistrationPageHost from "./Layouts/RegistrationPageHost";
import VenueDetailsPage from "./Layouts/VenueDetailsPage";
import VenueListPage from "./Layouts/VenueListPage";
import WishlistPage from "./Layouts/WishlistPage";

const CustomRoute = ({component:ComponentToRender ,path, user,...rest}:any) => {
  return (
    <Route {...rest} render={(props => {
      if (
        path === "/user/login" ||
        path === "/user/register/user" ||
        path === "/user/register/host"
      ) {
        if (user) {
          if (user.role === "client") return <Redirect to="/home"></Redirect>;
          if (user.role === "host") return <Redirect to="/dashboard/host" />;
          if (user.role === "admin") return <Redirect to="/dashboard/admin"/>;
        }
      } else if (path.includes("/checkout") && !user)
        return <Redirect to="/user/login"></Redirect>;
      else if (path.includes("/dashboard") && !user)
        return <Redirect to="/user/login"></Redirect>;
      return <ComponentToRender {...props}></ComponentToRender>
    })} ></Route>
  );
}

export default function AppRouter({user}:any) {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage}>
          <Redirect to="/home" />
        </Route>
        <Route exact path="/services" component={FooterServices} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/cancellation-policy" component={CancellationPolicy} />
        <Route exact path="/home" component={HomePage} />
        <CustomRoute exact path="/user/login" component={LoginPage} user={user} />
        <CustomRoute exact path="/user/register/user" component={RegistrationPage} user={user} />
        <CustomRoute
          exact
          path="/user/register/host"
          component={RegistrationPageHost}
          user={user}
        />
        <Route path="/venue-list" component={VenueListPage} />
        <Route
          exact
          path="/venue-details/:venueId"
          component={VenueDetailsPage}
        />
        
        <CustomRoute exact path="/dashboard/:userRole" component={Dashboard} user={user} />
        <CustomRoute exact path="/checkout/:venueId" component={CheckoutPage} user={user} />
        <CustomRoute exact path="/wishlist" component={WishlistPage} user={user} />
        <Route component={ErrorPage} />
        <Route exact path="/services" component={FooterServices} />
      </Switch>
    </>
  );
}
