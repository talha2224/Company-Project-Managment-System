import axios from 'axios'
import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
const Main = styled.div`
letter-spacing: 1px;
.setrating{
    margin: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 10px;
    p{
        margin-bottom: 10px;
        margin-top: 10px;
    }
    input{
        display: block;
        margin-top: 10px;
        outline: none;
        width: 12rem;
        border: none;
        border-bottom:1px solid gray ;
        padding-bottom: 3px;
    }
}
.button-rating-post{
    margin-top: 10px;
    width: 10rem;
    height: 2.2rem;
    background-color: #008080;;
    outline: none;
    border: none;
    cursor: pointer;
    color: white;
}
`
const ShowRating = () => {
    //USESTATE FOR SAVING
    
    const [star1title, setstar1title] = useState('')
    const [star2title, setstar2title] = useState('')
    const [star3title, setstar3title] = useState('')
    const [star4title, setstar4title] = useState('')
    const [star5title, setstar5title] = useState('')
    const [star6title, setstar6title] = useState('')
    const [star7title, setstar7title] = useState('')
    const [star8title, setstar8title] = useState('')

    const [num1, setnum1] = useState('')
    const [num2, setnum2] = useState('')
    const [num3, setnum3] = useState('')
    const [num4, setnum4] = useState('')
    const [num5, setnum5] = useState('')
    const [num6, setnum6] = useState('')
    const [num7, setnum7] = useState('')
    const [num8, setnum8] = useState('')

    const nav = useNavigate()

    const postRating=(e)=>{
        const rating = {
            star1: { title: star1title , value: num1 },
            star2: { title: star2title, value:  num2 },
            star3: { title: star3title, value: num3 },
            star4: { title: star4title, value: num4 },
            star5: { title: star5title, value: num5 },
            star6: { title: star6title, value: num6},
            star7: { title: star7title, value: num7 },
            star8: { title: star8title, value: num8 },
        };
        if(!star1title|| !star2title || !star3title || !star4title ||!star4title|| !star5title || !star6title || !star7title  || !star8title || !num1|| !num2 || !num3 || !num4 ||!num5|| !num6 || !num7 || !num8){
            toast.error('ALL FIELDS ARE REQUIRED')
        }
        else{
            e.preventDefault()
            axios.post(`http://localhost:5000/api/rating/post`,rating)
            .then((res)=>{
                console.log(res)
                if(res.status===201){
                    toast('Ratings Posted')
                    setTimeout(() => {
                        nav('/admin/rating')
                    }, 2000);
                }
            })
        }
    
  }

  return (
    <Main>
        <NavbarAdmin/>
          <div className="setrating">

            <div className="content">

              <div className="part1star">
                <p>STAR1</p>
                <input type="text" onChange={(e)=>setstar1title(e.target.value)} placeholder='Rate Title' />
                <input type="number" min={0} max={5} placeholder='Rating Value B/W 1 to 5' onChange={(e)=>setnum1(e.target.value)}/>

                <p>STAR2</p>
                <input type="text" onChange={(e)=>setstar2title(e.target.value)} placeholder='Rate Title' />
                <input type="number" min={0} max={5} placeholder='Rating Value B/W 1 to 5' onChange={(e)=>setnum2(e.target.value)}/>

                <p>STAR3</p>
                <input type="text" onChange={(e)=>setstar3title(e.target.value)}  placeholder='Rate Title'/>
                <input type="number" min={0} max={5} placeholder='Rating Value B/W 1 to 5' onChange={(e)=>setnum3(e.target.value)}/>

                <p>STAR4</p>
                <input type="text" onChange={(e)=>setstar4title(e.target.value)} placeholder='Rate Title'/>
                <input type="number" min={0} max={5} placeholder='Rating Value B/W 1 to 5' onChange={(e)=>setnum4(e.target.value)}/>
              </div>

              <div className="part2star">
                <p>STAR5</p>
                <input type="text" onChange={(e)=>setstar5title(e.target.value)} placeholder='Rate Title'/>
                <input type="number" placeholder='Rating Value B/W 1 to 5' min={0} max={5}  onChange={(e)=>setnum5(e.target.value)}/>

                <p>STAR6</p>
                <input type="text" onChange={(e)=>setstar6title(e.target.value)} placeholder='Rate Title'/>
                <input type="number" placeholder='Rating Value B/W 1 to 5' min={0} max={5} onChange={(e)=>setnum6(e.target.value)}/>

                <p>STAR7</p>
                <input type="text" onChange={(e)=>setstar7title(e.target.value)}placeholder='Rate Title' />
                <input type="number" placeholder='Rating Value B/W 1 to 5' min={0} max={5} onChange={(e)=>setnum7(e.target.value)}/>

                <p>STAR8</p>
                <input type="text" onChange={(e)=>setstar8title(e.target.value)} placeholder='Rate Title' />
                <input type="number" placeholder='Rating Value B/W 1 to 5' min={0} max={5} onChange={(e)=>setnum8(e.target.value)}/>
              </div>
            </div>
            <button onClick={postRating} className='button-rating-post'>SUBMIT</button>

          </div>
          <ToastContainer
            position="top-center"
            autoClose={2000}
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

export default ShowRating
