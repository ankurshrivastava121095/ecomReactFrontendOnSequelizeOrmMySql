/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Features/Product/ProductSlice'
import Spinner from '../Components/Spinner'
import ProductCard from './ProductCard'

const TopSellingProduct = () => {

    const dispatch = useDispatch()

    const [allProductsData, setAllProductsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { products, responseStatus, responseMessage } = useSelector((state) => state.products)
    
    const allProducts = () => {
        dispatch(getProducts());
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(allProducts());
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            if (Array?.isArray(products?.data)) {
                setAllProductsData(products?.data)
            }
        }
    },[products, responseStatus,responseMessage])

    return (
        <>
            <div className="container mt-5">
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-3'>
                    <h2>Top Selling</h2>
                </div>
                <div className="row">
                    {
                        !isLoading ?
                        Array?.isArray(allProductsData) && allProductsData?.map((val,key)=>(
                            key <= 7 ?
                            <React.Fragment key={key}>
                                <ProductCard 
                                    imageUrl={val?.productImage?.url} 
                                    productName={val?.productName} 
                                    productID={val?.id} 
                                />
                            </React.Fragment>
                            : ''
                        ))
                        :
                        <Spinner />
                    }
                </div>
            </div>
        </>
    )
}

export default TopSellingProduct