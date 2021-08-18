import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import CheckoutPage from "./Layouts/CheckoutPage";
import Dashboard from "./Layouts/Dashboard";
import ErrorPage from "./Layouts/ErrorPage";
import HomePage from "./Layouts/HomePage";
import LoginPage from "./Layouts/LoginPage";
import RegistrationPage from "./Layouts/RegistrationPage";
import VenueDetailsPage from "./Layouts/VenueDetailsPage";
import VenueListPage from "./Layouts/VenueListPage";

export default function AppRouter() {

  return (
    <>
      {/* 
          / --> home page
          /user/login --> LoginPage
          /user/register --> RegistrationPage
          /venue-list --> VenueListPage
          /venue-detials/:id --> VenueDetailsPage
          /dashboard/:userrole --> Dashboard
          /checkout/:id --> CheckoutPage
      */}

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user/login" component={LoginPage} />
        <Route exact path="/user/register" component={RegistrationPage} />
        <Route exact path="/venue-list" component={VenueListPage} />
        <Route exact path="/venue-details/1" component={VenueDetailsPage} />
        <Route exact path="/dashboard/client" component={Dashboard} />
        <Route exact path="/dashboard/host" component={Dashboard} />
        <Route exact path="/checkout/1" component={CheckoutPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}
