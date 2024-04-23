import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-3' >
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='text-3xl font-bold  '>
            <Logo />
          </Link>
          <p className='text-xs mt-5'>
            "Dive into the prism of endless possibilities with us. Let every post you share sparkle and shine, illuminating the essence of your journey."
          </p>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-3'>
            <div>
              <Label className='' value='Your Username' />
              <TextInput
                type='text'
                placeholder='enter your username of choice'
                id='username'
              />
            </div>
            <div>
              <Label className='' value='Your Username' />
              <TextInput
                type='text'
                placeholder='enter your email'
                id='username'
              />
            </div>
            <div>
              <Label className='' value='Your Username' />
              <TextInput
                type='text'
                placeholder='enter your username of choice'
                id='username'
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' outline>
              Sign UP
            </Button>
          </form>
          <div className='mt-2 text-sm'>
            <span>Have an Account ?</span>
            <Link to='/sign-in' className='ml-2 text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
