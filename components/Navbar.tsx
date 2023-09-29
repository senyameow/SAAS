import React from 'react'
import { Button } from './ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = () => {
    return (
        <div className="fixed h-16 z-30 bg-white/60 backdrop-blur-sm transition-all top-0 w-full px-12 py-2 flex justify-between items-center">

            <div>
                SenyameowDance
            </div>
            <div className="md:flex items-center gap-4">
                <Button variant={'ghost'}>Price</Button>
                <LoginLink><Button variant={'ghost'}>Sign In</Button></LoginLink>
                <RegisterLink><Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button></RegisterLink>
            </div>
        </div>
    )
}

export default Navbar