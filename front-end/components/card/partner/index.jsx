"use client";
import React, { useState, useEffect } from "react";

export default function CardPartner(props) {
  const [partner, setPartner] = useState();

  useEffect(() => {
    setPartner(props.partner);
  }, []);

  if (!partner) {
    return <div>Loading...</div>;
  }

  console.log('props', props)
  console.log('partner', partner)

  return (
    <div className="card__partner">
      <div className="partner__logo">
        <img className="partner__image" src={partner.image} />
      </div>
      <div className="partner__info">
        <p>{partner.name}</p>
      </div>
    </div>
  );
}
