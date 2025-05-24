import type { IAnswer } from '../../../data/interface/answer'

const TotalAnswers = ({ data }: { data: IAnswer[] }) => {

    const COLOR_STYLES: { [i: number]: string } = {
        1: 'border-l-[#238fee] bg-[#212D57]',
        2: 'border-l-[#5E91A4] bg-[#1D354D]',
        3: 'border-l-[#a28cf8] bg-[#33115B]',
        4: 'border-l-[#8B405F] bg-[#431F39]',
        5: 'border-l-[#f1e2bb] bg-[#413B25]',
    }

    return (
        <div className="justify-center px-10 flex flex-col gap-7 bg-[#212741] rounded-lg shadow-xl w-auto max-lg:p-2 max-lg:flex-row flex-wrap">
            <div className="border border-[#238fee] rounded-lg border-l-8 border-l-[#238fee] bg-[#212D57] flex items-center justify-center p-7 gap-5 max-h-[100px]">
                <div className="text-2xl font-bold font-sans text-white max-lg:text-xl">{data[0].total_respuestas}</div>
                <p className="font-semibold text-2xl text-white max-lg:text-xl">Respuestas en Total</p>
            </div>

            {data.map((item, index) => (
                <div key={index} className={`border border-[#238fee] rounded-lg ${COLOR_STYLES[index + 1]} flex items-center p-7 gap-4 max-md:w-full max-lg:max-w-[250px] max-h-[150px]`}>
                    <div className="text-2xl font-bold font-sans text-white max-lg:text-xl">{Number(item.porcentaje).toFixed(1)}%</div>
                    <div>
                        <p className="font-semibold text-2xl mb-2 text-white max-lg:text-xl">{item.opcion ?? 'Seleccione'}</p>
                        <p className="text-gray-400 text-xl max-lg:text-lg">{item.cantidad} respuestas</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TotalAnswers