'use client'
// import { signIn } from "next-auth/react"
import Link from 'next/link'
import './login.css'
import { useForm } from 'react-hook-form'
// import { useContext } from 'react'
// import { ClienteContext } from '@/contexts/cliente'
import { useRouter } from 'next/navigation'
// import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const router = useRouter();

  // const handleSocialLogin = async () => {
  //   const result = await signIn('google', {
  //     callbackUrl: '/', // Página de destino após o login
  //   });

  //   if (!result.error) {
  //     // Login bem-sucedido, redirecionar o usuário
  //     router.push('/components/ItemVeiculo');
  //   }
  // };


  async function verificaLogin(data) {
    const login = `email=${data.email}&senha=${data.senha}`
    const response = await fetch(`http://localhost:3004/cliente?${login}`)
    const cliente = await response.json()
    if (cliente.length == 0) {
      toast.error("Erro... Os dados informados não conferem")
    } else {
      mudaId(cliente[0].id)
      mudaNome(cliente[0].nome)
      localStorage.setItem("cliente_logado", JSON.stringify({ id: cliente[0].id, nome: cliente[0].nome }))
      router.push("/")
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(verificaLogin)}>
      {/* <form> */}
        <h1 className="h3 mb-3 fw-normal mt-5">Login</h1>

        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            required {...register("email")} />
          <label for="floatingInput">E-mail</label>
        </div>
        <div className="form-floating mt-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
            required {...register("senha")} />
          <label htmlFor="floatingPassword">Senha de Acesso</label>
        </div>

        <div className="form-check text-end my-4">
          <Link href="/cadastro">
            Cadastre-se
          </Link>
        </div>
        <button className="btn btn-dark d-block mx-auto mb-3"
          onClick={handleSocialLogin}>
          Login Social
        </button>
        <button className="btn btn-primary w-100 py-2" type="submit">Entrar</button>
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
    </main>
  )
}