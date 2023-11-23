'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Visualizar() {
    const params = useParams()
    const [propostas, setPropostas] = useState([])

    useEffect(() => {
        async function getPropostas() {
            const response = await fetch("http://localhost:3004/proposta?veiculo_id=" + params.id)
            const dados = await response.json()
            setPropostas(dados)
        }
        getPropostas()
    }, [])

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col">
                    <div className="card rounded">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Código de Identificação</th>
                                        <th>Valor R$</th>
                                        <th>Comentário</th>
                                        <th>Proposta (Alugar)</th>
                                        <th>Proposta (Comprar)</th>
                                        <th>Data da Proposta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {propostas.map(proposta => (
                                        <tr key={proposta.id}>
                                            <td>{proposta.id}</td>
                                            <td>R$ {proposta.valor}</td>
                                            <td>{proposta.comentario}</td>
                                            <td>{proposta.alugar.toString()}</td>
                                            <td>{proposta.comprar.toString()}</td>
                                            <td>
                                                {new Date(proposta.data).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <Link href="/">
                                <button className="btn btn-danger w-100 btn-lg mt-3">
                                    Voltar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
