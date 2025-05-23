import type { DataDiagrams, OptionsDiagrams } from '../../../data/interface/diagrams'
import { Bar, Line } from 'react-chartjs-2'

const DiagramsModuleFour = ({ data, options }: { data: DataDiagrams[], options: OptionsDiagrams }) => {
    return (
        <div className='flex flex-col gap-7 w-auto'>

            {
                data.map((item, index) => (
                    <div key={index} className='w-[700px] h-[400px] p-7 bg-[#212741] rounded-lg shadow-xl'>
                        {
                            item.type === "bar" ? (
                                <Bar data={item} options={options} />
                            ) : (
                                <Line data={item} options={options} />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default DiagramsModuleFour