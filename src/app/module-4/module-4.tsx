
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement, } from 'chart.js';
import type { IOption } from '../../shared/components/select/select';
import Select from '../../shared/components/select/select';
import { useQuestions } from '../../core/hooks/Questions/useQuestions';
import { useEffect, useMemo, useState } from 'react';
import { useAnswers } from '../../core/hooks/Answers/useAnswers';
import { CalculateIC } from '../../data/tools/tools';
import type { IAnswer } from '../../data/interface/answer';
import { OptionFilter } from '../../data/constants/answers-filter';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

const Module4 = () => {
    const { ReadQuestions, questions, errorQuestions, loadingQuestions } = useQuestions()
    const { ReadAnswersFilter, answersFilter, errorAnswers, loadingAnswers } = useAnswers()
    const [optionFilter, setOptionFilter] = useState<IAnswer>()

    const ResultIC = CalculateIC(optionFilter ?? OptionFilter);

    const handleSelectChange = (id: string) => {
        ReadAnswersFilter(id)
    };

    const handleSelectChangeOption = (id: string) => {
        const option = answersFilter.filter((option) => option.opcion_id.toString() === id)
        setOptionFilter(option[0])
    };

    const data = {
        labels: [answersFilter[0].opcion, answersFilter[1].opcion, answersFilter[2].opcion, answersFilter[3].opcion],
        datasets: [
            {
                label: 'Porcentaje',
                data: [answersFilter[0].porcentaje, answersFilter[1].porcentaje, answersFilter[2].porcentaje, answersFilter[3].porcentaje],
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

    const options = {
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

    const DataBars = {
        labels: [answersFilter[0].opcion, answersFilter[1].opcion, answersFilter[2].opcion, answersFilter[3].opcion],
        datasets: [
            {
                label: 'Respuestas',
                data: [answersFilter[0].porcentaje, answersFilter[1].porcentaje, answersFilter[2].porcentaje, answersFilter[3].porcentaje],
                backgroundColor: '#8D304B',
                borderColor: '#8B405F',
                borderWidth: 1,
            },
        ],
    };

    const OptionsBars = {
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

    const DataLine = {
        labels: [answersFilter[0].opcion, answersFilter[1].opcion, answersFilter[2].opcion, answersFilter[3].opcion],
        datasets: [
            {
                label: 'Respuestas',
                data: [answersFilter[0].porcentaje, answersFilter[1].porcentaje, answersFilter[2].porcentaje, answersFilter[3].porcentaje],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    };

    const OptionsLine = {
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

    if (loadingQuestions) return <p>Cargando...</p>
    if (errorQuestions) return <p>{errorQuestions}</p>

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[95%] h-[95%] bg-[#13132F] rounded-lg items-center justify-center flex flex-col p-10">
                <div className='flex w-full justify-between'>
                    <p className="text-4xl font-bold text-center text-white">{answersFilter[0].pregunta}</p>
                    <div className='flex gap-5'>
                        <Select options={ListQuestions} onChange={handleSelectChange} />
                        <Select options={ListAnswersFilter} onChange={handleSelectChangeOption} />
                    </div>
                </div>

                <div className='w-full flex gap-7 p-10'>
                    {/* CARDS */}
                    <div className="justify-center p-10 flex flex-col gap-7 bg-[#212741] rounded-lg shadow-xl w-auto">
                        <div className="border border-[#238fee] rounded-lg border-l-8 border-l-[#238fee] bg-[#212D57] flex items-center p-7 gap-5 h-[120px]">
                            <div className="text-5xl font-bold font-sans text-white">{answersFilter[0].total_respuestas}</div>
                            <div>
                                <p className="font-semibold text-3xl mb-2 text-white">Respuestas en Total</p>
                            </div>
                        </div>
                        <div className="border border-[#5E91A4] rounded-lg border-l-8 border-l-[#5E91A4] bg-[#1D354D] flex items-center p-7 gap-4 h-[130px]">
                            <div className="text-4xl font-bold font-sans text-white">{Number(answersFilter[0].porcentaje).toFixed(1)}%</div>
                            <div>
                                <p className="font-semibold text-2xl mb-2 text-white">{answersFilter[0].opcion ?? 'Seleccione'}</p>
                                <p className="text-gray-400 text-xl">{answersFilter[0].cantidad} respuestas</p>
                            </div>
                        </div>
                        <div className="border border-[#a28cf8] rounded-lg border-l-8 border-l-[#a28cf8] bg-[#33115B] flex items-center p-7 gap-4 h-[130px]">
                            <div className="text-4xl font-bold font-sans text-white">{Number(answersFilter[1].porcentaje).toFixed(1)}%</div>
                            <div>
                                <p className="font-semibold text-2xl mb-2 text-white">{answersFilter[1].opcion ?? 'Seleccione'}</p>
                                <p className="text-gray-400 text-xl">{answersFilter[1].cantidad} respuestas</p>
                            </div>
                        </div>
                        <div className="border border-[#8B405F] rounded-lg border-l-8 border-l-[#8B405F] bg-[#431F39] flex items-center p-7 gap-4 h-[130px]">
                            <div className="text-4xl font-bold font-sans text-white">{Number(answersFilter[2].porcentaje).toFixed(1)}%</div>
                            <div>
                                <p className="font-semibold text-2xl mb-2 text-white">{answersFilter[2].opcion ?? 'Seleccione'}</p>
                                <p className="text-gray-400 text-xl">{answersFilter[2].cantidad} respuestas</p>
                            </div>
                        </div>
                        <div className="border border-[#f1e2bb] rounded-lg border-l-8 border-l-[#dac695] bg-[#413B25] flex items-center p-7 gap-4 h-[130px]">
                            <div className="text-4xl font-bold font-sans text-white">{Number(answersFilter[3].porcentaje).toFixed(1)}%</div>
                            <div>
                                <p className="font-semibold text-2xl mb-2 text-white">{answersFilter[3].opcion ?? 'Seleccione'}</p>
                                <p className="text-gray-400 text-xl">{answersFilter[3].cantidad} respuestas</p>
                            </div>
                        </div>
                    </div>

                    {/* DIAGRAMS */}
                    <div className='flex flex-col gap-7 w-auto'>
                        <div className='w-[750px] h-[400px] p-7 bg-[#212741] rounded-lg shadow-xl'>
                            <Bar data={DataBars} options={OptionsBars} />
                        </div>

                        <div className='w-[750px] h-[400px] p-7 bg-[#212741] rounded-lg shadow-xl'>
                            <Line data={DataLine} options={OptionsLine} />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className='flex flex-col gap-7 w-auto'>
                        <div className='w-[650px] p-7 bg-[#212741] rounded-lg shadow-xl flex flex-col gap-4'>
                            <p className='text-xl font-bold text-white'>Intervalo de confianza de la muestra <label className='underline underline-offset-4'>({optionFilter?.opcion ?? '0'})</label></p>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Estadistica
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Valor
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-[#212741] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Muestra (X)
                                            </th>
                                            <td className="px-6 py-2">{optionFilter?.cantidad ?? '0'}</td>
                                        </tr>
                                        <tr className="bg-[#212741] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Poblacion (n)
                                            </th>
                                            <td className="px-6 py-2">{optionFilter?.total_respuestas ?? '0'}</td>
                                        </tr>
                                        <tr className="bg-[#212741] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Proporcion Muestral (p)
                                            </th>
                                            <td className="px-6 py-2">{ResultIC.proporcion}</td>
                                        </tr>
                                        <tr className="bg-[#212741] border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Nivel de confianza (z)
                                            </th>
                                            <td className="px-6 py-2">1,96 (95%)</td>
                                        </tr>
                                        <tr className="bg-[#212741] dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Intervalo de confianza (I.C)
                                            </th>
                                            <td className="px-6 py-2"> ({(ResultIC.limiteInferior).toFixed(2)} ≤ p ≤ {(ResultIC.limiteSuperior).toFixed(2)}) = 95%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className='text-lg font-medium text-white'>Aunque el <strong>{optionFilter?.porcentaje ?? '0'}%</strong> de la muestra eligió la opcion <strong>{optionFilter?.opcion ?? '0'}</strong>, la proporción poblacional real podría estar entre <strong>{(ResultIC.limiteInferior * 100).toFixed(2)}</strong>% y <strong>{(ResultIC.limiteSuperior * 100).toFixed(2)}</strong>%</p>
                        </div>

                        <div className='flex justify-between'>
                            <div className='w-[460px] h-auto px-7 bg-[#212741] rounded-lg shadow-xl'>
                                <Pie data={data} options={options} />
                            </div>
                            <div className='w-auto flex flex-col gap-7'>
                                <div className="border border-[#a28cf8] rounded-lg border-l-8 border-l-[#a28cf8] bg-[#33115B] flex flex-col items-center py-4 px-5 gap-4 h-auto">
                                    <div className="text-3xl font-bold font-sans text-white">95%</div>
                                    <p className='text-2xl font-semibold text-white'>Varianza</p>
                                </div>
                                <div className="border border-[#8B405F] rounded-lg border-l-8 border-l-[#8B405F] bg-[#431F39] flex flex-col items-center py-4 px-5 gap-4 h-auto">
                                    <div className="text-3xl font-bold font-sans text-white">95%</div>
                                    <p className='text-2xl font-semibold text-white'>Desviacion</p>
                                </div>
                                <div className="border border-[#5E91A4] rounded-lg border-l-8 border-l-[#5E91A4] bg-[#1D354D] flex flex-col items-center py-4 px-5 gap-4 h-auto">
                                    <div className="text-3xl font-bold font-sans text-white">95%</div>
                                    <p className='text-2xl font-semibold text-white'>Moda</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Module4