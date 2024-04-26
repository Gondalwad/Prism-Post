import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { TextInput, Button, Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firbase'

// ciculas progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashboardProfile() {

  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

  }

  const handleImagesUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile])

  // upload image to firbase google
  const uploadImage = async () => {
    console.log("Uploading...");
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));

      },
      (error) => {
        setImageFileUploadError('Faild to Upload Image (Image size must be less than 2MB) ');
        setImageUploadProgress(null);
        setImageFile(null)
        setImageUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setImageUploadProgress(null);
          
        });
      }
    );
  }



  return (
    <div className='flex flex-col max-w-xl w-full mx-auto'>
      <h1 className='text-center text-3xl my-7 p-3 font-semibold'>Profile</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-5 min-w-full'>
        <input type="file" name="" id="" accept='image/*' hidden onChange={handleImagesUpload} ref={inputRef} />
        <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => inputRef.current.click()}>
          {imageUploadProgress && (
            <CircularProgressbar value = {imageUploadProgress || 0} 
            text = {`${imageUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62, 152, 199, ${
                  imageUploadProgress / 100
                })`,
              },
            }}
            />
          )}

          <img src={imageUrl || currentUser.profileImage} alt=""  className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageUploadProgress &&
              imageUploadProgress < 100 &&
              'opacity-60'
            }`} />
        </div>
        {
          imageFileUploadError &&(
            <Alert color='failure'>{imageFileUploadError}</Alert>
          )
        }
        <TextInput type='text' defaultValue={currentUser.username} id='username' />
        <TextInput type='text' defaultValue={currentUser.email} id='email' />
        <TextInput type='password' placeholder='********' id='password' />
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
