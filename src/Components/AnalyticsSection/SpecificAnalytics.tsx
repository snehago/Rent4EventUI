import React, { useState, useEffect } from "react";
import "./specificAnalytics.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { UserService } from "../../Services/UserService";
import { User } from "../../Shared/Interfaces/User";
import { Venue } from "../../Shared/Interfaces/Venue";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import swal from "sweetalert";
import { of } from "await-of";
import BarChart from "./BarChart";
import BarChartEarningsVenue from "./BarChartEarningsVenue";
import { Paper } from "@material-ui/core";
import analysis2 from "../../assets/illustrations/analysis2.svg";
import { v4 } from "uuid";

const userService = new UserService();

function SpecificAnalytics() {
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [venues, setVenues] = useState<Venue[]>([]);
  var pieChartColors: any = [];

  function generateRandomColor() {
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
  }

  useEffect(() => {
    (async () => {
      const [response, error] = await of(userService.getHostById(user.id));
      if (error) {
        swal("error while fetching venues", "error");
      }
      if (response) {
        setVenues(response.listOfVenues);
        console.log(venues);
      }
    })();

    venues.forEach((item) => pieChartColors.push(generateRandomColor()));

    console.log(pieChartColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="specific-analytics-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2%",
        }}
      >
        <div className="analytics-label">Venues Analytics</div>
        <img src={analysis2} alt="" height="15%" width="15%" />
      </div>

      <Paper elevation={2}>
        <Accordion className="specific-analytics-venue-list-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="analytics-venue-section-heading">Your Venues</div>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            {venues.map((item) => (
              <Paper elevation={2} style={{ marginBottom: "2%" }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6">{item.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="graph-heading">
                      Number Of Attendees Graph:
                    </div>
                    <BarChart venueId={item.id} />
                    <div className="graph-heading">
                      Earnings Of Venue Graph:
                    </div>
                    <BarChartEarningsVenue key={v4()} venueId={item.id} />
                  </AccordionDetails>
                </Accordion>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}

export default SpecificAnalytics;
