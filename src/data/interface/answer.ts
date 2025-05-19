export interface IAnswer {
    pregunta_id: number;
    pregunta: string;
    total_respuestas: number;
    opcion_id: number;
    opcion: string;
    cantidad: number;
    porcentaje: string;
    id?: null;
}