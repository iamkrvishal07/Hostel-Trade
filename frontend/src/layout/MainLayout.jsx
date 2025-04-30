import { Outlet } from 'react-router-dom'
import Navbar from '../component/NavBar'

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <div className="container my-3">
            <Outlet />
        </div>
    </>
  )
}

export default MainLayout