import { type FC } from "react";
import type { QuestionResponseDto } from "../Api/DTOs/QuestionResponseDto";
import { BarChart } from "./Charts/BarChart";
import { LineChart } from "./Charts/LineChart";
import { PieChart } from "./Charts/PieChart";
import type {
  CardInfo,
  DashboardType,
  DataTable,
} from "../Utils/Types/DasboardType";

const Dashboard: FC<DashboardType> = ({
  data,
  answers,
  cardsInfo,
  dataTable,
  selectedQuestion,
  handleSelectChange,
  selectedQuestionId,
}) => {
  return (
    <div className="w-full h-screen p-4 bg-slate-800 box-border">
      <div className="w-full h-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="w-3/5 text-xl flex gap-2 font-sans">
            <h3 className="text-white">Pregunta:</h3>
            <p className="text-gray-500">{selectedQuestion}</p>
          </div>
          <select
            onChange={handleSelectChange}
            id="questionValue"
            name="questionValue"
            value={selectedQuestionId}
            className="w-2/5 appearance-none rounded-md bg-gray-400 py-1.5 pr-8 pl-3 text-base text-black outline-1 -outline-offset-1 outline-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="" disabled selected hidden>
              Selecciona una pregunta
            </option>
            {answers.map((x: QuestionResponseDto) => {
              return (
                <option key={x.id} value={x.id}>
                  {x.text}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Columna izquierda */}
          <div className="w-3/5 flex flex-col gap-4 overflow-hidden">
            {/* Totales */}
            <div className="flex gap-4 text-white">
              {cardsInfo.map((x: CardInfo, i) => (
                <div key={i} className="flex-1 bg-slate-900 shadow-md p-4">
                  <h4>{x.title}</h4>
                  <p className="text-xs text-gray-400">{x.message}</p>
                  <dd className="text-5xl font-semibold tracking-tight text-right">
                    {x.value}
                  </dd>
                </div>
              ))}
            </div>

            {/* Tabla + PieChart */}
            <div className="flex gap-4 flex-1 overflow-hidden">
              {/* Tabla */}
              <div className="w-1/2 bg-slate-900 shadow-md p-4 flex flex-col gap-2 overflow-auto">
                <table className="w-full bg-slate-900 text-sm text-white border border-slate-700 rounded-md overflow-hidden shadow">
                  <caption className="caption-top text-gray-400 mb-2">
                    Tabla: Resumen estadístico
                  </caption>
                  <thead className="bg-slate-800 text-left">
                    <tr>
                      <th className="px-4 py-2 border-b border-slate-700">
                        Estadística
                      </th>
                      <th className="px-4 py-2 border-b border-slate-700">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTable.map((x: DataTable, i) => (
                      <tr
                        key={i}
                        className={
                          i % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                        }
                      >
                        <td className="px-4 py-2 border-b border-slate-700">
                          {x.name}
                        </td>
                        <td className="px-4 py-2 border-b border-slate-700 font-semibold text-cyan-500">
                          {x.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="text-xs text-gray-300 mt-4 leading-relaxed">
                  "Con un nivel de confianza del{" "}
                  <strong>{dataTable[4].value}</strong>, se estima que la
                  proporción real se encuentra entre
                  <strong>{` ${dataTable[6].value}%`}</strong> y
                  <strong>{` ${dataTable[7].value}%`}</strong>. La proporción
                  estimada es de <strong>{`${dataTable[0].value}`}</strong>, lo
                  cual representa una tendencia observada en los datos
                  analizados."
                </p>
              </div>

              {/* PieChart */}
              <div className="w-1/2 bg-slate-900 shadow-md flex justify-center items-center p-4">
                <PieChart data={data} />
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="w-2/5 flex flex-col gap-4 overflow-auto">
            <div className="flex-1 bg-slate-900 shadow-md p-4 overflow-hidden">
              <LineChart data={data} />
            </div>
            <div className="flex-1 bg-slate-900 shadow-md p-4 overflow-hidden">
              <BarChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
