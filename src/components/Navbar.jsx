import React from 'react'
import {ImBook} from 'react-icons/im'

const Navbar = () => {
  return (
    <div className=' flex justify-center items-center p-12 text-4xl space-x-4'>
        <p><ImBook/></p>
        <p className='font-space font-bold'>Dictionary</p>
    </div>
  )
}

export default Navbar