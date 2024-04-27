import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {Sidebar} from  'flowbite-react' 
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutSucess } from '../redux/user/userSlice'


// import { signOut } from './userActions/signOut.js'

export default function DashboardSideBar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    }, [location.search]);

  // SignOut User
  const signOut = async()=>{
    try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signOutSucess());
        }
      } catch (error) {
        console.log(error.message);
      }
}

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'user'} lablecolor='dark' as='div'>
                    Profile
                </Sidebar.Item> 
                </Link>
                <Sidebar.Item icon={HiArrowSmRight} onClick={signOut}  className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item> 
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
