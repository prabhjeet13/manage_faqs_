import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { languages } from '../utils/languages';
import {useSelector} from 'react-redux';
import { BtnBold, 
  BtnItalic, 
  createButton, 
  Editor, 
  EditorProvider, 
  Toolbar} from 'react-simple-wysiwyg'; // Import WYSIWYG editor
// import 'react-simple-wysiwyg/dist/react-simple-wysiwyg.css';
const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
const FaqById = () => {

  const {userData,token} = useSelector((state) => state.profile);
  const {faqid} = useParams();
  const [faq,setfaq] = useState(null);
  const [lang,setlang] = useState('non');
  const navigate = useNavigate();

  const [formData,setformData] = useState({
       answer : '', 
       question : ''
  });


  const onEditorChangeQuestion = (e) => {
    setformData((prev) => ({ ...prev, [e.target.name] : e.target.value }));
  };
  
  const onEditorChangeAnswer = (e) => {
    setformData((prev) => ({ ...prev, [e.target.name] : e.target.value }));
  };

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

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      const toastid = toast.loading('waiting for faqs ...');
        try {
            const response = await axios.post('http://localhost:4000/api/faqs/editfaq',{... formData,token,faqid});
            if(!response.data.success)
            {
               throw new Error('Not able to do');
            }else {
              setfaq(response.data.details);
              formData.answer = '';
              formData.question = '';
              toast.success('done');
              navigate(`/get-a-faq/${faqid}`);;
            }
        }catch(e)
        {
            toast.error('Try Again later');
        }
        toast.dismiss(toastid);
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
        <div className='text-black w-[50%] m-2'>
          <h3 className='font-bold mb-3 underline text-3xl font-mono uppercase'>Edit FAQ</h3>
          <div className='mb-3'>
            <label className='font-semibold'>Question:</label>
            <EditorProvider>
              <Editor
                value={formData.question}
                onChange={(e) => onEditorChangeQuestion(e)}
                placeholder='Type your question here...'
                name='question'
                className='w-[10/12]'
              >
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnAlignCenter />
                </Toolbar>
              </Editor>
            </EditorProvider>
          </div>
          <div className='mb-3'>
            <label className='font-semibold'>Answer:</label>
            <EditorProvider>
              <Editor
                value={formData.answer}
                onChange={(e) => onEditorChangeAnswer(e)}
                placeholder='Type your answer here...'
                name='answer'
              >
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnAlignCenter />
                </Toolbar>
              </Editor>
            </EditorProvider>
          </div>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-yellow-500 text-black rounded-md mt-3 font-bold transition-all duration-200 hover:scale-90'
          >
            Submit
          </button>
        </div>)
        }
    </div>
  )
}

export default FaqById