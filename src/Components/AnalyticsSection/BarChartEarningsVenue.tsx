import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AnalyticsService } from "../../Services/AnalyticsServices";
import swal from "sweetalert";
import { of } from "await-of";

const analyticsService = new AnalyticsService();
function BarChartEarningsVenue({ venueId }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    (async () => {
      const [response, error] = await of(
        analyticsService.getEarningsForVenue(venueId)
      );
      if (error) {
        swal("Error", "Unable to fetch", "error");
      }
      if (response) {
        var tempAr: any = [];
        for (let i = 0; i < response.response.length; i++) {
          tempAr.push(response.response[i]);
        }
        //   setDatas(response.response);
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
        label: "Earnings Of The Venue",
        data: datas,
        borderColor: ["#AFEEEE"],
        backgroundColor: ["#AFEEEE"],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "No. Of Bookings",
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

export default BarChartEarningsVenue;
