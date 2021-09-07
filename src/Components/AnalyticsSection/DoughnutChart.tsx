import { of } from "await-of";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { AnalyticsService } from "../../Services/AnalyticsServices";
import "./commonAnalytics.scss";
import swal from "sweetalert";

const analyticsService = new AnalyticsService();

function DoughnutChart() {
  const [pieColors, setPieColors] = useState([]);
  const [robj, setRobj] = useState({});
  var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const venues = [
    {
      id: 1,
      name: "Grand Continental",
    },
  ];

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        analyticsService.getAllBookingsHost(3)
      );
      if (error) {
        swal("Error", "Unable to fetch", "error");
      }
      if (response) {
        console.log(response);
        setRobj(response);
      }
    })();

    var tcolors: any = [];
    for (var i in venues) {
      tcolors.push(dynamicColors());
    }
    // robj.map((id) => tcolors.push(dynamicColors()));
    setPieColors(tcolors);
  }, []);

  const data = {
    labels: ["Grand Continental"],
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: [3],
        // backgroundColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(255, 205, 86, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 159, 64, 1)",
        //   "rgba(153, 102, 255, 1)",
        // ],

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

  return <Doughnut className="doughnut-chart" data={data} options={options} />;
}

export default DoughnutChart;
