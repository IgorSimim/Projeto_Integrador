/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Button from "../button";
import CardList from "../cardList";

export default function LastNews(props) {
  const [newsData, setNewsData] = useState();

  const getData = async (path, escope) => {
    await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        if (escope === 'news') setNewsData(myJson);
        if (escope === 'partners') setPartnersData(myJson);
        if (escope === 'cards') setCardsData(myJson);
      })
      .catch(function(error) {
        console.warn('error', error)
      });
  };

  useEffect(() => {
    getData("./mock-news.json", 'news');
  }, []);

  if (!newsData?.cards) {
    return <div>Loading...</div>;
  }

  const { cards: news } = newsData

  return (
    <div class="last-news-container">
      <div class="last-news-wrapper">
        <Button type="last-news" title="Últimas notícias" text="Ver todas" />

        <div class="last-news-card-wrapper">
          <CardList type="news" cards={news} isNews={true} />
        </div>
      </div>
    </div>
  );
}
