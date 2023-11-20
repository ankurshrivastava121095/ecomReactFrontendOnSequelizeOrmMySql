/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, resetOrderState, updateOrder } from '../../Features/Order/OrderSlice'
import { useNavigate, useParams } from 'react-router-dom'

const OrderDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const param = useParams()
    const orderID = param?.id

    const [data, setData] = useState()

    const { orders, responseStatus, responseMessage } = useSelector((state) => state.orders)
    const [isLoading, setIsLoading] = useState(true)

    const handleCancelOrder = (e) => {
        e.preventDefault()

        const isConfirmed = window.confirm('Are you sure you want to cancel this order?');

        if (isConfirmed) {
            setIsLoading(true);
        
            const statusData = {
                status: 'Cancelled',
                id: orderID,
            };
        
            dispatch(updateOrder(statusData));
        }
    }

    const formattedDate = data?.orderedProduct?.createdAt
    ? new Date(data?.orderedProduct?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

    useEffect(()=>{
        const userDataString = localStorage.getItem('userData')
        if (userDataString) {
            const userObj = JSON.parse(userDataString)
            dispatch(getOrder(orderID))
        } else {
            navigate('/login')
        }
    },[])

    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == '') {
            setIsLoading(false)
            setData(orders?.data)
        }
        if (responseStatus == 'success' && responseMessage == 'Order updated successfully') {
            setIsLoading(false)
            dispatch(resetOrderState());
            dispatch(getOrder(orderID))
        }
    },[orders, responseStatus,responseMessage])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        <div className='fs-3 fw-bold my-2'>Order Detail</div>
                        <div>
                            <span className='fw-bold'>Order ID:</span>
                            <span> {data?.orderedProduct?.orderId}</span>
                        </div>
                        <div className='fs-1 mt-5'>{data?.orderedProduct?.productDetail?.productName}</div>
                        <div className='fs-4'>{data?.orderedProduct?.productDetail?.productPrice}/-</div>
                        <div className='fs-6'>Qnt- {data?.orderedProduct?.productDetail?.productQuantity}</div>
                        <div className='fs-6'>Ordered At- {formattedDate}</div>
                        <div className='fw-bold mt-4'>Shipping Details</div>
                        <div>{data?.order?.shippingInfo?.name}</div>
                        <div>{data?.order?.shippingInfo?.address}</div>
                        <div>{data?.order?.shippingInfo?.city} - {data?.order?.shippingInfo?.postalCode}, {data?.order?.shippingInfo?.state}, {data?.order?.shippingInfo?.country}</div>
                        <div>Phone Number - {data?.order?.shippingInfo?.phone}</div>
                    </div>
                    <div className="col-md-4">
                        <img src={data?.orderedProduct?.productDetail?.productImage} className='w-100' alt="" />
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className='mt-5'>
                    <div className='row'>
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className='fw-bold my-2'>Order Status</div>
                            <div className="row">
                                <div className='d-flex align-items-baseline justify-content-between flex-wrap'>
                                    <div className='d-flex flex-column'>
                                        <button 
                                            type='button' 
                                            className='btn btn-success'
                                        >Order Confirm</button>
                                        <small>Order confirmed at {formattedDate}</small>
                                    </div>

                                    <div className='d-flex flex-column'>
                                        <button 
                                            type='button' 
                                            className={`btn btn-${data?.orderedProduct?.isShipped == 1 ? 'success' : 'outline-success'}`}
                                        >Shipped</button>
                                        {
                                            data?.orderedProduct?.isShipped == 1 ? 
                                            <small>Order shipped at {data?.orderedProduct?.shipmentDate}</small>
                                            : ''
                                        }
                                    </div>

                                    <div className='d-flex flex-column'>
                                        <button 
                                            type='button' 
                                            className={`btn btn-${data?.orderedProduct?.isOutForDelivery == 1 ? 'success' : 'outline-success'}`}
                                        >Out for delivery</button>
                                        {
                                            data?.orderedProduct?.isOutForDelivery == 1 ? 
                                            <small>Order is out for delivery at {data?.orderedProduct?.outForDeliveryDate}</small>
                                            : ''
                                        }
                                    </div>

                                    <div className='d-flex flex-column'>
                                        <button 
                                            type='button' 
                                            className={`btn btn-${data?.orderedProduct?.isDelivered == 1 ? 'success' : 'outline-success'}`}
                                        >Delivered</button>
                                        {
                                            data?.orderedProduct?.isDelivered == 1 ? 
                                            <small>Order has been delivered at {data?.orderedProduct?.deliveryDate}</small>
                                            : ''
                                        }
                                    </div>

                                    <div className='d-flex flex-column'>
                                        <button 
                                            type='button' 
                                            className={`btn btn-${data?.orderedProduct?.isCancelled == 1 ? 'danger' : 'outline-danger'} ${data?.orderedProduct?.isCancelled == 1 || data?.orderedProduct?.isDelivered == 1 ? 'disabled' : ''}`}
                                            onClick={handleCancelOrder}
                                        >Cancel</button>
                                        {
                                            data?.orderedProduct?.isCancelled == 1 ? 
                                            <small>Order has been cancelled at {data?.orderedProduct?.cancellationDate}</small>
                                            : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail