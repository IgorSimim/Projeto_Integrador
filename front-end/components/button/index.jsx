/* eslint-disable @next/next/no-img-element */
"use client";
import ButtonFilter from "./filter";
import ButtonLoadMore from "./loadMore";
import ButtonLastNews from "./lastNews";
import "./button.css";

export default function Button(props) {
  const { type, title, text } = props

  if (type === 'filter') {
    return (
      <ButtonFilter />
    )
  }

  if (type === 'load-more') {
    // possivel fazer um função customizavel, ou então fazer uma função na página e mandar pra dentro do botão.
    const onClick = () => {
      console.log('função generica')
    }

    return (
      <ButtonLoadMore onClick={props.onClick || onClick} />
    )
  }

  if (type === 'last-news') {
    return (
      <ButtonLastNews title={title} text={text} />
    )
  }

  return <div>Loading...</div>;
}
