import "./index.css"
import BurguerMenu from "../burguer-menu/BurguerMenu"
import { useState } from "react"
import { ClipboardList, LayoutDashboard } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <div className={`contenedor-sidebar ${openSidebar ? 'open' : ''}`}>
            <section className="header-sidebar">
                {/* <h3 className="titulo-header-sidebar">Encuestas</h3> */}
                <BurguerMenu isOpen={openSidebar} setOpen={setOpenSidebar} />
            </section>

            <section className="secciones-sidebar">
                <ul>
                    <li><Link to={"/dashboard"}><LayoutDashboard /> {openSidebar && <p> Dashboard</p>}</Link></li>
                    <li><Link to={"/formulario"}><ClipboardList /> {openSidebar && <p> Formularios</p>}</Link></li>
                </ul>
            </section>
        </div>
    )
}

export default Sidebar