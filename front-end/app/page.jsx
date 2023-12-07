'use client'
import CardList from '@/components/cardList';
import { useEffect, useState } from "react"

export default function Home() {
  const [newsData, setNewsData] = useState();
  const [partnersData, setPartnersData] = useState();
  const [cardsData, setCardsData] = useState();

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
    getData("./mock-partners.json", 'partners');
    getData("./mock-cards.json", 'cards');
  }, []);

  if (
    !newsData?.cards || 
    !partnersData?.cards || 
    !cardsData?.cards
  ) {
    return <div>Loading...</div>;
  }

  const { cards: news } = newsData
  const { cards: partners } = partnersData
  const { cards } = cardsData

  return (
    <>
      <p>BATATA</p>

      <section>
        <h1>Card normal - ok</h1>
        <CardList
          type="pet"
          cards={cards}
          isMinimal={false}
          isNews={false}
          isProfile={false}
          isPartner={false}
        />
      </section>

      <section>
        <h1>isMinimal - ok</h1>
        <CardList
          type="pet"
          cards={cards}
          isMinimal={true}
          isNews={false}
          isProfile={false}
          isPartner={false}
        />
      </section>

      <section>
        <h1>Partners</h1>
        <CardList
          type="partner"
          cards={partners}
          isMinimal={false}
          isNews={false}
          isProfile={false}
          isPartner={true}
        />
      </section>

      <section>
        <h1>isNews</h1>
        <CardList
          type="news"
          cards={news}
          isMinimal={false}
          isNews={true}
          isProfile={false}
          isPartner={false}
        />
      </section>

      <section>
        <h1>isProfile</h1>
        <CardList
          type="pet"
          cards={cards}
          isMinimal={false}
          isNews={false}
          isProfile={true}
          isPartner={false}
        />
      </section>

      
    </>
  )
}
