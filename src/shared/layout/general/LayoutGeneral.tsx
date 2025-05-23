import "./index.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const LayoutGeneral = () => {
    return (
        <main className='contenedor-layout'>
            <Sidebar />
            <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </main>
    )
}

export default LayoutGeneral