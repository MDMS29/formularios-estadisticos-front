export interface QuestionResponseDto {
    id: number;
    survey_id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
    answer_options: AnswerOptionsResponseDto[];
}


export interface AnswerOptionsResponseDto {
    id: number;
    question_id: number;
    option_text: string;
    created_at: Date;
    updated_at: Date;
}