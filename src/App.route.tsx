import { Redirect, Route, Switch } from "react-router-dom";
import CheckoutPage from "./Layouts/CheckoutPage";
import Dashboard from "./Layouts/Dashboard";
import ErrorPage from "./Layouts/ErrorPage";
import HomePage from "./Layouts/HomePage";
import LoginPage from "./Layouts/LoginPage";
import RegistrationPage from "./Layouts/RegistrationPage";
import RegistrationPageHost from "./Layouts/RegistrationPageHost";
import VenueDetailsPage from "./Layouts/VenueDetailsPage";
import VenueListPage from "./Layouts/VenueListPage";

const CustomRoute = ({component:ComponentToRender ,path, user,...rest}:any) => {
  return (
    <Route {...rest} render={(props => {
      if (
        path === "/user/login" ||
        path === "/user/register/user" ||
        path === "/user/register/host"
      ) {
        if(user) {
          if(user.role==='client') return <Redirect to='/home' ></Redirect>;
          if(user.role==='host') return <Redirect to='/dashboard/host'/>;
        }
      }
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
        <Route exact path="/home" component={HomePage} />
        <CustomRoute exact path="/user/login" component={LoginPage} user={user} />
        <CustomRoute exact path="/user/register/user" component={RegistrationPage} user={user} />
        <CustomRoute
          exact
          path="/user/register/host"
          component={RegistrationPageHost}
          user={user}
        />
        <Route exact path="/venue-list" component={VenueListPage} />
        <Route
          exact
          path="/venue-details/:venueId"
          component={VenueDetailsPage}
        />
        <Route exact path="/dashboard/:userRole" component={Dashboard} />
        <Route exact path="/checkout/:venueId" component={CheckoutPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}
