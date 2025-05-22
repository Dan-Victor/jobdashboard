import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='fixed z-[999] bg-white w-full h-[80px] flex justify-between items-center px-[12px] sm:px-[20px] lg:px-[45px]'>
      <h1 className='text-[#1599e6] text-[18px] sm:text-[30px] font-bold'>Trustesse Dashboard</h1>
      <nav className='flex gap-[10px] sm:gap-[70px] text-[#000] text-[16px] sm:text-[20px] lg:pr-20'>
        <Link
          to="/"
          className='hover:border-b-3 hover:border-b-[#1599e6]'
        >
          Home
        </Link>
        <Link 
          to="/post-job" 
          className='hover:border-b-3 hover:border-b-[#1599e6]'
        >
          Post Job
        </Link>
      </nav>
    </header>
  )
}

export default Header