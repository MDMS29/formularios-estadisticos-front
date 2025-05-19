/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type { FilterIdQuestionResponseDto } from "../Api/DTOs/FilterIdQuestionResponseDto";
import type { QuestionResponseDto } from "../Api/DTOs/QuestionResponseDto";
import { FilterIdQuestion } from "../Api/FilterIdQuestion";
import { GetQuestions } from "../Api/GetQuestions";
import { carDataInfo } from "../Utils/Data/carDataInfo";
import { dataInitialTable } from "../Utils/Data/dataInitialTable";
import { CalculateStatistics } from "../Utils/Functions/calculateStatistics";
import { DefinePath } from "../Utils/Functions/definePath";
import type { CardInfo, DataTable } from "../Utils/Types/DasboardType";

export const useDashboard = ({ surveyType }: { surveyType: 1 | 2 }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionResponseDto[]>([]);
  const [filteredData, setFilteredData] = useState<
    FilterIdQuestionResponseDto[]
  >([]);
  const [selectedQuestion, setSelectedQuestion] = useState<
    string | undefined
  >();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>();
  const [cardsInfo, setCardsInfo] = useState<CardInfo[]>(carDataInfo);
  const [dataTable, setDataTable] = useState<DataTable[]>(dataInitialTable);

  /**
   * Obtengo las rutas a consultar dependiendo del tipo de encuesta.
   */
  const paths = DefinePath(surveyType);

  /**
   * Maneja el evento de cambio del select para actualizar la pregunta seleccionada y la data.
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    setSelectedQuestionId(selectedId);

    const selectOption = questions.find((x) => x.id === selectedId);
    handleOnClickFilter(selectedId);

    if (selectOption) {
      setSelectedQuestion(selectOption.text);
    }
  };

  /**
   * Maneja el evento de clic en el filtro para cargar la data de la pregunta seleccionada.
   */
  const handleOnClickFilter = async (id: number) => {
    try {
      setLoading(true);
      const surveyData = await FilterIdQuestion(
        `${paths.pathFilterIdQuestion}/${id}`
      );

      if (surveyData?.length) {
        const calculateStatistics = CalculateStatistics(surveyData);
        setDataTable(calculateStatistics);
        setFilteredData(surveyData);

        const updatedCards = cardsInfo.map((card, index) => {
          if (index === 2 && surveyData[0]) {
            return {
              ...card,
              value: surveyData[0].total_respuestas?.toString() ?? "",
              message: "Total de respuestas",
            };
          }

          return {
            ...card,
            message: surveyData[index]?.opcion ?? "",
            value: surveyData[index]?.cantidad?.toString() ?? "",
          };
        });

        setCardsInfo(updatedCards);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carga la data inicial de las preguntas y la primera pregunta seleccionada.
   */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const getQuestions = await GetQuestions();
        setQuestions(getQuestions);
        if (getQuestions[0]?.id) {
          setSelectedQuestionId(getQuestions[0]?.id);
          setSelectedQuestion(getQuestions[0].text);
          await handleOnClickFilter(getQuestions[0]?.id);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    questions,
    filteredData,
    selectedQuestion,
    selectedQuestionId,
    cardsInfo,
    dataTable,
    handleSelectChange,
  };
};
