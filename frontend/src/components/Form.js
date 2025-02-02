import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const {register,handleSubmit} = useForm(); 
  const navigate = useNavigate(); 
  const {token} = useSelector((state) => state.profile);
  const submitHandler = async (data) => {     
    const toastid = toast.loading('waiting for adding ...');
    try {
        const response = await axios.post('http://localhost:4000/api/faqs/createfaq',{... data,token});
        if(!response.data.success)
        {
           throw new Error('Not able to do');
        }else {
          toast.success('done');
          navigate('/get-all-faqs')
        }
    }catch(e)
    {
        toast.error('Try Again later');
    }
    toast.dismiss(toastid);   
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4 border-2 bg-white p-4 m-4 rounded-md'>
            <div className='flex flex-col gap-1'>
                          <label htmlFor='question' className='text-black text-lg'>
                              question
                          </label>
                          <input  type = 'text' id = 'question' name='question' placeholder='question' className='py-2 px-1 rounded-md  text-black bg-white border-2 border-black' required
                            { ...register('question') }
                          />
            </div>

            <div className='flex flex-col gap-1 '>
                          <label htmlFor='answer' className='text-black text-lg'>
                              answer
                          </label>
                          <input  type = 'text' id = 'answer' name='answer' placeholder='answer' className='py-2 px-1 rounded-md  text-black bg-white border-2 border-black' required
                            { ...register('answer') }
                          />
            </div>

            <button type = 'submit' className='bg-yellow-500 text-black text-lg font-mono font-bold rounded-full transition-all duration-200 hover:scale-90 p-2'>Add A FAQ</button>
    </form>
  )
}

export default Form
