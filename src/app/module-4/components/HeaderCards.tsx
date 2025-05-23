import React from 'react'

interface IVarianzaDesviacionModa {
    varianza: number;
    desviacion: number;
    moda: {
        pregunta: string;
        cantidad: number;
        opcion: string;
    };
}

const HeaderCards = ({ data }: { data: IVarianzaDesviacionModa }) => {
    return (
        <div className='flex justify-around gap-4 mb-5'>
            <div className="border border-[#a28cf8] rounded-lg border-l-8 border-l-[#a28cf8] bg-[#33115B] flex flex-col items-center justify-center py-2 px-5 gap-4 h-auto flex-1">
                <p className='text-2xl font-semibold text-white'>Varianza</p>
                <div className="text-2xl font-bold font-sans text-white">{data.varianza}</div>
            </div>
            <div className="border border-[#8B405F] rounded-lg border-l-8 border-l-[#8B405F] bg-[#431F39] flex flex-col items-center justify-center py-4 px-5 gap-4 h-auto flex-1">
                <p className='text-2xl font-semibold text-white'>Desviacion</p>
                <div className="text-2xl font-bold font-sans text-white">{data.desviacion}</div>
            </div>
            <div className="border border-[#5E91A4] rounded-lg border-l-8 border-l-[#5E91A4] bg-[#1D354D] flex flex-col items-center py-4 px-5 gap-4 h-auto flex-2">
                <p className='text-2xl font-semibold text-white'>Moda</p>
                {data.moda.pregunta === '' ?
                    (
                        <p className='text-2xl font-semibold text-white'>No hay moda</p>
                    )
                    :
                    (
                        <>
                            <div className="text-1xl font-bold font-sans text-white">{data.moda.pregunta}</div>
                            <div className="text-1xl font-bold font-sans text-white">{data.moda.opcion} con {data.moda.cantidad} respuestas</div>
                        </>
                    )}

            </div>
        </div>
    )
}

export default HeaderCards