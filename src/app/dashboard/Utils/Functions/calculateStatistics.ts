import { jStat } from "jstat";
import type { FilterIdQuestionResponseDto } from "../../Api/DTOs/FilterIdQuestionResponseDto";
import { dataInitialTable } from "../Data/dataInitialTable";
import type { DataTable } from "../Types/DasboardType";

export const CalculateStatistics = (
  data: FilterIdQuestionResponseDto[]
): DataTable[] => {
  // Obtener la respuesta con la mayor cantidad, o la de índice 1 en caso de empate
  const respuestaPrincipal = data.reduce((acc, curr, index) =>
    curr.cantidad! > acc.cantidad! ||
    (curr.cantidad === acc.cantidad && index === 1)
      ? curr
      : acc
  );

  const { cantidad, total_respuestas } = respuestaPrincipal;

  // Proporciones
  const proporcionExito = cantidad! / total_respuestas!;
  const proporcionFracaso = 1 - proporcionExito;

  // Desviación estándar
  const desviacion = Math.sqrt(
    (proporcionExito * proporcionFracaso) / total_respuestas!
  );

  // varianza
  const varianza = (proporcionExito * proporcionFracaso) / total_respuestas!;
  let limite: { inferior: number; superior: number };

  const nivelConfianza = 0.95;
  const valorCritico = 1.96;

  if (total_respuestas! <= 30) {
    // Intervalo de confianza con T para proporción
    const alpha = 1 - nivelConfianza;
    const n = total_respuestas!;
    const gradosLibertad = n - 1;

    const tCritico = jStat.studentt.inv(1 - alpha / 2, gradosLibertad);
    const margenErrorT = tCritico * (desviacion / Math.sqrt(n));

    limite = {
      inferior: proporcionExito - margenErrorT,
      superior: proporcionExito + margenErrorT,
    };
  } else {
    // Intervalo de confianza con Z (normal)
    const margenErrorZ = valorCritico * desviacion;

    limite = {
      inferior: proporcionExito - margenErrorZ,
      superior: proporcionExito + margenErrorZ,
    };
  }

  // Establece la data de la tabla
  const dataFilled: DataTable[] = dataInitialTable.map((item) => {
    switch (item.name) {
      case "Proporción de éxito (p̂)":
        return { ...item, value: proporcionExito.toFixed(2) };
      case "Proporción de fracaso (q̂)":
        return { ...item, value: proporcionFracaso.toFixed(2) };
      case "Desviación (s)":
        return { ...item, value: desviacion.toFixed(4) };
      case "Varianza (s²)":
        return { ...item, value: varianza.toFixed(5) };
      case "Nivel de confianza":
        return { ...item, value: (nivelConfianza * 100).toFixed(0) + "%" };
      case "Valor crítico (Z)":
        return { ...item, value: valorCritico.toFixed(2) };
      case "Limite inferior":
        return { ...item, value: limite.inferior.toFixed(2) };
      case "Limite superior":
        return { ...item, value: limite.superior.toFixed(2) };
      default:
        return item;
    }
  });

  return dataFilled;
};
