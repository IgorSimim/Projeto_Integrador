'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      porte: "Pequeno",
      pet: false
    }
  });

  const [showAdditionalLabels, setShowAdditionalLabels] = useState(false);

  async function enviaDados(data) {
    // Lógica para lidar com o envio de dados do formulário aqui
    const usuario = await fetch("http://localhost:3004/postagens", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...data })
    });

    if (usuario.status === 201) {
      toast.success("Ok! Postagem cadastrada com sucesso");
      reset();
    } else {
      toast.error("Erro... Não foi possível concluir o cadastro");
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro das Postagens</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
        <div className="col-sm-4">
            <label htmlFor="nome" className="form-label">Nome do Usuário</label>
            <input type="text" className="form-control" id="nome" {...register("nome")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="assunto" className="form-label">Assunto</label>
            <input type="text" className="form-control" id="assunto" {...register("assunto")} required />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-8">
            <label htmlFor="descricaopost" className="form-label">Descrição da Postagem</label>
            <textarea className="form-control" id="descricaopost" rows="3" {...register("descricaopost")} required></textarea>
          </div>
          <div className="col-sm-4">
            <p>Postagem com pet:</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="pet"
                {...register("pet")}
                onChange={(e) => setShowAdditionalLabels(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="pet">Pet</label>
            </div>
          </div>
        </div>

        {showAdditionalLabels && (
          <div>
            <div className="row mt-3">
              <div className="col-sm-4">
                <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                <input type="text" className="form-control" id="nomepet" {...register("nomepet")} required />
              </div>
              <div className="col-sm-4">
                <label htmlFor="raca" className="form-label">Raça</label>
                <input type="text" className="form-control" id="raca" {...register("raca")} required />
              </div>
              <div className="col-sm-4">
                <label htmlFor="porte" className="form-label">Porte</label>
                <select id="porte" className="form-select" {...register("porte")} required>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                  <option value="Gigante">Gigante</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-4">
                <label htmlFor="idade" className="form-label">Idade</label>
                <input type="text" className="form-control" id="idade" placeholder="Ex: 1 ano e 3 meses" {...register("idade")} />
              </div>
              <div className="col-sm-8">
                <label htmlFor="descricaopet" className="form-label">Descrição do Pet</label>
                <textarea className="form-control" id="descricaopet" rows="3" {...register("descricaopet")}></textarea>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-6">
                <label htmlFor="fotopet" className="form-label">Foto do Pet</label>
                <input type="url" className="form-control" id="fotopet" placeholder="Ex: http://www.example.com/image1.jpg" {...register("fotopet")} required />
              </div>
              <div className="col-sm-6">
                <label htmlFor="vacina" className="form-label">Cartão de Vacina do Pet</label>
                <input type="url" className="form-control" id="vacina" placeholder="Ex: http://www.example.com/image1.jpg" {...register("vacina")} />
              </div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <input type="submit" value="Enviar" className="btn btn-primary me-3" />
          <input type="button" value="Limpar" className="btn btn-danger" onClick={() => reset()} />
        </div>
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
  );
}