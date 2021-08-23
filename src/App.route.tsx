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

export default function AppRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage}>
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Home" component={HomePage} />
        <Route exact path="/user/login" component={LoginPage} />
        <Route exact path="/user/register/user" component={RegistrationPage} />
        <Route
          exact
          path="/user/register/host"
          component={RegistrationPageHost}
        />
        <Route exact path="/venue-list" component={VenueListPage} />
        <Route
          exact
          path="/venue-details/:venueId"
          component={VenueDetailsPage}
        />
        <Route exact path="/dashboard/:userRole" component={Dashboard} />
        <Route exact path="/checkout/:userId" component={CheckoutPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}
