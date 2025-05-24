import type { FilterIdQuestionResponseDto } from "../../Api/DTOs/FilterIdQuestionResponseDto";
import type { QuestionResponseDto } from "../../Api/DTOs/QuestionResponseDto";

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
