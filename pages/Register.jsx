//for registration
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

export const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email:"",
    password:""
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:9000/api/v1/user/register", input);
      alert(res.data.message);
      navigate("/login")
      
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <>
    <div className='container shadow'>
      <h2 className='text-center my-3'>
        Register Here
      </h2>
      <div className='col-md-12 my-3 d-flex items-centre justify-content-center'>
        <div className='row'>
        <form onSubmit={handleSubmit}>
        <div className='row'>
          <label htmlFor='formGroupExampleInput' className='form-label'>
            Name
          </label>
          < input
          type='text'
          name="username"
          value={input.username}
          onChange={(e)=> setInput({...input, [e.target.name]: e.target.value})}
          className='form-control'
          placeholder='enter name'
          id="formGroupExampleInput"/>

        </div>
        <div className='mb-3'>
           <label htmlFor='formGroupExampleInput' className='form-label'>
            Email
          </label>
          < input
          type='text'
          name="email"
          className='form-control'
          placeholder='enter email'
          value={input.email}
          onChange={(e)=> setInput({...input, [e.target.name]: e.target.value})}
          id="formGroupExampleInput"/>

        </div>
        <div className='mb-3'>
           <label htmlFor='formGroupExampleInput' className='form-label'>
            Password
          </label>
          < input
          type='password'
          name="password"
          value={input.password}
          onChange={(e)=> setInput({...input, [e.target.name]: e.target.value})}
          className='form-control'
          placeholder='enter password'
          id="formGroupExampleInput"/>

        </div>
        <div className='mb-3'>
          <button type='submit' className='btn btn-primary btn-block'>
            Sign Up
          </button>
        </div>
        </form>
      </div>
      </div>
    </div>
    
    </>
  )
}
