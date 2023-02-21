import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const DelCustomer = () => {
const Location=useLocation().pathname.split('/')[3]
const nav = useNavigate()
useEffect(()=>{
    axios.delete(`http://localhost:5000/api/user/delete-user/${Location}`)
    .then((res)=>{
        if(res.status===200){
            nav('/admin-customer')
        }
    })
},[])
  return (
    <div>
      
    </div>
  )
}

export default DelCustomer
