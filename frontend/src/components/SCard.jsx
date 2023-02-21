import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import NavbarAdmin from './NavbarAdmin'
import {AiFillStar} from 'react-icons/ai'
const Main = styled.div`
.show-all-task{
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.single-container-rating{
    margin-top: 2rem;
    padding: 1.5rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 1rem;
    width: fit-content;
    h3{
        margin-bottom: 1rem;
    }
}
.titleandstar{
    display: flex;
    align-items: center;
    margin-top: 1px;
    .icon-c{
        margin-left: 10px;
    }
    .icon{
        color: orange;
        font-size: 1.3rem;
    }
}
.r-name{
    margin-bottom: 10px;
}
hr{
    margin-top: 12px;
    margin-bottom: 10px;
}  
`
const SCard = () => {
    const location = useLocation().pathname.split('/')[5]
    const [data,setdata]=useState([])
    console.log(location)
    useEffect(()=>{
        axios.get(`http://localhost:5000/api//get/single/task/${location}`)
        .then((res)=>setdata([res.data]))
    })
  return (
    <Main>
        <NavbarAdmin/>
        {
        data.map((val)=>{
        return(
            <div className="single-container-rating">
                <h3>{val.title}</h3>
                <p className='r-name'>Rated By : {val.customer_id.username}</p>
                <hr />
                {/* TITLE VALUE 1 */}
                {
                    val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title1}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value1 }, (_, i) => (
                                            <>
                                                <AiFillStar className='icon'/>
                                            </>
                                        ))
                                    
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <hr />

                {/* TITLE VALUE 2 */}
                {
                    val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title2}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value2 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <hr />

                {/* TITLE VALUE 3 */}
                {
                    val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title3}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value3 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <hr />
                {/* TITLE VALUE 4 */}
                {
                    val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title4}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value4 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <hr />

                {/* TITLE VALUE 5 */}
                {
                    val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title5}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value5 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <hr />
                    {/* TITLE VALUE 6 */}
                    {
                        val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title6}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value6 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                        })
                    }
                    <hr />
                    {/* TITLE VALUE 7*/}
                    {
                        val.rating.map((r)=>{
                            return(
                                <div className="titleandstar">
                                    <p>{r.title7}</p>
                                    <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value7 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                                </div>
                            )
                        })
                    }
                    <hr />
                    {/* TITLE VALUE 8 */}
                    {
                    val.rating.map((r)=>{
                        return(
                            <div className="titleandstar">
                                <p>{r.title8}</p>
                                <div className="icon-c">
                                    {  
                                        Array.from({ length: r.value8 }, (_, i) => (
                                            <AiFillStar className='icon'/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    })
}
    </Main>
  )
}

export default SCard
