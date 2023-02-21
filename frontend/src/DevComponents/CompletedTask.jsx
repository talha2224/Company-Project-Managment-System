import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ImCross } from "react-icons/im";

const Main = styled.div`
letter-spacing: 2px;
cursor: pointer;
.container{
        padding: 10px;
        width: 50vw;
        height: 50vh;
        background-color: #ccc;
        position: relative;
        top: 0%;
        left: 50%;
        transform: translate(-50%,-185%);
}

.heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.input{
    width: 12rem;
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
    padding-bottom: 5px;
    padding-right: 10px;
    background-color: transparent;
}
p{
    margin-bottom: 10px;
}
input{
    margin-bottom: 10px;
}
.btn{
    margin-top: 1rem;
    display: block;
    width: 10rem;
    height: 2.5rem;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #e06464;
    color: white;
}
`

const CompletedTask = ({c_name,c_email,location,setopenModel,developer_ids}) => {

    const [msg,setmsg]=useState('')
    const [url,seturl]=useState('')
    const [completed_img,setcompleted_img]=useState([])
    const nav = useNavigate()
    const formData=new FormData()


    const complete=(e)=>{
        e.preventDefault()
        if(!msg){
            alert('message required')
        }
        else{
            formData.append('c_name',c_name)
            formData.append('c_email',c_email)
            formData.append('completed',true)
            formData.append('msg',msg)
            formData.append('url',url)
            Array.from(completed_img).forEach((item)=>{
                formData.append('completed_img',item)
            })

            axios.put(`http://localhost:5000/api/update-task/msg/${location}`,formData)
            .then((res)=>{
                if(res.status===200){
                    for(let i =0 ;i <developer_ids.length;i++){
                        axios.put(`http://localhost:5000/api/developer/update-developer/${developer_ids[i]}`,{id:developer_ids[i],customer_id:null})
                        .then((res)=>console.log(res))
                    }
                    toast('TASK SUCESSFULLY SUBMITED')
                    setTimeout(() => {
                        nav('/developer/home')
                    }, 3000);
                }
            })
            .catch((e)=>{console.log(e)})

        }
    }
  return (
    <Main>
        <div className="container">
            <div className="heading">
                <h3>DELEIVER</h3>
                <ImCross className='cross' onClick={()=>setopenModel(false)}/>
            </div>
            <form encType="multipart/form-data">
                <p>Message</p>
                <input className='input' type="text" placeholder='Your Message' onChange={(e)=>setmsg(e.target.value)}/>

                <p>Images</p>
                <input type="file" multiple onChange={(e)=>setcompleted_img(e.target.files)}/>

                <p>URL</p>
                <input className='input' type="text" placeholder='Any Link' onChange={(e)=>seturl(e.target.value)} />

                <button onClick={complete} className='btn'>Submit</button>
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

export default CompletedTask
