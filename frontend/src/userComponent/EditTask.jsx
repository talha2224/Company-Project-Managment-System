import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = styled.div`
letter-spacing: 1px;
cursor: pointer;
width: 50%;
background-color: #ccc;
position: relative;
top: 50%;
left:50%; 
transform: translate(-50%,-90%);

.heading{
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.container{
padding: 1rem;
}
p{
    margin-bottom: 10px;
}
.input{
    outline: none;
    margin-bottom: 10px;
    border: none;
    width: 12rem;
    padding-bottom: 5px;
    border-bottom: 1px solid gray;
    padding-right: 10px;
    background-color: transparent;
}
.button-container{
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button{
        letter-spacing: 2px;
        width: 10rem;
        height: 2.5rem;
        outline: none;
        border: none;
        cursor: pointer;
        background-color: #e06464;
        color: white;
    }
}
`

const EditTask = ({setopenmodel}) => {
    const location = useLocation().pathname.split('/')[4]
    const [taskTitle,setTaskTitle]=useState('')
    const [taskDesc, settaskDesc] = useState('')
    const nav= useNavigate()
    //SINGLE TASK ID
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/single/task/${location}`,{id:location}).then((res)=>{
            setTaskTitle(res.data.title)
            settaskDesc(res.data.description)
        })
    }, [])
    console.log(taskTitle,taskDesc)

    const updateTask=()=>{
        axios.put(`http://localhost:5000/api/update-task/${location}`,{
            taskid:location,
            title:taskTitle,
            description:taskDesc
        })
        .then((res)=>{
            if (res.status===200){
                toast('Task Updated')
                setTimeout(() => {
                    nav('http://localhost:3000/user/all/task');
                }, 2000);
            }
        })
    }
    
    // http://localhost:5000/api/update-task/${loca}
  return (
    <Main>
        <div className="heading">
            <h2>UPDATE TASK</h2>
            <ImCross className='cross' onClick={()=>setopenmodel(false)}/>
        </div>
        <div className="container">
            <form>
                <p>TITLE</p>
                <input className='input' defaultValue={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} type="text" placeholder='Task Title....' />
                <p>Description</p>
                <input className='input' defaultValue={taskDesc} onChange={(e)=>settaskDesc(e.target.value)} type="text" placeholder='Task Title....'/>
                <p>Task Image</p>
                <input type="file"/>
                <div className="button-container">
                    <button onClick={updateTask}>Update</button>
                    <button onClick={()=>setopenmodel(false)}>Cancel</button>
                </div>
            </form>
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </Main>
  )
}

export default EditTask
