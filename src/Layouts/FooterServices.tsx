import React, { useEffect } from "react";
import image1 from "../assets/servicesAssets/undraw_Chef_cu0r.svg";
import image2 from "../assets/servicesAssets/undraw_deconstructed_alud.svg";
import image3 from "../assets/servicesAssets/undraw_Order_ride_re_372k.svg";
import image4 from "../assets/servicesAssets/undraw_mello_otq1.svg";
import image5 from "../assets/servicesAssets/undraw_Partying_re_at7f.svg";
import image6 from "../assets/servicesAssets/undraw_makeup_artist_rxn8.svg";
import Header from "../Components/Header";
import "./styles/footerServices.scss";
import DividerComponent from "../Components/DividerComponent/DividerComponent";

const services = [
  {
    id: 1,
    name: "Catering Service",
    description:
      "Our catering services strive to fulfil their client’s expectations and make their functions a grand success. They provide delicious food for your functions served with love for the enjoyment of your guests and yourself. Make sure your functions are well remembered by your guests for more reasons than one by letting Our Caterers be your event catering service. Book the services of our Caterers from Rent4Event for the best price.",
    image: image1,
  },
  {
    id: 2,
    name: "Decoration Service",
    description: `Our Decorators aims to offer services as per the demands and
      preferences of the clients. This firm's decoration services cover
      the dining hall décor and other decor of all kinds The service staff
      are presentable and courteous in serving and interacting with the
      guests. This establishment modifies its service offerings to match
      and suit all kinds of budgets and preferences. Be it family events,
      weddings or corporate events, they have the expertise to aid in each
      event become a rousing success.`,
    image: image2,
  },
  {
    id: 3,
    name: "Transport Service",
    description: `Our transport service is India's most efficient and affordable premier listing service. When you choose this serviceyou get the best offers available in the market and negotiate your terms with the top service providers. Our specialists guarantees 100% customer satisfaction.100% Satisfaction Guarantee and Affordable Chargesseasonal ingredients.`,
    image: image3,
  },
  {
    id: 4,
    name: "DJ Service",
    description: `Our DJ services is a top player in the category Banquet Halls in India. This well-known establishment acts as a one-stop destination servicing customers both local and from other parts of Mangalore. Over the course of its journey, this business has established a firm foothold in it’s industry. The belief that customer satisfaction is as important as their products and services, have helped this establishment garner a vast base of customers, which continues to grow by the day.seasonal ingredients.`,
    image: image4,
  },
  {
    id: 5,
    name: "Performers",
    description: `Our firm is offering Stage Dancer Providing Services. We have team of professionals who manage and control all the activities which is performed in events. We have huge market connection through which we can easily organize Dance Shows with the all the minor and major facilities. We have connection with talented pool of artists who have prosperous experience in performing on stageseasonal ingredients.`,
    image: image5,
  },
  {
    id: 6,
    name: "Makeup Service",
    description: `Our Make Up Service is a Delhi based makeup salon. It offers bridal and party makeup and can cater to any other makeup needs of her clients. It becomes imperative to opt for a creative and talented makeup artist who can enhance your natural beauty to the greatest extent. If you are proposing one such ceremony and looking for a good and alluring makeup artist then our service is the choice you should make.seasonal ingredients.`,
    image: image6,
  },
];

function FooterServices() {

    useEffect(() => {
        window.scroll(0,0)
    }, [])
    
  return (
    <div>
      <Header />
      <div className="services-page-haeding">Our Services</div>

      <div className="services-page-section-container">
        {services.map((item: any) =>
          item.id % 2 !== 0 ? (
            <div>
              <div className="service-section-right">
                <img src={item.image} alt="" height="45%" width="45%" style={{marginRight:"2%"}} />
                <div className="service-description">
                  <div className="service-page-service-name">{item.name}</div>

                  <div className="service-item-desc">{item.description}</div>
                </div>
              </div>
              <DividerComponent />
            </div>
          ) : (
            <div>
              <div className="service-section-left">
                <div className="service-description">
                  <div className="service-page-service-name">{item.name}</div>
                  <div className="service-item-desc">{item.description}</div>
                </div>
                <img src={item.image} alt="" height="45%" width="45%" style={{marginLeft:"2%"}}  />
              </div>
              <DividerComponent />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default FooterServices;
