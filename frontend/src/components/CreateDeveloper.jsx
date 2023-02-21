import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components'
import { BsFillPersonFill,BsShieldLockFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import { useNavigate } from 'react-router-dom';

const Main = styled.div`
letter-spacing: 1px;
.container-main{
  width: 100vw;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input{
  display: block;
}
.sub-container{
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 70vh;
  border-radius: 1rem;
  @media only screen and (max-width:436px){
    width: 20rem;
  }
}
.register-heading{
  margin-bottom: 1rem;
  text-align: center;
}
.single-input{
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  input{
    outline:none;
    width: 20rem;
    height: 2.5rem;
    border: 1px solid gray;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4rem;
    @media only screen and (max-width:436px){
    width: 16rem;
    margin-left: 1rem;
    }
  }
  .icon{
    color: blue;
    margin-left: -2rem;
    background-color: #beb3b3;
    width: 1.8rem;
    height:1.8rem;
    padding: 6px;
    border-radius: 50%;
  }
}
.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.3rem;
  .btn{
    width: 20rem;
    height: 2.4rem;
    border-radius: 20px;
    border: none;
    background-color: blue;
    color: white;
    cursor: pointer;
    @media only screen and (max-width:436px){
    width: 16rem;
    }
  }
}
.txt{
  @media only screen and (max-width:436px){
    font-weight: lighter;
    font-size: 0.8rem;
  }
}
b{
  margin-left: 10px;
  cursor: pointer;
}
`

const CreateDeveloper = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpass] = useState('')
    const nav=useNavigate()
    const Submit=(e)=>{
        e.preventDefault()
        if(!name || !email || !password){
            toast.error('All Fields Are Required')
        }
        else{
            axios.post('http://localhost:5000/api/developer/create-developer',{
                name,email,password
            })
            .then((res)=>{
                if(res.status===201){
                  toast("Developer Added")
                  setTimeout(() => {
                    nav('/admin-developer')
                  }, 2000);
                }
            })
            .catch((e)=>{
                if(e.response.status===400){
                    toast.error('Email Already Registered')
                }
            })
        }
    }
  return (
    <Main>
        <NavbarAdmin/>
      <div className="container-main">
        <div className="sub-container">

          <form onSubmit={Submit}>
            {/* <ImCross className='cross' onClick={()=>setcustomer(false)}/> */}
            {/* MAIN HEADING */}
            <h1 className='register-heading'>Create Developer</h1>
            {/* NAME INPUT */}
            <div className="single-input">
              <input type="text" className='input' placeholder='Full Name' required onChange={(e)=>setname(e.target.value)}/>
              <BsFillPersonFill className='icon'/>
            </div>

            {/* EMAIL INPUT */}
            <div className="single-input">
              <input type="email" className='input' placeholder='Email Address' required onChange={(e)=>setemail(e.target.value)}/>
              <AiOutlineMail className='icon'/>
            </div>

            {/* PASSWORD INPUT */}
            <div className="single-input">
              <input type="password" className='input' placeholder='Password'required onChange={(e)=>setpass(e.target.value)}/>
              <BsShieldLockFill className='icon'/>
            </div>

            <div className="btn-container">
              <input type="submit" className='btn' value="Create Developer"/>
            </div>
          </form>
        </div>
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

export default CreateDeveloper
