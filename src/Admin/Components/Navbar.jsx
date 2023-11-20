/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Guard from './Guard'

const AdminNavbar = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userData')
        localStorage.removeItem('userToken')
        setIsUserLoggedIn(false)
        navigate('/login')
    }

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem('userData')

        if (isLoggedIn) {
            const userObj = JSON.parse(isLoggedIn)
            setIsUserLoggedIn(true)
            setUser(userObj)
        }
    },[])

    return (
        <>
            <Guard />
            {/* navbar starts */}
            <nav className="navbar navbar-expand-lg bg-nav">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/">QuickBuy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars-staggered text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto fs-5">
                            <li className="nav-item">
                                <Link className="nav-link text-white active" aria-current="page" to="/admin/dashboard" title='Dashboard'>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/admin/product" title='Product'>Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/admin/category" title='Category'>Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/admin/order" title='Orders'>Orders</Link>
                            </li>
                            <li className="nav-item">
                                <div role='button' className="nav-link text-white" title='Logout' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* navbar ends */}

            <Outlet />
        </>
    )
}

export default AdminNavbar