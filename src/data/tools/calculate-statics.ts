import { jStat } from "jstat";
import type { IAnswer } from "../interface/answer";

interface ICalculateStatistics {
    varianza: number;
    desviacion: number;
    proporcion_exito: string;
    proporcion_fracaso: string;
    nivel_confianza: string;
    valor_critico: string;
    limite_inferior: string;
    limite_superior: string;
    moda: {
        pregunta: string;
        cantidad: number;
        opcion: string;
    }
}

export const CalculateStatistics = (data: IAnswer[]): ICalculateStatistics => {
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


    // moda
    const registroModa = data.reduce((max, actual) => actual.cantidad > max.cantidad ? actual : max);
    const moda = {
        pregunta: registroModa.pregunta,
        cantidad: registroModa.cantidad,
        opcion: registroModa.opcion
    }

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

    const dataFinal = {
        varianza: +varianza.toFixed(5),
        desviacion: +desviacion.toFixed(4),
        proporcion_exito: proporcionExito.toFixed(2),
        proporcion_fracaso: proporcionFracaso.toFixed(2),
        nivel_confianza: (nivelConfianza * 100).toFixed(0) + "%",
        valor_critico: valorCritico.toFixed(2),
        limite_inferior: limite.inferior.toFixed(2),
        limite_superior: limite.superior.toFixed(2),
        moda
    }

    return dataFinal;
};