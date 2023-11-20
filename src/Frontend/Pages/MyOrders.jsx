/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getOrdersByUserId } from '../../Features/Order/OrderSlice'
import Spinner from '../Components/Spinner'

const MyOrders = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { orders, responseStatus, responseMessage } = useSelector((state) => state.orders)

    useEffect(()=>{
        const userDataString = localStorage.getItem('userData')
        if (userDataString) {
            const userObj = JSON.parse(userDataString)
            dispatch(getOrdersByUserId(userObj?.id))
        } else {
            navigate('/login')
        }
    },[])

    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == '') {
            setIsLoading(false)
            setData(orders?.data)
        }
    },[orders, responseStatus,responseMessage])

    return (
        <>
            <div className="container mt-4">
                <div className='fs-5 fw-bold my-2'>Your Orders ({data?.length})</div>
                <div className="row">
                    {
                        !isLoading ?
                        Array?.isArray(data) && data?.map((val,key)=>(
                            <React.Fragment key={key}>
                                <div className="col-md-12">
                                    <div className='d-flex align-items-center justify-content-between border-bottom border-dark p-2'>
                                        <div className='d-flex align-items-center gap-4'>
                                            <Link to={`/orderDetail/${val?.id}`} className='fs-5'>{val?.productDetail?.productName}</Link>
                                        </div>
                                        <img src={val?.productDetail?.productImage} className='h-60px' alt="" />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                        :
                        <Spinner />
                    }
                </div>
            </div>
        </>
    )
}

export default MyOrders