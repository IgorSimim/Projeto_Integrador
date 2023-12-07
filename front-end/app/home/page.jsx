/* eslint-disable @next/next/no-img-element */
'use client'
import LastNews from '../../components/lastNews';
import PetWorld from '../../components/petWorld';
import Carrousel from '../../components/carrousel';

export default function Home() {
  return (
    <>
      <main>
        <Carrousel />
        <LastNews />
        <PetWorld />
      </main>
    </>
  )
}
