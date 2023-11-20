/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const[userData, setUserData] = useState() 

    useEffect(()=>{
        const userRecord = localStorage.getItem('userData')
        const userObject = JSON.parse(userRecord)
        setUserData(userObject)
    },[])

    return (
        <>
            <div className="container">
                <h1 className='text-center mt-5'>Welcome {userData?.name}</h1>
            </div>
        </>
    )
}

export default Dashboard