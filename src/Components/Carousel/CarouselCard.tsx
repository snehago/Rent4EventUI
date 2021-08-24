import React from "react";
import "./carouselcard.scss";
import image from "../../assets/images/resort.jpg";

export default function CarouselCard(props: any) {
  return (
    <div className="card">
      <img
        src={image}
        className="imgStyle"
        alt=""
      />
    </div>
  );
}
