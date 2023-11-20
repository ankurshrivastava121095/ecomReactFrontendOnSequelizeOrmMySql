/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthGuard = () => {

    const navigate = useNavigate()
    
    useEffect(()=>{
        const isUserExist = localStorage.getItem('userData')

        if (isUserExist) {
            const userObj = JSON.parse(isUserExist)
            if (userObj?.role == 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/')
            }
        }
    },[])

    return (
        <></>
    )
}

export default AuthGuard