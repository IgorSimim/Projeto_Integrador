'use client'
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import dynamic from "next/dynamic";

export default function Resumo() {
    const Chart = dynamic(() => import("react-google-charts"), {
        ssr: false,
    });

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
                const response = await fetch("http://localhost:3000/postagens");
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
            (postagem) => postagem.vacina !== ""
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
    const contarPostagensPorData = () => {
        const contagem = {};

        postagens.forEach((postagem) => {
            const dataFormatada = format(new Date(postagem.createdAt), 'dd/MM/yyyy');

            if (contagem[dataFormatada]) {
                contagem[dataFormatada]++;
            } else {
                contagem[dataFormatada] = 1;
            }
        });

        return Object.entries(contagem);
    };

    // Cores diferentes para cada novo dado
    const coresAssunto = contarPostagensPorAssunto().map((_, index) => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
    const coresData = contarPostagensPorData().map((_, index) => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    const optionsAssunto = {
        title: "Total de postagens por assunto",
        colors: coresAssunto,
    };

    const optionsData = {
        title: "Quantidade de postagens separados por data",
        vAxis: {
            format: "0",
        },
        colors: coresData,
    }


    // Renderização do gráfico de pizza
    const dataAssunto = [["Assunto", "Total"]].concat(contarPostagensPorAssunto());

    // Renderização do gráfico de barras
    const dataData = [["Data", "Quantidade"]].concat(
        contarPostagensPorData().map(([data, quantidade]) => [
            data,
            quantidade,
        ])
    );


    return (
        <div className="container">

            <h2 id="title" className="my-3">Dados Gerenciais do Sistema</h2>
            <div className="row">
                <div className="d-flex justify-content-center align-items-center mt-2">
                    <span className="btn btn-outline-primary btn-lg">
                        <p className="badge bg-danger fs-4">{gerais.total}</p>
                        <p>Nº de Postagens realizadas</p>
                    </span>
                    <span className="btn btn-outline-primary btn-lg mx-2">
                        <p className="badge bg-danger fs-4">{gerais.sempet}</p>
                        <p>Total de Postagens que não possuem Pet</p>
                    </span>
                    <span className="btn btn-outline-primary btn-lg me-2">
                        <p className="badge bg-danger fs-4">{gerais.compet}</p>
                        <p>Total de Postagens que possuem Pet</p>
                    </span>
                    <span className="btn btn-outline-primary btn-lg ms-2">
                        <p className="badge bg-danger fs-4">{gerais.cartaovacina}</p>
                        <p>Total de Postagens que cadastraram o Cartão de Vacina</p>
                    </span>
                </div>
            </div>


            <h2 id="title" className="my-4">Gerenciamento de Postagens</h2>

            <h4 className="mt-5 ms-5">Gráfico de Postagens por Assunto</h4>
            <Chart chartType="PieChart" width="100%" height="400px" data={dataAssunto} options={optionsAssunto} />

            <h4 className="mt-5 ms-5">Gráfico de Postagens por Data</h4>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={dataData} options={optionsData} />
        </div>
    );
}