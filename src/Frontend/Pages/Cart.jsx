/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../Components/BreadCrumbs'
import { useNavigate } from 'react-router-dom'
import TopSellingProduct from '../Components/TopSellingProduct'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, selectCartItems, updateQuantity } from '../../Features/Cart/CartSlice'

const Cart = ({ pageName }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCartItems);

    const subtotal = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

    const discount = 50;
    const deliveryCharge = 0;

    const grandTotal = subtotal - discount + deliveryCharge;

    const increment = (productId) => {
        const updatedQuantity = cartItems.find(item => item.productId === productId)?.quantity + 1;
        dispatch(updateQuantity({ productId, quantity: updatedQuantity }));
    }

    const decrement = (productId) => {
        const currentQuantity = cartItems.find(item => item.productId === productId)?.quantity;
        if (currentQuantity > 1) {
          const updatedQuantity = currentQuantity - 1;
          dispatch(updateQuantity({ productId, quantity: updatedQuantity }));
        }
    }

    const handelRemoveItem = (id) => {
        dispatch(removeFromCart(id))
    }

    const proceedToCheckout = (e) => {
        e.preventDefault()
        navigate('/checkout')
    }

    return (
        <>
            <BreadCrumbs pageName={pageName} /> 

            {/* cart table starts */}
            <div className="container mt-4">
                <div className='fs-5 fw-bold my-2'>Your Cart ({cartItems?.length})</div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            cartItems?.length != 0 ?
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-hover'>
                                        <thead>
                                            <th><center>REMOVE</center></th>
                                            <th><center>#</center></th>
                                            <th><center>PRODUCT</center></th>
                                            <th><center>PRICE</center></th>
                                            <th><center>QUANTITY</center></th>
                                            <th><center>SUBTOTAL</center></th>
                                        </thead>
                                        <tbody>
                                            {
                                                Array?.isArray(cartItems) && cartItems?.map((val,key)=>(
                                                    <React.Fragment key={key}>
                                                        <tr>
                                                            <td>
                                                                <center>
                                                                    <i className="fa-solid fa-trash-can text-danger" role='button' onClick={()=>handelRemoveItem(val?.productId)}></i>
                                                                </center>
                                                            </td>
                                                            <td>
                                                                <center>
                                                                    <img src={val?.productImage} className='h-60px' alt="" />
                                                                </center>
                                                            </td>
                                                            <td><center>{val?.productName}</center></td>
                                                            <td><center>{val?.productPrice}/-</center></td>
                                                            <td>
                                                                <center>
                                                                    <div>
                                                                        <button type='button' className='btn btn-warning' onClick={()=>decrement(val?.productId)}><i className="fa-solid fa-minus"></i></button>
                                                                        <input type="text" className='cart-input' value={val?.quantity} readOnly />
                                                                        <button type='button' className='btn btn-warning' onClick={()=>increment(val?.productId)}><i className="fa-solid fa-plus"></i></button>
                                                                    </div>
                                                                </center>
                                                            </td>
                                                            <td><center>{val?.quantity * val?.productPrice}/-</center></td>
                                                        </tr>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>    
                            : ''
                        }
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {
                            subtotal <= 0 ?
                            <div className='text-center fs-5'>Your Cart is empty!</div>
                            :
                            <div className='border rounded px-3 mt-4'>
                                <div className='py-2 d-flex flex-nowrap align-items-center justify-content-between border-bottom'>
                                    <div>Sub Total</div>
                                    <div>{subtotal}/-</div>
                                </div>
                                <div className='py-2 d-flex flex-nowrap align-items-center justify-content-between border-bottom'>
                                    <div>Discount</div>
                                    <div>-{discount}/-</div>
                                </div>
                                <div className='py-2 d-flex flex-nowrap align-items-center justify-content-between border-bottom'>
                                    <div>Delivery Charge</div>
                                    <div>+{deliveryCharge}/-</div>
                                </div>
                                <div className='py-2 d-flex flex-nowrap align-items-center justify-content-between border-bottom'>
                                    <div className='fw-bold fs-5'>Grand Total</div>
                                    <div className='fw-bold fs-5'>{grandTotal}/-</div>
                                </div>
                                <div className='py-2'>
                                    <button type='button' className='btn btn-lg btn-warning w-100' onClick={proceedToCheckout}>Proceed to checkout</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            {/* cart table ends */}

            <TopSellingProduct />
        </>
    )
}

export default Cart