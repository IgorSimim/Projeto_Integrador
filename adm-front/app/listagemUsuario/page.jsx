'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import ListaUsuario from "@/components/ItemListaUsuario";
import { useRouter } from "next/navigation"
import PesquisaUsuario from "@/components/PesquisaUsuario"
import Usuariopdf from "@/components/Usuariopdf"
import Swal from 'sweetalert2'


export default function () {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getUsuarios() {
      const response = await fetch("http://localhost:3000/usuarios")
      const dados = await response.json()
      setUsuarios(dados)
      setIsLoading(false)
    }
    getUsuarios()
  }, [])

  async function excluiUsuario(id) {
    const response = await fetch("http://localhost:3000/usuarios/" + id, {
      method: "DELETE"
    })
    const novosDados = usuarios.filter(usuario => usuario.id != id)
    setUsuarios(novosDados)
  }

  async function destacaUsuario(id, status_atual) {
    await fetch("http://localhost:3000/usuarios/destaque/" + id,
      {
        method: "PATCH",
        // headers: { "Content-type": "application/json" },
        // body: JSON.stringify({ destaque: !status_atual })
      })
    const indiceAlterado = usuarios.findIndex(usuario => usuario.id == id)
    const novosDados = [...usuarios]
    novosDados[indiceAlterado].destaque = !status_atual
    setUsuarios(novosDados)
  }

  const listaUsuarios = usuarios.map(usuario => (
    <ListaUsuario key={usuario.id}
      usuario={usuario}
      exclui={() => excluiUsuario(usuario.id)}
      altera={() => router.push('altera/' + usuario.id)}
      consulta={() => router.push('consulta/' + usuario.id)}
      destaca={() => destacaUsuario(usuario.id, usuario.destaque)}
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

    const response = await fetch("http://localhost:3000/usuarios")
    const dados = await response.json()

    const novosDados = dados.filter(usuario =>
      usuario.nome.toUpperCase().includes(pesquisa) || usuario.bairro.toUpperCase().includes(pesquisa)
    )
    setUsuarios(novosDados)
  }

  async function ordenarUsuarios() {
    async function getUsuarios() {
      const response = await fetch(
        "http://localhost:3000/usuarios?_sort=idade&_order=desc"
      );
      const dados = await response.json();
      setUsuarios(dados);
    }

    getUsuarios();
  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3000/usuarios")
    const dados = await response.json()
    setUsuarios(dados)
  }

  async function gerarpdf() {
    try {
      const response = await axios.get('http://localhost:3000/usuarios/pdf', {
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
        <h2>Listagem dos Usuários</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-5">
          <h2 >Listagem dos Usuários</h2>
        </div>
        <div className="col-sm-2">
          <Usuariopdf gerar={gerarpdf} />
        </div>
        <div className="col-sm-5">
          <PesquisaUsuario filtra={filtraDados} mostra={mostraTodos} listar={ordenarUsuarios} />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome do Usuário</th>
            <th>Email</th>
            <th>Sexo</th>
            <th>Bairro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios}
        </tbody>
      </table>
    </div>
  )
}