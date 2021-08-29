import { Avatar } from "@material-ui/core";
import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import './gotop.scss'

function GoTop() {
  return (
    <div>
      <Avatar className="topAvatar">
        <ArrowUpwardIcon />
      </Avatar>
    </div>
  );
}

export default GoTop;
