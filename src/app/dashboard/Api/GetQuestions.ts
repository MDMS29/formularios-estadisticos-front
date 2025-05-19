import axios from "axios";
import type { QuestionResponseDto } from "./DTOs/QuestionResponseDto";

export const GetQuestions = async (): Promise<QuestionResponseDto[]> => {
  try {
    const response = await axios.get(
      `https://studentprojectapi.onrender.com/questions`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
