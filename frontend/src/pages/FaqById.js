import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { languages } from '../utils/languages';
import {useSelector} from 'react-redux';
import { BtnBold, 
  BtnItalic, 
  createButton, 
  Editor, 
  EditorProvider, 
  Toolbar} from 'react-simple-wysiwyg'; // Import WYSIWYG editor
const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
const FaqById = () => {

  const {userData,token} = useSelector((state) => state.profile);
  const {faqid} = useParams();
  const [faq,setfaq] = useState(null);
  const [lang,setlang] = useState('non');

  const [formData,setformData] = useState({
       answer : '', 
       question : ''
  });

  // const [editorStateQuestion, setEditorStateQuestion] = useState('');
  // const [editorStateAnswer, setEditorStateAnswer] = useState('');

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
      const toastid = toast.loading('waiting for faqs ...');
        try {
            const response = await axios.post('http://localhost:4000/api/faqs/editfaq',{... formData,token,faqid});
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
            <div className='text-black'>
          <h3 className='font-bold mb-3'>Edit FAQ</h3>
          <div className='mb-3'>
            <label className='font-semibold'>Question:</label>
            <EditorProvider>
              <Editor
                value={formData.question}
                onChange={(e) => onEditorChangeQuestion(e)}
                placeholder='Type your question here...'
                name='question'
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
            className='px-4 py-2 bg-blue-500 text-white rounded-md mt-3'
          >
            Submit
          </button>
        </div>)
        }
    </div>
  )
}

export default FaqById