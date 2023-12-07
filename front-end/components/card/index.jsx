"use client";
import CardPet from "./pet";
import CardPartner from "./partner";
import CardNews from "./news";
import CardLastNews from "./lastNews";
import "./card.css";

export default function Card(props) {
  const isMinimal = props.isMinimal === true ? 'card--minimal' : '';
  const isNews = props.isNews === true ? 'card--news' : '';
  const isProfile = props.isProfile === true ? 'card--profile' : '';
  const isPartner = props.isPartner === true ? 'card--partner' : '';
  

  if (isNews) {
    return <CardLastNews
      news={props.data}
    />
    // return <CardNews
    //   news={props.data}
    // />
  }

  if (isPartner) {
    return <CardPartner
      partner={props.data}
    />
  }

  // pet normal, minimal, profile são o cardPet
  return <CardPet
    pet={props.data}
    isMinimal={isMinimal}
    isProfile={isProfile}
  />
}
