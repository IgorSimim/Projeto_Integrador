import { useContext } from "react"
import { UsuarioContext } from "@/contexts/usuario"
import Link from "next/link"

export default function ItemPostagem(props) {

  const { usuarioId } = useContext(UsuarioContext)

  return (
    <div className="col">
      <div className="card">
        <img src={props.postagem.fotopet} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.postagem.assunto}</h5>
          <p className="card-text">
            {props.postagem.titulo}
          </p>
          <p className="descricao">
            {props.postagem.descricao}
          </p>
        </div>
        {/* {clienteId &&
          <div>
            <Valores soma={props.veiculo.soma} num={props.veiculo.num} />
            <div className="float-end">
              <Link href={"/propostas/" + props.veiculo.id}>
                <i className="bi bi-chat-dots text-primary fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
              <Link href={"/propor/" + props.veiculo.id}>
                <i className="bi bi-patch-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }}></i>
              </Link>
            </div>
          </div>
        } */}
      </div>
    </div >
  )
}