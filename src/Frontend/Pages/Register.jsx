/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../Components/BreadCrumbs'
import { Link, useNavigate } from 'react-router-dom'
import TopSellingProduct from '../Components/TopSellingProduct'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Components/Spinner'
import { registerUser, resetAuthState } from '../../Features/Auth/AuthSlice'
import AuthGuard from '../Components/AuthGuard'

const Register = ({ pageName }) => {

    const fields = {
        name: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
        role: 'customer',
        dob: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState(fields)
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { loading, success, message, error } = useSelector((state) => state.auth)

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(registerUser(data))
    }

    const closeModal = () => {
        setShowSuccessModal(false);
        dispatch(resetAuthState());
        setData({
            name: '',
            userName: '',
            phone: '',
            email: '',
            password: '',
            dob: '',
            city: '',
            state: '',
            country: '',
            postalCode: ''
        })
        navigate('/login')
    };

    useEffect(()=>{
        if (success) {
            setShowSuccessModal(true);
            setIsLoading(false)
        }
    },[success])

    return (
        <>
            <AuthGuard />
            <BreadCrumbs pageName={pageName} />

            {/* login form section starts */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className='text-center fs-5 fw-bold my-2'>Sign Up to Get Started</div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="name">Name*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='name'
                                            name='name'
                                            value={data?.name}
                                            placeholder='Enter Name'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="userName">Username*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='userName'
                                            name='userName'
                                            value={data?.userName}
                                            placeholder='Enter Username'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="phone">Phone*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='phone'
                                            name='phone'
                                            value={data?.phone}
                                            placeholder='Enter Phone'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="email">Email*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='email'
                                            name='email'
                                            value={data?.email}
                                            placeholder='Enter Email'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="password">Password*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='password'
                                            name='password'
                                            value={data?.password}
                                            placeholder='Enter Password'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="dob">Date of Birth*</label>
                                        <input 
                                            type="date" 
                                            className='form-control form-control-sm' 
                                            id='dob'
                                            name='dob'
                                            value={data?.dob}
                                            placeholder='Enter Date of Birth'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="city">City*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='city'
                                            name='city'
                                            value={data?.city}
                                            placeholder='Enter City'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="state">State*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='state'
                                            name='state'
                                            value={data?.state}
                                            placeholder='Enter State'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="country">Country*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='country'
                                            name='country'
                                            value={data?.country}
                                            placeholder='Enter Country'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='mb-3'>
                                        <label htmlFor="postalCode">Postal/Pin Code*</label>
                                        <input 
                                            type="text" 
                                            className='form-control form-control-sm' 
                                            id='postalCode'
                                            name='postalCode'
                                            value={data?.postalCode}
                                            placeholder='Enter Postal/Pin Code'
                                            onChange={handleInput}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                !isLoading ?
                                    <button type='submit' className='btn btn-orange w-100 mb-2'>Signup</button>
                                :
                                    <Spinner />
                            }
                        </form>
                        <center>
                            <small>Already have account? <Link to='/login'>Click here</Link> to Signin</small>
                        </center>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            {/* login form section ends */}

            <TopSellingProduct />

            {/* Success Modal */}
            <div
                className={`modal fade${showSuccessModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showSuccessModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="successModalLabel">
                                Message
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register