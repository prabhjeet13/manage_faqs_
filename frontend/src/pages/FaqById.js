import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { languages } from '../utils/languages';
import {useSelector} from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const FaqById = () => {

  const {userData} = useSelector((state) => state.profile);
  const {faqid} = useParams();
  const [faq,setfaq] = useState(null);
  const [lang,setlang] = useState('non');

  const [formData,setformData] = useState({
       answer : '', 
       question : ''
  });

  const fetchTranslated = async () =>
  {
      if(lang)
        {
          if(lang === "non") return;
          const toastid = toast.loading('waiting for faqs ...');
          try {
              const response = await axios.post(`http://localhost:4000/api/faqs/translatefaq?lang=${lang}`,{faqid});
              if(!response.data.success)
              {
                throw new Error('Not able to do');
              }else {
                setfaq(
                  { question : response.data.details.translated_question,
                    answer : response.data.details.translated_answer 
                  });
                toast.success('done');
              }
          }catch(e)
          {
              toast.error('Try Again later');
          }
          toast.dismiss(toastid);
        }
  }  

  // when we change any language
  useEffect( () => {
          fetchTranslated();  
          return () => {
              setlang(null);
          }
  },[lang]);
  
  // first-time for actual
  useEffect(() => {
    const fetch = async () => {
      const toastid = toast.loading('waiting for translation ...');
      try {
          const response = await axios.post('http://localhost:4000/api/faqs/getbyid',{faqid});
          if(!response.data.success)
          {
             throw new Error('Not able to do');
          }else {
            setfaq(response.data.details);
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

  if(!faq)
  {
       return <div className='text-3xl text-center underline font-bold font-mono'> 404 - NO FAQ ... </div>
  }

  return (
    <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-start'>
         <select className='p-3 m-2 w-fit rounded-md cursor-pointer bg-lime-300' onChange={(e) => setlang(e.target.value)}>
              <option value= "non"> select and translate to any language</option>
              {
                languages.map((lang) => {
                return (<option value={lang.code} className='bg-white'>{lang.language}</option>)
                })
              }  
         </select> 
         <p className='text-lg text-black font-bold p-3 m-2 bg-white rounded-md'>Q: {faq.question}</p>   
         <p className='text-lg text-black font-bold p-3 m-2 bg-white rounded-md'>Ans: {faq.answer}</p>   

        {/* EDITOR FOR ADMINS */}
        {
           userData.account_type === "admin" && (
            <div className="text-black w-full bg-gray-100 p-5 rounded-lg shadow-lg">
          <h3 className="font-bold mb-3">Edit FAQ</h3>
          <div className="mb-3">
            <label className="font-semibold">Question:</label>
            <CKEditor
              editor={DecoupledEditor}
              data={formData.question}
              onChange={(event, editor) => {
                const data = editor.getData();
                setformData((prev) => ({ ...prev, question: data }));
              }}
            />
          </div>
          <div className="mb-3">
            <label className="font-semibold">Answer:</label>
            <CKEditor
              editor={DecoupledEditor}
              data={formData.answer}
              onChange={(event, editor) => {
                const data = editor.getData();
                setformData((prev) => ({ ...prev, answer: data }));
              }}
            />
          </div>
        </div>)
        }
    </div>
  )
}

export default FaqById