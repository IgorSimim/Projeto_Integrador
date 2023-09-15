import Link from "next/link"

async function getPostagem(id) {
  const response = await fetch("http://localhost:3004/postagens/" + id)
  const dado = await response.json()
  return dado
}

export default async function Consulta({ params }) {

  const postagem = await getPostagem(params.id)

  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Usuários</h2>
      <form>
        <div className="row">
          <div className="col-sm-4">
            <label htmlFor="nome" className="form-label">Nome do Usuário</label>
            <input type="text" className="form-control" id="nome" value={postagem.nome} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="titulo" className="form-label">Titulo da Postagem</label>
            <input type="text" className="form-control" id="titulo" value={postagem.titulo} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="assunto" className="form-label">Assunto</label>
            <input type="text" step="0.10" className="form-control" id="assunto" value={postagem.assunto} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-8">
            <label htmlFor="descricaopost" className="form-label">Descrição da Postagem</label>
            <textarea className="form-control" id="descricaopost" rows="3" value={postagem.cpf} readOnly></textarea>
          </div>
          <div className="col-sm-4">
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
              <div className="col-sm-4">
                <label htmlFor="nomepet" className="form-label">Nome do Pet</label>
                <input type="text" className="form-control" id="nomepet" value={postagem.nomepet} readOnly />
              </div>
              <div className="col-sm-4">
                <label htmlFor="raca" className="form-label">Raça</label>
                <input type="text" className="form-control" id="raca" value={postagem.raca} readOnly />
              </div>
              <div className="col-sm-4">
                <label htmlFor="porte" className="form-label">Porte</label>
                <input type="text" className="form-control" id="porte" value={postagem.porte} readOnly />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-4">
                <label htmlFor="idade" className="form-label">Idade</label>
                <input type="text" className="form-control" id="idade" value={postagem.idade} readOnly />
              </div>
              <div className="col-sm-8">
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
    </div>
  )
}