import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AllFaqs = () => {
  const [faqs,setfaqs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
        const toastid = toast.loading('waiting for faqs ...');
        try {
            const response = await axios.get('http://localhost:4000/api/faqs/getallfaqs');
            if(!response.data.success)
            {
               throw new Error('Not able to do');
            }else {
              setfaqs(response.data.details);
              toast.success('done');
            }
        }catch(e)
        {
            toast.error('Try Again later');
        }
        toast.dismiss(toastid);
    }
    fetch();
  },[]);

  if(!faqs)
  {
     return <div className='text-3xl text-center underline font-bold font-mono'> 404 - NO FAQS ... </div>
  }

  return (  
    <div className='w-11/12 mx-auto max-w-[1260px] flex flex-col gap-2'>  
          <p className='text-3xl text-center underline font-bold font-mono'> FAQs </p>
          <div className='grid grid-cols-2'>
            {
              faqs && faqs.map((faq) => {
                return (
                  <div onClick = {() => navigate(`/get-a-faq/${faq._id}`)} className='transition-all duration-200 hover:scale-90 p-3 m-2 bg-red-800 text-white font-semibold rounded-md cursor-pointer flex justify-between items-center'>
                        {faq.question}
                  </div>)
              })
            }
          </div>
    </div>
  )
}

export default AllFaqs