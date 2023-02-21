import React,{useState,useEffect} from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { GiPlayButton } from "react-icons/gi";
import { useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Main = styled.div`
letter-spacing: 1px;
.table-container{
    margin: 1rem;
}
.headingandsearch{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-icon-c{
    display: flex;
    align-items: center;
}
.search{
    width: 12rem;
    height: 2.4rem;
    padding-left: 13px;
    border: none;
    background-color: #aaaafa;
    color: black;
    outline: none;
    ::-webkit-input-placeholder {
        color: black;
        text-transform: capitalize;
    }
}
.search-icon-bs{
    padding-right: 3px;
    margin-left: -1.5rem;
    color: black;
    font-size: 1.3rem;
}
table{
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
    border-collapse: collapse;
    overflow: scroll;
}
table td,table th{
    border: .5px solid #cac1c1;
    text-align:left;
}
th{
    padding: 10px;
    background-color: darkblue;
    color: #ffffff;
    @media only screen and (max-width:603px){
        font-size: 0.8rem;
    }
    @media only screen and (max-width:409px){
        font-size: xx-small;
    }
}
td{
    padding: 10px;
    @media only screen and (max-width:603px){
        font-size: 0.8rem;
    }
}
.btn-container{
    margin: 1rem;
}

button{
    width: 10rem;
    height: 2.5rem;
    outline: none;
    background-color: blue;
    color: white;
    border:none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon-down{
    margin-left: 10px;
}

.containertd{
    height: 1rem;
    overflow: scroll;
}
.red{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: red;
}
.green{
    width: 1rem;
    height: 1rem;
    /* overflow: hidden; */
    border-radius: 50%;
    background-color: green;  
}
`
const AssignTask = () => {
    const nav=useNavigate()
    const loca=useLocation().pathname.split('/')[2]


    let serialnumber=0
    const [data,setData]=useState([])
    const [selected,setselected]=useState([])
    const [search,setsearch]=useState('')
    

    useEffect(()=>{
        axios.get('http://localhost:5000/api/developer/get-developer')
        .then((res)=>{
            setData(res.data)
        }).catch((e)=>console.log(e))
    },[])

    const handleChange=(e)=>{
        if(e.target.checked){
            setselected([...selected,e.target.value])
        }
        else{
            setselected(selected.filter((value) => value !== e.target.value));
        }
    }

    const Assign=()=>{
        axios.put(`http://localhost:5000/api/update-task/${loca}`,{
            taskid:loca,
            developer_id:selected
        })
        .then((res)=>{
            if(res.status===200){
                toast('task assigned')
                for(let i =0 ;i <selected.length;i++){
                    axios.put(`http://localhost:5000/api/developer/update-developer/${selected[i]}`,{id:selected[i],customer_id:12})
                    .then((res)=>console.log(res))
                }
                setTimeout(() => {
                    nav('/admin-home')
                }, 2000);
                }
        })
        .catch((e)=>console.log(e))
    }
    
  return (
    <Main>
      <NavbarAdmin/>

      <div className="table-container">
        <div className="headingandsearch">

            <h3 className='task-heading'>ALL DEVLOPERS</h3>

            <div className="search-icon-c">
                <input type="text" className='search' placeholder='search...' onChange={(e)=>setsearch(e.target.value)}/>
                <AiOutlineSearch className='search-icon-bs'/>
            </div>
        </div>
              <table>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Developer Name</th>
                        <th>Select</th>
                        <th>Available</th>
                        <th>Details</th>
                    </tr>
                 </thead>
                    {
                        data.filter((item)=>{
                            return search.toLowerCase===''?item: item.developer_name.toLowerCase().includes(search)
                        }).map((value)=>{
                            serialnumber+=1
                            return(
                                   <tbody key={value._id}>
                                        <tr>
                                            <td>{serialnumber}</td>
                                            <td>{value.developer_name}</td>
                                            <td>
                                                <input type="checkbox" value={value._id} onChange={handleChange}/>
                                            </td>

                                            <td className='containertd'>
                                                <p className={value.customer_id!=null ? 'red' : 'green'}></p>
                                            </td>
                                            <td onClick={()=>nav(`/dev/details/${value._id}`)}>Details</td>
                                        </tr>
                                    </tbody>
                                    )
                            })
                    }
                </table>
            </div>
            <div className="btn-container">
                <button className='btn-assign' onClick={Assign}>ASSIGN <GiPlayButton className='icon-down'/></button>
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

export default AssignTask
