'use client'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Resumo() {
    const Chart = dynamic(() => import("react-google-charts"), {
        ssr: false,
    });

    const optionsBairro = {
        title: "Total de usuários por bairro",
    };

    const optionsIdade = {
        title: "Quantidade de usuários separados por idade",
        vAxis: {
            format: "0",
        },
    }

    const [usuarios, setUsuarios] = useState([]);
    const [gerais, setGerais] = useState({
        nome: 0,
        sexoM: 0,
        sexoF: 0,
    });

    useEffect(() => {
        async function obterUsuarios() {
            try {
                const response = await fetch("http://localhost:3004/usuarios");
                if (!response.ok) {
                    throw new Error("Falha ao buscar os dados");
                }
                const dadosUsuarios = await response.json();
                setUsuarios(dadosUsuarios);
            } catch (error) {
                console.error("Erro ao obter usuários:", error);
                // Tratar erros de busca de dados
            }
        }

        obterUsuarios();
    }, []);

    // Calcular os valores "gerais" com base nos dados
    useEffect(() => {
        const totalUsuarios = usuarios.length;
        const totalMasculino = usuarios.filter(
            (usuario) => usuario.sexo === "Masculino"
        ).length;
        const totalFeminino = usuarios.filter(
            (usuario) => usuario.sexo === "Feminino"
        ).length;
        const totalCartao = usuarios.filter(
            (usuario) => usuario.credito != "" && usuario.debito != ""
        ).length;

        setGerais({
            nome: totalUsuarios,
            sexoM: totalMasculino,
            sexoF: totalFeminino,
            cartao: totalCartao,
        });
    }, [usuarios]);

    // Contagem de usuários por bairro
    const contarUsuariosPorBairro = () => {
        const contagem = {};

        usuarios.forEach((usuario) => {
            if (contagem[usuario.bairro]) {
                contagem[usuario.bairro]++;
            } else {
                contagem[usuario.bairro] = 1;
            }
        });

        return Object.entries(contagem);
    };

    // Contagem de usuários por idade
    const contarUsuariosPorIdade = () => {
        const contagem = {};

        usuarios.forEach((usuario) => {
            const idade = usuario.idade;
            if (contagem[idade]) {
                contagem[idade]++;
            } else {
                contagem[idade] = 1;
            }
        });

        return Object.entries(contagem);
    };

    // Renderização do gráfico de pizza
    const dataBairro = [["Bairro", "Total"]].concat(contarUsuariosPorBairro());

    // Renderização do gráfico de barras
    const dataIdade = [["Idade", "Quantidade"]].concat(
        contarUsuariosPorIdade().map(([idade, quantidade]) => [
            parseFloat(idade),
            quantidade,
        ])
    );


    return (
        <div className="container">
            <div className="container">
                <h2 id="title" className="my-3">Dados Gerenciais do Sistema</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.nome}
                                </span>
                            </div>
                            <h5 className="my-4">Nº de Usuários Cadastrados</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span id="br" className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.sexoM}
                                </span>
                            </div>
                            <h5 className="my-3">Total de Usuários que possuem o sexo Masculino</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.sexoF}
                                </span>
                            </div>
                            <h5 className="my-3">Total de Usuários que possuem o sexo Feminino</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.cartao}
                                </span>
                            </div>
                            <h5 className="my-3">Total de Usuários com cartão de Créd. e Débit.</h5>
                        </div>
                    </div>
                </div>
            </div>

            <h2 id="title" className="my-4">Gerenciamento de Usuários</h2>

            <h4 className="mt-5 ms-5">Gráfico de Usuários por Bairro</h4>
            <Chart chartType="PieChart" width="100%" height="400px" data={dataBairro} options={optionsBairro} />

            <h4 className="mt-5 ms-5">Gráfico de Usuários por Idade</h4>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={dataIdade} options={optionsIdade} />
        </div>
    );
}