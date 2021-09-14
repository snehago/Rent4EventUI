/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./commonAnalytics.scss";
import DoughnutChart from "./DoughnutChart";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { User } from "../../Shared/Interfaces/User";
import DoughnutAllVenueEarnings from "./DoughnutAllVenueEarnings";
import { AnalyticsService } from "../../Services/AnalyticsServices";
import swal from "sweetalert";
import { of } from "await-of";
import DividerComponent from "../DividerComponent/DividerComponent";

const analyticsService = new AnalyticsService();
function CommonAnalytics() {
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        analyticsService.getTotalEarningOfHost(user.id)
      );
      if (error) {
        swal("Error", "Unable to fetch", "error");
      }
      if (response) {
        setTotalEarning(response.response);
      }
    })();
  }, []);
  return (
    <div className="common-analytics-container">
      <div className="common-analytics-booking-all-venues">
        <div className="total-earnings-host">
          <span className="total-earning-label">Total Earning: </span>
          <span id="earning-value">${totalEarning} </span>
        </div>

        <DividerComponent />

        <div className="both-donuts-container">
          <div className="each-donut-container">
            <div className="analytics-label">Bookings Of All Venues</div>

            <div className="doughnut-chart-container">
              <DoughnutChart userId={user.id} />
            </div>
          </div>

          <div className="each-donut-container">
            <div className="analytics-label">Earnings Of All Venues</div>

            <div className="doughnut-chart-container">
              <DoughnutAllVenueEarnings userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonAnalytics;
