import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'

const Main = styled.div`
margin: 1rem;
letter-spacing: 1px;
.main-heading{
    margin-bottom: 1rem;
    color:#008080;
}
.form-c{
    display: flex;
    justify-content: center;
    align-items: center;

}
.form{
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #D3D3D3;
    display: inline-block;
    padding: 2rem;
}
.dev{
    margin-bottom: 1rem;
}
select{
    width: 15rem;
    height: 2rem;
    padding-left: 10px;
    outline: none;
    border: none;
    margin-bottom: 1rem;
    option{
        margin-bottom: 10px;
    }
}
.img{
    margin-bottom: 1rem;
}
.btn{
    margin-top: 1rem;
    display: block;
    width: 10rem;
    height: 2.5rem;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #e06464;
    color: white;
}
.title{
    margin-bottom: 1rem;
    
}
.input{
    margin-bottom: 1rem;
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
    background-color: transparent;
    width: 16rem;
    padding-bottom: 8px;
    padding-left: 4px;
    padding-right: 4px;
}
`

const Task = () => {
    const nav = useNavigate()
    // FORM DATA SELECT STATE
    const [img,setimg]=useState([])
    const [title, settitle] = useState('')
    const [desc, setdescription] = useState('')

    //CUSTOMER ID
    let customer_id=localStorage.getItem('customerid')

    
    // FORM DATA

    // SUBMIT
    const Submit=(e)=>{
        e.preventDefault()
        if(!title || !desc || !img){
            toast.error('ALL FIELDS ARE REQUIRED')
        }
        else{
            const formData=new FormData()
            formData.append('title',title)
            formData.append('desc',desc)
            formData.append('customer_id',customer_id)
            Array.from(img).forEach((item)=>{
                formData.append('TaskImage',item)
            })
            axios.post('http://localhost:5000/api/post/task',formData)
            .then((res)=>{
                if(res.status===201){
                    toast('Task Posted')
                    setTimeout(() => {
                        nav('/user/all/task')
                    }, 2000);
                }
                else{
                    toast.error('Task Not Posted')
                }
            })
            .catch((e)=>{
                if(e){
                    toast.error('Task Not Posted')
                }
            })
        }
    }

  return (
    <Main>
      <h2 className='main-heading'>GIVE YOUR TASK</h2>
      <div className="form-c">
        <form className='form'>
            <h3 className='title'>TASK TITLE</h3>
            <input  className='input' type="text" placeholder='Task Title' onChange={(e)=>settitle(e.target.value)}/>
            <h3 className='title'>TASK DESCRIPTION</h3>
            <input className='input' type="text" placeholder='Task Description' onChange={(e)=>setdescription(e.target.value)}/>
            <h3 className='img'>TASK IMAGE</h3>
            <input type="file" multiple onChange={(e)=>{setimg(e.target.files)}}/>
            <input type="button" className='btn' value="Submit" onClick={Submit} />
        </form>
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

export default Task
