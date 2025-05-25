import type { DataPieDiagram, OptionsDiagrams } from '../../../data/interface/diagrams'
import { Pie } from 'react-chartjs-2'
import type { IVarianzaDesviacionModa } from './VarDesvModeCards'
import VarDesvModeCards from './VarDesvModeCards'

const SectionPieDiagram = ({ dataPie, optionsPie, dataVarDesvMode }: { dataPie: DataPieDiagram, optionsPie: OptionsDiagrams, dataVarDesvMode: IVarianzaDesviacionModa }) => {
    return (
        <div className='flex max-lg:flex-col gap-3 max-h-[400px] min-lg:max-w-[300px] '>
            <div className='px-7 bg-[rgb(33,39,65)] rounded-lg shadow-xl flex justify-center items-center min-lg:max-w-[320px]'>
                <Pie data={dataPie} options={optionsPie} />
            </div>

            <VarDesvModeCards data={dataVarDesvMode} />
        </div>
    )
}

export default SectionPieDiagram