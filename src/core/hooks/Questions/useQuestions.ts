import { useCallback, useState } from "react"
import type { IQuestion } from "../../../data/interface/question"
import api from "../../api/api"

export const useQuestions = () => {
    const [questions, setQuestions] = useState<Array<IQuestion>>([])
    const [loadingQuestions, setLoadingQuestions] = useState(false)
    const [errorQuestions, setErrorQuestions] = useState<string | null>(null)

    const ReadQuestions = useCallback(
        async () => {
            setLoadingQuestions(true)
            try {
                const { data } = await api.get<Array<IQuestion>>('/questions')
                setQuestions(data)
            } catch (error: any) {
                setErrorQuestions(error)
            } finally {
                setLoadingQuestions(false)
            }
        }, [])

    return { questions, loadingQuestions, errorQuestions, ReadQuestions }
}