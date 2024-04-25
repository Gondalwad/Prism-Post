import { get } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardProfile from '../components/DashboardProfile'
import DashboardSideBar from '../components/DashboardSideBar'

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);

 
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* sidebar */}
      <div className='md:min-w-56'>

      <DashboardSideBar/>
      </div>

      {/* Profileler ... etc */}

      {tab === 'profile' && <DashboardProfile/>}
    </div>
  )
}
