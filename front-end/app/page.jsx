'use client'
import ItemVeiculo from "@/components/ItemVeiculo"
import { useEffect, useState } from "react"

export default function Home() {
  const [veiculos, setVeiculos] = useState([])

  useEffect(() => {
    async function getVeiculos() {
      const response = await fetch("http://localhost:3004/veiculo")
      const dados = await response.json()
      setVeiculos(dados)
    }
    getVeiculos()
  }, [])

  const listaVeiculos = veiculos.map(veiculo => (
    <ItemVeiculo key={veiculo.id}
    veiculo={veiculo}
    />
  ))

  return (
    <div className="container mt-3">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
        {listaVeiculos}
      </div>
    </div>
  )
}
