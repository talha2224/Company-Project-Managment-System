import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { TiTick } from "react-icons/ti";
import {ImCross} from 'react-icons/im'
const Main = styled.div`
letter-spacing: 2px;
z-index: 0;
.all-task{
    margin: 1rem;
    color:#008080;
}
.table-container{
    margin: 1rem;
}
.t-container{
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
    border: .5px solid #cac1c1;
    text-align:left;
}
@media only screen and (max-width:643px) {
    table{
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
        font-weight: bolder;
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
  @media only screen and (max-width:643px) {
    display: none;
  }
}
td{
    padding: 10px;
}

.headingandadd{
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}
.add{
  margin-left: 10px;
  font-weight: bolder;
}
.no{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.tick{
  color: green;
  font-size: 1.2rem;
  font-weight: bolder;
}
`
// #5c6bc0

const ShowTask = () => {
    const nav = useNavigate()
    let serialnumber=0
    const id=localStorage.getItem('devid')
    const [data, setdata] = useState([])

    
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/task/developer_id/${id}`,{id})
        .then((res)=>{
            setdata(res?.data)
        })
        .catch((e)=>console.log(e))
    },[])
  return (
    <Main>
        <div className="all-task">
            <h2 >POSTED TASK</h2>
        </div>
        {
            data?.length===0 ?<h3 className='no'>No New Task Assign</h3>
            :
            <div className='t-container'>
            <table>
                <tr>
                    <th>S No</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Complete</th>
                </tr>
                {
                    data.map((value)=>{
                        serialnumber+=1
                        return(
                                <tr key={value._id}>
                                    <td data-label='S No'>{serialnumber}</td>
                                    <td data-label='NAME'>{value?.customer_id?.username}</td>
                                    <td data-label='Title' className='title'>{value.title}</td>
                                    <td data-label='Details' className='desc' onClick={() => nav(`/dev/task/details/${value._id}`)}>Details</td>
                                    <td data-label='Complete'>
                                        {
                                            value.completed==true?<TiTick className='complete'/>:<ImCross className='not-complete'/>
                                        }

                                    </td>
                                </tr>
                            )
                    })
                }
            </table>
            </div>
        }
    </Main>
  )
}

export default ShowTask
