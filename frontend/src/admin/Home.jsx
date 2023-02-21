import React,{useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin'
import OverView from '../components/OverView'
import ShowTask from '../components/ShowTask'
const Home = () => {
  const nav=useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('auth')){
      nav('/')
    }
  }, [nav])
  
  return (
    <div>
      <NavbarAdmin/>
      <OverView/>
      <ShowTask/>
    </div>
  )
}

export default Home
