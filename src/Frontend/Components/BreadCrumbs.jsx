/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs = ({ pageName }) => {
    return (
        <>
            <div className="w-100 bg-warning">
                <div className="container">
                    <div className="row">
                        <div className='p-3 d-flex flex-nowrap gap-2'>
                            <Link to='/' className='text-dark fw-bold'>Home</Link>
                            <div>/</div>
                            <div>{pageName}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BreadCrumbs