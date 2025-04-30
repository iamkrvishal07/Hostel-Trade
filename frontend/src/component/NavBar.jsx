import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.avif'

const Navbar = () => {
  const {token, name, logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white" data-bs-theme="dark">
  <div className="container-fluid">
    {/* <a className="navbar-brand" href="#">Hostel-Trade</a> */}
    <a className="navbar-brand" href="#">
      <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
      Hostel-Trade
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className=" float-right" id="navbarNav" >
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link"  to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"  to="/search">Search</Link>
        </li>
        {
          token ? (
          <>
          <li className="nav-item">
            <Link className="nav-link"  to="/add">Add Listings </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  to="/" onClick={handleLogout}>LogOut</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link">Welcome {name}</span>
          </li>
          </>) : (
          <>
          <li className="nav-item">
            <Link className="nav-link"  to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"  to="/signin">Sign In</Link>
          </li>
          </>) 
        }
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar