/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Guard = () => {

    const navigate = useNavigate()
    
    useEffect(()=>{
        const isUserExist = localStorage.getItem('userData')

        if (!isUserExist) {
            navigate('/login')
        }
    },[])

    return (
        <></>
    )
}

export default Guard