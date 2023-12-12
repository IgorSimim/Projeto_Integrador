'use client';
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Home() {
  const [postagens, setPostagens] = useState([]);

  const options = {
    title: "Quantidade de Postagens Mensais",
    curveType: "function",
    legend: { position: "bottom" },
    vAxis: {
      format: "0",
    }
  };

  useEffect(() => {
    async function getDadosGrafico() {
      try {
        const response = await fetch("http://localhost:3000/postagens/graph_mes");
        const dados = await response.json();
        console.log("Dados recebidos:", dados);
        setPostagens(dados);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    }
    getDadosGrafico();
  }, []);


  // Função para formatar a data para exibir apenas o mês
  const formatarData = (data) => {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    return meses[data.getMonth()];
  };

  // Transforme os dados recebidos em um formato compatível com o gráfico
  const chartData = [
    ["Mês", "Quantidade de Postagens"],
    ...(Array.isArray(postagens)
      ? postagens.map((item) => [formatarData(new Date(2023, item.mes - 1)), item.quantidade])
      : [])
  ];

  return (
    <div className="container">
      <h2 className="mt-3 mb-4">Visão Geral do Sistema</h2>

      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
}