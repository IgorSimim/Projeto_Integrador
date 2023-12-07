"use client";
import React, { useState, useEffect } from "react";
import Card from "../card/";

export default function CardList(props) {
  const [cards, setCards] = useState();

  useEffect(() => {
    setCards(props.cards);
  }, []);

  if (!cards) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main id="cards">
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                data={card[props.type]}
                isMinimal={props.isMinimal}
                isNews={props.isNews}
                isPost={props.isPost}
                isProfile={props.isProfile}
                isPartner={props.isPartner}
              />
            )
          })
        }
      </main>
    </>
  );
}
