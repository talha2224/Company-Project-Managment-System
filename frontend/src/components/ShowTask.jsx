import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { ImCross } from "react-icons/im";
const Main = styled.div`
letter-spacing: 1px;
.task-heading{
    color:#008080;
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
}
td{
    padding: 10px;
}

.title{
    font-size: 1rem;
}
.tick{
    color: green;
    font-size: 1.3rem;
}

.no{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
}
.paginate-btn-container{
    display: flex;
    justify-content: center;
    align-items: center; 
    .paginate-btn{
        margin-right: 10px;
        width: 2rem;
        height: 2rem;
        border: none;
        background-color: gray;
        color: white;
        outline: none;
        border-radius: 50%;
        cursor: pointer;
    }
    .color{
        background-color: #3f51b5;
        color: white;
    }
}
`

const ShowTask = () => {
let serialnumber =0
const [data,setData]=useState([])

//PAGINATION STATES
const [page,setpage]=useState(1)
const [taskperpage, settaskperpage] = useState(3)

const nav = useNavigate()
useEffect(()=>{
        axios.get('http://localhost:5000/api/get/task')
        .then((res)=>setData(res.data))
        .catch((e)=>console.log(e))
},[])

let lastPostIndex= page * taskperpage

let firstPostIndex=lastPostIndex - taskperpage

let currenttask = data.slice(firstPostIndex,lastPostIndex)

let pages =[]

for (let i=1;i<=Math.ceil(data.length/taskperpage);i++){
    pages.push(i)
}
const changeColor=(color)=>{
    if(color===page){
        
    }
}
  return (
    <Main>
        <div className="table-container">
            <h3 className='task-heading'>ALL CUSTOMERS TASK</h3>
            {
            currenttask.length===0 ? <h3 className='no'>NO TASK AVAILABLE</h3>:
            <table>
                <thead>
                    <th>S No</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Assign</th>
                    <th>Complete</th>
                </thead>
                <tbody>
                    {
                        currenttask.map((value)=>{
                        serialnumber+=1
                        return(
                                <tr key={value._id}>
                                    <td data-label='S No'>{serialnumber}</td>
                                    <td data-label='Name'>{value?.customer_id?.username}</td>
                                    <td data-label='Title' className='title'>{value.title}</td>
                                    <td data-label='Details' className='desc' onClick={() => nav(`/singletask/${value._id}`)}>Details</td>
                    
                                    {value.developer_id.length===0?<td data-label='Assign' onClick={() => nav(`/assigntask/${value._id}`)}>Assign</td>:
                                    <td data-label='Assign' ><MdOutlineFileDownloadDone className='tick'/></td>
                                    }
                                    {
                                        value.completed===true && value.developer_id.length!=0 ? <td data-label='Complete'><MdOutlineFileDownloadDone className='tick'/></td> : <td data-label='Complete'><ImCross/></td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            }
        </div>
        <div className="paginate-btn-container">
            {
                pages.map((values)=>{
                    return(
                        <button className={values===page ?'paginate-btn color' :'paginate-btn'} onClick={()=>{
                            setpage(values)
                        }}>{values}</button>
                        )
                })
            }
        </div>
                
        
        
    </Main>
  )
}

export default ShowTask

