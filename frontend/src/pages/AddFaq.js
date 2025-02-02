import React from 'react'
import Form from '../components/Form'

const AddFaq = () => {
  return (
    <div className='w-11/12 max-w-[1260px] flex flex-col items-center mx-auto m-2 p-2 gap-5'>
         <p className='text-3xl text-center underline font-bold font-mono'>ADD A FAQ</p>
         <Form/> 
    </div>
  )
}

export default AddFaq