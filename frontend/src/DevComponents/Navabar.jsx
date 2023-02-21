import React,{useState} from 'react'
import styled from  'styled-components'
import { useNavigate } from 'react-router-dom'
import { FaTasks } from "react-icons/fa";
import { HiLogout,HiHome } from "react-icons/hi";
import {GiHamburgerMenu} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'

const Main = styled.div`
letter-spacing: 1px;
cursor: pointer;
list-style: none;
.navbar{
  margin: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.second{
  display: flex;
  align-items: center;
  @media only screen and (max-width:700px){
    z-index: 2;
    display: block;
    position: absolute;
    left: 0;
    top: 3.8rem;
    width: 60%;
    margin: 1rem;
    background-color: wheat;
  }
}
.sub1{
  display: flex;
  align-items: center;
  margin-right: 2rem;
  li{
    font-weight: bolder;
  }
  .icon{
    margin-right: 10px;
  }
  @media only screen and (max-width:700px){
    /* margin-bottom: 1rem; */
    padding-top:1rem ;
    padding-bottom: 10px;
    font-weight: bolder;
    padding-left: 10px;
  }
}
.cross{
  display: none;
  @media only screen and (max-width:700px){
    display: block;
    float: right;
    margin: 1rem;
  }
}

.sub1-hamburger{
  display: none;
  @media only screen and (max-width:700px){
    display: block;
    position: relative;
  }

}
/* .hamburger{
} */
`
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const nav=useNavigate()

  const logout=()=>{
    localStorage.removeItem('devname')
    nav('/developer')
  }  
  return (
    <Main>
      <div className="navbar">
        <div className="first" onClick={()=>nav('/developer/home')}>
          <h3>WELCOME : {localStorage.getItem('devname')}</h3>
        </div>

        <div className="second">
          {
            isOpen ?  
              <>
                <ImCross className="cross" onClick={()=>setIsOpen(false)}/>

                <div className="sub1" onClick={()=>nav('/developer/home')}>
                  <HiHome className="icon" />
                  <li>Home</li>
                </div>
                
                <div className="sub1" onClick={logout}>
                  <HiLogout className="icon" />
                  <li>Logout</li>
                </div>
              </>
              :<></>
       }
</div>
<div className="sub1-hamburger" onClick={()=>setIsOpen(true)}>
    <GiHamburgerMenu className="hamburger"/>
  </div>
</div>
    </Main>
  )
}

{/* <span className="nav-logo" onClick={()=>nav('/developer/home')}>WELCOME : {localStorage.getItem('devname')}</span>
<div className={`nav-items ${isOpen && "open"}`}>
  <a onClick={()=>nav('/developer/home')}><HiHome className="icon"/>HOME</a>
  <a onClick={logout}><HiLogout className="icon"/> LOGOUT</a>
</div>
<div className={`nav-toggle ${isOpen && "open"}`}onClick={() => setIsOpen(!isOpen)}>
  <div className="bar"></div>
</div> */}
export default Navbar