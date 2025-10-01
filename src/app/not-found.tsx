import React from 'react'
import  Image  from 'next/image';
import errorImage from './../../public/screens/404.jpg'


const  ErrorPage  = () => {
  return (
    <div className='w-full md:w-[80%] mx-auto bg-amber-200 px-5 my-5 md:p-0'> 

<Image src={errorImage} alt='error'  />    
    </div>
  )
}

export default  ErrorPage 