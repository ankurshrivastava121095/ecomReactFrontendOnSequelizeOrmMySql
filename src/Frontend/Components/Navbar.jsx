/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, selectCartItems } from '../../Features/Cart/CartSlice'
import { getProducts } from '../../Features/Product/ProductSlice'
import TopSellingProduct from './TopSellingProduct'

const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const cartItems = useSelector(selectCartItems);

    const handleLogout = () => {
        localStorage.removeItem('userData')
        localStorage.removeItem('userToken')
        dispatch(clearCart());
        setIsUserLoggedIn(false)
        navigate('/')
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
            {/* topbar starts */}
            <div className='d-flex flex-wrap align-items-center justify-content-between bg-warning gap-4 p-3'>
                <div className='fs-1'><i className="fa-solid fa-cart-shopping"></i></div>
                <div className='d-flex flex-wrap gap-4'>
                    <div>
                        <div className='fs-3'>24x7</div>
                        <div><small>Customer Service</small></div>
                    </div>
                    <div>
                        <div className='fs-3'>Free Delivery</div>
                        <div><small>Enjoy Delivery Free Products</small></div>
                    </div>
                </div>
            </div>
            {/* topbar ends */}

            {/* navbar starts */}
            <nav className="navbar navbar-expand-lg bg-nav">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/">QuickBuy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars-staggered text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav nav-search-bar">
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control form-control-sm me-2 min-width-295px"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                            </form>
                        </ul>
                        <ul className="navbar-nav ms-auto fs-5">
                            <li className="nav-item">
                                <Link className="nav-link text-white active" aria-current="page" to="/" title='Home'><i className="fa-solid fa-house-chimney"></i></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/cart" title='Cart'>
                                    <button type="button" className="nav-badge-btn position-relative">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <span className="fs-12px position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartItems?.length}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </button>
                                </Link>
                            </li>
                            {
                                !isUserLoggedIn ?
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/login" title='Login'><i className="fa-solid fa-right-to-bracket"></i></Link>
                                    </li>
                                :
                                    <li className="nav-item">
                                        {
                                           user?.role == 'admin' ?
                                            <Link className="nav-link text-white" to="/admin/dashboard">{user?.name}</Link>
                                            : 
                                            <li className="nav-item dropdown">
                                                <div className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {user?.name}
                                                </div>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" to="/myProfile"><i className="fa-solid fa-user"></i> Profile</Link></li>
                                                    <li><Link className="dropdown-item" to="/orders"><i className="fa-solid fa-bucket"></i> Orders</Link></li>
                                                    <li><Link className="dropdown-item" to="/wishlist"><i className="fa-solid fa-heart"></i> Wishlist</Link></li>
                                                    <li><div role='button' className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</div></li>
                                                </ul>
                                            </li>
                                        }
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {/* navbar ends */}

            <Outlet />

            {/* footer starts */}
            <div className="w-100 bg-warning mt-5 p-3">
                <center>
                    <div>Copyright &copy; Oriol Infotech Pvt. Ltd.</div>
                </center>
            </div>
            {/* footer ends */}
        </>
    )
}

export default Navbar