import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DeleteUserTask = () => {
    const nav=useNavigate()
    const location = useLocation().pathname.split('/')[4]
    console.log(location)
    useEffect(()=>{
        axios.delete(`http://localhost:5000/api/task/user/delete/${location}`,{_id:location})
        .then((res)=>{
            if(res){
                nav('/user/all/task')
            }
        })
    })  
  return (
    <div>
      
    </div>
  )
}

export default DeleteUserTask
