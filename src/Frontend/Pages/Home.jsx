/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import { Link } from 'react-router-dom'
import TopSellingProduct from '../Components/TopSellingProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Features/Product/ProductSlice'
import { getCategories } from '../../Features/Category/CategorySlice'
import Spinner from '../Components/Spinner'
import ProductCard from '../Components/ProductCard'

const Home = () => {

    const dispatch = useDispatch()

    const [productsData, setProductsData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { products, responseStatus, responseMessage } = useSelector((state) => state.products)
    const { categories, responseStatus: categoryStatus, responseMessage: categoryMessage } = useSelector((state) => state.categories)

    const allProducts = () => {
        dispatch(getProducts());
    }

    const allCategories = () => {
        dispatch(getCategories());
    }

    useEffect(()=>{
        allProducts()
        allCategories()
    },[])

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            setProductsData(products?.data)
        }
    },[products, responseStatus,responseMessage])

    useEffect(()=> {
        if ((categoryStatus == 'success' && categoryMessage == '')) {
            setCategoriesData(categories?.data)
        }
    },[categories, categoryStatus, categoryMessage])

    return (
        <>
            <Banner />

            {/* category section starts */}
            <div className="container mt-5">
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-3'>
                    <h2>Top Categories</h2>
                    <Link to='/categories' className='fw-bold view-more-btn'>View More</Link>
                </div> 
                <div className="row">
                    {
                        !isLoading ?
                        Array?.isArray(categoriesData) && categoriesData?.map((val,key)=>(
                            key <= 3 ?
                            <React.Fragment key={key}>
                                <div className='col-md-3 mb-4'>
                                    <Link to={`/categoryProducts/${val?.id}`} className='text-decoration-none'>
                                        <div className='p-3 rounded d-flex flex-nowrap align-items-center justify-content-around single-category-section'>
                                            <div><img src={val?.categoryImage?.url} className='w-100 category-view-box' alt="" /></div>
                                            <div>{val?.categoryName}</div>
                                        </div>
                                    </Link>
                                </div>
                            </React.Fragment>
                            : ''
                        ))
                        :
                        <Spinner />
                    }
                </div>
            </div>
            {/* category section ends */}

            {/* featured products section starts */}
            <div className="container mt-5">
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-3'>
                    <h2>Featured Products</h2>
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

            <TopSellingProduct />
        </>
    )
}

export default Home