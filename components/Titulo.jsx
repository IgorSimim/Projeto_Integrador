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
          <li className="nav-item">
            <Link className="nav-link" href="/cadastro">Cadastro</Link>
          </li>

          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Listagem
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link class="dropdown-item" href="/listagem">Usuário</Link>
              </li>
              <li>
                <Link class="dropdown-item" href="/listagem">Usuário</Link>
              </li>
              <li>
                <Link class="dropdown-item" href="/listagem">Usuário</Link>
              </li>
            </ul>
          </div>
          {/* <li className="nav-item">
            <Link className="nav-link" href="/listagem">Listagem</Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" href="/resumo">Resumo</Link>
          </li>
        </ul>
      </div>
    </nav>
  )

}