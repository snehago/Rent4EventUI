import React, { useEffect } from "react";
import Header from "../Components/Header";
import "./styles/cancellation.scss";

function CancellationPolicy() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="cancellation-container">
      <Header />
      <div style={{ marginTop: "5%" }}>
        <h1>Return and Refund Policy</h1>
        <p>Last updated: September 07, 2021</p>
        <p>Thank you for shopping at Rent4Event.</p>
        <p>
          If, for any reason, You are not completely satisfied with a purchase
          We invite You to review our policy.
        </p>
        <p>
          The following terms are applicable for any products that You purchased
          with Us.
        </p>
        <h1>Interpretation and Definitions</h1>
        <h2>Interpretation</h2>
        <div className="cancellation-subsections">
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
        </div>

        <h2>Definitions</h2>
        <div className="cancellation-subsections">
          <p>For the purposes of this Cancellation Policy:</p>
          <ul>
            <li>
              <p>
                <strong>Company</strong> (referred to as either &quot;the
                Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
                in this Agreement) refers to Rent4Event.
              </p>
            </li>
            <li>
              <p>
                <strong>Orders</strong> mean a request by You to Book venues
                from Us.
              </p>
            </li>
            <li>
              <p>
                <strong>Service</strong> refers to the Website.
              </p>
            </li>
            <li>
              <p>
                <strong>You</strong> means the individual accessing or using the
                Service, or the company, or other legal entity on behalf of
                which such individual is accessing or using the Service, as
                applicable.
              </p>
            </li>
          </ul>
        </div>

        <h1>Your Data Privacy Policy</h1>
        <div className="cancellation-subsections">
          <p>You Data is very safe with us.</p>
        </div>

        <h1>Your Order Cancellation Rights</h1>
        <div className="cancellation-subsections">
          <p>
            You are entitled to cancel Your Order within 7 days without giving
            any reason for doing so.
          </p>
          <p>
            The deadline for cancelling an Order is 7 days from the date on
            which You received the Goods or on which a third party you have
            appointed, who is not the carrier, takes possession of the product
            delivered.
          </p>

          <p>
            In order to exercise Your right of cancellation, You must inform Us
            of your decision by means of a clear statement. You can inform us of
            your decision by:
          </p>
          <ul>
            <li>By email: info.rent4event@gmail.com</li>
          </ul>
          <p>
            We will reimburse You no later than 14 days from the day on which We
            receive the returned Goods. We will use the same means of payment as
            You used for the Order, and You will not incur any fees for such
            reimbursement.
          </p>
        </div>

        <h2>Contact Us</h2>

        <div className="cancellation-subsections">
          <p>
            If you have any questions about our Returns and Refunds Policy,
            please contact us:
          </p>
          <ul>
            <li>By email: info.rent4event@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CancellationPolicy;
