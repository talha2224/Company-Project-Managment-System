import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {BsCartCheckFill,BsFillCalendar2DateFill} from 'react-icons/bs'
import {BiNoEntry} from 'react-icons/bi'
import axios from 'axios'


const Main = styled.div`
.container{
    margin: 1rem;
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width:683px){
        display: block;
        margin-left:10px;
    }
}
.first,.second,.third{
    padding: 10px;
    border-radius: 1rem;
    width: 20rem;
    height: 7rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    @media only screen and (max-width:1028px){
        width: 15rem;
    }
    @media only screen and (max-width:779px){
        width: 13rem;
    }
    @media only screen and (max-width:683px){
        width: 94vw;
        margin-bottom: 1rem;
    }
}
.first{
    background-color: orange;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-bottom: 10px;
    }
    .icon{
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }
}
.second{
    background-color: #9696ca;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-bottom: 10px;
    }
    .icon{
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }
}
.third{
    background-color: #C41E3A;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-bottom: 10px;
    }
    .icon{
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }
}
`

const OverView = () => {
    const [completedTask,setcompletedTask]=useState([])
    const [assignedTask,setassignedTask]=useState([])
    const [notassignedTask,setnotassignedTask]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/api/task/complete')
        .then((res)=>setcompletedTask(res.data))

        axios.get('http://localhost:5000/api/task/notassigned')
        .then((res)=>setnotassignedTask(res.data))

        axios.get('http://localhost:5000/api/task/development')
        .then((res)=>setassignedTask(res.data))
    },[])
    let complete = completedTask.length;
    let assign=assignedTask.length;
    let notassign = notassignedTask.length

  return (
    <Main>
        <div className="container">

            <div className="first">

                <div className="sub1">
                    <h1>{complete}</h1>
                    <p>Task Completed</p>
                </div>

                <div className="sub2">
                    <BsCartCheckFill className='icon'/>
                </div>

            </div>


            <div className="second">

            <div className="sub1">
                    <h1>{assign}</h1>
                    <p>Under Development</p>
                </div>

                <div className="sub2">
                    <BsFillCalendar2DateFill className='icon'/>
                </div>

            </div>


            <div className="third">
                <div className="sub1">
                    <h1>{notassign}</h1>
                    <p>Not Assigned</p>
                </div>

                <div className="sub2">
                    <BiNoEntry className='icon'/>
                </div>

            </div>

        </div>
    </Main>
  )
}

export default OverView
