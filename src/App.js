
// import Navbar from "./compoents/Navbar"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./compoents/Home"
import Login from "./compoents/auth/Login"
import Signup from "./compoents/auth/Signup"
import Jobs from "./compoents/Jobs"
import Browse from "./compoents/Browse"
import Profile from "./compoents/Profile"
import JobDescription from "./compoents/JobDescription"
import Companies from "./compoents/admin/Companies"
import ProtectedRoute from "./compoents/admin/ProtectedRoute"
import CompanyCreate from "./compoents/admin/CompanyCreate"
import CompanySetup from "./compoents/admin/ComapnySetup"
import AdminJobs from "./compoents/admin/AdminJobs"
import PostJob from "./compoents/admin/PostJob"
import Applicants from "./compoents/admin/Applicants"

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path :'/browse',
    element: <Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:"/admin/companies",
    element: <Companies/>
  },
  {
    path:"/admin/companies/create",
    element: <CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element: <CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element: <AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element: <PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element: <Applicants/>
  },



])

function App(){
  return(
   <div>
    <RouterProvider router={appRouter}/>
   </div>
  )
}
export default App