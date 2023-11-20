/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TopSellingProduct from '../Components/TopSellingProduct'
import { Link, useParams } from 'react-router-dom'
import BreadCrumbs from '../Components/BreadCrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../Features/Product/ProductSlice'
import Spinner from '../Components/Spinner'
import { addToCart } from '../../Features/Cart/CartSlice'
import { createWishlist, deleteWishlist, getWishlistsByUserId, resetWishlistState } from '../../Features/Wishlist/WishlistSlice'

const ProductDetail = ({ pageName }) => {

    const dispatch = useDispatch()
    const param = useParams()
    const productID = param?.id

    const [wishlistData, setWishlistData] = useState([])
    const [userDetail, setUserDetail] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [productName, setProductName] = useState();
    const [toggleDescriptionView, setToggleDescriptionView] = useState(false)
    const [productAlreadySavedInWishlist, setProductAlreadySavedInWishlist] = useState(false)
    const [productQuantity, setProductQuantity] = useState(1)
    const [productDescription, setProductDescription] = useState();
    const [productCategory, setProductCategory] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productImage, setProductImage] = useState(null);
    const [showCartViewSection, setShowCartViewSection] = useState(false);
    const [showWishlistText, setShowWishlistText] = useState(false);
    const [showWishlistViewSection, setShowWishlistViewSection] = useState(false);
    const [showMessageModal, setshowMessageModal] = useState(false);

    const { products, responseStatus, responseMessage } = useSelector((state) => state.products)
    const { wishlists, responseStatus: wishlistStatus, responseMessage: wishlistMessage } = useSelector((state) => state.wishlists)

    const fetchProducts = () => {
        dispatch(getProduct(productID))

        const isUserExist = localStorage.getItem('userData')
        if (isUserExist) {
            const userObj = JSON.parse(isUserExist)
            setUserDetail(userObj)
            setIsLoggedIn(true)
            
            const timer = setTimeout(() => {
                dispatch(getWishlistsByUserId(userObj?.id));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }

    const increment = () => {
        setProductQuantity(productQuantity+1)
    }

    const decrement = () => {
        if (productQuantity != 1) {
            setProductQuantity(productQuantity-1)
        } 
    }

    const closeModal = () => {
        setProductAlreadySavedInWishlist(false)
        dispatch(resetWishlistState());
        setshowMessageModal(false);
        fetchProducts()
    };

    const handleAddToCart = (e) => {
        e.preventDefault()

        const productToAdd = {
            productId: productID,
            productName: productName,
            productPrice: productPrice,
            quantity: productQuantity,
            productImage: productImage,
        };
    
        dispatch(addToCart(productToAdd));
        setShowCartViewSection(true)
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault()

        if (userDetail != '') { 
            const productToAddInWishlist = {
                userId: userDetail?.id,
                productId: productID,
                productDetail: {
                    productName: productName,
                    productPrice: productPrice,
                    productImage: productImage,
                }
            };
        
            dispatch(createWishlist(productToAddInWishlist));
        } else {
            alert('Please Login First')
        }
    }

    const handleRemoveFromWishlist = (e) => {
        e.preventDefault()

        if (userDetail != '') { 
            const productToRemoveFromWishlist = {
                userId: userDetail?.id,
                id: productID,
            };
        
            dispatch(deleteWishlist(productToRemoveFromWishlist));
        } else {
            alert('Please Login First')
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    useEffect(() => {
        setIsLoading(true);
        fetchProducts();
    }, [productID]);

    useEffect(()=>{
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            if (!Array?.isArray(products?.data)) {
                setProductName(products?.data?.productName)
                setProductDescription(products?.data?.productDescription)
                setProductCategory(products?.data?.productCategory)
                setProductPrice(products?.data?.productPrice)
                setProductImage(products?.data?.productImage?.url)
            }
        }
    },[products, responseStatus, responseMessage])

    useEffect(()=>{
        if ((wishlistStatus == 'success' && wishlistMessage == '')) {
            // console.log(wishlists?.data);
            setShowWishlistText(true)
            const wishlistsData = wishlists?.data
            const isDataExist = wishlistsData.some(item => item.userId === userDetail?.id && item.productId === productID)
            if (isDataExist) {
                setProductAlreadySavedInWishlist(true)
            }
        }
        if ((wishlistStatus == 'success' && wishlistMessage == 'Product Added in Wishlist successfully')) {
            setShowWishlistViewSection(true)
            setshowMessageModal(true)
        }
        if ((wishlistStatus == 'success' && wishlistMessage == 'Product deleted successfully')) {
            setShowWishlistViewSection(false)
            setshowMessageModal(true)
        }
    },[wishlists, wishlistStatus, wishlistMessage])

    return (
        <>
            <BreadCrumbs pageName={pageName} />
            <div className="container mt-5">
                <div className="row mt-4">
                    {
                        showCartViewSection ?
                            <div className='col-md-12 mb-3'>
                                <div className='bg-nav rounded d-flex align-items-center justify-content-between p-2 px-3'>
                                    <div>{wishlistMessage}</div>
                                    <div><Link to='/cart' className='text-white'>View Cart</Link></div>
                                </div>
                            </div>
                        :
                        ''
                    }
                    {
                        showWishlistViewSection ?
                            <div className='col-md-12 mb-3'>
                                <div className='bg-nav rounded d-flex align-items-center justify-content-between p-2 px-3'>
                                    <div>&nbsp;</div>
                                    <div><Link to='/wishlist' className='text-white'>View Wishlist</Link></div>
                                </div>
                            </div>
                        :
                        ''
                    }
                    <div className="col-md-6">
                        <div className='product-detail-img-section'>
                            <img src={productImage} className='h-100' alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='fs-4 mb-3 float-end'>
                            {
                                isLoggedIn?
                                    showWishlistText ?
                                        productAlreadySavedInWishlist || showWishlistViewSection ? 
                                            <i role='button' className="fa-solid fa-heart text-danger"></i> 
                                        : 
                                            <i role='button' className="fa-regular fa-heart"></i>
                                    :
                                    <Spinner />
                                :
                                    ''
                            }
                        </div>
                        <div className='fs-1 mb-3'>{productName ? productName : <Spinner />}</div>
                        <div className='fs-4 mb-3'>{productPrice ? productPrice : <Spinner />}/-</div>
                        <div className='mb-5'>
                            <button type='button' className='btn btn-warning' onClick={decrement}><i className="fa-solid fa-minus"></i></button>
                            <input type="text" className='cart-input' value={productQuantity} readOnly />
                            <button type='button' className='btn btn-warning' onClick={increment}><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <div className='mb-3'>
                            <button type='submit' className='btn btn-warning btn-lg w-100'><i className="fa-solid fa-cart-shopping"></i> Buy now</button>
                        </div>
                        <div className='mb-3'>
                            <button type='button' className='btn btn-orange btn-lg w-100' onClick={handleAddToCart}><i className="fa-solid fa-cart-plus"></i> Add to cart</button>
                        </div>
                        <div className="mb-3">
                            {
                                isLoggedIn ?
                                    showWishlistText ?
                                        productAlreadySavedInWishlist || showWishlistViewSection ?
                                            <div role='button' className='text-primary fw-bold text-decoration-underline' onClick={handleRemoveFromWishlist}>Remove from wishlist</div>
                                        :
                                            <div role='button' className={`text-primary fw-bold text-decoration-underline`} onClick={handleAddToWishlist}>Add to wishlist</div>
                                    :
                                        <div role='button' className={`text-primary fw-bold text-decoration-underline`}>Loading...</div>
                                : 
                                    ''
                            }
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className='border-bottom border-dark'>
                        <div role='button' className='fs-5' onClick={() => setToggleDescriptionView(!toggleDescriptionView)}>Description</div>
                        {
                            toggleDescriptionView ?
                                <div className='mt-3'>{productDescription ? productDescription : <Spinner />}</div>
                            :
                                ''
                        }
                    </div>
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
                            <p>{wishlistMessage}</p>
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

            <TopSellingProduct />
        </>
    )
}

export default ProductDetail