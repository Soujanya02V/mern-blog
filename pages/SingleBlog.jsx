import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const SingleBlog = () => {
  const {id} = useParams();
  const navigate = useNavigate()
   const[blog,setBlog]= useState({})

    useEffect (()=>{
        const fetchSingleBlog = async () =>{
          const res = await axios.get(`http://localhost:9000/api/v1/get/blogs/${id}`,{
             headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
          }
           
            
          );
          setBlog(res.data)
          
        }
        fetchSingleBlog()
    },[id])
  return (
   
    <>
    <div className='container-shadow my-3'>
        <div className='col-md-12 d-flex items-center justify-content-center bg-light'>
            <div className='row'>
                <h1 className='my-3'>{blog.title}</h1>
                
                <img src={`http://localhost:9000/${blog.thumbnail}`} alt='imagiee'className='img img-responsive img-rounded my-3'/>
                <p className='my-3'>{blog.description}</p>

            </div>
        </div>
        <button className='btn btn-primary' onClick={()=>navigate("/")

        }>Back To Post</button>
    </div>

    </>
  )
}
