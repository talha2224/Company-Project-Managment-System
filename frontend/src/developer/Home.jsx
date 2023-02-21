import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../DevComponents/Navabar'
import ShowTask from '../DevComponents/ShowTask'
const Home = () => {
  const nav=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('devname')){
      nav('/developer')
    }
  },[nav])
  return (
    <div>
      <Navbar/>
      <ShowTask/>
    </div>
  )
}

export default Home
