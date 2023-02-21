import axios from 'axios'
import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import {ImCross} from 'react-icons/im'
import { FaTrash } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
const Main = styled.div`
letter-spacing: 1px;
.task-heading{
  color:#008080;
  @media only screen and (max-width:360px){
    font-size: 0.9rem;
  }
}
.headingandadd{
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3{
    color:#008080;
  }
button{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.3rem;
  width: 9rem;
  border: none;
  background-color: blue;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  @media only screen and (max-width:360px){
    height: 2.3rem;
    width: 7rem;
    font-size: 0.8rem;
  }
}
.add{
  margin-left: 10px;
  font-weight: bolder;
  @media only screen and (max-width:360px){
    margin-left: 5px;
    font-weight: light;
  }
}
}
.table-container{
  margin: 1rem;
}
table{
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
  overflow: scroll;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  transition: box-shadow 0.3s ease-in-out;
  :hover {
  box-shadow: 0px 10px 20px 10px rgba(0, 0, 0, 0.2);
  }
}
table td,table th{
  border: .5px solid gray;
  text-align:left;
}
@media only screen and (max-width:643px) {
    table{
      z-index: -1;
      padding: 1rem;
    }
    table thead{
        display: none;
    }
    table,table tbody , table tr , table td{
        display: block;
        width: 100%
    }
    table tr{
        margin-bottom: 2rem;
    }
    td{
      font-weight: lighter;
      font-size: .9rem;
      padding: 10px;
    }
    table td{
        text-align: right;
        padding-left: 50%;
        position: relative;
    }
    table td::before{
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 15px;
        text-align: left;
    }
}
th{
    padding: 10px;
    background-color: #3f51b5;
    color: #ffffff;
}
td{
    padding: 10px;
}
.title{
    font-size: 1rem;
}
.no{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}

`
const ShowRating = () => {

    // USESTATE FOR SAVING
    const [data,setdata]=useState([])
    const nav = useNavigate()
    //GET API CALL OF RATING
  useEffect(()=>{
    axios.get('http://localhost:5000/api/rating/get')
    .then((res)=>setdata(res.data))
  },[])


  return (
    <Main>
        <div className="table-container">
        <div className="headingandadd">
                <h3 className='task-heading'>ALL RATINGS</h3>
                <button onClick={()=>nav('/admin/post/rating')}>Set Rating <BsPlusLg className='add'/></button>
        </div>
            {
                data.length===0 ? <h3 className='no'>NO RATINGS SET</h3>:
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Stars</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {
                            data.map((value)=>{
                                return(
                                        <>
                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star1.title}</td>
                                                <td data-label='Star'>{value?.star1.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>

                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star2.title}</td>
                                                <td data-label='Star'>{value?.star2.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>

                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star3.title}</td>
                                                <td data-label='Star'>{value?.star3.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>
                                            
                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star4.title}</td>
                                                <td data-label='Star'>{value?.star4.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>

                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star5.title}</td>
                                                <td data-label='Star'>{value?.star5.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>

                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star6.title}</td>
                                                <td data-label='Star'>{value?.star6.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>

                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star7.title}</td>
                                                <td data-label='Star'>{value?.star7.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>

                                            <tr key={value._id}>
                                                <td data-label='Title'>{value.star8.title}</td>
                                                <td data-label='Star'>{value?.star8.value}</td>
                                                <td data-label='Edit' className='title'><FiEdit/></td>
                                                <td data-label='Delete'><FaTrash/></td>
                                            </tr>
                                        </>
                                    )
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    </Main>
  )
}

export default ShowRating
