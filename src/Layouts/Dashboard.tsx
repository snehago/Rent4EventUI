import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userRole } = useParams<any>();

  return (
    <>
      <div>Dashboard</div>
      {userRole}
    </>
  );
};
export default Dashboard;
