import type { IAnswer } from '../../../data/interface/answer'
import type { IntervaloConfianza } from '../../../data/tools/tools'

const StaticsTable = ({ optionFilter, ResultIC }: { optionFilter: IAnswer | undefined, ResultIC: IntervaloConfianza }) => {
    return (
        <div className='w-[500px] p-7 bg-[#212741] rounded-lg shadow-xl flex flex-col gap-4'>
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
    )
}

export default StaticsTable