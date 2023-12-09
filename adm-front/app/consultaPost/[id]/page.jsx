'use client'
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";

async function getPostagem(id) {
  const response = await fetch("http://localhost:3000/postagens/pesq/" + id);
  const dado = await response.json();
  return dado;
}

export default function Consulta({ params }) {
  const [postagem, setPostagem] = useState(null);

  useEffect(() => {
    async function fetchPostagem() {
      const postagem = await getPostagem(params.id);
      setPostagem(postagem);
    }

    fetchPostagem();
  }, [params.id]);

  return (
    <div className="container">
      <h2 className="mt-2">Consulta das Postagens</h2>
      {postagem && (
        <form>
          <div className="row">
            <div className="col-sm-3">
              <label htmlFor="usuario_id" className="form-label">Id do usuário</label>
              <input type="number" className="form-control" id="usuario_id" value={postagem.usuario_id} readOnly />
            </div>
            <div className="col-sm-5">
              <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
              <input type="text" className="form-control" id="titulo" value={postagem.titulo} readOnly />
            </div>
            <div className="col-sm-4">
              <label htmlFor="assunto" className="form-label">Assunto</label>
                <input
                  type="text"
                  step="0.10"
                  className="form-control"
                  id="assunto"
                  value={postagem.assunto}
                  readOnly
                />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-6">
              <label htmlFor="descricao" className="form-label">Descrição da Postagem</label>
              <textarea className="form-control" id="descricao" rows="3" value={postagem.descricao} readOnly></textarea>
            </div>
            <div className="col-sm-3">
              <label htmlFor="data" className="form-label">Data da Postagem</label>
              <input type="text" className="form-control" id="data" value={format(new Date(postagem.createdAt), 'dd/MM/yyyy')} readOnly />
            </div>
            <div className="col-sm-3">
              <p>Postagem com pet:</p>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox"
                  id="pet"
                  checked={postagem.pet}
                  readOnly
                />
                <label className="form-check-label" htmlFor="pet">Pet</label>
              </div>
            </div>
          </div>

          {postagem.pet ? (
            <div>
              <div className="row mt-3">
                <div className="col-sm-8">
                  <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                  <input type="text" className="form-control" id="nomepet" value={postagem.nomepet} readOnly />
                </div>
                <div className="col-sm-4">
                  <label htmlFor="tipo" className="form-label">Tipo</label>
                  <input type="text" className="form-control" id="tipo" value={postagem.tipo} readOnly />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-5">
                  <label htmlFor="raca" className="form-label">Raça</label>
                  <input type="text" className="form-control" id="raca" value={postagem.raca} readOnly />
                </div>
                <div className="col-sm-4">
                  <label htmlFor="porte" className="form-label">Porte</label>
                  <input type="text" className="form-control" id="porte" value={postagem.porte} readOnly />
                </div>
                <div className="col-sm-3">
                  <label htmlFor="sexo" className="form-label">Sexo</label>
                  <input type="text" className="form-control" id="sexo" value={postagem.sexo} readOnly />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-6">
                  <p className="form-label">Foto do Pet</p>
                  {postagem.fotopet ? (
                    <img src={postagem.fotopet} alt={`Foto do Pet ${postagem.fotopet}`} width={150} height={210} className="mx-auto d-block" />
                  ) : (
                    <img src="https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-vetor-com-pegadas-de-animais-de-estimacao-fundo-para-papel-de-parede-da-pagina-da-web-pet-shop_562639-204.jpg?w=740" alt="Foto do Pet Padrão" width={150} height={210} className="mx-auto d-block" />
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="form-label">Cartão de Vacina do Pet</p>
                  {postagem.vacina ? (
                    <img src={postagem.vacina} alt={`Cartão de Vacina do Pet ${postagem.vacina}`} width={150} height={210} className="mx-auto d-block" />
                  ) : (
                    <img src="https://img.elo7.com.br/product/zoom/34812D7/cartao-de-vacina-pet-arquivo-em-pdf-para-imprimir-promocao-gato.jpg" alt="Cartão de Vacina do Pet Padrão" width={150} height={210} className="mx-auto d-block" />
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <Link className="btn btn-success float-end mt-2" href="/listagemPostagem">Voltar</Link>
        </form>
      )}
    </div>
  );
}