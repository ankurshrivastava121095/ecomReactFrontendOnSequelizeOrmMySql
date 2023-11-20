/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import { deleteWishlist, getWishlistsByUserId, resetWishlistState } from '../../Features/Wishlist/WishlistSlice'

const MyWishlist = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [userDetail, setUserDetail] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [showMessageModal, setshowMessageModal] = useState(false);

    const { wishlists, responseStatus, responseMessage } = useSelector((state) => state.wishlists)

    const closeModal = () => {
        dispatch(resetWishlistState());
        setshowMessageModal(false);
        fetchWishlistProducts()
    };

    const fetchWishlistProducts = () => {
        const userDataString = localStorage.getItem('userData')
        if (userDataString) {
            const userObj = JSON.parse(userDataString)
            setUserDetail(userObj)
            dispatch(getWishlistsByUserId(userObj?.id))
        } else {
            navigate('/login')
        }
    }

    const handleRemoveFromWishlist = (id) => {
        if (userDetail != '') {
            const isConfirmed = window.confirm('Are you sure you want to remove this product?');
            if (isConfirmed) {
                dispatch(deleteWishlist(id));
            }
        } else {
            alert('Please Login First')
        }
    }

    useEffect(()=>{
        fetchWishlistProducts()
    },[])

    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == '') {
            setIsLoading(false)
            setData(wishlists?.data)
        }
        if ((responseStatus == 'success' && responseMessage == 'Product deleted successfully')) {
            setshowMessageModal(true)
        }
    },[wishlists, responseStatus,responseMessage])

    return (
        <>
            <div className="container mt-4">
                <div className='fs-5 fw-bold my-2'>Your Wishlist ({data?.length})</div>
                <div className="row">
                    {
                        !isLoading ?
                        Array?.isArray(data) && data?.map((val,key)=>(
                            <React.Fragment key={key}>
                                <div className="col-md-3 mb-3">
                                    <div className='product-box-shadow rounded p-3'>
                                        <div className='product-img-section'>
                                            <img src={val?.productImage} className='w-100' alt="" />
                                        </div>
                                        <div className='text-center fs-4 mt-3'>{val?.productName}</div>
                                        <Link to={`/productDetail/${val?.productId}`} className='btn btn-warning w-100 mt-3'>Buy Now</Link>
                                        <div role='button' className='btn btn-orange w-100 mt-3' onClick={() => handleRemoveFromWishlist(val?.id)}>Remove</div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                        :
                        <Spinner />
                    }
                </div>
            </div>

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

export default MyWishlist