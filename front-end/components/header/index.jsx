"use client";
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { UsuarioContext } from '@/contexts/usuario'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import "./header.css";
import "./login.css";

export default function Header() {

  const { register, handleSubmit, reset } = useForm()
  const { usuarioNome, mudaId, mudaNome } = useContext(UsuarioContext)

  const router = useRouter()

  function logout() {
    if (confirm("Confirma a saída do sistema? ")) {
      mudaId(null)
      mudaNome("")
      localStorage.removeItem("usuario_logado")
    }
  }

  async function verificaLogin(data) {
    try {

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: data.emaillogin, senha: data.senhalogin })
      });

      if (response.status === 400) {
        const errorData = await response.json();
        toast.error(errorData.msg);
      } else {
        const usuario = await response.json();
        console.log(usuario);
        mudaId(usuario.id);
        mudaNome(usuario.nome);
        localStorage.setItem("usuario_logado", JSON.stringify({ id: usuario.id, nome: usuario.nome, perfil: usuario.perfil }));
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast.error("Erro ao processar a requisição. Tente novamente mais tarde.");
    }
  }

  async function enviaDados(data) {
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      });

      if (response.status === 200) {
        toast.success("Usuário cadastrado com sucesso");
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg);
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast.error("Erro ao processar a requisição. Tente novamente mais tarde.");
    }
  }


  return (
    <header>
      <div className="header-container">
        <div className="header-logo-and-links">
          <div className="header-logo-area">
            {usuarioNome && usuarioNome !== "Não logado" ? (
              <img src={usuario.perfil} alt={usuarioNome} className="profile-picture" />
            ) : (
              <img src="../me_adota.png" alt="Logo Social pet" width="80px" height="80px" />
            )}
          </div>

          <div className="header-links-container">
            <a href="/home_deslogado" className="header-links">
              Home
            </a>
            <div className="dropdown">
              <a className="header-links dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Postagens
                <img src="public/user/chevron-down.svg" alt="" />
              </a>
              <ul className="dropdown-menu">
                {usuarioNome && usuarioNome !== "Não logado" ? (
                  <>
                    <li>
                      <Link className="dropdown-item" href="/criar">Criar</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/postagemAdocoes">Adoções</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/postagemNoticias">Notícias</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/postagemLeis">Novas leis</Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="dropdown-item" href="/postagemNoticias">Notícias</Link>
                  </li>
                )}
              </ul>

            </div>
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

        <div className="header-buttons">
          {usuarioNome && usuarioNome !== "Não logado" ? (
            <Link href="/home_deslogado"><i class="ms-2 fs-4 bi bi-person-fill-up text-white"
              style={{ cursor: 'pointer' }}
              onClick={logout}>
            </i></Link>
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
              <button
                type="button"
                className="signin-button"
                data-bs-toggle="modal"
                data-bs-target="#cadastro"
              >
                Cadastre-se
              </button>
            </>
          )}
        </div>


        {/* Modal Login*/}
        <div className="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Login do Usuário</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => reset()}></button>
              </div>
              <div className="modal-body">


                <form onSubmit={handleSubmit(verificaLogin)}>
                  <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                      required {...register("emaillogin")} />
                    <label for="floatingInput">E-mail</label>
                  </div>
                  <div class="form-floating mt-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                      required {...register("senhalogin")} />
                    <label for="floatingPassword">Senha de Acesso</label>
                  </div>
                  <button className="btn btn-primary w-100 py-2 mt-4" type="submit" data-bs-dismiss="modal">Entrar</button>
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

        {/* Modal Cadastro*/}
        <div className="modal fade" id="cadastro" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Cadastro do Usuário</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => reset()}></button>
              </div>
              <div className="modal-body">


                <form onSubmit={handleSubmit(enviaDados)}>
                  <div className="row">
                    {/* Seção 1: Informações Básicas */}
                    <div className="col-sm-6">
                      <label htmlFor="nome" className="form-label">Nome do Usuário</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        {...register("nome")}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="senha" className="form-label">Senha</label>
                      <input
                        type="password"
                        className="form-control"
                        id="senha"
                        placeholder="Ex: Senha@1234"
                        {...register("senha")}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    {/* Seção 2: Informações Adicionais */}
                    <div className="col-sm-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Ex: nome@provedor.com"
                        {...register("email")}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="cpf" className="form-label">Cpf</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        placeholder="Ex: 000.000.000-00"
                        {...register("cpf")}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    {/* Seção 3: Outras Informações */}
                    <div className="col-sm-6">
                      <label htmlFor="telefone" className="form-label">Telefone</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefone"
                        placeholder="Ex: (DDD) 90000-0000"
                        {...register("telefone")}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="dtnasc" className="form-label">Data de Nascimento</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dtnasc"
                        {...register("dtnasc")}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    {/* Seção 4: Mais Informações */}
                    <div className="col-sm-6">
                      <label htmlFor="sexo" className="form-label">Sexo</label>
                      <select
                        id="sexo"
                        className="form-select"
                        {...register("sexo")}
                        required
                      >
                        <option value="NI">Prefiro não informar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="bairro" className="form-label">Bairro</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bairro"
                        {...register("bairro")}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    {/* Seção 5: Última Informação */}
                    <div className="col-sm-12">
                      <label htmlFor="perfil" className="form-label">Foto de Perfil</label>
                      <input
                        type="url"
                        className="form-control"
                        id="perfil"
                        placeholder="Ex: http://www.example.com/image1.jpg"
                        {...register("perfil")}
                        required
                      />
                    </div>
                  </div>



                  <button className="btn btn-primary w-100 py-2 mt-4" type="submit">Cadastrar</button>
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

      </div >

    </header >
  )
}