import axios from "axios";
import type { FilterIdQuestionResponseDto } from "./DTOs/FilterIdQuestionResponseDto";

export const FilterIdQuestion = async (
  path: string
): Promise<FilterIdQuestionResponseDto[]> => {
  try {
    const response = await axios.get(`${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
