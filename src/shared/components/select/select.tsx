import ArrowSelect from '../../../../public/icons/icons'

export interface IOption {
    id: string
    name: string
}

export interface ISelect {
    options: Array<IOption>
    onChange?: (selectedId: string) => void;
    disabled?: boolean;
    className?: string;
}

const Select = ({ options, onChange, disabled, className }: ISelect) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.target.value);
    };

    return (
        <div
            className={`${className} relative group rounded-lg w-auto pr-5 bg-[#9BA0B3] overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <ArrowSelect />
            <select
                onChange={handleChange}
                disabled={disabled}
                className={`appearance-none relative bg-transparent ring-0 outline-none  text-neutral-900 placeholder-violet-700 text-md font-bold rounded-lg  block w-full p-2.5 ${disabled ? '' : 'cursor-pointer'}`}
            >
                <option value="">Seleccione una opción</option>
                {options.map((data) => {
                    return (
                        <option id={data.id} value={data.id}>{data.name}</option>
                    )
                })}
            </select>
        </div >
    )
}
export default Select