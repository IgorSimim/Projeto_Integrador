'use client'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Resumo() {
    const Chart = dynamic(() => import("react-google-charts"), {
        ssr: false,
    });

    const [usuarios, setUsuarios] = useState([]);
    const [gerais, setGerais] = useState({
        nome: 0,
        sexoM: 0,
        sexoF: 0,
    });

    useEffect(() => {
        async function obterUsuarios() {
            try {
                const response = await fetch("http://localhost:3000/usuarios");
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
        const totalUsuarios = usuarios.filter(
            (usuario) => usuario.confirmado === 1
        ).length;
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
            idade,
            quantidade,
        ])
    );

    // Cores diferentes para cada novo dado
    const coresBairro = contarUsuariosPorBairro().map((_, index) => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
    const coresIdade = contarUsuariosPorIdade().map((_, index) => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

        const optionsBairro = {
        title: "Total de usuários por bairro",
        colors: coresBairro,
    };

    const optionsIdade = {
        title: "Quantidade de usuários separados por idade",
        vAxis: {
            format: "0",
        },
        colors: coresIdade,
    };


    return (
        <div className="container">

            <h2 id="title" className="my-3">Dados Gerenciais do Sistema</h2>
            <div className="row">
                <div className="d-flex justify-content-center align-items-center mt-2">
                    <span className="btn btn-outline-primary btn-lg">
                        <p className="badge bg-danger fs-4">{gerais.nome}</p>
                        <p>Nº de Usuários Cadastrados e Confirmados</p>
                    </span>
                    <span className="btn btn-outline-primary btn-lg mx-2">
                        <p className="badge bg-danger fs-4">{gerais.sexoM}</p>
                        <p>Nº de Usuários do sexo Masc.</p>
                    </span>
                    <span className="btn btn-outline-primary btn-lg me-2">
                        <p className="badge bg-danger fs-4">{gerais.sexoF}</p>
                        <p>Nº de Usuários do sexo Fem.</p>
                    </span>
                    <span className="btn btn-outline-primary btn-lg ms-2">
                        <p className="badge bg-danger fs-4">{gerais.cartao}</p>
                        <p>Nº de Usuários que cadastraram ambos cartões</p>
                    </span>
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