//login form
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
const navigate = useNavigate()
const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:9000/api/v1/user/login", input)
    alert(res.data.message);
    console.log(res.data);
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("username",res.data.name);
    navigate("/")

    
  } catch (error) {
    alert(error.response.data.message)
  }
}  

const [input,setInput] = useState({
  email:"",
  password:""
})

  return (
    <>
     <div className='container shadow'>
      <h2 className='text-center my-3'>
        Login  Here
      </h2>
      <div className='col-md-12 my-3 d-flex items-centre justify-content-center'>
        <div className='row'>
        <form onSubmit={handleSubmit}>
       
        <div className='mb-3'>
           <label htmlFor='formGroupExampleInput' className='form-label'>
            Email
          </label>
          < input
          type='text'
          name="email"
          value={input.email}
          onChange={(e)=> setInput({...input, [e.target.name]: e.target.value})}
          className='form-control'
          placeholder='enter email'
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
            Login
          </button>
        </div>
        </form>
      </div>
      </div>
    </div>
    
    </>

    
  )
}
