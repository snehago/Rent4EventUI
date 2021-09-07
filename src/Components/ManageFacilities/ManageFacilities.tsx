import { of } from 'await-of';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { FacilityService } from '../../Services/FacilityService';
import { DataGrid, GridColDef} from '@material-ui/data-grid';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import CircularLoader from '../CircularLoader/CircularLoader';
const facilityService = new FacilityService();
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Value',
    width: 150,
    editable: false,
  },
];
function ManageFacilities() {
  const [facilities,setFacilities]=useState<any>([]);
  const [name, setName]=useState<any>("");
  const [update,setUpdate]=useState<boolean>(false);
  const [loading, setLoading]=useState<boolean>(false);
  useEffect(() => {
    (async ()=> {
      const [response, error]= await of(facilityService.getAllFacility());
      if(error)swal("Error","Unable to fetch data","error");
      if(response)setFacilities(response);
    })();
  }, [update])
  const saveNewFacility =async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = {
      name
    }
    const [response, error]= await of(facilityService.addFacility(dataToSend));
    if(error)swal("error",'Unabel to save data',"error");
    if(response===0)
    {
      setUpdate(!update);
      setName("");
    }
    setLoading(false);
  }
  return (
    <Grid container>
      {loading && <CircularLoader />}
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={facilities}
          pageSize={3}
          disableSelectionOnClick
        />
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <Typography variant="h6" align="center" gutterBottom>
          <b>Add New Facility</b>
        </Typography>
        <div style={{display:'flex', flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
        <form onSubmit={saveNewFacility}>
          <TextField
            id="name"
            label="Facility Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button size="small" variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
        </div>
      </div>
    </Grid>
  );
}

export default ManageFacilities
