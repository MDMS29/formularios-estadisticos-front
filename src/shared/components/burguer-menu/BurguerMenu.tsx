import "./index.css"

interface IProps {
    isOpen: boolean
    setOpen: (open: boolean) => void
}

const BurguerMenu = ({ isOpen, setOpen }: IProps) => {
    return (
        <div className="burguer-menu" onClick={() => setOpen(!isOpen)}>
            <p className={isOpen ? 'open' : ''}></p>
            <p className={isOpen ? 'open' : ''}></p>
            <p className={isOpen ? 'open' : ''}></p>
        </div>
    )
}

export default BurguerMenu