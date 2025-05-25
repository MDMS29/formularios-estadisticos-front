import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Module4 from "./app/module-4/module-4"
import Loader from "./shared/components/loader/Loader"
import LayoutGeneral from "./shared/layout/general/LayoutGeneral"

const Dashboard = lazy(() => import("./app/dashboard/PageDashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LayoutGeneral />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/module-4" element={<Module4 />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
