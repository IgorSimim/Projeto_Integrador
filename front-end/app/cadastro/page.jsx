'use client'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            nome: "",
            email: "",
            senha: ""
        }
    })

    async function enviaDados(data) {
        //    console.log(data);    
        const usuario = await fetch("http://localhost:3004/cliente",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        if (usuario.status == 201) {
            toast.success("Cadastrado realizado com sucesso")
            reset()
        } else {
            // alert("Erro...")
            toast.error("Erro... Não foi possível concluir o cadastro")
        }
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(enviaDados)}>
                <h1 className="h3 mb-3 fw-normal mt-5">Cadastre-se</h1>

                <div className="form-floating">
                    <input type="nome" className="form-control" id="floatingInput" placeholder="name"
                        required {...register("nome")} />
                    <label htmlFor="floatingInput">Digite seu Nome</label>
                </div>
                <div className="form-floating mt-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                        required {...register("email")} />
                    <label htmlFor="floatingInput">Digite seu E-mail</label>
                </div>
                <div className="form-floating mt-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        required {...register("senha")} />
                    <label htmlFor="floatingPassword">Digite sua Senha</label>
                </div>

                {/* <button className="btn btn-success w-100 py-2" type="submit">Cadastre-se</button> */}
                <input type="submit" value="Cadastrar" className="btn btn-primary py-2" />
                <input type="button" value="Limpar" className="btn btn-danger ms-2 py-2"
                    onClick={() => reset()} />
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