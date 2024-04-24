import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation} from 'react-router-dom'
import Logo from './Logo'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
    const location = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <Logo/>
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
            <AiOutlineSearch className='mx-'/>
        </Button>

        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline border border-grey-500 ' color='' pill >
                <FaMoon/>
            </Button>
            <Link to='/sign-up'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Sign UP
                </Button>
            </Link>
            <Navbar.Toggle/>
            
        </div>
        <Navbar.Collapse>
                {/* Location to Home */}
                <Navbar.Link active={location ==='/'} as={'div'}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link> 
                {/* Location to about */}
                <Navbar.Link active={location ==='/about'} as={'div'}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link> 
                {/* Location to Projects */}
                <Navbar.Link active={location ==='/projects'} as={'div'}>
                    <Link to="/projects">
                        Projects
                    </Link>
                </Navbar.Link> 
                    
            </Navbar.Collapse>
    </Navbar>
  )
}
