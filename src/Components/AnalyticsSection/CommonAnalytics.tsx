import React, { useEffect, useState } from "react";
import "./commonAnalytics.scss";
import Donut from "react-donut";
import { PieChart } from "react-minimal-pie-chart";
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
    const [totalEarning,setTotalEarning]=useState(0);

    useEffect(() => {
        (async () => {
            const [response, error] = await of(
              analyticsService.getTotalEarningOfHost(user.id)
            );
            if (error) {
              swal("Error", "Unable to fetch", "error");
            }
            if (response) {
              console.log(response);
              setTotalEarning(response.response)
            }
          })();
    }, [])
  return (
    <div className="common-analytics-container">
      <div className="common-analytics-booking-all-venues">
        
          
        <div className="total-earnings-host">
         <span className="total-earning-label">Total Earning: </span><span id="earning-value">Rs. {totalEarning} </span>
        </div>

        <DividerComponent />

        <div className="analytics-label">Bookings Of All Venues</div>

        <div className="doughnut-chart-container">
           <DoughnutChart userId={user.id} />
        </div>

        <div className="analytics-label">Earnings Of All Venues</div>

        <div className="doughnut-chart-container">
           <DoughnutAllVenueEarnings userId={user.id} />
        </div>
      </div>
    </div>
  );
}

export default CommonAnalytics;

{
  /* <div style={{marginBottom:"10%"}}>
          <Donut 
            chartData={[
              { name: "Black Panther", data: 30 }
            ]}

            chartRadiusRange={["60%", "100%"]}
            chartWidth={800}
            chartHeight={500}
            
            title="Marvel movies that were popular this year"
            chartThemeConfig={{
        
              series: {
                colors: [ "#670303"],
              },

              chartExportMenu:{
                visible:false
              }
            }}
          />
          </div> */
}


// <PieChart
// data={[
//   { title: "One", value: 10, color: "#E38627" },
//   { title: "Two", value: 15, color: "#C13C37" },
//   { title: "Three", value: 20, color: "#6A2135" },
// ]}
// />