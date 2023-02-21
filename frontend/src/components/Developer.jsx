import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import { FaTrash } from "react-icons/fa";
import { BsPlusLg,BsFileEarmarkExcelFill } from "react-icons/bs";
import {AiOutlineFilePdf} from 'react-icons/ai'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
}
.action-btns{
  display: flex;
  align-items:center;
}
button{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2rem;
  width: 10rem;
  margin-left: 10px;
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

.excel{
  background-color: #10793F;
  width: 10rem;
  font-size: 0.8rem;
  height: 2.2rem;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .excel-icon{
    margin-left: 10px;
  }
}
.pdf{
  font-size: 0.8rem;
  background-color: #ff5349;
  width: 10rem;
  height: 2.2rem;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .pdf-icon{
    margin-left: 10px;
  }
}
`

const Developer = () => {
  const [data,setData]=useState([])
  const nav=useNavigate()
  let serialnumber=0
  useEffect(()=>{
    axios.get('http://localhost:5000/api/developer/get-developer').then((res)=>setData(res.data))
  },[])

  const downloadExcel=async()=>{
    try {
      const response = await fetch('http://localhost:5000/api/developer/excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Developers_Data.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  }


  const downloadPdf=()=>{
    axios.get('http://localhost:5000/api/developer/pdf')
    .then(response => {
      const data = response.data;
      console.log(data)
      const docDefinition = {
        content: [
          { text: 'Developer Details', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*'],
              body: [
                ['Developer Name', ' Developer Email'],
                ...data.map(item => [item.developer_name, item.developer_email])
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          }
        }
      };
      pdfMake.createPdf(docDefinition).open();
    })
    .catch(error => {
      console.log(error);
    });
  }

 return(
  <Main>
  <div className="table-container">
      <div className="headingandadd">
      <div className="heading-c">
              <h3 className='task-heading'>ALL DEVELOPERS</h3>
            </div>
            <div className="action-btns">
              <p className='excel' style={{marginRight:'10px'}} download={true} onClick={downloadExcel}>Download Excel <BsFileEarmarkExcelFill className='excel-icon'/></p>
              <p className='pdf' onClick={downloadPdf}>Download PDF <AiOutlineFilePdf className='pdf-icon'/></p>
              <button onClick={()=>nav('/create-developer')}>Add Developer <BsPlusLg className='add'/></button>
            </div>
      </div>

      {
      data.length===0 ? <h3 className='no'>NO DEVELOPER REGISTERED</h3>:
      <table>
          <thead>
              <th>S No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Details</th>
              <th>Delete</th>
          </thead>
          <tbody>
              {
                  data.map((value)=>{
                  serialnumber+=1
                  return(
                          <tr key={value._id}>
                              <td data-label='S No'>{serialnumber}</td>
                              <td data-label='Name'>{value?.developer_name}</td>
                              <td data-label='Email' className='title'>{value.developer_email}</td>
                              <td data-label='Details' className='desc' onClick={() => nav(`/admin/dev/details/${value._id}`)}>Details</td>
                              <td data-label='Delete' onClick={()=>nav(`/deletedeveloper/${value._id}`)}><FaTrash/></td>
  
                          </tr>
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

export default Developer