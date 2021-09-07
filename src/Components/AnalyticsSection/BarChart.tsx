import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AnalyticsService } from "../../Services/AnalyticsServices";
import swal from "sweetalert";
import { of } from "await-of";

const analyticsService = new AnalyticsService();
function BarChart({ venueId }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        analyticsService.getNoOfAttendees(venueId)
      );
      if (error) {
        swal("Error", "Unable to fetch", "error");
      }
      if (response) {
        console.log(response);
        var tempAr: any = [];
        for (let i = 1; i < response.response.length; i += 2) {
          tempAr.push(response.response[i]);
        }
        //   setDatas(response.response);
        console.log(tempAr);
        setDatas(tempAr);
      }
    })();
  }, []);

  const Labels: any = [];
  for (let i = 0; i < datas.length; i++) {
    Labels.push(`User ${i + 1}`);
  }
  const data = {
    labels: Labels,
    datasets: [
      {
        label: "No. Of Attendees",
        // data: [200, 300, 500, 150, 400],
        data: datas,
        borderColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        backgroundColor: [
          "#81399D",
          "#81399D",
          "#81399D",
          "#81399D",
          "#81399D",
        ],
      },
      //   {
      //     label: 'Sales 2019 (M)',
      //     data: [4, 3, 2, 2, 3],
      //     borderColor: [
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)'
      //     ],
      //     backgroundColor: [
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(54, 162, 235, 0.2)'
      //     ]
      //   }
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 6,
            stepSize: 1,
          },
        },
      ],
    },
  };
  return <Bar data={data} options={options} />;
}

export default BarChart;
