import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// All Pages of the website
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import CreatePost from './pages/CreatePost.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
// Default Export Component
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>


  )
}
