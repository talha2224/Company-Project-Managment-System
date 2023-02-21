import React,{useState} from 'react'
import styled from  'styled-components'
import { FaTasks } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
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
  const nav = useNavigate()
  const logout=()=>{
    localStorage.removeItem('customername')
    nav('/user')
  }
  
  return (
      <Main>
      <div className="navbar">

        <div className="first" onClick={()=>nav('/user-home')}>
          <h3>WELCOME : {localStorage.getItem('customername')}</h3>
        </div>

        <div className="second">
          
          {
            isOpen ? 
              <>
                <ImCross className="cross" onClick={()=>setIsOpen(false)}/>

                <div className="sub1" onClick={()=>nav('/user-home')}>
                  <HiHome className="icon" />
                  <li>Home</li>
                </div>

                <div className="sub1" onClick={()=>nav('/user/all/task')}>
                  <FaTasks className="icon" />
                  <li>Task</li>
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


export default Navbar