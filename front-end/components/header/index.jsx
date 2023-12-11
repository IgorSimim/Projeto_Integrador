"use client";
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ClienteContext } from '@/contexts/cliente'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import "./header.css";
import "./login.css";

export default function Header(props) {

  const { register, handleSubmit, reset } = useForm()
  const { clienteNome, mudaId, mudaNome } = useContext(ClienteContext)

  function logout() {
    if (confirm("Confirma a saída do sistema? ")) {
      mudaId(null)
      mudaNome("")
      localStorage.removeItem("cliente_logado")
    }
  }

  const router = useRouter()

  async function verificaLogin(data) {
    try {

      const response = await fetch("http://localhost:3000/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email: data.email, senha: data.senha })
        },
      )

      if (response.status == 200) {
        const cliente = await response.json()
        mudaId(cliente.id)
        mudaNome(cliente.nome)
        localStorage.setItem("cliente_logado", JSON.stringify({ id: cliente.id, nome: cliente.nome }))
        router.push("/home_logado")
      } else {
        const errorData = await response.json();

        if (errorData.id === 1) {
          toast.error(errorData.msg); // Trata o erro de falta de email ou senha
        } else if (errorData.id === 2) {
          toast.error(errorData.msg); // Trata o erro do usuário não encontrado
        } else if (errorData.id === 3) {
          toast.error(errorData.msg); // Trata o erro da conta não confirmada
        } else if (errorData.id === 4) {
          toast.error(errorData.msg); // Trata o erro de email ou senha inválidos
        }
      }

    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast.error("Erro ao processar a requisição. Tente novamente mais tarde.");
    }
  }

  return (
    <header>
      <div className="header-container">
        {clienteNome && clienteNome !== "Não logado" ? (
          <div className="header-logo-and-links">
            <div className="header-logo-area">
              <img
                src={cliente.perfil}
                alt={clienteNome}
                className="profile-picture"
              />
            </div>
            <div className="header-links-container">
              <a href="/home_logado" className="header-links">
                Home
              </a>
              <a href="/postagem_logado" className="header-links">
                Postagens
                <img src="public/user/chevron-down.svg" alt="" />
              </a>
              <a href="/parceiros_logado" className="header-links">
                ONG's/Parceiros
              </a>
              <a href="#footer" className="header-links">
                Contato
              </a>
              <a href="#sobre" className="header-links">
                Sobre
              </a>
            </div>
          </div>
        ) : (
          <div className="header-logo-and-links">
            <div className="header-logo-area">
              <img src="../me_adota.png" alt="Logo Social pet" width="80px" height="80px" />
            </div>
            <div className="header-links-container">
              <a href="/home_deslogado" className="header-links">
                Home
              </a>
              <a href="/postagem_deslogado" className="header-links">
                Postagens
                <img src="public/user/chevron-down.svg" alt="" />
              </a>
              <a href="/parceiros_deslogado" className="header-links">
                ONG's/Parceiros
              </a>
              <a href="#footer" className="header-links">
                Contato
              </a>
              <a href="#sobre" className="header-links">
                Sobre
              </a>
            </div>
          </div>
        )}

        <div className="header-buttons">
          {clienteNome && clienteNome !== "Não logado" ? (
              <i
                className="ms-2 fs-4 bi bi-arrow-right-circle"
                style={{ cursor: 'pointer' }}
                onClick={logout}
              ></i>
          ) : (
            <>
              <button
                type="button"
                className="login-button"
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Entrar
              </button>
              <button className="signin-button">Cadastre-se</button>
            </>
          )}


          {/* Modal Login*/}
          <div className="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Login do Cliente</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => reset()}></button>
                </div>
                <div className="modal-body">


                  <form onSubmit={handleSubmit(verificaLogin)}>
                    <div className="form-floating">
                      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                        required {...register("email")} />
                      <label htmlFor="floatingInput">E-mail</label>
                    </div>
                    <div className="form-floating mt-3">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        required {...register("senha")} />
                      <label htmlFor="floatingPassword">Senha de Acesso</label>
                    </div>

                    <div className="form-check text-end my-4">
                      <Link href="/novocliente">
                        Novo Cliente: Cadastre-se
                      </Link>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" data-bs-dismiss="modal">Entrar</button>
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
              </div>
            </div>
          </div>
        </div>


      </div>
    </header>
  );
}