import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navabar'
import { AiOutlineDownload,AiOutlineFilePdf } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import CompletedTask from './CompletedTask'
const Main = styled.div`
letter-spacing: 1px;
.preview-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.big-img{
    margin: 1rem;
    width: 97.6vw;
    height: 50vh;
    object-fit: cover;
    background-repeat: no-repeat;
    @media only screen and (max-width:840px){
        margin: 10px;
    }
    @media only screen and (max-width:590px){
        width: 94vw;
        margin-left:13px;
        margin-right: 12px;
    }
    @media only screen and (max-width:390px){
        width: 90vw;
        margin-left:13px;
        margin-right: 12px;
    }
}
.small-img{
    cursor: pointer;
    margin-right: 20px;
    width: 4rem;
    height: 4rem;
}
.a{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: black;
    margin-right: 10px;
    margin-top: 10px;
}
.icon{
    font-weight: bolder;
    font-size: 1.2rem;
}

.task-title{
    margin: 1rem;
    font-size: 1rem;
    display: flex;
    span{
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        @media only screen and (max-width:590px){
            font-size:.8rem;
            font-weight: bolder;
        }
    }
}

.task-description{
    margin: 1rem;
    display: flex;
    span{
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        @media only screen and (max-width:590px){
            font-size:.8rem;
            font-weight: bolder;
        }
    }
    h5{
        font-size: 1.3rem;
        @media only screen and (max-width:590px){
            font-size:.8rem;
            font-weight: bolder;
        }
    }
}

.task-completed{
    margin: 2rem;
    button{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border:none;
        background-color:#008080;
        outline: none;
        color: white;
        width: 10rem;
        height: 2.5rem;
    }
    .tick{
        margin-left:10px;
        font-size: 1.2rem;
    }
}
.pdf-c{
    margin: 1rem;
    a{
        text-decoration: none;
    }
    button{
        cursor: pointer;
        padding: 5px;
        display: flex;
        align-items: center;
        background-color: #ff5349;
        color: white;
        outline:none;
        border: none;
    }
    .icon{
        margin-left:10px;  
    }
}
`
const DeveloperTaskDetails = () => {
    const nav = useNavigate()
    const [openModel,setopenModel]=useState(false)
    const [data,setData]=useState([])
    const [completedTask, setcompleted]=useState(false)

    const [developer_ids,setdeveloper_id]=useState([])

    const [c_name,setc_name]=useState('')
    const [c_email,setc_email]=useState('')


    const location = useLocation().pathname.split('/')[4]
    let [image,setimage]=useState(0)
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/single/task/${location}`,{id:location})
        .then((res)=>{
            setc_name(res.data.customer_id.username)
            setc_email(res.data.customer_id.useremail)
            setData([res.data])
            setdeveloper_id(res.data.developer_id)
            setcompleted(res.data.completed)
        })
        
        .catch((e)=>console.log(e))
    },[])
    

    const handleImage=(index)=>{
        setimage(index)
    }


  return (
    <Main>
        <Navbar/>
        {
            completedTask ?<></>:
            <div className="task-completed">
                <button onClick={()=>setopenModel(true)}>Task Completed <TiTick className='tick'/> </button>
            </div>
        }
        {
            data?.map((value)=>{

                return(
                    <div className="container">
                  <img src=
                  {
                    value?.task_img[image]?.filename.endsWith('.pdf') ? 'https://cdn.mos.cms.futurecdn.net/25mEf9H2CYfpdX53bWHjK.jpg' :`http://localhost:5000/taskimage/${value?.task_img[image]?.filename}`
                  }
                  
                  className='big-img' alt="" />
                  <div className="preview-container">
                  {
                    value?.task_img?.map((ImgVal,Index)=>{
                        return(
                            <a>
                                <img onClick={()=>handleImage(Index)} className='small-img' src={
                                    ImgVal.filename.endsWith('.pdf') ? 'https://cdn.mos.cms.futurecdn.net/25mEf9H2CYfpdX53bWHjK.jpg' : `http://localhost:5000/taskimage/${ImgVal.filename}`
                                } alt="" />
                                <a className='a' href={`http://localhost:5000/taskimage/${ImgVal?.filename}`} download={true}>
                                    <AiOutlineDownload className='icon'/>
                                </a>
                            </a>
                                    
                        )
                    })
                  }
                  </div>
                  <div className="pdf-c">
                    {
                        value?.task_img.map((val)=>{
                            return(
                                val.filename.endsWith('.pdf')?
                                <a  className='pdf' href={`http://localhost:5000/taskimage/${val?.filename}`} target='_blank' download={true}>
                                    <button>DOWNLOAD PDF <AiOutlineFilePdf className='icon'/></button>
                                </a>
                            :<></>
                                

                            )
                            
                        })
                    }
                  </div>

                        <div className="task-title">
                            <span><h4>TITLE :</h4>{value.title}</span>
                        </div>

                        <div className="task-description">
                            <span><h5>DESCRIPTION :</h5> {value.description}</span>
                        </div>

                    </div>

                )
            })
        }

        {
            openModel ? <CompletedTask c_name={c_name} c_email={c_email} location={location} setopenModel={setopenModel} developer_ids={developer_ids}/> : <></>
        }
    </Main>
  )
}

export default DeveloperTaskDetails
