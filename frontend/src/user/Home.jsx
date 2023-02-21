import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../userComponent/Navbar'
import Task from '../userComponent/Task'
const Home = () => {
  const nav=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('customername')){
      nav('/user')
    }
  },[nav])
  return (
    <div>
      <Navbar/>
      <Task/>
    </div>
  )
}

export default Home
