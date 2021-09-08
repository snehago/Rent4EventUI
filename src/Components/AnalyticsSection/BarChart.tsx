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
        console.log(tempAr);
        setDatas(tempAr);
      }
    })();
  }, [venueId]);

  const Labels: any = [];
  for (let i = 0; i < datas.length; i++) {
    Labels.push(`Client ${i + 1}`);
  }
  const data = {
    labels: Labels,
    datasets: [
      {
        label: "No. Of Attendees",
        data: datas,
        borderColor: ["#BA55D3"],
        backgroundColor: ["#BA55D3"],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      xAxes: [{}],
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
