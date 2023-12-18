'use client'
import Link from 'next/link'
import './login.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const { register, handleSubmit } = useForm()

  const router = useRouter()

  async function verificaLogin(data) {
    try {
      const response = await fetch("http://localhost:3000/loginadmin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: data.email, senha: data.senha })
      });

      if (response.status === 400) {
        const errorData = await response.json();
        toast.error(errorData.msg);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      toast.error("Erro ao processar a requisição. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="container form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(verificaLogin)}>
        <h1 className="h3 mb-3 fw-normal mt-5">Login do Cliente</h1>

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
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Entrar</button>
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
  )
}