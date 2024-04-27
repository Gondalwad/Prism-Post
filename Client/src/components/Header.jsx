import { Avatar, Button, DropdownItem, Navbar, TextInput, Dropdown } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo'
import { AiOutlineSearch } from 'react-icons/ai';
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { FaMoon , FaSun } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSucess } from '../redux/user/userSlice';

export default function Header() {
    const location = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const {theme} = useSelector(state=>state.theme)
    const dispatch = useDispatch();

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
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <Logo />
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='search . . .'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden border border-grey-500 hover:bg-indigo-300' color='grey' pill>
                <AiOutlineSearch className='mx-' />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline border border-grey-500 ' color='' pill onClick={()=>dispatch(toggleTheme())} >
                    {
                        theme === 'dark' ?(<FaSun/>):(<FaMoon/>)
                    }
                    
                </Button>
                {
                    currentUser ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <img src={currentUser.profileImage}
                                    className='h-10 w-10 rounded-full'
                                />
                            }
                        >
                            <Dropdown.Header>
                                <h3>
                                    <span>@{currentUser.username}</span>
                                </h3>
                                <h4>
                                    <span className='font-bold'>{currentUser.email}</span>
                                </h4>
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Link to={'/dashboard?tab=profile'}>
                                <DropdownItem icon={HiUser} >
                                    Profile</DropdownItem>
                            </Link>
                            <Dropdown.Divider />

                            <DropdownItem onClick={signOut} icon={HiArrowSmRight}> Sign Out
                            </DropdownItem>



                        </Dropdown>




                    ) :
                        (
                            <Link to='/sign-up'>
                                <Button gradientDuoTone='purpleToBlue' outline>
                                    Sign UP
                                </Button>
                            </Link>
                        )
                }
                <Navbar.Toggle />

            </div>
            <Navbar.Collapse>
                {/* Location to Home */}
                <Navbar.Link active={location === '/'} as={'div'}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                {/* Location to about */}
                <Navbar.Link active={location === '/about'} as={'div'}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link>
                {/* Location to Projects */}
                <Navbar.Link active={location === '/projects'} as={'div'}>
                    <Link to="/projects">
                        Projects
                    </Link>
                </Navbar.Link>

            </Navbar.Collapse>
        </Navbar>
    )
}
