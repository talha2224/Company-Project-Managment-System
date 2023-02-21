import React,{useEffect, useState}from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineDownload } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillStar} from 'react-icons/ai'
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
    margin: 1rem;
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

.url{
    margin: 1rem;
    a{
        text-decoration: none;
        color: black;
        cursor: pointer;
        span{
            font-weight: bolder;
        }
    }
}

.rate-us{
    margin: 1rem;
    h3{
        margin-bottom: 1rem;
    }
}
.satisfied{
    font-weight: bolder;
    margin-bottom: 1rem;
} 
.conatiner{
    cursor: pointer;
    margin-bottom: 1rem;
    margin-right: 10px;
    display: flex;
    p{
        margin-right: 10px;
    }
}
.star{
    color: #FF9529;
    font-size: 1.3rem;
}

.star-containers{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 1rem;
    display: inline-block;
}
.rating-submit{
    width: 10rem;
    height: 2.2rem;
    cursor: pointer;
    background-color: #FF9529;
    color: white;
    border: none;
}
hr{
    margin-bottom: 10px;
}
`

const CompletedTask = () => {
    const nav = useNavigate()
    const [ratingvalue, setratingvalue] = useState(3)
    let [image,setimage]=useState(0)
    const [data, setdata] = useState([])
    const [rate,setRate]=useState([])
    const [ratings, setratings] = useState(0)

    const location = useLocation().pathname.split('/')[5]

    const [title1, settitle1] = useState('')
    const [value1,setvalue1]=useState(0)

    const [title2, settitle2] = useState('')
    const [value2,setvalue2]=useState(0)

    const [title3, settitle3] = useState('')
    const [value3,setvalue3]=useState(0)

    const [title4, settitle4] = useState('')
    const [value4,setvalue4]=useState(0)

    const [title5, settitle5] = useState('')
    const [value5,setvalue5]=useState(0)

    const [title6, settitle6] = useState('')
    const [value6,setvalue6]=useState(0)

    const [title7, settitle7] = useState('')
    const [value7,setvalue7]=useState(0)

    const [title8, settitle8] = useState('')
    const [value8,setvalue8]=useState(0)

    useEffect(()=>{

        axios.get(`http://localhost:5000/api/get/single/task/${location}`,{id:location})
        .then((res)=>{
            setratings(res.data.rating)
            setdata([res.data])
        })

        axios.get('http://localhost:5000/api/rating/get')
        .then((res)=>setRate(res.data))
    },[])

    const handleImage=(index)=>{
        setimage(index)
    }
    const getValue=()=>{
        let rating=[
            {title1:title1, value1:value1},
            {title2:title2 , value2:value2},

            {title3:title3 , value3:value3},
            {title4:title4 , value4:value4},

            {title5:title5 , value5:value5},
            {title6:title6 , value6:value6},

            {title7:title7, value7:value7},
            {title8:title8 , value8:value8},
        ]
        axios.put(`http://localhost:5000/api/update-task/rating/${location}`,{rating:rating})
        .then((res)=>{
            toast("THANKS FOR YOUR FEEDBACK")
            setTimeout(() => {
                nav('/user/all/task')
            }, 2000);
        })
    }
    let arr =[1,2,3,4,5]
  return (
    <Main>
        {
            data?.map((value)=>{

                return(
                    <div className="container">
                        {
                            value?.completed_img.length===0?<></>:
                            <>
                                <img src={`http://localhost:5000/taskimage/${value?.completed_img[image]?.filename}`} className='big-img' alt="" />
                                <div className="preview-container">{value?.completed_img?.map((ImgVal, Index) => {
                                    return (
                                            <a>
                                                <img onClick={() => handleImage(Index)} className='small-img' src={`http://localhost:5000/taskimage/${ImgVal.filename}`} alt="" />
                                                <a className='a' href={`http://localhost:5000/taskimage/${ImgVal?.filename}`} download={true}>
                                                    <AiOutlineDownload className='icon' />
                                                </a>
                                            </a>

                                    );
                                    })}
                                </div>
                            </>
                        }

                        <div className="task-title">
                            <span><h4>TITLE :</h4>{value.title}</span>
                        </div>

                        <div className="task-description">
                            <span><h5>MESSAGE :</h5> {value.msg}</span>
                        </div>
                        {
                            value.url ?
                            <div className="url">
                                <a href={value.url}>CHECK YOUR COMPLETED TASK AND RATE US <span>URL</span></a>
                            </div>
                            : <></>
                        }
                    </div>
                )
            })
        }
        
        {
            ratings.length >0 ?<></>:
                <div className="rate-us">
                    <h3>RATE US :</h3>
            {
                rate.map((rate)=>{
                    return(
                        <div className='star-containers'>

                            <div className="ratings-1">
                                <p className='satisfied'>How satisfied are you with our work?</p>
                            </div>

                            <div className="ratings-2">
                                <div className="conatiner">
                                    <p>{rate.star1.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle1(rate.star1.title) 
                                                    setvalue1(val)

                                                }}>
                                                    <AiFillStar color={val<=value1? "#FF9529" : 'gray'} size={'1.3rem'}/>
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star2.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle2(rate.star2.title)
                                                    setvalue2(val)
                                                    
                                                }}><AiFillStar color={val<=value2? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star3.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle3(rate.star3.title)
                                                    setvalue3(val)
                                                }}><AiFillStar color={val<=value3? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star4.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle4(rate.star4.title)
                                                    setvalue4(val)
                                                }}><AiFillStar color={val<=value4? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star5.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle5(rate.star5.title)
                                                    setvalue5(val)
                                                }}><AiFillStar color={val<=value5? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star6.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle6(rate.star6.title)
                                                    setvalue6(val)
                                                }}><AiFillStar color={val<=value6? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star7.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle7(rate.star7.title)
                                                    setvalue7(val)
                                                }}><AiFillStar color={val<=value7? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                <div className="conatiner">
                                    <p>{rate.star8.title}</p>
                                    {
                                        arr.map((val)=>{
                                            return (
                                                <span onClick={()=>{
                                                    settitle8(rate.star8.title)
                                                    setvalue8(val)
                                                }}><AiFillStar color={val<=value8? "#FF9529" : 'gray'} size={'1.3rem'}/></span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <button className='rating-submit' onClick={getValue}>SUBMIT</button>
                        </div>
                    )
                })
            }
                </div>
        }
        <ToastContainer
            position="top-center"
            autoClose={2000}
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
