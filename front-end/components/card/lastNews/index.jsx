/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./last-news.css";

export default function CardLastNews(props) {
  const [news, setNews] = useState();

  useEffect(() => {
    setNews(props.news);
  }, []);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div class="last-news-card">
        <div class="card-image">
            <img src={news.image} alt="" />
        </div>
        <div class="last-news-card-tag">{news.tag}</div>
        <span class="last-news-card-title">{news.title}</span>
        <p class="last-news-card-content">{news.short}</p>
    </div>
  );
}
