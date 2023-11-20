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

const Categories = () => {

    const dispatch = useDispatch()

    const [categoriesData, setCategoriesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { categories, responseStatus: categoryStatus, responseMessage: categoryMessage } = useSelector((state) => state.categories)

    const allCategories = () => {
        dispatch(getCategories());
    }

    useEffect(()=>{
        allCategories()
    },[])

    useEffect(()=> {
        if ((categoryStatus == 'success' && categoryMessage == '')) {
            setIsLoading(false)
            setCategoriesData(categories?.data)
        }
    },[categories, categoryStatus, categoryMessage])

    return (
        <>
            <Banner />

            {/* category section starts */}
            <div className="container mt-5">
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-3'>
                    <h2>All Categories</h2>
                </div> 
                <div className="row">
                    {
                        !isLoading ?
                        Array?.isArray(categoriesData) && categoriesData?.map((val,key)=>(
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
                        ))
                        :
                        <Spinner />
                    }
                </div>
            </div>
            {/* category section ends */}

            <TopSellingProduct />
        </>
    )
}

export default Categories