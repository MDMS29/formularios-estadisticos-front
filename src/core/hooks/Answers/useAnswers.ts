import { useCallback, useState } from "react"
import api from "../../api/api"
import type { IAnswer } from "../../../data/interface/answer"
import { ListAnswersFilter } from "../../../data/constants/answers-filter"

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Array<IAnswer>>([])
  const [answersFilter, setAnswersFilter] = useState<Array<IAnswer>>(ListAnswersFilter)
  const [loadingAnswers, setLoadingAnswers] = useState(false)
  const [errorAnswers, setErrorAnswers] = useState<string | null>(null)

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
      } catch (error: any) {
        setErrorAnswers(error)
      } finally {
        setLoadingAnswers(false)
      }
    }, [])

  return { answers, answersFilter, loadingAnswers, errorAnswers, ReadAnswers, ReadAnswersFilter }
}