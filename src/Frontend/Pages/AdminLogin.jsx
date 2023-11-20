/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../Components/BreadCrumbs'
import { Link, useNavigate } from 'react-router-dom'
import TopSellingProduct from '../Components/TopSellingProduct'
import { useDispatch, useSelector } from 'react-redux'
import { resetAuthState, userLogin } from '../../Features/Auth/AuthSlice'
import Spinner from '../Components/Spinner'
import AuthGuard from '../Components/AuthGuard'

const AdminLogin = ({ pageName }) => {

    const fields = {
        email: '',
        password: ''
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState(fields)
    const [responseMsg, setResponseMsg] = useState('')
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
        dispatch(userLogin(data))
    }

    const closeModal = () => {
        setShowSuccessModal(false);
        dispatch(resetAuthState());
        setData({
            email: '',
            password: '',
        })
    };

    useEffect(()=>{
        if (success) {
            setIsLoading(false)
            setData({
                email: '',
                password: '',
            })
            navigate('/admin/dashboard')
        }
        if (error == 'Email not Found!') {
            setIsLoading(false)
            setData({
                email: '',
                password: '',
            })
            setShowSuccessModal(true);
            setResponseMsg(error)
        }
    },[success,message,error])

    return (
        <>
            <AuthGuard />
            <BreadCrumbs pageName={pageName} /> 

            {/* login form section starts */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className='text-center fs-5 fw-bold my-2'>Sign In to Get Started</div>
                        <form onSubmit={handleSubmit}>
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
                            {
                                !isLoading ?
                                    <button type='submit' className='btn btn-orange w-100 mb-2'>Signin</button>
                                :
                                    <Spinner />
                            }
                        </form>
                        <center>
                            <small>Don&apos;t have account? <Link to='/register'>Click here</Link> to Signup</small>
                        </center>
                    </div>
                    <div className="col-md-3"></div>
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
                            <p>{responseMsg}</p>
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

export default AdminLogin