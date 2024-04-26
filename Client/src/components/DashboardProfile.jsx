import React from 'react'
import { useSelector } from 'react-redux'
import { TextInput ,Button} from 'flowbite-react';
import { Link } from 'react-router-dom';
export default function DashboardProfile() {

const { currentUser } = useSelector(state => state.user);

    const handleSubmit = (e)=>{
        e.preventDefault();

    }

  return (
    <div className='flex flex-col max-w-xl w-full mx-auto'>
      <h1 className='text-center text-3xl my-7 p-3 font-semibold'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 min-w-full'> 
        <div className='W-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img src={currentUser.profileImage} alt="" className='h-full w-full rounded-full border-8 border-[lightgray]'/>
        </div>
        <TextInput type='text' defaultValue={currentUser.username} id='username' />
        <TextInput type = 'text' defaultValue={currentUser.email} id='email'/>
        <TextInput type='password' placeholder='********' id='password'/>
        <Button type='submit' gradientDuoTone='redToYellow' outline>
            Update
        </Button>   
      </form>
      <div className='flex flex-row justify-between text-red-400 text-xs mt-3'>
       
        <span className='cursor-pointer'>Sign Out</span>
        <span className='cursor-pointer'>Delete Account</span>
       
       
      </div>
    </div>
  )
}
