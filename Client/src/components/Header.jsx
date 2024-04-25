import { Avatar, Button, DropdownItem, Navbar, TextInput, Dropdown } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { useSelector } from 'react-redux';

export default function Header() {
    const location = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);


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
                <Button className='w-12 h-10 hidden sm:inline border border-grey-500 ' color='' pill >
                    <FaMoon />
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
                                <DropdownItem><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd" />
                                </svg>
                                    Profile</DropdownItem>
                            </Link>
                            <Dropdown.Divider />

                            <DropdownItem><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                            </svg> Sign Out
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
