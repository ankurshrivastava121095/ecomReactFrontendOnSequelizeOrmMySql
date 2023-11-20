/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ imageUrl, productName, productID }) => {
    return (
        <>
            <div className="col-md-3 mb-3">
                <div className='product-box-shadow rounded p-3'>
                    <div className='product-img-section'>
                        <img src={imageUrl} className='w-100' alt="" />
                    </div>
                    <div className='text-center fs-4 mt-3'>{productName}</div>
                    <Link to={`/productDetail/${productID}`} className='btn btn-warning w-100 mt-3'>Buy Now</Link>
                </div>
            </div>
        </>
    )
}

export default ProductCard