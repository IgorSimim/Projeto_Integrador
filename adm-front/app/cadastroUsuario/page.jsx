'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      sexo: "NF",
      destaque: true
    }
  });

  async function enviaDados(data) {
    //    console.log(data);    
    const usuario = await fetch("http://localhost:3004/usuarios",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      },
    )
    if (usuario.status == 201) {
      // alert("Ok! Usuário cadastrado com sucesso")
      toast.success("Ok! Usuário cadastrado com sucesso")
      reset()
    } else {
      // alert("Erro...")
      toast.error("Erro... Não foi possível concluir o cadastro")
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro dos Usuários</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
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
            <input type="text" className="form-control" id="cpf" {...register("cpf")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input type="text" className="form-control" id="telefone" {...register("telefone")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="idade" className="form-label">Idade</label>
            <input type="number" className="form-control" id="idade" {...register("idade")} required />
          </div>
          <div className="col-sm-2">
            <label htmlFor="sexo" className="form-label">Sexo</label>
            <select id="sexo" className="form-select" {...register("sexo")} required>
              <option value="NF">Prefiro não informar</option>
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
            <input type="text" className="form-control" id="credito" {...register("credito")} />
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
            <input type="text" className="form-control" id="debito" {...register("debito")} />
          </div>
          <div className="col-sm-6">
            <label htmlFor="perfil" className="form-label">Foto de Perfil</label>
            <input type="url" className="form-control" id="perfil" {...register("perfil")} required />
          </div>
        </div>

        <input type="submit" value="Enviar" className="btn btn-primary me-3" />
        <input type="button" value="Limpar" className="btn btn-danger"
          onClick={() => reset()} />

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