import React, { useState } from "react";
import styled from "styled-components";
import { BsFillPersonFill,BsFillStarFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
letter-spacing: 1px;
cursor: pointer;
.icon{
    margin-bottom: -3px;
    margin-right: 10px;
    font-weight: bolder;
    font-size: 1rem;
}
.Navbar {
    margin: 1rem;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px}

.Navbar > .nav-logo {
  font-weight: 700;
  font-size: 21px;
  margin: 15px;
  color: black;
}
.Navbar > .nav-items > a {
  color: black;
  font-size: 0.9rem;
  font-weight: bolder;
  text-decoration: none;
  margin: 15px;
  position: relative;
  opacity: 0.9;
}

.Navbar > .nav-items > a:hover {
  opacity: 1;
}

.Navbar > .nav-items > a::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: all 0.45s;
}

.Navbar > .nav-items > a:hover::before {
  width: 100%;
}

.Navbar > .nav-toggle {
  display: none;
}

@media (max-width: 915px) {
    .Navbar > .nav-items {
        position: absolute;
        top: 84px;
        display: flex;
        flex-direction: column;
        background: #c0c6e9;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        transition: all .45s;
    }
    .Navbar > .nav-items > a::before {
        background: transparent;
    }
    .Navbar > .nav-items.open {
        transform: translateX(0);
    }

    .Navbar > .nav-toggle {
        display: flex;
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .nav-toggle > .bar {
        position: relative;
        width: 32px;
        height: 2px;
        background: black;
        transition: all 0.45s ease-in-out;
    }

    .nav-toggle > .bar::before,
    .nav-toggle > .bar::after {
        content: "";
        position: absolute;
        height: 2px;
        background:black;
        border-radius: 2px;
        transition: all 0.45s ease-in-out;
    }
    .nav-toggle > .bar::before {
        width: 25px;
        transform: translateY(-8px);
        right: 0;
    }

    .nav-toggle > .bar::after {
        width: 32px;
        transform: translateY(8px);
    }
    .nav-toggle.open > .bar {
        transform: translateX(-40px);
        background: transparent;
    }

    .nav-toggle.open > .bar::before {
        width: 32px;
        transform: rotate(45deg) translate(26px, -26px);
    }

    .nav-toggle.open > .bar::after {
        transform: rotate(-45deg) translate(26px, 26px);
    }
}
`

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate()

  const logout=()=>{
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    nav('/')
  }
  return (
    <Main>
        <div className="Navbar">
            <span className="nav-logo">WELCOME : {localStorage.getItem('username')}</span>

            <div className={`nav-items ${isOpen && "open"}`}>
                <a onClick={()=>nav('/admin-home')}><FaTasks className="icon"/>TASKS</a>
                <a onClick={()=>nav('/admin-customer')}><BsFillPersonFill className="icon"/> CUSTOMERS</a>
                <a onClick={()=>nav('/admin-developer')}><BsFillPersonFill className="icon"/> DEVELOPERS</a>
                <a><BsFillStarFill className="icon"/>RATINGS</a>
                <a onClick={logout}><HiLogout className="icon"/> LOGOUT</a>
            </div>
            
            <div className={`nav-toggle ${isOpen && "open"}`}onClick={() => setIsOpen(!isOpen)}>
                <div className="bar"></div>
            </div>
    </div>

    </Main>
  );
};

export default NavbarAdmin;
