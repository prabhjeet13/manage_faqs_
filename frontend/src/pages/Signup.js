import React , { useEffect, useState } from 'react'
import imagebg from '../assets/images/imagebg.jpg';
import imagesignup from '../assets/images/imagesignup.png';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import {toast} from 'react-hot-toast';
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
    const [showpassword,setshowpassword] = useState(false);
    const [showconfirmpassword,setshowconfirmpassword] = useState(false);
    const [formData,setFormData] = useState({
      name : "",
      email: "",
      password : "",
      confirmPassword: "",
      account_type : "",
    });


    const textboxvaluechange = (e) => {
      setFormData( (prev) => ({
        ...prev,
        [e.target.name] : e.target.value,
      })
    )}
    const submitHandler = async (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword)
        {
          toast.error('both passwords are not matched try again');
          return;
        }

        const toastid = toast.loading('waiting for adding user ...');
        try {
        formData.account_type = "user";  
        const response = await axios.post('http://localhost:4000/api/auth/signup',{... formData});
        if(!response.data.success)
        {
           throw new Error('Not able to do');
        }else {
          toast.success('done');
          navigate('/')
        }
        }catch(e)
        {
            toast.error('Try Again later');
        }
        toast.dismiss(toastid);   
    }

  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex flex-row items-center justify-evenly mt-5 gap-36'>

        {/* form section */}
         <div className='w-[50%] flex flex-col gap-2 '>
            <form className='flex flex-col gap-5 font-mono font-semibold text-xl' onSubmit={submitHandler}>
             
          
                <div className='flex flex-col gap-1 md:w-[85%]'>
                          <label htmlFor='name' className='text-white'>
                              name
                          </label>
                          <input onChange = {textboxvaluechange} value = {formData.name} type = 'text' id = 'name' name='name' placeholder='name' className='py-2 px-1 rounded-md  text-black bg-white border-2 border-black' required/>
                </div>

                <div className='flex flex-col md:w-[85%]'>
                  <label htmlFor='email' className='text-white'> 
                      email
                  </label>
                  <input onChange = {textboxvaluechange} value = {formData.email} type = 'text' id = 'email' name = 'email' placeholder='email' className='border-2 border-black py-2 rounded-md px-3 text-black' required/>
                </div>



              <div className='md:flex md:flex-row gap-2 flex flex-col'>
                <div className='flex flex-col gap-1 relative'>
                          <label htmlFor='password' className='text-white'> password </label>
                          <input onChange = {textboxvaluechange} value = {formData.password} type = {`${showpassword ? "text" : "password" }`} id = 'password' name='password' placeholder='password' className='px-1 border-2 border-black py-2 rounded-md  text-black' required/>
                          <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2 cursor-pointer`}  />
                          <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2 cursor-pointer`} />
                </div>
                <div className='flex flex-col gap-1 relative'>
                <label htmlFor='confirmPassword' className='text-white'> confirm password </label>
                          <input onChange = {textboxvaluechange} value = {formData.confirmPassword} type = {`${showconfirmpassword ? "text" : "password" }`} id = 'confirmPassword' name='confirmPassword' placeholder='confirm Password' className='border-2 border-black py-2 rounded-md  text-black px-1' required/>
                          <FaEye onClick={() => {setshowconfirmpassword(false)} } className={`${showconfirmpassword ? "visible" : "invisible"} absolute text-lg top-12 right-2 cursor-pointer`}  />
                          <FaEyeSlash onClick={() => {setshowconfirmpassword(true)}} className= {`${showconfirmpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2 cursor-pointer`} />
                </div>
              </div>


              <button type='Submit' className='bg-yellow-500 text-black text-xl font-mono font-medium px-4 py-2 rounded-md w-[85%] transition-all duration-200 hover:scale-95 hover:bg-yellow-400'>
                  Join Us
              </button>

            </form>
            <div onClick = {() => navigate('/')} className='cursor-pointer shadow-sm font-mono text-lg font-bold text-red-700 underline'>Back to sign-in ? </div>  
         </div>
        {/* image part*/}
        <div className='w-[40%] relative '>
          <img src= {imagebg} className='absolute -right-3 -top-40 rounded-md'/>
          <img src={imagesignup} className='absolute right-1 -top-28 rounded-md'></img>
        </div>
    </div>
  )
}

export default Signup