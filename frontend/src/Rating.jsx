import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Main = styled.div`
margin: 1rem;
input{
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
`
const Rating = () => {
    const [data,setdata]=useState([])
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

    useEffect(()=>{
        axios.get('http://localhost:5000/api/rating/get')
        .then((res)=>setdata(res.data))
    },[])

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
      const submit=(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:5000/api/rating/post`,rating)
        .then((res)=>console.log(res))
    }

  return (
    <Main>
        <div className="post">
            <p>STAR1</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum1(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar1title(e.target.value)} />

            <p>STAR2</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum2(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar2title(e.target.value)} />

            <p>STAR3</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum3(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar3title(e.target.value)} />

            <p>STAR4</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum4(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar4title(e.target.value)} />

            <p>STAR5</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum5(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar5title(e.target.value)} />

            <p>STAR6</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum6(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar6title(e.target.value)} />

            <p>STAR7</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum7(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar7title(e.target.value)} />

            <p>STAR8</p>
            <input type="number" placeholder='number' onChange={(e)=>setnum8(e.target.value)}/>
            <input type="text" onChange={(e)=>setstar8title(e.target.value)} />

            <button onClick={submit}>submit</button>
        </div>

        <div className="get">
            {
                data.map((val)=>{
                                  
                })
            }
        </div>
    </Main>
  )
}

export default Rating
