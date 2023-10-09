'use client'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Resumo() {
    const Chart = dynamic(() => import("react-google-charts"), {
        ssr: false,
    });

    const optionsAssunto = {
        title: "Total de postagens por assunto",
    };

    // const optionsData = {
    //     title: "Quantidade de postagens separados por data",
    // }

    const [postagens, setPostagens] = useState([]);
    const [gerais, setGerais] = useState({
        total: 0,
        sempet: 0,
        compet: 0,
        cartaovacina: 0,
    });

    useEffect(() => {
        async function obterPostagens() {
            try {
                const response = await fetch("http://localhost:3004/postagens");
                if (!response.ok) {
                    throw new Error("Falha ao buscar os dados");
                }
                const dadosPostagens = await response.json();
                setPostagens(dadosPostagens);
            } catch (error) {
                console.error("Erro ao obter postagens:", error);
                // Tratar erros de busca de dados
            }
        }

        obterPostagens();
    }, []);

    // Calcular os valores "gerais" com base nos dados
    useEffect(() => {
        const totalPostagens = postagens.length;
        const totalSemPet = postagens.filter(
            (postagem) => !postagem.pet
        ).length;
        const totalComPet = postagens.filter(
            (postagem) => postagem.pet
        ).length;
        const totalVacina = postagens.filter(
            (postagem) => postagem.vacina === ""
        ).length;

        setGerais({
            total: totalPostagens,
            sempet: totalSemPet,
            compet: totalComPet,
            cartaovacina: totalVacina,
        });
    }, [postagens]);

    // Contagem de postagens por assunto
    const contarPostagensPorAssunto = () => {
        const contagem = {};

        postagens.forEach((postagem) => {
            if (contagem[postagem.assunto]) {
                contagem[postagem.assunto]++;
            } else {
                contagem[postagem.assunto] = 1;
            }
        });

        return Object.entries(contagem);
    };

    // Contagem de postagens por data
    // const contarPostagensPorData = () => {
    //     const contagem = {};

    //     postagens.forEach((postagem) => {
    //         const data = postagem.data;
    //         if (contagem[data]) {
    //             contagem[data]++;
    //         } else {
    //             contagem[data] = 1;
    //         }
    //     });

    //     return Object.entries(contagem);
    // };

    // Renderização do gráfico de pizza
    const dataAssunto = [["Assunto", "Total"]].concat(contarPostagensPorAssunto());

    // Renderização do gráfico de barras
    // const dataData = [["Data", "Quantidade"]].concat(
    //     contarPostagensPorData().map(([data, quantdata]) => [
    //         parseFloat(data),
    //         quantidade,
    //     ])
    // );


    return (
        <div className="container">
            <div className="container">
                <h2 id="title" className="my-3">Dados Gerenciais do Sistema</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.total}
                                </span>
                            </div>
                            <h5 className="my-4">Nº de Postagens Realizadas</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span id="br" className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.sempet}
                                </span>
                            </div>
                            <h5 className="my-3">Total de Postagens que não possuem Pet</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.compet}
                                </span>
                            </div>
                            <h5 className="my-3">Total de Postagens que possuem Pet</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-primary">
                            <div className="card-header border-primary">
                                <span className="badge text-bg-danger fs-2 fw-bold p-3 my-2">
                                    {gerais.cartaovacina}
                                </span>
                            </div>
                            <h5 className="my-3">Total de Postagens que cadastraram o Cartão de Vacina</h5>
                        </div>
                    </div>
                </div>
            </div>


            <h2 id="title" className="my-4">Gerenciamento de Postagens</h2>

            <h4 className="mt-5 ms-5">Gráfico de Postagens por Assunto</h4>
            <Chart chartType="PieChart" width="100%" height="400px" data={dataAssunto} options={optionsAssunto} />

            {/* <h4 className="mt-5 ms-5">Gráfico de Postagens por Data</h4>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={dataData} options={optionsData} /> */}
        </div>
    );
}