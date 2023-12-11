'use client'
import ItemPostagem from "@/components/ItemPostagem"
// import CardList from '@/components/cardList';
// import Button from '@/components/button';
import { useEffect, useState } from "react"

export default function Home() {
  const [postagens, setPostagens] = useState([])

  useEffect(() => {
    async function getPostagens() {
//      const response = await fetch("http://localhost:3004/filmes?destaque=true")
      const response = await fetch("http://localhost:3000/postagens")
      const dados = await response.json()
      setPostagens(dados)
    }
    getPostagens()
  }, [])

  const listaPostagens = postagens.map(postagem => (
    <ItemPostagem key={postagem.id}
      postagem={postagem}
    />
  ))

  return (
    <div className="container mt-3">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
        {listaPostagens}
      </div>
    </div>
  )
}



// export default function Home() {
//   const [newsData, setNewsData] = useState();
//   const [partnersData, setPartnersData] = useState();
//   const [cardsData, setCardsData] = useState();

//   const getData = async (path, escope) => {
//     await fetch(path, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//       .then(function(response){
//         return response.json();
//       })
//       .then(function(myJson) {
//         if (escope === 'news') setNewsData(myJson);
//         if (escope === 'partners') setPartnersData(myJson);
//         if (escope === 'cards') setCardsData(myJson);
//       })
//       .catch(function(error) {
//         console.warn('error', error)
//       });
//   };

//   useEffect(() => {
//     getData("./mock-news.json", 'news');
//     getData("./mock-partners.json", 'partners');
//     getData("./mock-cards.json", 'cards');
//   }, []);

//   if (
//     !newsData?.cards || 
//     !partnersData?.cards || 
//     !cardsData?.cards
//   ) {
//     return <div>Loading...</div>;
//   }

//   const { cards: news } = newsData
//   const { cards: partners } = partnersData
//   const { cards } = cardsData

//   return (
//     <>
//       <h1>Cards</h1>

//       <section>
//         <h2>Card normal - ok</h2>
//         <CardList
//           type="pet"
//           cards={cards}
//           isMinimal={false}
//           isNews={false}
//           isProfile={false}
//           isPartner={false}
//         />
//       </section>

//       <section>
//         <h2>isMinimal - ok</h2>
//         <CardList
//           type="pet"
//           cards={cards}
//           isMinimal={true}
//           isNews={false}
//           isProfile={false}
//           isPartner={false}
//         />
//       </section>

//       <section>
//         <h2>Partners</h2>
//         <CardList
//           type="partner"
//           cards={partners}
//           isMinimal={false}
//           isNews={false}
//           isProfile={false}
//           isPartner={true}
//         />
//       </section>

//       <section>
//         <h2>isNews</h2>
//         <CardList
//           type="news"
//           cards={news}
//           isMinimal={false}
//           isNews={true}
//           isProfile={false}
//           isPartner={false}
//         />
//       </section>

//       <section>
//         <h2>isProfile</h2>
//         <CardList
//           type="pet"
//           cards={cards}
//           isMinimal={false}
//           isNews={false}
//           isProfile={true}
//           isPartner={false}
//         />
//       </section>

//       <hr />

//       <h1>Buttons</h1>

//       <section>
//         <h2>Filter</h2>
//         {/* provavelmente tenhamos que fazer esse componente receber as opções para escrever elas em vez de ficar estatico */}
//         <Button type="filter" />
//       </section>

//       <section>
//         <h2>Load more</h2>
//         <Button type="load-more" />
//       </section>

//       <section>
//         <h3>Title with button</h3>
//         {/* provavelmente esse cara deveria ser um compoente de titulo e não de botão */}
//         <Button
//           type="last-news"
//           title="Últimas notícias"
//           text="Ver todas"
//         />
//       </section>
//     </>
//   )
// }
