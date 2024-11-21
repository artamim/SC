import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import './index.css'

//Pages
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'

//Layouts
import HeaderLayout from './layouts/HeaderLayout.jsx'
import SideLayout from './layouts/SideLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SideLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="about" element={<About />} />
      </Route>
    </>
  )
)

function Main(){
  return(
    <div className="main-body">
      <RouterProvider router={router} />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Main />
  </StrictMode>,
)
