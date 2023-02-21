import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill,BsFillStarFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
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
  @media only screen and (max-width:920px){
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
  margin-right: 1rem;
  .icon{
    margin-right: 10px;
  }
  @media only screen and (max-width:920px){
    /* margin-bottom: 1rem; */
    padding-top:1rem ;
    padding-bottom: 10px;
    font-weight: bolder;
    padding-left: 10px;
  }
}
.cross{
  display: none;
  @media only screen and (max-width:920px){
    display: block;
    float: right;
    margin: 1rem;
  }
}
.sub1-hamburger{
  display: none;
  @media only screen and (max-width:920px){
    display: block;
    position: relative;
  }

}
`

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const nav = useNavigate()
  const logout=()=>{
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    nav('/')
  }

  return (
    <Main>
      <div className="navbar">
        <div className="first">
          <h3>WELCOME : {localStorage.getItem('username')}</h3>
        </div>
        <div className="second">
          
          {
            isOpen ? 
              <>
                <ImCross className="cross" onClick={()=>setIsOpen(false)}/>

                <div className="sub1" onClick={() => nav('/admin-home')}>
                  <FaTasks className="icon" />
                  <li>TASKS</li>
                </div>

                <div className="sub1" onClick={() => nav('/admin-customer')}>
                  <BsFillPersonFill className="icon" />
                  <li>CUSTOMERS</li>
                </div>

                <div className="sub1" onClick={() => nav('/admin-developer')}>
                  <BsFillPersonFill className="icon" />
                  <li>DEVELOPERS</li>
                </div>

                <div className="sub1" onClick={() => nav('/admin/rating')}>
                  <BsFillStarFill className="icon" />
                  <li>RATINGS</li>
                </div>

                <div className="sub1" onClick={logout}>
                  <HiLogout className="icon" />
                  <li>LOGOUT</li>
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
  );

  // <span className="nav-logo">WELCOME : {localStorage.getItem('username')}</span>
};
{/* <a onClick={()=>nav('/admin-home')}><FaTasks className="icon"/>TASKS</a>
<a onClick={()=>nav('/admin-customer')}><BsFillPersonFill className="icon"/> CUSTOMERS</a>
<a onClick={()=>nav('/admin-developer')}><BsFillPersonFill className="icon"/> DEVELOPERS</a>
<a onClick={()=>nav('/admin/rating')}><BsFillStarFill className="icon"/>RATINGS</a>
<a onClick={logout}><HiLogout className="icon"/> LOGOUT</a> */}

export default NavbarAdmin;