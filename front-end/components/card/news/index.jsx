"use client";
import React, { useState, useEffect } from "react";

export default function CardNews(props) {
  const [news, setNews] = useState();

  useEffect(() => {
    setNews(props.news);
  }, []);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card card__pet card--news">
      <div className="card__shadow"></div>
      <img className="pet__picture" src={news.image} />
      <div className="card__info">
        <p className="news__title">{news.title}</p>
        <p className="pet__about">{news.short}</p>
      </div>
    </div>
  );
}