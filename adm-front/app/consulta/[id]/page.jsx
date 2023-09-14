import Link from "next/link"

async function getUsuario(id) {
  const response = await fetch("http://localhost:3004/usuarios/"+id)
  const dado = await response.json()
  // console.log("=".repeat(40))
  // console.log(dado)
  // console.log("=".repeat(40))
  return dado
}

export default async function Consulta({params}) {

  const usuario = await getUsuario(params.id)
  
  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Usuários</h2>
      <form>
        <div className="row">
          <div className="col-sm-5">
            <label htmlFor="nome" className="form-label">Nome do Usuário</label>
            <input type="text" className="form-control" id="nome" value={usuario.nome} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" value={usuario.email} readOnly />
          </div>
          <div className="col-sm-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input type="text" step="0.10" className="form-control" id="senha" value={usuario.senha} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="cpf" className="form-label">Cpf</label>
            <input type="text" className="form-control" id="cpf" value={usuario.cpf} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="telefone" className="form-label">Telefone</label>
            <input type="text" className="form-control" id="telefone" value={usuario.telefone} readOnly />
          </div>
          <div className="col-sm-2">
            <label htmlFor="idade" className="form-label">Idade</label>
            <input type="number" className="form-control" id="idade" value={usuario.idade} readOnly />
          </div>
          <div className="col-sm-2">
            <label htmlFor="sexo" className="form-label">Sexo</label>
            <input id="sexo" className="form-select" value={usuario.sexo} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="bairro" className="form-label">Bairro</label>
            <input type="text" className="form-control" id="bairro" value={usuario.bairro} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="credito" className="form-label">Cartão de Crédito</label>
            <input type="text" className="form-control" id="credito" value={usuario.credito} readOnly />
          </div>
          <div className="col-sm-2">
            <p>Status do Usuário:</p>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" 
                id="destaque" 
                checked={usuario.destaque}
                readOnly
                />
              <label className="form-check-label" htmlFor="destaque">Destaque</label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="col-sm-6">
            <label htmlFor="debito" className="form-label">Cartão de Débito</label>
            <input type="text" className="form-control" id="debito" value={usuario.debito} readOnly />
          </div>
          <div className="col-sm-6">
            <p className="form-label">Foto de Perfil</p>
            <img src={usuario.perfil} alt={`Foto de Perfil ${usuario.perfil}`} width={150} height={210} className="mx-auto d-block"/>
          </div>
        </div>

        <Link className="btn btn-success float-end" href="/listagemUsuario">Voltar</Link>

      </form>
    </div>
  )
}