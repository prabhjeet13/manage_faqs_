import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserData } from '../slices/ProfileSlice';
const Navbar = () => {
  const navigate = useNavigate();
  const {userData} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(setUserData(null));
    dispatch(setToken(null));
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    if(userData.account_type === "user")
        navigate('/');
    else navigate('/admin/signin');
  }

  return (
    <div className='mx-auto w-11/12 max-w-[1260px] flex flex-row items-center justify-around text-black p-4 m-2 bg-gradient-to-r from-blue-700 to-slate-900 relative  gap-5 '>

        {userData && (     
            <div className='font-mono text-xl font-bold  text-white bg-black p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-90'>
                FAQs
            </div>
        )}

        {!userData && (     
            <div className='font-mono text-xl font-bold  text-white bg-black p-2 rounded-md'>
                SIGN-IN
            </div>
        )}

        {/* when user login */}
       {userData && (
        <div className='flex flex-row items-center gap-3 font-mono text-lg font-semibold cursor-pointer'>
                        <div onClick = {() => navigate('/profile')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                                <p>profile</p>
                        </div>    
                        <div onClick = {() => navigate('/get-all-faqs')} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                                <p>Explore FAQs</p>
                        </div>    
                        <div onClick = {logoutHandler} className='bg-amber-300 p-1 px-3 rounded-full transition-all duration-200 hover:scale-90'> 
                                <p>Log-out</p>
                        </div>    
        </div>
       )} 
        
    </div>                
)}

export default Navbar;