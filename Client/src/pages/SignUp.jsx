import React, { useState } from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

// Sign Up function
export default function SignUp() {
  // userstate
  let [formdata, setFormdata] = useState({});
  let [errormessage, setErrorMessage] = useState(null);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // function to handle and target formdata 
  function dataCollector(e) {
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() })
  }

  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrorMessage(null); // setting value to default to null when function is called
    setLoading(true);

    // Showing error for invalid inputs
    if (!formdata.username || !formdata.email || !formdata.password) {
      return setErrorMessage("All Fields are Mandatory")
    }
    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });

      const data = await res.json();
      // if error from serverside
      if (data.success === false) {
        // console.log(data);
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }

    } catch (err) {
      setErrorMessage(err);
      setLoading(false);
    }
  }




  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-3' >

        {/*######################## left ########################*/}
        <div className='flex-1'>
          <Link to='/' className='text-3xl font-bold  '>
            <Logo />
          </Link>
          <p className='text-xs mt-5'>
            "Dive into the prism of endless possibilities with us. Let every post you share sparkle and shine, illuminating the essence of your journey."
          </p>
        </div>
        {/*######################## Right ########################*/} {/*       form           */}
        <div className='flex-1'>
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            {/* ((((((( Username ))))))) */}
            <div>
              <Label className='' value='Your Username' />
              <TextInput
                type='text'
                placeholder='enter your username of choice'
                id='username'
                onChange={dataCollector}
              />
            </div>
            {/* ((((((((((( Email ))))))))))) */}
            <div>
              <Label className='' value='Your Email' />
              <TextInput
                type='email'
                placeholder='enter your email'
                id='email'
                onChange={dataCollector}
              />
            </div>
            {/* ((((((((( Password ))))))))) */}
            <div>
              <Label className='' value='Your Password' />
              <TextInput
                type='password'
                placeholder='enter your password of choice'
                id='password'
                onChange={dataCollector}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' outline disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span>Signing Up...</span>
                  </>
                ) : 'Sign UP'
              }
            </Button>
          </form>
          {/* ############## Option to Sign IN ############## */}
          <div className='mt-2 text-sm'>
            <span>Have an Account ?</span>
            <Link to='/sign-in' className='ml-2 text-blue-500'>
              Sign In
            </Link>
          </div>
          {
            errormessage && (
              <Alert className='mt-5' color='failure'>
                {errormessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
