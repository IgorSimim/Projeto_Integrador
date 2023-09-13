'use client'
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Resumo() {
    const Chart = dynamic(() => import("react-google-charts"), {
        ssr: false,
    });

    const optionsBairro = {
        title: "Número de usuários por bairro",
    };

    const optionsIdade = {
        title: "Total de usuários por idade",
    };


    const [usuarios, setUsuarios] = useState([]);

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
    const dataBairro = [["Bairro", "Quantidade"]].concat(contarUsuariosPorBairro());

    // Renderização do gráfico de barras
    const dataIdade = [["Idade", "Total"]].concat(contarUsuariosPorIdade());


    return (
        <div className="container">
            <h2 id="title" className="my-3">Gerenciamento de Usuários</h2>

            <h4 className="mt-5 ms-5">Gráfico de Usuários por Bairro</h4>
            <Chart chartType="PieChart" width="100%" height="400px" data={dataBairro} options={optionsBairro} />

            <h4 className="mt-5 ms-5">Gráfico de Usuários por Idade</h4>
            <Chart chartType="BarChart" width="100%" height="400px" data={dataIdade} options={optionsIdade} />
        </div>
    );
}