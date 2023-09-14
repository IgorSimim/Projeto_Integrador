import Link from "next/link";

export default function Titulo() {
  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img src="../me_adota.png" alt="Logo" width="80" height="80" className="d-inline-block align-text-top" />
          <h2 className="float-end mt-3 ms-2">Social Pet: Controle das Listagens dos Usuários/Postagens</h2>
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cadastro
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/cadastro">Usuário</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/cadastro2">Postagem</Link>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Listagem
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/listagem">Usuário</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/listagem2">Postagem</Link>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Resumo
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/resumo">Usuário</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/resumo2">Postagem</Link>
              </li>
            </ul>
          </div>
          
          {/* <li className="nav-item">
            <Link className="nav-link" href="/cadastro">Cadastro</Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" href="/listagem">Listagem</Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" href="/resumo">Resumo</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  )

}