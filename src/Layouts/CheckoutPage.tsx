import React from "react";
import { useParams } from "react-router-dom";

export default function CheckoutPage() {
  const { userId } = useParams<any>();
  return (
    <>
      <div>Checkout Page</div>
      {userId}
    </>
  );
}
