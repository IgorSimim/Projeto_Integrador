'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

async function getPostagem(id) {
  const response = await fetch("http://localhost:3000/postagens/pesq" + id);
  const dado = await response.json();
  return dado;
}

export default function Consulta({ params }) {
  const [showAdditionalLabels2, setShowAdditionalLabels2] = useState(false);
  const [postagem, setPostagem] = useState(null);

  useEffect(() => {
    async function fetchPostagem() {
      const postagemData = await getPostagem(params.id);
      setPostagem(postagemData);
      setShowAdditionalLabels2(postagemData.assunto === "Outro");
    }

    fetchPostagem();
  }, [params.id]);

  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Usuários</h2>
      {postagem && (
        <form>
          <div className="row">
            <div className="col-sm-2">
              <label htmlFor="usuario_id" className="form-label">Id do Usuário</label>
              <input type="text" className="form-control" id="usuario_id" value={postagem.usuario_id} readOnly />
            </div>
            <div className="col-sm-6">
              <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
              <input type="text" className="form-control" id="titulo" value={postagem.titulo} readOnly />
            </div>
            <div className="col-sm-4">
              <label htmlFor="assunto" className="form-label">Assunto</label>
              {showAdditionalLabels2 ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o assunto personalizado"
                  value={postagem.assuntoCustom}
                  readOnly
                />
              ) : (
                <input
                  type="text"
                  step="0.10"
                  className="form-control"
                  id="assunto"
                  value={postagem.assunto}
                  readOnly
                />
              )}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-6">
              <label htmlFor="descricao" className="form-label">Descrição da Postagem</label>
              <textarea className="form-control" id="descricao" rows="3" value={postagem.descricao} readOnly></textarea>
            </div>
            <div className="col-sm-2">
              <label htmlFor="data" className="form-label">Data da Postagem</label>
              <textarea className="form-control" id="data" rows="3" value={postagem.data} readOnly></textarea>
            </div>
            <div className="col-sm-2">
              <p>Status da Postagem:</p>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox"
                  id="destaque"
                  checked={postagem.destaque}
                  readOnly
                />
                <label className="form-check-label" htmlFor="destaque">Destaque</label>
              </div>
            </div>
            <div className="col-sm-2">
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

          {postagem.pet && (
            <div>
              <div className="row mt-3">
                <div className="col-sm-3">
                  <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                  <input type="text" className="form-control" id="nomepet" value={postagem.nomepet} readOnly />
                </div>
                <div className="col-sm-3">
                  <label htmlFor="tipo" className="form-label">Tipo</label>
                  <input type="text" className="form-control" id="tipo" value={postagem.tipo} readOnly />
                </div>
                <div className="col-sm-3">
                  <label htmlFor="raca" className="form-label">Raça</label>
                  <input type="text" className="form-control" id="raca" value={postagem.raca} readOnly />
                </div>
                <div className="col-sm-3">
                  <label htmlFor="porte" className="form-label">Porte</label>
                  <input type="text" className="form-control" id="porte" value={postagem.porte} readOnly />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-sm-3">
                  <label htmlFor="sexo" className="form-label">Sexo</label>
                  <input type="text" className="form-control" id="sexo" value={postagem.sexo} readOnly />
                </div>
                <div className="col-sm-3">
                  <label htmlFor="idade" className="form-label">Idade</label>
                  <input type="text" className="form-control" id="idade" value={postagem.idade} readOnly />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="descricaopet" className="form-label">Descrição do Pet</label>
                  <textarea className="form-control" id="descricaopet" rows="3" value={postagem.descricaopet} readOnly></textarea>
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
          )}

          <Link className="btn btn-success float-end" href="/listagemPostagem">Voltar</Link>
        </form>
      )}
    </div>
  );
}