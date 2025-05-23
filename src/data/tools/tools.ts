import type { IAnswer } from "../interface/answer";

export type IntervaloConfianza = {
  proporcion: number;
  limiteInferior: number;
  limiteSuperior: number;
};

export function CalculateIC(respuesta: IAnswer, z = 1.96): IntervaloConfianza {
  const { cantidad: x, total_respuestas: n } = respuesta;

  if (n === 0) throw new Error("El total de respuestas no puede ser cero.");

  const proportion = x / n;
  const margenError = z * Math.sqrt((proportion * (1 - proportion)) / n);

  return {
    proporcion: proportion,
    limiteInferior: Math.max(0, proportion - margenError),
    limiteSuperior: Math.min(1, proportion + margenError),
  };
}

export const calcularDesviacionEstandar = (valores: Array<number>): number => {
  const n = valores.length;
  if (n === 0) return 0;

  const media = valores.reduce((a, b) => a + b, 0) / n;

  const sumaCuadrados = valores.reduce((acum, val) => {
    return acum + Math.pow(val - media, 2);
  }, 0);

  const desviacion = Math.sqrt(sumaCuadrados / n);
  return desviacion;
};