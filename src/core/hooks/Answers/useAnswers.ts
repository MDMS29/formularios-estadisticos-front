import { useCallback, useState } from "react"
import api from "../../api/api"
import type { IAnswer } from "../../../data/interface/answer"
// import { ListAnswersFilter } from "../../../data/constants/answers-filter"
import { CalculateStatistics } from "../../../data/tools/calculate-statics"

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Array<IAnswer>>([])
  const [answersFilter, setAnswersFilter] = useState<Array<IAnswer>>([])
  const [loadingAnswers, setLoadingAnswers] = useState(false)
  const [errorAnswers, setErrorAnswers] = useState<string | null>(null)
  const [varianzaDesviacionModa, setVarianzaDesviacionModa] = useState({
    varianza: 0,
    desviacion: 0,
    moda: {
      pregunta: "",
      cantidad: 0,
      opcion: "",
    },
  })

  const ReadAnswers = useCallback(
    async () => {
      setLoadingAnswers(true)
      try {
        const { data } = await api.get<Array<IAnswer>>('/answers')
        setAnswers(data)
      } catch (error: any) {
        setErrorAnswers(error)
      } finally {
        setLoadingAnswers(false)
      }
    }, [])

  const ReadAnswersFilter = useCallback(
    async (QuestionId: string) => {
      setLoadingAnswers(true)
      try {
        const { data } = await api.get<Array<IAnswer>>(`/answers/${QuestionId}`)
        setAnswersFilter(data)



        const valoresRespuesta = CalculateStatistics(data)
        setVarianzaDesviacionModa((prev) => ({ ...prev, varianza: valoresRespuesta.varianza, desviacion: valoresRespuesta.desviacion, moda: valoresRespuesta.moda }))

      } catch (error: any) {
        setErrorAnswers(error)
      } finally {
        setLoadingAnswers(false)
      }
    }, [])

  return { answers, answersFilter, loadingAnswers, errorAnswers, ReadAnswers, ReadAnswersFilter, varianzaDesviacionModa }
}