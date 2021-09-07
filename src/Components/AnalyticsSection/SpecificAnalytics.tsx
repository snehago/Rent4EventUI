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

    venues.forEach((item)=>pieChartColors.push(generateRandomColor()))

    console.log(pieChartColors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="specific-analytics-container">
      <div className="analytics-label">Venue Specific</div>

      <Accordion className="specific-analytics-venue-list-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Your Venues</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {venues.map((item) => (
            <Accordion style={{width:"80vw"}} className="specific-analytics-venue-list-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails  >
                <BarChart />
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SpecificAnalytics;
