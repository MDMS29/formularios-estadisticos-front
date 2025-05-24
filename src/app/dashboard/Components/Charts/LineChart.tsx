import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { type FC } from "react";
import { Line } from "react-chartjs-2";
import type { ChartsType } from "../../Utils/Types/DasboardType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Colores base para fondo oscuro
const baseColors = [
  "rgba(98, 114, 164, 0.6)",
  "rgba(233, 107, 129, 0.6)",
  "rgba(52, 172, 224, 0.6)",
  "rgba(155, 89, 182, 0.6)",
  "rgba(241, 196, 15, 0.6)",
  "rgba(26, 188, 156, 0.6)",
];
const borderColors = baseColors.map((c) => c.replace("0.6", "1"));

export const LineChart: FC<ChartsType> = ({ data }) => {
  const options = {
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
          size: 16,
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
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  const dataLine = {
    labels: data.map((x) => x.opcion),
    datasets: [
      {
        label: "Cantidad",
        data: data.map((x) => x.cantidad),
        borderColor: borderColors[0],
        backgroundColor: baseColors[0],
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: borderColors[0],
      },
    ],
  };

  return <Line options={options} data={dataLine} />;
};
