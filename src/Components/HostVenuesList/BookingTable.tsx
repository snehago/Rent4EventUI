import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import moment from 'moment';
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
})


function Row({row}: any) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(row.from).format('LL')}
        </TableCell>
        <TableCell>{moment(row.to).format('LL')}</TableCell>
        <TableCell align="left">{(new Date(row.to).getDay()- new Date(row.from).getDay())} day(s)</TableCell>
        <TableCell align="left">${row.amountPaid}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="primary" onClick={() => console.log(row)}>Cancel</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Booked By
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    {/* <TableCell>Contact Number</TableCell> */}
                    <TableCell align="left">Transaction Id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.user.id}>
                    <TableCell component="th" scope="row">
                      {row.user.userName}
                    </TableCell>
                    <TableCell align="left" >{uuid()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function BookingTable({rows}: any) {
  return (
    <TableContainer style={{width:"70vw"}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{backgroundColor:"#eaeaea"}} >
          <TableRow>
            <TableCell />
            <TableCell>Booking from</TableCell>
            <TableCell>Booking to</TableCell>
            <TableCell align="left">Day(s)</TableCell>
            <TableCell align="left">Amount Paid</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any) => (
            <Row key={(row.id)} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
