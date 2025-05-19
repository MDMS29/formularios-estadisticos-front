import type { AnswerOptionsResponseDto } from "./AnswerOptionsResponseDto";

export class QuestionResponseDto {
  public id?: number;
  public survey_id?: number;
  public text?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public answer_options?: AnswerOptionsResponseDto[];
}
