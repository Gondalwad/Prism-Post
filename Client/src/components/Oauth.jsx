import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firbase'
import { useDispatch } from 'react-redux'
import { signInSucess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'


export default function Oauth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/user/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name : resultFromGoogle.user.displayName,
                    email : resultFromGoogle.user.email,
                    profileImage : resultFromGoogle.user.photoURL 
                })
            });
            const data = await res.json();
            console.log(data);
            if(res.ok){
                dispatch(signInSucess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={clickHandler}>
            <AiFillGoogleCircle className='w-6 h-6 mr-1' />
            <span>Continue With Google</span>
        </Button>
    )
}
