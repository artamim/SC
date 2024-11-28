import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import './index.css'
import ProtectedRoutes from './utils/ProtectedRoutes'
//Pages
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import PathNotFound from './pages/PathNotFound.jsx'

//Layouts
//import HeaderLayout from './layouts/HeaderLayout.jsx'
import SideLayout from './layouts/SideLayout.jsx'
const user = true
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoutes  user={user}/>}>
        <Route path="home" element={<SideLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route path="*" element={<PathNotFound />} />
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
