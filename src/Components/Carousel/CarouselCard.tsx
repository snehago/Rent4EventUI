import "./carouselcard.scss";
export default function CarouselCard(props: any) {

  return (
    <div className="details-carousel-card">
      <img
        src={props.item}
        className="imgStyle"
        alt=""
      />
    </div>
  );
}
