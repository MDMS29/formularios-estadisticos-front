import type { ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { type FC } from "react";
import { Bar } from "react-chartjs-2";
import type { ChartsType } from "../../Utils/Types/DasboardType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart: FC<ChartsType> = ({ data }) => {
  const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
  ];

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Cantidad de respuestas por pregunta",
        color: "#ffffff",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Cantidad: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
          precision: 0,
          stepSize: 1,
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  const dataBar = {
    labels: data.map((item) => item.opcion),
    datasets: [
      {
        label: "Cantidad",
        data: data.map((item) => item.cantidad),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: data.map((_, index) =>
          colors[index % colors.length].replace("0.6", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={dataBar} />;
};
