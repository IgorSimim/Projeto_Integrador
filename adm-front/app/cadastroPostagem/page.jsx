'use client'
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cadastro() {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      porte: "Pequeno",
      pet: false,
      destaque: false,
      tipo: "",
      porte: "",
      sexo: "",
      assunto: "",
      assuntoCustom: "",
    }
  });

  const assuntoValue = useWatch({ control, name: "assunto" });

  const [showAdditionalLabels, setShowAdditionalLabels] = useState(false);
  const [showAdditionalLabels2, setShowAdditionalLabels2] = useState(assuntoValue === "Outro");

  useEffect(() => {
    setShowAdditionalLabels2(assuntoValue === "Outro");
  }, [assuntoValue]);

  async function enviaDados(data) {
    // Se a opção for "Outro", define o valor de "assunto" para o valor de "assuntoCustom"
    if (data.assunto === "Outro") {
      data.assunto = data.assuntoCustom;
    }


    try {
      const response = await fetch("http://localhost:3000/postagens", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      });

      if (response.status === 200) {
        toast.success("Ok! Postagem cadastrada com sucesso");
        reset();
      } else {
        const errorData = await response.json();

        if (errorData.id === 1) {
          toast.error(errorData.msg); // Trata o erro genérico
        } else if (errorData.id === 2) {
          toast.error(errorData.msg); // Trata o erro específico da foto do pet
        } else if (errorData.id === 3) {
          toast.error(errorData.msg); // Trata o erro específico do cartao de vacina do pet
        } 

      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast.error("Erro ao processar a requisição. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro das Postagens</h2>
      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
          <div className="col-sm-2">
            <label htmlFor="usuario_id" className="form-label">Id do Usuário</label>
            <input type="text" className="form-control" id="usuario_id" {...register("usuario_id")} required />
          </div>
          <div className="col-sm-6">
            <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
            <input type="text" className="form-control" id="titulo" {...register("titulo")} required />
          </div>
          <div className="col-sm-4">
            <label htmlFor="assunto" className="form-label">Assunto</label>
            {showAdditionalLabels2 ? (
              <input
                type="text"
                className="form-control"
                placeholder="Digite o assunto personalizado"
                {...register("assuntoCustom")}
                required
              />
            ) : (
              <select
                id="assunto"
                className="form-select"
                {...register("assunto")}
                required
              >
                <option value="Abandono">Abandono</option>
                <option value="Maus-tratos">Maus-tratos</option>
                <option value="Adoção">Adoção</option>
                <option value="Vacina">Vacina</option>
                <option value="Procura-se">Procura-se</option>
                <option value="Outro">Outro</option>
              </select>
            )}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-8">
            <label htmlFor="descricao" className="form-label">Descrição da Postagem</label>
            <textarea className="form-control" id="descricao" rows="3" {...register("descricao")} required></textarea>
          </div>
          <div className="col-sm-2">
            <p>Status da Postagem:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox"
                id="destaque"
                {...register("destaque")} />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
          <div className="col-sm-2">
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
              <div className="col-sm-3">
                <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                <input type="text" className="form-control" id="nomepet" {...register("nomepet")} required />
              </div>
              <div className="col-sm-3">
                <label htmlFor="tipo" className="form-label">Tipo</label>
                <select id="tipo" className="form-select" {...register("tipo")} required>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label htmlFor="raca" className="form-label">Raça</label>
                <input type="text" className="form-control" id="raca" {...register("raca")} required />
              </div>
              <div className="col-sm-3">
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
              <div className="col-sm-3">
                <label htmlFor="sexo" className="form-label">Sexo</label>
                <select id="sexo" className="form-select" {...register("sexo")} required>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label htmlFor="idade" className="form-label">Idade</label>
                <input type="text" className="form-control" id="idade" placeholder="Ex: 1 ano e 3 meses" {...register("idade")} />
              </div>
              <div className="col-sm-6">
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