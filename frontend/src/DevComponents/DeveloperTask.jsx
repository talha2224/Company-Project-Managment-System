import React,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin'

// THIS IS ADMIN TASK DETAIL COMPONENTS TO SEE WHICH DEVELOPER IS WORKING ON WHICH PROJECT
const Main = styled.div`
letter-spacing: 2px;
.all-task{
    margin-bottom: 1rem;
}
.task-h{
    margin: 1rem;
}
table{
    cursor: pointer;
    margin: 1rem;
    width: 97%;
    border-collapse: collapse;
    overflow: hidden;
}
table td,table th{
    border: .5px solid #cac1c1;
    text-align:left;
}
th{
    padding: 8px;
    background-color: #3f51b5;
    color: #ffffff;
    @media only screen and (max-width:603px){
        font-size: 0.8rem;
    }
    @media only screen and (max-width:409px){
        font-size: xx-small;
    }
}
td{
    padding: 8px;
    @media only screen and (max-width:603px){
        font-size: 0.8rem;
    }
}

.title{
    font-size: 0.8rem;
    @media only screen and (max-width:603px){
        width: 4rem;
        line-height: 1.2rem;
    }
    @media only screen and (max-width:450px){
        width: 2rem;
        overflow: scroll;
        line-height: 1.2rem;
        font-size: xx-small;
        font-weight: bolder;
    }
}

.no{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
}
`
const DeveloperTask = () => {
    const location = useLocation().pathname.split('/')[3]
    const nav = useNavigate()
    let serialnumber=0
    const id=localStorage.getItem('devid')
    const [data, setdata] = useState([])
    const [img,setimg]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/task/developer_id/${location}`,{id:location})
        .then((res)=>{
            setdata(res?.data)
            setimg(res?.data?.task_img)
        })
        .catch((e)=>console.log(e))
    },[])
  return (
    <Main>
        <NavbarAdmin/>
        <div className="all-task">
            <h4 className='task-h'>DEVELOPER WORKING ON TASK</h4>
        </div>
        {
            data?.length===0 ?<h3 className='no'>No New Task Assign To This Developer</h3>
            :
            <>
            <table>
                <tr>
                    <th>S No</th>
                    <th>Name</th>
                    <th>Project Title</th>
                </tr>
                {
                    data.map((value)=>{
                        serialnumber+=1
                        return(
                                <tr key={value._id}>
                                    <td>{serialnumber}</td>
                                    <td>{value?.customer_id?.username}</td>
                                    <td className='title'>{value.title}</td>
                                </tr>
                            )
                    })
                }
            </table>
            </>
        }
    </Main>
  )
}

export default DeveloperTask
