import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { TextInput, Button, Alert, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firbase'
import {updateStart,updateSuccess,updateFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutSucess} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
// import { signOut } from './userActions/signOut.js';
// ciculas progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashboardProfile() {

  const { currentUser,loading } = useSelector(state => state.user); // to get current user from the device where logged in
  const [imageFile, setImageFile] = useState(null); // to get the image file selected
  const [imageUrl, setImageUrl] = useState(null); // to change the profile image url 
  const [imageUploadProgress, setImageUploadProgress] = useState(null); // to show the image upload progress
  const [imageFileUploadError, setImageFileUploadError] = useState(null); // to set functionlaity if image upload error occurs
  const [imageFileUploading, setImageFileUploading] = useState(false); // to avoid conflits of updates while uploading image
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null); // to set functionality of update success
  const [updateUserError, setUpdateUserError] = useState(null); // to set functionality if update user error occurs 
  const [showModal, setShowModal] = useState(false);/// to open and close delete cofirm box
  const [formData,setFormData] = useState({}); // to collect form data if updated


  const inputRef = useRef();
  const dispatch = useDispatch();
  
  //////////////// Handles Image Upload
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

  //////////////// upload image to firbase google

  const uploadImage = async () => {
    setImageFileUploading(true);
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
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setImageUploadProgress(null);
          setFormData({...formData, profileImage : downloadURL});
          setImageFileUploading(false);
          
        });
      }
    );
  }

  ////////////////// Collects form data
    const formDataCollector = (e)=>{
      setFormData({...formData, [e.target.id] : e.target.value});
      
    }
    
//// //////////////Handle submission of form
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
    if(Object.keys(formData).length == 0){
      setUpdateUserError('No changes made');
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload');
      return;
    }

    try{
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserError(null);
        setUpdateUserSuccess("User's profile updated successfully");
      }
    }catch(error){
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }

  }

  //////////////////// Delete User Handler
  const handleDeleteUser = async()=>{
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }

  }

  ////////////////////////  Sign Out User
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
        <TextInput type='text' defaultValue={currentUser.username} id='username'  onChange={formDataCollector}/>
        <TextInput type='text' defaultValue={currentUser.email} id='email' onChange={formDataCollector} />
        <TextInput type='password' placeholder='********' id='password' onChange={formDataCollector} />
        <Button type='submit' gradientDuoTone='redToYellow' outline disabled={imageFileUploading || loading}>
          {
            loading ? 'Loading...' : 'Update'
          }
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={'/create-post'}>
            <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>
              Create Post 
            </Button>
            </Link>
          )
        }
      </form>
      <div className='flex flex-row justify-between text-red-400 text-xs mt-3'>

        <span className='cursor-pointer' onClick={signOut} >Sign Out</span>
        <span className='cursor-pointer' onClick={()=>setShowModal(true)}>Delete Account</span>
      </div>
      {/* update reporter */}
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {/*  Delte User Reporter */}
      <Modal show={showModal} onClose = {()=>setShowModal(false)} popup side='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}
