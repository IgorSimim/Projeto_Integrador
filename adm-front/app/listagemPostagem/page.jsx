'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import ListaPostagem from "@/components/ItemListaPostagem"
import { useRouter } from "next/navigation"
import PesquisaPostagem from "@/components/PesquisaPostagem"
import Postagempdf from "@/components/Postagempdf"
import Swal from 'sweetalert2'


export default function () {
  const [postagens, setPostagens] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getPostagens() {
      const response = await fetch("http://localhost:3000/postagens")
      const dados = await response.json()
      setPostagens(dados)
      setIsLoading(false)
    }
    getPostagens()
  }, [])

  async function excluiPostagem(id) {
    const response = await fetch("http://localhost:3000/postagens/" + id, {
      method: "DELETE"
    })
    const novosDados = postagens.filter(postagem => postagem.id != id)
    setPostagens(novosDados)
  }

  async function destacaPostagem(id, status_atual) {
    await fetch("http://localhost:3000/postagens/destaque/" + id,
      {
        method: "PATCH",
        // headers: { "Content-type": "application/json" },
        // body: JSON.stringify({ destaque: !status_atual })
      })
    const indiceAlterado = postagens.findIndex(postagem => postagem.id == id)
    const novosDados = [...postagens]
    novosDados[indiceAlterado].destaque = !status_atual
    setPostagens(novosDados)
  }

  const listaPostagens = postagens.map(postagem => (
    <ListaPostagem key={postagem.id}
      postagem={postagem}
      exclui={() => excluiPostagem(postagem.id)}
      altera={() => router.push('alteraPost/' + postagem.id)}
      consulta={() => router.push('consultaPost/' + postagem.id)}
      destaca={() => destacaPostagem(postagem.id, postagem.destaque)}
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

    const response = await fetch("http://localhost:3000/postagens")
    const dados = await response.json()

    const novosDados = dados.filter(postagem =>
      postagem.nome.toUpperCase().includes(pesquisa) || postagem.titulo.toUpperCase().includes(pesquisa)
    )
    setPostagens(novosDados)
  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3000/postagens")
    const dados = await response.json()
    setPostagens(dados)
  }

  async function gerarSemPet() {
    try {
      const response = await axios.get('http://localhost:3000/postagenssempet/pdf', {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Cria uma URL temporária para o blob
      const pdfUrl = URL.createObjectURL(blob);

      // Abre uma nova janela com o PDF
      const newWindow = window.open(pdfUrl, '_blank');

      // Adiciona um evento de carga à janela para revogar a URL quando a janela for fechada
      newWindow.addEventListener('load', () => {
        URL.revokeObjectURL(pdfUrl);
      });
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  }

  async function gerarComPet() {
    try {
      const response = await axios.get('http://localhost:3000/postagenscompet/pdf', {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Cria uma URL temporária para o blob
      const pdfUrl = URL.createObjectURL(blob);

      // Abre uma nova janela com o PDF
      const newWindow = window.open(pdfUrl, '_blank');

      // Adiciona um evento de carga à janela para revogar a URL quando a janela for fechada
      newWindow.addEventListener('load', () => {
        URL.revokeObjectURL(pdfUrl);
      });
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
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
        <div className="col-sm-4">
          <h2 className="mt-2">Listagem das Postagens</h2>
        </div>
        <div className="col-sm-3">
          <Postagempdf gerarS={gerarSemPet} gerarC={gerarComPet} />
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