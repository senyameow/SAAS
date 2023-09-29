import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
    return (
        <div className="fixed h-16 border border-black top-0 w-full px-12 py-2 flex justify-between items-center">
            <div>
                SenyameowDance
            </div>
            <div className="md:flex items-center gap-4">
                <Button variant={'ghost'}>Price</Button>
                <Button variant={'ghost'}>Sign In</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
        </div>
    )
}

export default Navbar