/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Spinner from '../../../Frontend/Components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getCategories, getCategory, resetCategoryState, updateCategory } from '../../../Features/Category/CategorySlice';

const CategoryList = () => {

    const dispatch = useDispatch()
    
    const [data, setData] = useState([])
    const [categoryName, setCategoryName] = useState();
    const [categoryDescription, setCategoryDescription] = useState();
    const [categoryImage, setCategoryImage] = useState();
    const [categoryOldImage, setCategoryOldImage] = useState();
    const [editID, setEditID] = useState('');
    const [showFormModal, setshowFormModal] = useState(false);
    const [showMessageModal, setshowMessageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const { categories, responseStatus, responseMessage } = useSelector((state) => state.categories)

    const allCategories = () => {
        dispatch(getCategories());
    }

    const handleFormModal = (key,id=0) => {
        if(key == 'Add'){
            setshowFormModal(true)
        }
        if(key == 'Edit'){
            setEditID(id)
            dispatch(getCategory(id));
            setshowFormModal(true)
        }
    }

    const closeModal = () => {
        setIsLoading(true)
        setCategoryName('')
        setCategoryDescription('')
        setCategoryImage('')
        dispatch(resetCategoryState());
        setshowMessageModal(false);
        allCategories()
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('categoryName', categoryName)
        formdata.append('categoryDescription', categoryDescription)
        formdata.append('categoryImage', categoryImage)

        if (editID == '') {
            dispatch(createCategory(formdata));
        } else {
            // console.log(editID);
            formdata.append('id', editID)
            dispatch(updateCategory(formdata));
        }
        // allCategories()
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");

        if (confirmDelete) {
            dispatch(deleteCategory(id));
        }
    }

    useEffect(()=>{
        allCategories()
    },[])

    useEffect(()=>{
        if (responseStatus == 'success' && responseMessage == 'Category created successfully') {
            setIsLoading(false)
            setshowFormModal(false)
            setshowMessageModal(true)
        }
        if (responseStatus == 'success' && responseMessage == 'Category updated successfully') {
            setIsLoading(false)
            setshowFormModal(false)
            setshowMessageModal(true)
        }
        if (responseStatus == 'success' && responseMessage == 'Category deleted successfully') {
            setIsLoading(false)
            setshowMessageModal(true)
        }
        if ((responseStatus == 'success' && responseMessage == '')) {
            setIsLoading(false)
            if (Array.isArray(categories?.data)) {
                setData(categories?.data)
            } else {
                setCategoryName(categories?.data?.categoryName)
                setCategoryDescription(categories?.data?.categoryDescription)
                setCategoryOldImage(categories?.data?.categoryImage?.url)
            }
        }
    },[responseStatus,responseMessage])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex flex-wrap align-items-center justify-content-between mb-4'>
                            <div className='fs-3 fw-bold'>Category List</div>
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
                                            <th>Category Image</th>
                                            <th>Category Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array?.isArray(data) && data?.map((val,key)=>(
                                                <tr key={key}>
                                                    <td>{key+1}.</td>
                                                    <td>
                                                        <img src={val?.categoryImage?.url} className='h-60px' alt="" />
                                                    </td>
                                                    <td>{val?.categoryName}</td>
                                                    <td className='d-flex gap-2 flex-wrap'>
                                                        <button type='button' className='btn btn-warning' onClick={()=>handleFormModal('Edit',val?.id)}>Edit</button>
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
                                Category Form
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
                                <label htmlFor="categoryName">Category Name*</label>
                                <input 
                                    type="text" 
                                    className='form-control form-control-sm' 
                                    id='categoryName'
                                    name='categoryName'
                                    value={categoryName}
                                    placeholder='Enter Category Name'
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="categoryDescription">Category Description*</label>
                                <textarea
                                    rows={5}
                                    className='form-control form-control-sm' 
                                    id='categoryDescription'
                                    name='categoryDescription'
                                    value={categoryDescription}
                                    placeholder='Enter Category Description'
                                    onChange={(e) => setCategoryDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="categoryImage">Category Image*</label>
                                <input 
                                    type="file" 
                                    className='form-control form-control-sm' 
                                    id='categoryImage'
                                    name='categoryImage'
                                    onChange={(e) => setCategoryImage(e.target.files[0])}
                                />
                                <img src={categoryOldImage} className='h-200px' alt="" />
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

export default CategoryList