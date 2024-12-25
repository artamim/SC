import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import './index.css'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { AuthProvider } from "./contexts/AuthContext";
//Pages
import Landing from './pages/Landing.jsx'
import {Login, action as loginAction} from './pages/Login.jsx'
import CustomerManager from './pages/Customer.jsx'
import SupplierManager from './pages/Supplier.jsx'
import ItemManager from './pages/Item.jsx'
import SalesOrderManager from './pages/SalesOrder.jsx'
import SalesDetailManager from './pages/SalesDetail.jsx'
import CollectionManager from './pages/Collection.jsx'
import Signout from './pages/Signout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import PathNotFound from './pages/PathNotFound.jsx'

//Layouts
import SideLayout from './layouts/SideLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="https://sc-wahk.onrender.com/" element={<Landing />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signout"  element={<Signout />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="home" element={<SideLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="customer" element={<CustomerManager />} />
          <Route path="supplier" element={<SupplierManager />} />
          <Route path="item" element={<ItemManager />} />
          <Route path="salesorder" element={<SalesOrderManager />} />
          <Route path="salesorder/detail/:xordernum" element={<SalesDetailManager />} />
          <Route path="collection" element={<CollectionManager />} />
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
    <AuthProvider>
      <Main />
    </AuthProvider>
  </StrictMode>,
)
