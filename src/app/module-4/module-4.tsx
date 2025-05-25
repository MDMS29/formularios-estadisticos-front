
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement, } from 'chart.js';
import type { IOption } from '../../shared/components/select/select';
import Select from '../../shared/components/select/select';
import { useQuestions } from '../../core/hooks/Questions/useQuestions';
import { useEffect, useMemo, useState } from 'react';
import { useAnswers } from '../../core/hooks/Answers/useAnswers';
import type { IAnswer } from '../../data/interface/answer';
import { OptionFilter } from '../../data/constants/answers-filter';
import { Loader } from 'lucide-react';
import TotalAnswers from './components/TotalAnswers';
import DiagramsModuleFour from './components/DiagramsModuleFour';
import StaticsTable from './components/StaticsTable';
import { CalculateIC } from '../../data/tools/tools';
import SectionPieDiagram from './components/SectionPieDiagram';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

const Module4 = () => {
    const { ReadQuestions, questions, errorQuestions, loadingQuestions } = useQuestions()
    const { ReadAnswersFilter, answersFilter, varianzaDesviacionModa } = useAnswers()
    const [optionFilter, setOptionFilter] = useState<IAnswer>()
    const [notSelectedQuestion, setNotSelectedQuestion] = useState(true)

    const ResultIC = useMemo(() => CalculateIC(optionFilter ?? OptionFilter), [optionFilter])

    const handleSelectChange = (id: string) => {
        setNotSelectedQuestion(!id ? true : false)
        ReadAnswersFilter(id)
    };

    const handleSelectChangeOption = (id: string) => {
        const option = answersFilter.filter((option) => option.opcion_id.toString() === id)
        setOptionFilter(option[0])
    };

    const dataPieDiagram = {
        labels: answersFilter.map((ans) => ans.opcion),
        datasets: [
            {
                label: 'Porcentaje',
                data: answersFilter.map((ans) => ans.porcentaje),
                backgroundColor: [
                    '#431F39',
                    '#33115B',
                    '#413B25',
                    '#212D57',
                ],
                borderColor: [
                    '#8B405F',
                    '#a28cf8',
                    '#dac695',
                    '#238fee',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPieDiagram = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    const OptionsDiagrams = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Porcentaje de respuestas',
                color: '#FFFFFF',
                font: {
                    size: 18,
                    weight: 'bold' as const,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFFFFF',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#FFFFFF',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const DataDiagrams = [
        {
            type: 'bar',
            labels: answersFilter.map((ans) => ans.opcion),
            datasets: [
                {
                    label: 'Respuestas',
                    data: answersFilter.map((ans) => ans.porcentaje),
                    backgroundColor: '#8D304B',
                    borderColor: '#8B405F',
                    borderWidth: 1
                }
            ]
        },
        {
            type: 'line',
            labels: answersFilter.map((ans) => ans.opcion),
            datasets: [
                {
                    label: 'Respuestas',
                    data: answersFilter.map((ans) => ans.porcentaje),
                    fill: false,
                    borderColor: '#4bc0c0',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.3,
                }
            ]
        }
    ]

    const ListQuestions = useMemo<Array<IOption>>(
        () => {
            return questions.map((question) => ({
                id: question.id.toString(),
                name: question.text
            })).slice(-3);
        },
        [questions]
    )

    const ListAnswersFilter = useMemo<Array<IOption>>(
        () => {
            return answersFilter.map((ans) => ({
                id: ans.opcion_id.toString(),
                name: ans.opcion
            }));
        },
        [answersFilter]
    )

    useEffect(() => {
        ReadQuestions()
    }, [])

    if (loadingQuestions) return <Loader />
    if (errorQuestions) return <p>{errorQuestions}</p>

    return (
        <div className="w-full">
            <div className=' bg-[#13132F] flex justify-between items-center h-[5%] rounded-2xl m-10 p-10 max-sm:flex-wrap-reverse max-sm:p-4 max-sm:m-0'>
                <p className="text-3xl font-bold text-center text-white max-sm:mt-3">{answersFilter.length > 0 ? answersFilter[0].pregunta : 'Seleccione una pregunta'}</p>
                <div className='flex gap-5 flex-wrap'>
                    <Select options={ListQuestions} onChange={handleSelectChange} />
                    <Select options={ListAnswersFilter} onChange={handleSelectChangeOption} disabled={notSelectedQuestion} className='max-sm:w-full' />
                </div>
            </div>
            {answersFilter.length > 0 && (
                <div className='bg-[#13132F] rounded-2xl m-10 p-10 overflow-auto max-sm:p-4 max-sm:m-0 max-sm:mt-3'>
                    <div className='w-full flex gap-7 max-lg:flex-col'>
                        {/* CARDS */}
                        <TotalAnswers data={answersFilter} />

                        {/* DIAGRAMS */}
                        <DiagramsModuleFour data={DataDiagrams} options={OptionsDiagrams} />

                        {/* TABLE */}
                        <div className='flex flex-col gap-7 w-auto'>
                            <StaticsTable optionFilter={optionFilter} ResultIC={ResultIC} />

                            {/* DIAGRAMA DE PIE Y CARS PARA VARIANZA, DESVIACION Y MODA */}
                            <SectionPieDiagram
                                dataPie={dataPieDiagram}
                                optionsPie={optionsPieDiagram}
                                dataVarDesvMode={varianzaDesviacionModa} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Module4