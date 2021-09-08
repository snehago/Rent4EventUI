/* eslint-disable react-hooks/exhaustive-deps */
import { of } from "await-of";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { AnalyticsService } from "../../Services/AnalyticsServices";
import "./commonAnalytics.scss";
import swal from "sweetalert";
import { v4 } from "uuid";

const analyticsService = new AnalyticsService();

function DoughnutAllVenueEarnings({ userId }) {
  const [pieColors, setPieColors] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const [labels, setLabels] = useState([]);
  var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        analyticsService.getEarningsForAllVenue(userId)
      );
      if (error) {
        swal("Error", "Unable to fetch", "error");
      }
      if (response) {
        var tempcolors: any = [];
        for (var i = 0; i < Object.keys(response.response).length; i++) {
          tempcolors.push(dynamicColors());
        }
        setPieColors(tempcolors);

        var tempArray: any = [];

        for (const key in response.response) {
          if (response.response.hasOwnProperty(key)) {
            tempArray.push(response.response[key]);
          }
        }
        setDataSet(tempArray);

        var tempLabel: any = [];
        for (const key in response.response) {
          if (response.response.hasOwnProperty(key)) {
            tempLabel.push(key);
          }
        }

        setLabels(tempLabel);
      }
    })();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: dataSet,
        backgroundColor: pieColors,
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Doughnut Chart",
    },
  };

  return <Doughnut key={v4()} className="doughnut-chart" data={data} options={options} />;
}

export default DoughnutAllVenueEarnings;
