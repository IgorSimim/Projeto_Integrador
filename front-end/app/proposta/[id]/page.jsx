'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
// import Estrelas from '@/components/Estrelas'
import Link from "next/link"
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"

import 'react-toastify/dist/ReactToastify.css'

export default function Proposta() {
  const params = useParams()
  const [veiculo, setVeiculo] = useState({})
  const { clienteId } = useContext(ClienteContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      alugar: false,
      comprar: false
    }
  })

  useEffect(() => {
    async function getVeiculo() {
      const response = await fetch("http://localhost:3004/veiculo/" + params.id)
      const dado = await response.json()
      //      console.log(dado)
      setVeiculo({
        id: dado.id,
        capa: dado.capa,
        nome: dado.nome,
        cor: dado.cor,
        marca: dado.marca,
        ano: dado.ano,
        descricao: dado.descricao,
        num: dado.num
      })
    }
    getVeiculo()
  }, [])

  async function enviaProposta(data) {
    // const avaliacao = {...data, cliente_id: clienteId, veiculo_id: veiculo.id, data: new Date()}
    const proposta = { ...data, cliente_id: clienteId, veiculo_id: veiculo.id, data: new Date() }
    console.log(proposta)

    const propoe = await fetch("http://localhost:3004/proposta",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(proposta)
      },
    )

    const altera = { num: Number(veiculo.num) + 1 }
    const atualiza = await fetch("http://localhost:3004/veiculo/" + veiculo.id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(altera)
      },
    )

    if (propoe.status == 201 && atualiza.status == 200) {
      toast.success("Ok! Proposta enviada com sucesso")
      reset()
    } else {
      toast.error("Erro no envio da proposta...")
    }
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div className="card text-center">
            <img src={veiculo.capa} alt="Veículo" width={300} className="mx-auto d-block mt-3" />
            <div className="card-body">
              <h3 className="card-title fs-2 mb-0">
                {veiculo.nome}
              </h3>
              <p className="card-text fs-5 mb-1">
                {veiculo.marca}
              </p>
              <p className="card-text fs-6 mb-1">
                <b>Cor do veículo:</b> {veiculo.cor}
              </p>
              <p className="card-text fs-6 mb-2">
                <b>Ano do veículo:</b> {veiculo.ano}
              </p>
              <p className="card-text fs-6">
                {veiculo.descricao}
              </p>
              {/* <Estrelas soma={veiculo.soma} num={veiculo.num} /> */}
              <span className="text-danger fs-6">{veiculo.num} proposta(s)</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <form className="card-body" onSubmit={handleSubmit(enviaProposta)}>
              <h3 className="card-title">Mande sua proposta sobre este veículo</h3>
              <hr />
              <div className="my-4">
                <label htmlFor="valor" className="form-label fs-5">Valor da Proposta:</label>
                <input type="text" step="0.01" className="form-control" id="valor" {...register("valor")} autoFocus required />
              </div>

              <div className="my-4">
                <label htmlFor="comentario" className="form-label fs-5">Seu Comentário:</label>
                <textarea className="form-control form-control-lg" id="comentario" rows="3" {...register("comentario")} required ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label fs-5">Opções da proposta:</label>
                <div className="row">
                  <div className="col ms-2">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="alugar"
                        {...register("alugar")}
                      />
                      <label className="form-check-label" htmlFor="alugar">Alugar</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="comprar"
                        {...register("comprar")}
                      />
                      <label className="form-check-label" htmlFor="comprar">Comprar</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Link href="/">
                    <button className="btn btn-danger w-100 btn-lg mt-3">
                      Voltar
                    </button>
                  </Link>
                </div>
                <div className="col-6">
                  <input type="submit" className="btn btn-primary w-100 btn-lg mt-3" value="Enviar" />
                </div>
              </div>
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
  )
}