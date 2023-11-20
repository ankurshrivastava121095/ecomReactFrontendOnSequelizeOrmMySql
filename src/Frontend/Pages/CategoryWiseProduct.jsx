/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import { useParams } from 'react-router-dom'
import TopSellingProduct from '../Components/TopSellingProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsCategoryWise } from '../../Features/Product/ProductSlice'
import Spinner from '../Components/Spinner'
import ProductCard from '../Components/ProductCard'

const CategoryWiseProduct = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const [productsData, setProductsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { products, responseStatus, responseMessage } = useSelector((state) => state.products)
    
    const allProductsCategoryWise = () => {
        dispatch(getProductsCategoryWise(id));
    }

    useEffect(()=>{
        allProductsCategoryWise()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            // console.log('All Products category wise--->>',allProducts?.data);
            setProductsData(products?.data?.products)
        }
    },[products, responseStatus, responseMessage])

    return (
        <>
            <Banner />

            {/* featured products section starts */}
            <div className="container mt-5">
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-3'>
                    <h2>{products?.data?.category?.categoryName} Products</h2>
                </div>
                <div className="row">
                    {
                        !isLoading ?
                        Array?.isArray(productsData) && productsData?.map((val,key)=>(
                            key <= 3 ?
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
            {/* featured products section ends */}
        </>
    )
}

export default CategoryWiseProduct