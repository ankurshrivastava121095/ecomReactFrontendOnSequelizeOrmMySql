/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Spinner from '../../../Frontend/Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, getProducts, getProduct, resetProductState, updateProduct } from '../../../Features/Product/ProductSlice';
import { getCategories } from '../../../Features/Category/CategorySlice';
import { Link } from 'react-router-dom';

const ProductList = () => {

    const dispatch = useDispatch()
    
    const [data, setData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [productName, setProductName] = useState();
    const [productDescription, setProductDescription] = useState();
    const [productCategory, setProductCategory] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [productImage, setProductImage] = useState(null);
    const [productOldImage, setProductOldImage] = useState('');
    const [editID, setEditID] = useState('');
    const [showFormModal, setshowFormModal] = useState(false);
    const [showMessageModal, setshowMessageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const { products, responseStatus, responseMessage } = useSelector((state) => state.products)
    const { categories, responseStatus: categoryStatus, responseMessage: categoryMessage } = useSelector((state) => state.categories)

    const allProducts = () => {
        dispatch(getProducts());
    }

    const allCategories = () => {
        dispatch(getCategories());
    }

    const handleFormModal = (key,id=0) => {
        if(key == 'Add'){
            setshowFormModal(true)
        }
        if(key == 'Edit'){
            setEditID(id)
            dispatch(getProduct(id));
            setshowFormModal(true)
        }
    }

    const closeModal = () => {
        setIsLoading(true)
        setProductName('')
        setProductDescription('')
        setProductCategory('')
        setProductPrice('')
        setProductQuantity('')
        setProductImage(null)
        dispatch(resetProductState());
        setshowMessageModal(false);
        allProducts()
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('productName', productName)
        formdata.append('productDescription', productDescription)
        formdata.append('productCategory', productCategory)
        formdata.append('productPrice', productPrice)
        formdata.append('productQuantity', productQuantity)
        formdata.append('productImage', productImage)
        if (editID == '') {
            dispatch(createProduct(formdata));
        } else {
            formdata.append('id', editID)
            dispatch(updateProduct(formdata))
        }
        // allProducts()
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (confirmDelete) {
            dispatch(deleteProduct(id));
        }
    }

    useEffect(()=>{
        allProducts()
        allCategories()
    },[])

    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == 'Product created successfully') {
            setIsLoading(false)
            setshowFormModal(false)
            setshowMessageModal(true)
        }
        if (responseStatus == 'success' && responseMessage == 'Product updated successfully') {
            setIsLoading(false)
            setshowFormModal(false)
            setshowMessageModal(true)
        }
        if (responseStatus == 'success' && responseMessage == 'Product deleted successfully') {
            setIsLoading(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            if (Array.isArray(products?.data)) {
                setData(products?.data)
            } else {
                console.log('Single Product---->>',products?.data);
                setProductName(products?.data?.productName)
                setProductDescription(products?.data?.productDescription)
                setProductCategory(products?.data?.productCategory)
                setProductPrice(products?.data?.productPrice)
                setProductQuantity(products?.data?.productQuantity)
                setProductOldImage(products?.data?.productImage?.url)
            }
        }
    },[responseStatus,responseMessage])

    useEffect(()=> {
        if ((categoryStatus == 'success' && categoryMessage == '')) {
            setCategoryData(categories?.data)
        }
    },[categories])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex flex-wrap align-items-center justify-content-between mb-4'>
                            <div className='fs-3 fw-bold'>Product List</div>
                            <button type='button' className='btn btn-warning' onClick={()=>handleFormModal('Add')}>Add New</button>
                        </div>
                        <div className='table-responsive'>
                            {
                                isLoading ?
                                <Spinner />
                                :
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Image</th>
                                            <th>Product Name</th>
                                            <th>Product Category</th>
                                            <th>Product Price</th>
                                            <th>Product Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array?.isArray(data) && data?.map((val,key)=>(
                                                <tr key={key}>
                                                    <td>{key+1}.</td>
                                                    <td>
                                                        <img src={val?.productImage?.url} className='h-60px' alt="" />
                                                    </td>
                                                    <td>{val?.productName}</td>
                                                    <td>{val?.category?.categoryName}</td>
                                                    <td>{val?.productPrice}/-</td>
                                                    <td>{val?.productQuantity}</td>
                                                    <td className='d-flex gap-2 flex-wrap'>
                                                        <button type='button' className='btn btn-warning' onClick={()=>handleFormModal('Edit',val?.id)}>Edit</button>
                                                        {/* <Link className='btn btn-warning' to={`/admin/editProduct/${val?.id}`}>Edit</Link> */}
                                                        <button type='button' className='btn btn-warning' onClick={()=>handleDelete(val?.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* form modal starts */}
            <div
                className={`modal fade${showFormModal ? ' show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showFormModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="successModalLabel">
                                Product Form
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={()=>setshowFormModal(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className='mb-3'>
                                <label htmlFor="productName">Product Name*</label>
                                <input 
                                    type="text" 
                                    className='form-control form-control-sm' 
                                    id='productName'
                                    name='productName'
                                    value={productName}
                                    placeholder='Enter Product Name'
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="productDescription">Product Description*</label>
                                <textarea
                                    rows={5}
                                    className='form-control form-control-sm' 
                                    id='productDescription'
                                    name='productDescription'
                                    value={productDescription}
                                    placeholder='Enter Product Description'
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="productCategory">Product Category*</label>
                                <select 
                                    className='form-select form-select-sm' 
                                    id='productCategory'
                                    name='productCategory'
                                    value={productCategory}
                                    placeholder='Enter Product Category'
                                    onChange={(e) => setProductCategory(e.target.value)}
                                    required
                                >
                                    <option value="">---- Select Category ----</option>
                                    {
                                        Array?.isArray(categoryData) && categoryData?.map((val,key)=>(
                                            <React.Fragment key={key}>
                                                <option value={val?.id}>{val?.categoryName}</option>
                                            </React.Fragment>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="productQuantity">Product Quantity*</label>
                                <input 
                                    type="number" 
                                    className='form-control form-control-sm' 
                                    id='productQuantity'
                                    name='productQuantity'
                                    value={productQuantity}
                                    placeholder='Enter Product Quantity'
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="productPrice">Product Price*</label>
                                <input 
                                    type="number" 
                                    className='form-control form-control-sm' 
                                    id='productPrice'
                                    name='productPrice'
                                    value={productPrice}
                                    placeholder='Enter Product Price'
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="productImage">Product Image*</label>
                                <input 
                                    type="file" 
                                    className='form-control form-control-sm' 
                                    id='productImage'
                                    name='productImage'
                                    onChange={(e) => setProductImage(e.target.files[0])}
                                />
                                <img src={productOldImage} className='h-200px' alt="" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                !isLoading ?
                                    <button type='submit' className='btn btn-orange w-100 mb-2' onClick={handleSubmit}>Save</button>
                                :
                                    <Spinner />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* form modal ends */}

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

export default ProductList