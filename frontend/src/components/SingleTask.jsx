import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import NavbarAdmin from './NavbarAdmin'
import { useLocation } from 'react-router-dom'
import { AiOutlineDownload,AiOutlineFilePdf } from "react-icons/ai";

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

const SingleTask = () => {
    const [data,setData]=useState([])
    let [image,setimage]=useState(0)
    const location = useLocation().pathname.split('/')[2]

    useEffect(()=>{
      axios.get(`http://localhost:5000/api/get/single/task/${location}`,{id:location})
      .then((res)=>{
          setData([res.data])
      })
      .catch((e)=>console.log(e))
  },[])

  const handleImage=(index)=>{
      setimage(index)
  }
  console.log(data,'data')
  return (
    <Main>
      <NavbarAdmin/>
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
    </Main>
  )
}

export default SingleTask
