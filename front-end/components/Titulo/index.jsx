'use client'
import Link from "next/link"
import React from "react"



class Titulo extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar bg-danger">
          <div className="container-fluid">
            <div className="header-container">
              <div className="header-logo-and-links">
                <div className="header-logo-area">
                  <div className="header-logo-box">
                  </div>
                </div>
                <div className="header-links-container">
                  <a href="#" className="header-links">Home</a>
                  <a href="#" className="header-links">Postagens
                    <img src="public/user/chevron-down.svg" alt="" />
                  </a>
                  <a href="#" className="header-links">ONG's/Parceiros</a>
                  <a href="#" className="header-links">Contato</a>
                </div>
              </div>
              <div className="col header-buttons">
                {/* {session?.user ?
              <span className="text-white">
                {session.user.name}
                <img src={session.user.image} alt="Foto" width={36}
                  className="rounded mx-2" />
                <button className="btn btn-dark mx-2"
                  onClick={() => signOut()}>
                  Logout
                </button>
              </span>
              :
              <Link href="/login">
                <i className="ms-2 fs-4 bi bi-person-fill-up text-white"> Logar-se </i>
              </Link>
            } */}
                {/* {clienteNome ? clienteNome : "Entrar"}
              {
                clienteNome ?
                  <i className="ms-2 fs-4 bi bi-person-fill-down" style={{ cursor: 'pointer' }} onClick={logout}></i> :
                  <Link href="/login"><i className="ms-2 fs-4 bi bi-person-fill-up text-white"></i></Link>
              } */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Titulo