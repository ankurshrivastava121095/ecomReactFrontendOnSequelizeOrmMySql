/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, resetOrderState, updateOrder } from '../../../Features/Order/OrderSlice'
import Spinner from '../../../Frontend/Components/Spinner'

const OrderList = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { orders, responseStatus, responseMessage } = useSelector((state) => state.orders);

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const fetchAllOrders = () => {
    dispatch(getOrders());
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const statusData = {
      status: e.target.value,
      id: id,
    };
    dispatch(updateOrder(statusData));
  };

  const closeModal = () => {
    setIsLoading(false);
    setShowMessageModal(false);
    setModalMessage('');
    dispatch(resetOrderState());
    fetchAllOrders();
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    if (responseStatus === 'success' && responseMessage === '') {
      setIsLoading(false);
      setData(orders?.data);
    }
    if (responseStatus === 'success' && responseMessage === 'Order updated successfully') {
      setIsLoading(false);
      setShowMessageModal(true);
      setModalMessage(responseMessage);
    }
  }, [orders, responseStatus, responseMessage]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-4'>
                    <div className='fs-3 fw-bold'>Orders List</div>
                </div>
                <div className='table-responsive'>
                    {
                        isLoading ?
                        <Spinner />
                        :
                        <table className='table table-bordered'>
                            <thead>
                              <tr>
                                  <th className='text-nowrap'>#</th>
                                  <th className='text-nowrap'>Product Image</th>
                                  <th className='text-nowrap'>Order ID</th>
                                  <th className='text-nowrap'>Product Name</th>
                                  <th className='text-nowrap'>Product Price</th>
                                  <th className='text-nowrap'>Product Quantity</th>
                                  <th className='text-nowrap'>Shipping Info</th>
                                  <th className='text-nowrap'>Payment Mode</th>
                                  <th className='text-nowrap'>Status</th>
                                  <th className='text-nowrap'>Change Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                                    Array?.isArray(data) && data?.map((val,key)=>(
                                        <tr key={key}>
                                            <td>{key+1}.</td>
                                            <td>
                                                <img src={val?.productDetail?.productImage} className='h-60px' alt="" />
                                            </td>
                                            <td className='text-nowrap'>{val?.orderId}</td>
                                            <td className='text-nowrap'>{val?.productDetail?.productName}</td>
                                            <td className='text-nowrap'>{val?.productDetail?.productPrice}/-</td>
                                            <td className='text-nowrap'>{val?.productDetail?.productQuantity}</td>
                                            <td className='text-nowrap'>
                                              <i
                                                className='fa-solid fa-circle-info text-primary fs-5'
                                                onMouseEnter={() => handleMouseEnter(key)}
                                                onMouseLeave={handleMouseLeave}
                                              ></i>
                                              {hoveredRow === key && (
                                                <div className='border border-dark rounded p-2 custom-tooltip'>
                                                  <span><span className='fw-bold'>Name: </span>{val?.shippingInfo?.name}</span><br />
                                                  <span><span className='fw-bold'>Phone: </span>{val?.shippingInfo?.phone}</span><br />
                                                  <span><span className='fw-bold'>Address: </span>{val?.shippingInfo?.city}, {val?.shippingInfo?.postalCode}, {val?.shippingInfo?.state}, {val?.shippingInfo?.country}</span><br />
                                                  <span>{val?.shippingInfo?.address}</span>
                                                </div>
                                              )}
                                            </td>
                                            <td className='text-nowrap'>{val?.orderData?.paymentMode}</td>
                                            <td className='text-nowrap'>{val?.status}</td>
                                            <td className='d-flex gap-2 flex-nowrap'>
                                              <div className='text-nowrap'>
                                                <input
                                                role='button' 
                                                  type="radio"
                                                  className='form-check-input'
                                                  name={`status_${val.id}`}
                                                  value="Shipped"
                                                  checked={val?.status == 'Shipped' ? true : false}
                                                  onChange={(e) => handleSubmit(e,val?.id)}
                                                /> Shipped
                                              </div>
                                              <div className='text-nowrap'>
                                                <input
                                                role='button' 
                                                  type="radio"
                                                  className='form-check-input'
                                                  name={`status_${val.id}`}
                                                  value="Out for delivery"
                                                  checked={val?.status == 'Out for delivery' ? true : false}
                                                  onChange={(e) => handleSubmit(e,val?.id)}
                                                /> Out for delivery
                                              </div>
                                              <div className='text-nowrap'>
                                                <input
                                                role='button' 
                                                  type="radio"
                                                  className='form-check-input'
                                                  name={`status_${val.id}`}
                                                  value="Delivered"
                                                  checked={val?.status == 'Delivered' ? true : false}
                                                  onChange={(e) => handleSubmit(e,val?.id)}
                                                /> Delivered
                                              </div>
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
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderList