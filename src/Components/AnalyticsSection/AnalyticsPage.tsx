import { Paper } from "@material-ui/core";
import React from "react";
import DividerComponent from "../DividerComponent/DividerComponent";
import "./analyticsPage.scss";
import CommonAnalytics from "./CommonAnalytics";
import SpecificAnalytics from "./SpecificAnalytics";
import allDataSvg from "../../assets/illustrations/allData.svg";
import analysis from "../../assets/illustrations/analysis.svg";
import { v4 } from "uuid";

function AnalyticsPage() {
  return (
    <Paper key={v4()} elevation={5} className="analytics-page-paper-container scroll-div">
      <div className="main-analytics-page-heading-container">
        <img src={analysis} height="20%" width="20%" alt="" />
        <div className="analytics-page-heading">Analytics</div>
        <img src={allDataSvg} height="20%" width="20%" alt="" />
      </div>

      <CommonAnalytics key={v4()} />
      <DividerComponent />
      <SpecificAnalytics key={v4()} />
    </Paper>
  );
}

export default AnalyticsPage;
