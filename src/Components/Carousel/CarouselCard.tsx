import "./carouselcard.scss";
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
