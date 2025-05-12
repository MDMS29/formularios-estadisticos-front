import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Loader from "./components/loader/Loader"
import LayoutGeneral from "./layout/general/LayoutGeneral"
// import Formularios from "./app/formularios/Formularios"

const Dashboard = lazy(() => import("./app/dashboard/Dashboard"))
const Formulario = lazy(() => import("./app/formularios/Formulario"))


function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LayoutGeneral />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formulario" element={<Formulario />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
