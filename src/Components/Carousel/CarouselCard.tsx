import React from "react";
import "./carouselcard.scss";
import image from "../../assets/images/hotel.png";

export default function CarouselCard(props: any) {

  return (
    <div className="card">
      <img
        src={props.item}
        className="imgStyle"
        alt=""
      />
    </div>
  );
}
