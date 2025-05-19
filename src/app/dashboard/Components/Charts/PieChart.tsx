import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { FC } from "react";
import { Pie } from "react-chartjs-2";
import type { ChartsType } from "../../Utils/Types/DasboardType";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateChartColors = (length: number) => {
  const baseColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
  ];

  const backgroundColors = Array.from(
    { length },
    (_, i) => baseColors[i % baseColors.length]
  );

  const borderColors = baseColors.map((bg) => bg.replace("0.6", "1"));

  return { backgroundColors, borderColors };
};

export const PieChart: FC<ChartsType> = ({ data }) => {
  const { backgroundColors, borderColors } = generateChartColors(data?.length);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const pieData = {
    labels: data.map((x) => x.opcion),
    datasets: [
      {
        label: "# de respuestas",
        data: data.map((x) => x.cantidad),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={pieData} options={options} />;
};
