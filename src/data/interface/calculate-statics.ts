import type { QuestionResponseDto } from "./question-responde";

export interface FilterIdQuestionResponseDto {
    pregunta_id: number;
    pregunta: string;
    total_respuestas: number;
    opcion_id: number;
    opcion: string;
    cantidad: number;
    porcentaje: string;
    id: null;
}




export interface DashboardType {
    answers: QuestionResponseDto[];
    selectedQuestion?: string;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedQuestionId?: number;
    cardsInfo: CardInfo[];
    data: FilterIdQuestionResponseDto[];
    dataTable: DataTable[];
}

export interface CardInfo {
    title: string;
    message: string;
    value: string;
}

export interface DataTable {
    name: string;
    value: string;
}

export interface ChartsType {
    data: FilterIdQuestionResponseDto[];
}

