import React , { useEffect, useState } from 'react'
import imagebg from '../assets/images/imagebg.jpg';
import imagesignup from '../assets/images/imagesignup.png';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { setToken, setUserData } from '../slices/ProfileSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showpassword,setshowpassword] = useState(false);
    const [formData,setFormData] = useState({
      email: "",
      password : "",
    });

    const textboxvaluechange = (e) => {
      setFormData( (prev) => ({
         ...prev,
         [e.target.name] : e.target.value,
      }))
    }

    const submitHandler = async (e) => {
            e.preventDefault();
            const toastid = toast.loading('waiting for adding user ...');
            try {
            const response = await axios.post('http://localhost:4000/api/auth/signin',{... formData});
            if(!response.data.success)
            {
               throw new Error('Not able to do');
            }else {
              toast.success('done');
              localStorage.setItem('userData',JSON.stringify(response.data.details));
              localStorage.setItem('token',JSON.stringify(response.data.token));
              dispatch(setUserData(response.data.details)); 
              dispatch(setToken(response.data.token)); 
              navigate('/profile')
            }
            }catch(e)
            {
                toast.error('Try Again later');
            }
            toast.dismiss(toastid);   
        }

  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex flex-row mt-5 justify-evenly items-center gap-3'>
  
      <div className='w-[50%] flex flex-col gap-2'>
          <p className='text-xl font-semibold font-mono uppercase'> welcome again to faqs !!!</p>
          <form className='flex flex-col gap-5 font-semibold' onSubmit={submitHandler}>
            
              <div className='flex flex-col gap-1'>
                  <label htmlFor='email'>email</label>
                  <input onChange = {textboxvaluechange} value = {formData.email} type= 'text' name = 'email' id = 'email' placeholder='email' className='bg-white py-2 rounded-md  text-black border-2 border-black' required/>
              </div>

              <div className='flex flex-col gap-1 relative'>
                  <label htmlFor='password'>password</label>
                  <input onChange = {textboxvaluechange} value = {formData.password} type= {`${showpassword ? "text" : "password"}`} name = 'password' id = 'password' placeholder='password' className='bg-white py-2 rounded-md  text-black border-2 border-black' required/>
                  <FaEye onClick={() => {setshowpassword(false)} } className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-10 right-2`}  />
                  <FaEyeSlash onClick={() => {setshowpassword(true)}} className= {`${showpassword ? "invisible" : "visible"} absolute text-lg top-10 right-2`} />
              </div>
              <button type='Submit' className='bg-yellow-400 text-black Sign In font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95'>Sign In</button>
          </form>
          <div onClick = {() => navigate('/signup')} className='cursor-pointer shadow-sm font-mono text-lg font-bold text-red-700 underline'>Not have an Account ? </div>  
      </div>
      {/* image section */}
      <div className='w-[40%] relative '>
          <img src = {imagebg} className='absolute -right-3 -top-32 rounded-md'></img>
          <img src={imagesignup} className='absolute right-1 -top-28 rounded-md'></img>
      </div>
    </div>
  )
}

export default Signin