import React from 'react'
import FaceBook from '../assets/facebook.svg'
import WhatsApp from '../assets/whatsapp.svg'
const Footer = () => {
  return (
    <div className='p-2 bg-blue-400 flex flex-row justify-around items-center text-lg font-semibold tracking-widest  dark:bg-slate-900 dark:text-white '>
      <div className='flex justify-center '>
        <p className=''> Made by : <span className='text-xl'>Amit 😁</span> </p>
      </div>
      <div className='flex flex-col justify-center m-2 items-center'>

        <div><img src={FaceBook} alt="Facebook" className='h-5 inline m-1'></img><a target="_blank" href='https://fb.com/amitnaskar2003'>FaceBook</a></div>
        <div><img src={WhatsApp} alt="WhatsApp" className='h-5 inline m-1'></img><a target="_blank" href='https://api.whatsapp.com/send/?phone=918910856469&text=Hey'>WhatsApp</a></div>

      </div>
    </div>
  )
}

export default Footer
