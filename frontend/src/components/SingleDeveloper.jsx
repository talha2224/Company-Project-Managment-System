import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NavbarAdmin from './NavbarAdmin'
import {BsCartCheckFill,BsFillCalendar2DateFill} from 'react-icons/bs'
import {BiNoEntry} from 'react-icons/bi'


const Main = styled.div`
letter-spacing: 1px;
.name-D{
    margin: 1rem;
    @media only screen and (max-width:330px) {
        font-size:.8rem ;
    }
}
.container-D{
    margin: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width:683px){
        display: block;
        margin-right: 0;
    }
    @media only screen and (max-width:330px) {
        margin: 10px;
    }
}
.first-D,.second-D,.third-D{
    padding: 10px;
    border-radius: 1rem;
    width: 20rem;
    height: 7rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    @media only screen and (max-width:1028px){
        width: 15rem;
    }
    @media only screen and (max-width:779px){
        width: 13rem;
    }
    @media only screen and (max-width:683px){
        width: 94vw;
        margin-bottom: 1rem;
    }
}
.first-D{
    background-color: orange;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-bottom: 10px;
    }
    .icon-D{
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }
}

.second-D{
    background-color: #9696ca;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-bottom: 10px;
    }
    .icon-D{
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }
}

.third-D{
    background-color: #C41E3A;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        margin-bottom: 10px;
    }
    .icon-D{
        width: 2rem;
        height: 2rem;
        font-size: 2rem;
    }
}
.monthly{
    margin-top: 3rem;
    text-align: center;
}
.individula-task{
    margin-top: 1rem;
    margin-left: 1rem;
    color:#008080;
}
/* .show-all-task{
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.single-container-rating{
    margin-top: 2rem;
    padding: 1.5rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 1rem;
    width: fit-content;
    h3{
        margin-bottom: 1rem;
    }
}
.titleandstar{
    display: flex;
    align-items: center;
    margin-top: 1px;
    .icon-c{
        margin-left: 10px;
    }
    .icon{
        color: orange;
        font-size: 1.3rem;
    }
}
.r-name{
    margin-bottom: 10px;
}
hr{
    margin-top: 12px;
    margin-bottom: 10px;
}  */

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
`

const SingleDeveloper = () => {
    const location = useLocation().pathname.split('/')[4]
    const [customer_id,setcustomer_id]=useState('')
    const [data,setdata]=useState([])

    // const [rate,setrate]=useState([])
    const nav = useNavigate()
    const [name, setname] = useState('')
    const [complete,setcomplete]=useState([])
    const [pending,setpending]=useState([])
    const [rating,setrating] = useState() 
    const [monthlyRatingData, setmonthlyRatingData] = useState([]);
    const [monthlyRating, setmonthlyRating] = useState();

    useEffect(()=>{

        // DEVELOPER DATA NAME ETC.
        axios.get(`http://localhost:5000/api/developer/single/${location}`)
        .then((res)=>{
            setname(res.data.developer_name)
        })

        // DEVELOPER ALL COMPLETED TASKS
        axios.get(`http://localhost:5000/api/task/developer_id/complete/${location}`)
        .then((res)=>{
            setcomplete(res.data.length)
        })

        //DEVELOPER PENDING TASK 
        axios.get(`http://localhost:5000/api/task/developer_id/pending/${location}`)
        .then((res)=>{
            setpending(res.data.length)
        })

        //OVER ALL RATING OF DEVELOPERS
        axios.get(`http://localhost:5000/api/get/task/rating/${location}`)
        .then((res)=>{
            console.log(res.data)
            setdata(res.data)
            const ratingValues = res.data.reduce((acc, curr) => {
                return acc.concat(
                  Object.values(curr.rating).map(rating => rating.value1 || rating.value2 || rating.value3 || rating.value4 || rating.value5 || rating.value6 || rating.value7 || rating.value8)
                );
            }, []);
            const averageRating = ratingValues.reduce((acc, curr) => acc + curr) / ratingValues.length;
            setrating(averageRating);
        })

        //DEVELOPER MONTHLY BASE RATING
        axios.get(`http://localhost:5000/api/get/task/rating/month/${location}`)
        .then((res)=>{
            if(res.data.length>0){
                const monthlyratingValues = res.data.reduce((acc, curr) => {
                    return acc.concat(
                      Object.values(curr.rating).map(rating => rating.value1 || rating.value2 || rating.value3 || rating.value4 || rating.value5 || rating.value6 || rating.value7 || rating.value8)
                    );
                }, []);
                const averageRating = monthlyratingValues.reduce((acc, curr) => acc + curr) / monthlyratingValues.length;
                setmonthlyRating(averageRating);
            }
        })
    },[])

    const calculateTotalRating = (task) => {
        const sum = task.rating.reduce((total, rating) => {
          return total + Object.values(rating)[1];
        }, 0);
        return sum / 8;
      };
    
    let serialnumber=0
  return (
    <Main>
        <NavbarAdmin/>
        <div className="name-D">
            <h3>DEVELOPER NAME : {name?.toUpperCase()}</h3>
        </div>
        <div className="container-D">

            <div className="first-D">
                <div className="sub1-D">
                    <h1>{Math.round(rating)}</h1>
                    <p>Total Rating</p>
                </div>

                <div className="sub2-D">
                    <BsCartCheckFill className='icon-D'/>
                </div>
            </div>

            <div className="second-D">
                <div className="sub1-D">
                    <h1>{pending}</h1>
                    <p>Under Development</p>
                </div>
                <div className="sub2-D">
                    <BsFillCalendar2DateFill className='icon-D'/>
                </div>
            </div>

            <div className="third-D">
                <div className="sub1-D">
                    <h1>{complete}</h1>
                    <p>Completed Task</p>
                </div>

                <div className="sub2-D">
                    <BiNoEntry className='icon-D'/>
                </div>

            </div>
        </div>
        <div className="individula-task">
            <h3>Individual Task Rating</h3>
        </div>

        {/* TABLE START */}
        <div className="table-container">
            <table>
                <thead>
                    <th>S No</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>OverAll Rating</th>
                </thead>
                <tbody>
                    {
                        data.map((value)=>{
                        serialnumber+=1
                        console.log(value.rating.reduce((sum, rating) => sum + rating.value1 + rating.value2 + rating.value3 + rating.value4 + rating.value5 + rating.value6 + rating.value7 + rating.value8, 0) / 8)
                        return(
                                <tr key={value._id}>
                                    <td data-label='S No'>{serialnumber}</td>
                                    <td data-label='Name'>{value?.customer_id?.username}</td>
                                    <td data-label='Title' className='title'>{value.title}</td>
                                    <td onClick={()=>nav(`/admin/dev/single/task/${value._id}`)}>{calculateTotalRating(value)}</td>                                
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </Main>
  )
}

export default SingleDeveloper

{/* <div className="monthly">
    {
        setmonthlyRating >0 ? <p>{monthlyRating}</p> :<p>NO PREVIOUS MONTH RATING FOUND</p>
    }
</div> */}