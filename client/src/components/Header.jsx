import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <header>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>Attendance</h1>
                </Link>
                
                <ul className='flex gap-4'>
                <Link to='/profile'>
                        {currentUser? (
                                <li className=' sm:inline text-slate-700 hover:underline'>{`Welcome ${currentUser.name}`}</li>
                        ):(<li className=' sm:inline text-slate-700 hover:underline'>Sign In</li>)
                        }
                        </Link>
                        <Link to="/signup">
                        <li className='sm:inline text-slate-700 hover:underline'>Sign Up</li>
                        </Link>
                </ul>
        </div>
    </header>
  )
}

export default Header
