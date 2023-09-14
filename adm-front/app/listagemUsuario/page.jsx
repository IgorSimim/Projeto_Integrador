'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'


export default function () {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getUsuarios() {
      const response = await fetch("http://localhost:3004/usuarios")
      const dados = await response.json()
      setUsuarios(dados)
      setIsLoading(false)
    }
    getUsuarios()
  }, [])

  async function excluiUsuario(id) {
    const response = await fetch("http://localhost:3004/usuarios/" + id, {
      method: "DELETE"
    })
    const novosDados = usuarios.filter(usuario => usuario.id != id)
    setUsuarios(novosDados)
  }

  async function destacaUsuario(id, status_atual) {
    await fetch("http://localhost:3004/usuarios/" + id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ destaque: !status_atual })
      })
    const indiceAlterado = usuarios.findIndex(usuario => usuario.id == id)
    const novosDados = [...usuarios]
    novosDados[indiceAlterado].destaque = !status_atual
    setUsuarios(novosDados)
  }

  const listaUsuarios = usuarios.map(usuario => (
    <ItemLista key={usuario.id}
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

    const response = await fetch("http://localhost:3004/usuarios")
    const dados = await response.json()

    const novosDados = dados.filter(usuario =>
      usuario.nome.toUpperCase().includes(pesquisa) || usuario.bairro.toUpperCase().includes(pesquisa)
    )
    setUsuarios(novosDados)

    // if (novosDados.length == 0) {
    //   Swal.fire("Não há usuários com a palavra chave informada...")
    //   return
    // }

    // busca os dados da API já com o filtro
    // --------------------------------------
    // const response = await fetch("http://localhost:3004/filmes?titulo="+data.pesq)
    // const dados = await response.json()
    // setFilmes(dados)
  }

  async function mostraTodos() {
    const response = await fetch("http://localhost:3004/usuarios")
    const dados = await response.json()
    setUsuarios(dados)
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
        <div className="col-sm-7">
          <h2 className="mt-2">Listagem dos Usuários</h2>
        </div>
        <div className="col-sm-5">
          <Pesquisa filtra={filtraDados} mostra={mostraTodos} />
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