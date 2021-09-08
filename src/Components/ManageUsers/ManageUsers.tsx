import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { of } from "await-of";
import { UserService } from "../../Services/UserService";
import swal from "sweetalert";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CircularLoader from "../CircularLoader/CircularLoader";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const userService = new UserService();
export default function BasicTable() {
  const classes = useStyles();
  const [users, setUsers]=useState<any>(null);
  const [loading, setLoading]=useState<boolean>(false);
  useEffect(() => {
    (async ()=> {
      const [response,error]= await of(userService.getAllUsers());
      if(error)swal("Error","Unable to fetch users","error");
      if(response)setUsers(response);
    })();
  }, [loading])

  const deleteUser = async (user:any)=> {
    setLoading(true);
    const [response,error]= await of(userService.deleteUser(user.id));
    if(error)swal("Error","Unable to delete user","error");
    if(response)swal("Success","User deleted","success");
    setLoading(false);
    
  }
  return (
    <>
    {loading && <CircularLoader/>}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Contact Number</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                {row.firstName + " " + row.lastName}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.contactNumber}</TableCell>
              <TableCell align="right">
                <IconButton onClick={()=> deleteUser(row)} >
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
