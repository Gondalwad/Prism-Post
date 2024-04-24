import { Link } from 'react-router-dom'
import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble,BsLinkedin } from 'react-icons/bs';

import Logo from './Logo'


export default function BottomFooter() {
    return (
        <Footer className='flex flex-col sm:flex-row md:flex-row border border-t-8 border-teal-500 rounded px-4 min-w-screen mx-1 p-5' >
            <div className="mx-auto py-3">
            <Link to='/' className='text-xl'>
                <Logo />
            </Link>
            </div>
            <div className="mx-auto">
                <Footer.Title className='' title='Developer : sudarshan gondalwad'/>
                <Footer.LinkGroup className='flex row justify-between'>
                    <Footer.Icon href='https://github.com/Gondalwad' target='_blank' icon={BsGithub}/>
                    <Footer.Icon href='www.linkedin.com/in/gondalwad' target='_blank' icon={BsLinkedin}/>
                    <Footer.Icon href='https://www.instagram.com/sudarshan_gondalwad/hl=en/' target='_blank' icon={BsInstagram}/>
                    <Footer.Icon href='https://www.instagram.com/sudarshan_gondalwad/hl=en/' target='_blank' icon={BsTwitter}/>
                </Footer.LinkGroup>

            </div>

        </Footer>
    )
}
