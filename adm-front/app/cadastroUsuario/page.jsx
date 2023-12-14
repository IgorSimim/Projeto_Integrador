'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import './style.css';

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      sexo: "NI",
      confirmado: 0,
      destaque: false
    }
  });

  async function enviaDados(data) {
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      });

      if (response.status === 200) {
        toast.success("Usuário cadastrado com sucesso");
        reset();
      } else {
        const errorData = await response.json();

        if (errorData.id === 1) {
          toast.error(errorData.msg); // Trata o erro genérico
        } else if (errorData.id === 2) {
          toast.error(errorData.msg); // Trata o erro do campo confirmado
        } else if (errorData.id === 3) {
          toast.error(errorData.msg); // Trata o erro específico do email
        } else if (errorData.id === 4) {
          toast.error(errorData.msg); // Trata o erro específico da senha
        } else if (errorData.id === 5) {
          toast.error(errorData.msg); // Trata o erro específico de um cpf já cadastrado
        } else if (errorData.id === 6) {
          toast.error(errorData.msg); // Trata o erro específico do cpf 
        } else if (errorData.id === 7) {
          toast.error(errorData.msg); // Trata o erro específico do telefone
        } else if (errorData.id === 8) {
          toast.error(errorData.msg); // Trata o erro específico da idade
        } else if (errorData.id === 8) {
          toast.error(errorData.msg); // Trata o erro específico da foto de perfil
        }

      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast.error("Erro ao processar a requisição. Tente novamente mais tarde.");
    }
  }


  return (
    <div className="container">
      <h2 className="mt-2">Cadastro dos Usuários</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
          <div className="col-sm-1">
            <label htmlFor="confirmado" className="form-label form-label-abbr">
            </label>
            <input
              type="number"
              className="form-control"
              id="confirmado"
              placeholder="Ex: 0"
              {...register("confirmado")}
              required
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="nome" className="form-label">Nome do Usuário</label>
            <input type="text" className="form-control" id="nome" {...register("nome")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" placeholder="Ex: nome@provedor.com" {...register("email")} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="text" step="0.10" className="form-control" id="senha" placeholder="Ex: Senha@1234" {...register("senha")} required />
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
            <label htmlFor="dtnasc" className="form-label">Data de Nascimento</label>
            <input type="date" className="form-control" id="dtnasc" {...register("dtnasc")} required />
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