//adding category

import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export const AddCategory = () => {

    
    const navigate = useNavigate();
    const[input ,setInput] = useState({
        title:""
    })

    const handleCategory = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:9000/api/v1/add/category", input,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            alert(res.data.message)  
            navigate("/")          
        } catch (error) {
            alert(error.response.data.message)
        }
    }
  return (
    <>
    <div className='container shadow'>
        <h2 className='text-center my-3'>Add a New Category</h2>
        <div className='col-md-12m my-3 d-flex items-center justify-content-center'>
            <form onSubmit={handleCategory}>
                <div className='mb-3'>
                    <label htmlFor='formGroupExampleInput' className='form-control'>
                        Title
                    </label>
                    <br></br>
                    <input 
                        type='text'
                        name="title"
                        value={input.title}
                        onChange={ (e) => setInput({...input, [e.target.name]:e.target.value})}
                        className='form-control'
                        id='formGroupExampleInput'
                        placeholder='EnterTitle'/>
                </div>
                <div className='mb-3'>
                     <div className='mb-3'>
                        <button type='submit' className='btn btn-primary btn-block'>Add Blog</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    
    </>
  )
}
