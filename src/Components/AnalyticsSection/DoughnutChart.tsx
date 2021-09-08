import { of } from "await-of";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { AnalyticsService } from "../../Services/AnalyticsServices";
import "./commonAnalytics.scss";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { User } from "../../Shared/Interfaces/User";
import { v4 } from "uuid";

const analyticsService = new AnalyticsService();

function DoughnutChart({ userId }) {
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [pieColors, setPieColors] = useState([]);
  const [robj, setRobj] = useState({});
  const [dataSet, setDataSet] = useState([]);
  const [data, setData] = useState<any>(null);
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
        analyticsService.getAllBookingsHost(userId)
      );
      if (error) {
        swal("Error", "Unable to fetch", "error");
      }
      if (response) {
        console.log(response);
        setRobj(response.response);
      }
      console.log("Robj:", robj);
      console.log(robj[5]);

      var tempcolors: any = [];
      for (var i = 0; i < Object.keys(robj).length; i++) {
        await tempcolors.push(dynamicColors());
      }
      setPieColors(tempcolors);
      var tempArray: any = [];

      for (const key in robj) {
        if (robj.hasOwnProperty(key)) {
          await tempArray.push(robj[key]);
        }
      }
      console.log("ta:", tempArray);

      setDataSet(tempArray);

      var tempLabel: any = [];
      for (const key in robj) {
        if (robj.hasOwnProperty(key)) {
          await tempLabel.push(key);
        }
      }
      setLabels(tempLabel);
    })();
  }, [user,userId])

  useEffect(() => {
    setData({
      labels: labels,
      datasets: [
        {
          label: "Sales 2020 (M)",
          data: dataSet,
          backgroundColor: pieColors,
        },
      ],
    });
  }, [labels, dataSet, pieColors]);

  const options = {
    title: {
      display: true,
      text: "Doughnut Chart",
    },
  };

  return (
    <>
    {(labels && dataSet) && 
      <Doughnut
      key={v4()}
      className="doughnut-chart"
      data={data}
      options={options}
    />
  }
  </>
  );
}

export default DoughnutChart;
