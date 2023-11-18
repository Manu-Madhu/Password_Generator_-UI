import React from 'react'
import Form from '../components/Form'

const Main = () => {
  return (
    <div className='container mx-auto w-full h-screen overflow-hidden flex flex-col items-center '>
      <h1 className='py-10 font-bold md:text-3xl'>Password Generator</h1>
      <Form/>
    </div>
  )
}

export default Main