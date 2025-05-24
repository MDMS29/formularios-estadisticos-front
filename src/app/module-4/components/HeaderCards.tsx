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
        <div className='flex justify-around gap-4 mb-5 max-sm:flex-col'>
            <div className="border border-[#a28cf8] rounded-lg border-l-8 border-l-[#a28cf8] bg-[#33115B] flex flex-col items-center justify-center py-2 px-5 gap-4 h-auto flex-1">
                <p className='text-2xl font-semibold text-white max-sm:text-xl'>Varianza</p>
                <div className="text-2xl font-bold font-sans text-white max-lg:text-xl">{data.varianza}</div>
            </div>
            <div className="border border-[#8B405F] rounded-lg border-l-8 border-l-[#8B405F] bg-[#431F39] flex flex-col items-center justify-center py-4 px-5 gap-4 h-auto flex-1">
                <p className='text-2xl font-semibold text-white max-lg:text-xl'>Desviacion</p>
                <div className="text-2xl font-bold font-sans text-white max-lg:text-xl">{data.desviacion}</div>
            </div>
            <div className="border border-[#5E91A4] rounded-lg border-l-8 border-l-[#5E91A4] bg-[#1D354D] flex flex-col items-center py-4 px-5 gap-4 h-auto flex-1">
                <p className='text-2xl font-semibold text-white max-lg:text-xl'>Moda</p>
                {data.moda.pregunta === '' ?
                    (
                        <p className='text-2xl font-semibold text-white max-lg:text-xl'>No hay moda</p>
                    )
                    :
                    (
                        <>
                            <div className="text-xl text-center font-bold font-sans text-white max-lg:text-xl">{data.moda.opcion} con {data.moda.cantidad} respuestas</div>
                        </>
                    )}

            </div>
        </div>
    )
}

export default HeaderCards