'use client'
import Link from "next/link";
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Alteracao() {
  const params = useParams()
  //  console.log(params)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    async function getUsuario() {
      const response = await fetch("http://localhost:3004/usuarios/" + params.id)
      const dado = await response.json()
      reset({
        nome: dado.nome,
        email: dado.email,
        senha: dado.senha,
        cpf: dado.cpf,
        telefone: dado.telefone,
        idade: dado.idade,
        sexo: dado.sexo,
        bairro: dado.bairro,
        credito: dado.credito,
        destaque: dado.destaque,
        debito: dado.debito,
        perfil: dado.perfil
      })
    }
    getUsuario()
  }, [])

  async function alteraDados(data) {
    const usuario = await fetch("http://localhost:3004/usuarios/" + params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (usuario.status == 200) {
      // alert("Ok! Usuário cadastrado com sucesso")
      toast.success("Ok! Usuário alterado com sucesso")
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir a alteração")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro dos Usuários</h2>
      <form onSubmit={handleSubmit(alteraDados)}>
        <div className="row">
          <div className="col-sm-5">
            <label htmlFor="nome" className="form-label">Nome do Usuário</label>
            <input type="text" className="form-control" id="nome" {...register("nome")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" {...register("email")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="text" step="0.10" className="form-control" id="senha" {...register("senha")} required />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="cpf" className="form-label">Cpf</label>
            <input type="text" className="form-control" id="cpf" placeholder="Ex: 000.000.000-00" {...register("cpf")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input type="text" className="form-control" id="telefone" placeholder="Ex: (DDD) 90000-0000" {...register("telefone")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="idade" className="form-label">Idade</label>
            <input type="number" className="form-control" id="idade" {...register("idade")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="sexo" className="form-label">Sexo</label>
            <select id="sexo" className="form-select" {...register("sexo")} required>
              <option value="NI">Prefiro não informar</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="bairro" className="form-label">Bairro</label>
            <input type="text" className="form-control" id="bairro" {...register("bairro")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="credito" className="form-label">Cartão de crédito</label>
            <input type="text" className="form-control" id="credito" placeholder="Ex: 0000 0000 0000 0000" {...register("credito")} />
          </div>
          <div className="col-sm-2">
            <p>Status do Usuário:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox"
                id="destaque"
                {...register("destaque")} />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-sm-6">
            <label htmlFor="debito" className="form-label">Cartão de débito</label>
            <input type="text" className="form-control" id="debito" placeholder="Ex: 0000 0000 0000 0000" {...register("debito")} />
          </div>
          <div className="col-sm-6">
            <label htmlFor="perfil" className="form-label">Foto de Perfil</label>
            <input type="url" className="form-control" id="perfil" placeholder="Ex: http://www.example.com/image1.jpg" {...register("perfil")} required />
          </div>
        </div>

        <input type="submit" value="Enviar" className="btn btn-primary me-3" />
        <input type="button" value="Limpar" className="btn btn-danger"
          onClick={() => reset()} />
        <Link className="btn btn-success float-end" href="/listagemUsuario">Voltar</Link>

      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}