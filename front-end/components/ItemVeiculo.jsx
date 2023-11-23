'use client'
import { useContext } from "react"
import { ClienteContext } from "@/contexts/cliente"
// import { useSession } from "next-auth/react"
// import Estrelas from "./Estrelas"
import Link from "next/link"

export default function ItemVeiculo(props) {
  // const { data: session } = useSession()

  const { clienteId } = useContext(ClienteContext)

  return (
    <div className="col">
      <div className="card">
        <img src={props.veiculo.capa} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.veiculo.nome}</h5>
          <p className="card-text">
            {props.veiculo.marca}
          </p>
          <p className="card-text">
            {props.veiculo.cor} - {props.veiculo.ano}
          </p>
          <p className="small">
            {props.veiculo.descricao}
          </p>
        </div>
        {/* {session?.user ?
          <div>
            <Estrelas soma={props.veiculo.soma} num={props.veiculo.num} />
            <div className="float-end">
              <Link href={"/visualizar/" + props.veiculo.id}>
                <i className="bi bi-file-earmark-text text-primary fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
              <Link href={"/proposta/" + props.veiculo.id}>
                <i className="bi bi-file-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
          :
          <div></div>
        } */}
        {clienteId &&
          <div>
            <Estrelas soma={props.veiculo.soma} num={props.veiculo.num} />
            <div className="float-end">
              <i className="bi bi-chat-dots text-primary fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              <Link href={"/avaliar/" + props.veiculo.id}>
                <i className="bi bi-patch-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
        }
      </div>
    </div >
  )
}