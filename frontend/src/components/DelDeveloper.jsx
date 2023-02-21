import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const DelDeveloper = () => {
    const nav=useNavigate()
    const location = useLocation().pathname.split('/')[2]


    useEffect(()=>{
        axios.delete(`http://localhost:5000/api/developer/delete/${location}`,{id:location})
        .then((res)=>{
            console.log(res)
            if(res.status===200){
                nav('/admin-developer')
            }
        })
        .catch((e)=>{
            console.log(e)
        })
    },[])
  return (
    <div>
      
    </div>
  )
}

export default DelDeveloper
