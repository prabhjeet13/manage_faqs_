import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {userData} = useSelector((state) => state.profile);  
  const navigate = useNavigate();  
  if(!userData)
  {
       return <div className='text-3xl text-center underline font-bold font-mono w-11/12 mx-auto max-w-[1260px] '> 404 - NO USER FOUND ... </div>
  }
  
  return (
    <div className='w-11/12 mx-auto max-w-[1260px] flex flex-col gap-3 items-center p-3 m-4'>
         
        {userData && ( <div className='bg-blue-800 text-white flex flex-col gap-10 font-semibold p-3 m-4 rounded-md shadow-lg cursor-pointer text-lg '>  
                <div className='flex gap-1 items-center'>
                    <p>name : </p>
                    <p>{userData.name}</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p>email : </p>
                    <p>{userData.email}</p>
                </div>

                <div className='flex gap-1 items-center'>
                    <p>account_type : </p>
                    <p>{userData.account_type}</p>
                </div>

                {userData.account_type === "admin" && 
                    (<div onClick = {() => navigate('/add-faq')}className='p-2 bg-yellow-400 transition-all duration-200 hover:scale-90 cursor-pointer w-fit rounded-md uppercase text-black'>Add A Faq</div>)
                }
         </div>  
         )}
    </div>
  )
}

export default Profile