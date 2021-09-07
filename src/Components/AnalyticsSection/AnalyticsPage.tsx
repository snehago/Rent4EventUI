import { Paper } from "@material-ui/core";
import React from "react";
import "./analyticsPage.scss";
import CommonAnalytics from "./CommonAnalytics";
import SpecificAnalytics from "./SpecificAnalytics";

function AnalyticsPage() {
  return (
    <Paper elevation={5} className="analytics-page-paper-container scroll-div">
      <div className="analytics-page-heading">Analytics</div>

      <CommonAnalytics />
      <SpecificAnalytics />
    </Paper>
  );
}

export default AnalyticsPage;
