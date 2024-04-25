import React, { useState } from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useDispatch , useSelector} from 'react-redux';
import { signInFailure,signInStart,signInSucess } from '../redux/user/userSlice';
import Oauth from '../components/Oauth';
// Sign Up function
export default function SignIn() {
  // userstate
  let [formdata, setFormdata] = useState({});

  // let [errorMessage, setErrorMessage] = useState(null);
  // let [loading, setLoading] = useState(false);

  const {loading,error:errorMessage} = useSelector(state =>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // function to handle and target formdata 
  function dataCollector(e) {
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() })
  }

  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // setting value to default to null when function is called
    dispatch(signInStart());

    // Showing error for invalid inputs
    if (!formdata.username || !formdata.password) {

      // setLoading(false);
      // return setErrorMessage("All Fields are Mandatory")
      dispatch(signInFailure('All Fields are Mandetory'));
    }

    try {
      const res = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });

      const data = await res.json();
      // if error from serverside
      if (data.success === false) {
        // console.log(data);
        dispatch(signInFailure(data.message));
      }

      // setLoading(false);
      if(res.ok){
        dispatch(signInSucess(data));
        navigate('/');
      }

    } catch (err) {
      dispatch(signInFailure(err.message));
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
          <p className='text-sm mt-5'>
            "Sign In Prism"
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
                placeholder='Username'
                id='username'
                onChange={dataCollector}
              />
            </div>
          
            {/* ((((((((( Password ))))))))) */}
            <div>
              <Label className='' value='Your Password' />
              <TextInput
                type='password'
                placeholder='********'
                id='password'
                onChange={dataCollector}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' outline disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span>Signing In...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
            <Oauth/>
          </form>
          {/* ############## Option to Sign IN ############## */}
          <div className='mt-2 text-sm'>
            <span>Don't Have an Account ?</span>
            <Link to='/sign-up' className='ml-2 text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
