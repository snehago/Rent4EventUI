import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./description.scss";

export default function DescriptionSection() {
  return (
    <div>
      <div className="descriptionContainer">
        <Grid container spacing={3}>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={7}>
              <Typography className="venueTitle" component="h2">
                Title
              </Typography>
              <Typography className="descriptionText">
                Vestibulum maximus laoreet ipsum ac semper. Suspendisse potenti.
                Vestibulum sit amet pulvinar augue, eget ultricies neque.
                Maecenas a malesuada est. Nulla molestie lorem libero, quis
                tempus felis convallis sed. Fusce ultrices nunc vitae posuere
                dignissim. Cras congue ante vel mi facilisis vulputate. Ut nec
                enim mi. Sed bibendum, sapien tristique pellentesque
                ullamcorper, metus diam porta elit, a tempor augue nulla vitae
                magna.
                <p /> In ipsum magna, viverra ac nunc vehicula, cursus
                condimentum orci. Aenean porta sagittis elementum. Vestibulum
                vulputate eget sapien sed scelerisque. Quisque maximus fermentum
                condimentum. Phasellus suscipit eros bibendum magna dignissim
                lobortis. Aliquam ullamcorper ante non semper mollis. Mauris
                dignissim dolor quis arcu ultrices, ac tincidunt mi tincidunt.
                Donec non quam turpis.
              </Typography>
            </Grid>

            <Grid item xs={5} style={{backgroundColor:"#EAEAEA",borderRadius:'0.4rem',padding:'2%'}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              quaerat ad blanditiis. Illum facilis vel ut fugit veniam quibusdam
              eum quam rerum, quasi nulla asperiores eius eveniet, illo at
              magnam?
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
