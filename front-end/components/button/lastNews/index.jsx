/* eslint-disable @next/next/no-img-element */
"use client";
export default function ButtonLastNews(props) {
  const { title, text } = props
  return (
    <div className="last__news">
      <span className="title">{title}</span>
      <button className="news__button">{text}</button>
    </div>
  )
}
