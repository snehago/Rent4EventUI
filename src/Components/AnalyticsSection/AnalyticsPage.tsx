import { Paper } from "@material-ui/core";
import React from "react";
import DividerComponent from "../DividerComponent/DividerComponent";
import "./analyticsPage.scss";
import CommonAnalytics from "./CommonAnalytics";
import SpecificAnalytics from "./SpecificAnalytics";
import allDataSvg from "../../assets/illustrations/allData.svg";
import analysis from "../../assets/illustrations/analysis.svg";

function AnalyticsPage() {
  return (
    <Paper elevation={5} className="analytics-page-paper-container scroll-div">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom:"2%"
        }}
      >
        <img src={analysis} height="20%" width="20%" />
        <div className="analytics-page-heading">Analytics</div>
        <img src={allDataSvg} height="20%" width="20%" />
      </div>

      <CommonAnalytics />
      <DividerComponent />
      <SpecificAnalytics />
    </Paper>
  );
}

export default AnalyticsPage;
