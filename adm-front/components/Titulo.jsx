import Link from "next/link";
import './style.css';

export default function Titulo() {
  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img src="../me_adota.png" alt="Logo" width="80" height="80" className="d-inline-block align-text-top" />
          <h2 className="float-end mt-3 ms-2">Social Pet: Controle das Listagens dos Usuários/Postagens</h2>
        </Link>

        <div className="navbar-nav d-flex flex-row"> 
          <div className="dropdown">
            <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cadastro
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/cadastroUsuario">Usuário</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/cadastroPostagem">Postagem</Link>
              </li>
            </ul>
          </div>

          <div className="dropdown ms-3">
            <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Listagem
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/listagemUsuario">Usuário</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/listagemPostagem">Postagem</Link>
              </li>
            </ul>
          </div>

          <div className="dropdown ms-3">
            <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Resumo
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="/resumoUsuario">Usuário</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/resumoPostagem">Postagem</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}