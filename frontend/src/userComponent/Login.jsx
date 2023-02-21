import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import styled from 'styled-components'
import {BsShieldLockFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const Main = styled.div`
letter-spacing: 1px;
width: 100vw;
height: 100vh;
background-color: black;
color: white;
.container-main{
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input{
  display: block;
}
.sub-container{
  box-shadow: 0px 1px 2px 0px rgba(0,255,255,0.7),1px 2px 4px 0px rgba(0,255,255,0.7),2px 4px 8px 0px rgba(0,255,255,0.7),2px 4px 16px 0px rgba(0,255,255,0.7);
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
  margin-bottom: 4rem;
  text-align: center;
}
.single-input{
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  input{
    outline:none;
    width: 20rem;
    height: 2.2rem;
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
    height: 2.2rem;
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
.logo{
    img{
       width: 15rem;
       height: 5rem;
    }
}
`

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpass] = useState('')

  const nav=useNavigate()
  const Submit=(e)=>{
    e.preventDefault()
    if( !email|| !password){
      toast.error('all fields are required')
    }
    else{
      axios.post('http://localhost:5000/api/user/login-user',{
        email:email,password:password
      })
      .then((res)=>{
        console.log(res)
        if(res.status===200){
            toast('LOGIN SUCCESFULL')
            localStorage.setItem('customername',res?.data?.username)
            localStorage.setItem('customeremail',res?.data?.useremail)
            localStorage.setItem('customerid',res?.data?.userid)
            setTimeout(() => {
              nav('/user-home')
            }, 2000);
        }
      })
      .catch((e)=>{
        console.log(e);
        if(e.response.status===404){
            toast.error('EMAIL NOT REGISTERED')
        }
        else if(e.response.status===400){
            toast.error('INVALID CREDENTIALS')
        }
      })
    }
  }
  return (
    <Main>
        <div className="logo">
            <img src="/bot.png" alt="" />
        </div>
      <div className="container-main">
        <div className="sub-container">
          <form onSubmit={Submit}>
            {/* MAIN HEADING */}
            <h1 className='register-heading'>Login Account</h1>
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
              <input type="submit" className='btn' value="Login To Your Account"/>
            </div>
            <p className='txt'>Don't have an account please?<b onClick={()=>nav('/user')}>Register</b></p>
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

export default Login