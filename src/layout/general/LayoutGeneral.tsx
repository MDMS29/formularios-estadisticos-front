import "./index.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const LayoutGeneral = () => {
    return (
        <main className='contenedor-layout'>
            <Sidebar />
            <Outlet />
        </main>
    )
}

export default LayoutGeneral