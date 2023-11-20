/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../Components/BreadCrumbs'
import { useNavigate } from 'react-router-dom'
import TopSellingProduct from '../Components/TopSellingProduct'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Components/Spinner'
import { clearCart, selectCartItems } from '../../Features/Cart/CartSlice'
import { createOrder, resetOrderState } from '../../Features/Order/OrderSlice'

const Checkout = ({ pageName }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const shippingInfoFields = {
        id: '',
        name: '',
        userName: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        address: '',
    }

    const otherFields = {
        subTotal: '',
        discount: '',
        deliveryCharge: '',
        grandTotal: '',
        paymentMode: 'Cash on delivery',
        productData: []
    }

    const [shippingInfoData, setShippingInfoData] = useState(shippingInfoFields)
    const [otherData, setOtherData] = useState(otherFields)
    const [isLoading, setIsLoading] = useState(false)
    const [showMessageModal, setshowMessageModal] = useState(false);

    const { orders, responseStatus, responseMessage } = useSelector((state) => state.orders)
    const cartItems = useSelector(selectCartItems);

    const subtotal = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

    const discount = 50;
    const deliveryCharge = 0;

    const grandTotal = subtotal - discount + deliveryCharge;

    const closeModal = () => {
        dispatch(resetOrderState());
        dispatch(clearCart());
        setshowMessageModal(false);
        navigate('/')
    };

    const handleInput = (e) => {
        setShippingInfoData({
            ...shippingInfoData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            userId: shippingInfoData?.id,
            shippingInfo: shippingInfoData,
            otherData: otherData
        }
        dispatch(createOrder(data))
    }

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem('userData')
        if (isLoggedIn) {
            const userObj = JSON.parse(isLoggedIn)
            setShippingInfoData(userObj)
        } else {
            navigate('/login')
        }
    },[])

    useEffect(()=>{
        if (cartItems?.length == 0) {
            navigate('/')
        } else {
            setOtherData({
                subTotal: subtotal,
                discount: discount,
                deliveryCharge: deliveryCharge,
                grandTotal: grandTotal,
                paymentMode: 'Cash on delivery',
                productData: cartItems
            })
        }
    },[subtotal, discount, deliveryCharge, grandTotal, cartItems])

    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == 'Order Placed successfully') {
            setIsLoading(false)
            setshowMessageModal(true)
        }
    },[responseStatus,responseMessage])

    return (
        <>
            <BreadCrumbs pageName={pageName} /> 

            {/* login form section starts */}
            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-7">
                            <div className='text-center fs-5 fw-bold my-2'>Your Details</div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <label htmlFor="name">Name*</label>
                                            <input 
                                                type="text" 
                                                className='form-control form-control-sm' 
                                                id='name'
                                                name='name'
                                                value={shippingInfoData?.name}
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
                                                value={shippingInfoData?.userName}
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
                                                value={shippingInfoData?.phone}
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
                                                value={shippingInfoData?.email}
                                                placeholder='Enter Email'
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
                                                value={shippingInfoData?.city}
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
                                                value={shippingInfoData?.state}
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
                                                value={shippingInfoData?.country}
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
                                                value={shippingInfoData?.postalCode}
                                                placeholder='Enter Postal/Pin Code'
                                                onChange={handleInput}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className='mb-3'>
                                            <label htmlFor="address">Address*</label>
                                            <textarea
                                                className='form-control form-control-sm' 
                                                rows={5}
                                                id='address'
                                                name='address'
                                                value={shippingInfoData?.address}
                                                placeholder='Enter Address'
                                                onChange={handleInput}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="col-md-5">
                            <div className='text-center fs-5 fw-bold my-2'>Order Summary</div>
                            <div className='rounded border px-3'>
                                {
                                    Array?.isArray(cartItems) && cartItems?.map((val,key)=>(
                                        <React.Fragment key={key}>
                                            <div className='w-100 d-flex flex-nowrap align-items-center border-bottom py-2'>
                                                <div className='w-50'>{val?.productName}</div>
                                                <div className='w-25'>{val?.quantity}</div>
                                                <div className='w-25'>
                                                    <div className='float-end'>{val?.productPrice}/-</div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                                <div className='d-flex flex-nowrap align-items-center justify-content-between border-bottom py-2 fw-bold'>
                                    <div>Sub Total</div>
                                    <div>{subtotal}/-</div>
                                </div>
                                <div className='d-flex flex-nowrap align-items-center justify-content-between border-bottom py-2'>
                                    <div>Discount</div>
                                    <div>-{discount}/-</div>
                                </div>
                                <div className='d-flex flex-nowrap align-items-center justify-content-between border-bottom py-2'>
                                    <div>Delivery Charge</div>
                                    <div>+{deliveryCharge}/-</div>
                                </div>
                                <div className='d-flex flex-nowrap align-items-center justify-content-between border-bottom py-2 fw-bold'>
                                    <div>Grand Total</div>
                                    <div>{grandTotal}/-</div>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='fs-6 mb-2 d-flex align-items-center gap-3'>
                                    <input 
                                        role='button'
                                        className='form-check-input'
                                        type="radio" 
                                        name='paymentMode' 
                                        value='Paypal' 
                                    /> Paypal
                                </div>
                                <div className='fs-6 mb-2 d-flex align-items-center gap-3'>
                                    <input 
                                        role='button'
                                        className='form-check-input'
                                        type="radio" 
                                        name='paymentMode' 
                                        value='Paytm' 
                                    /> Paytm
                                </div>
                                <div className='fs-6 mb-2 d-flex align-items-center gap-3'>
                                    <input 
                                        role='button'
                                        className='form-check-input'
                                        type="radio" 
                                        name='paymentMode' 
                                        value='Cash on delivery'
                                        checked 
                                    /> Cash on delivery
                                </div>
                            </div>
                            {
                                !isLoading ?
                                    <button type='submit' className='btn btn-orange w-100 my-3'>Place Order</button>
                                :
                                    <Spinner />
                            }
                        </div>
                    </div>
                </form>
            </div>
            {/* login form section ends */}

            <TopSellingProduct />

            {/* Success Modal */}
            <div
                className={`modal fade${showMessageModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showMessageModal ? 'block' : 'none' }}
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
                            <p>{responseMessage}</p>
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

export default Checkout