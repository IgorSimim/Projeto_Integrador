'use client'
import { useEffect, useState } from "react"
import ListaPostagem from "@/components/ItemListaPostagem"
import { useRouter } from "next/navigation"
import PesquisaPostagem from "@/components/PesquisaPostagem"
import Swal from 'sweetalert2'


export default function () {
  const [postagens, setPostagens] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getPostagens() {
      const response = await fetch("http://localhost:3004/postagens")
      const dados = await response.json()
      setPostagens(dados)
      setIsLoading(false)
    }
    getPostagens()
  }, [])

  async function excluiPostagem(id) {
    const response = await fetch("http://localhost:3004/postagens/" + id, {
      method: "DELETE"
    })
    const novosDados = postagens.filter(postagem => postagem.id != id)
    setPostagens(novosDados)
  }

  const listaPostagens = postagens.map(postagem => (
    <ListaPostagem key={postagem.id}
      postagem={postagem}
      exclui={() => excluiPostagem(postagem.id)}
      altera={() => router.push('alteraPost/' + postagem.id)}
      consulta={() => router.push('consultaPost/' + postagem.id)}
    />
  ))

  async function filtraDados(data) {
    if (data.pesq.length < 2) {
      Swal.fire("Digite, no mínimo, 2 caracteres")
      return
    }

    // busca todos os dados e aplica o filtro no vetor
    // -----------------------------------------------
    const pesquisa = data.pesq.toUpperCase()

    const response = await fetch("http://localhost:3004/postagens")
    const dados = await response.json()

    const novosDados = dados.filter(postagem =>
      postagem.nome.toUpperCase().includes(pesquisa) || postagem.titulo.toUpperCase().includes(pesquisa)
    )
    setPostagens(novosDados)
  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3004/postagens")
    const dados = await response.json()
    setPostagens(dados)
  }

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem das Postagens</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-7">
          <h2 className="mt-2">Listagem das Postagens</h2>
        </div>
        <div className="col-sm-5">
          <PesquisaPostagem filtra={filtraDados} mostra={mostraTodos} />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Título da Postagem</th>
            <th>Nome</th>
            <th>Assunto</th>
            <th>Pet</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaPostagens}
        </tbody>
      </table>
    </div>
  )
}