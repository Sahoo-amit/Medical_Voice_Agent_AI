"use client" 

import React, { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react' 

const menuOptions = [
    { id: 1, name: 'Home', path: '/dashboard' },
    { id: 2, name: 'Pricing', path: '/dashboard/billing' },
    { id: 3, name: 'About Us', path: '/dashboard/aboutus' },
    { id: 4, name: 'Contact Us', path: '/dashboard/contactus' }
]

const AppHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className='relative'>
            <div className='flex items-center justify-between p-4 shadow px-6 md:px-20 lg:px-40 bg-white'>
                <Image src={'/logo.png'} width={90} height={50} alt='logo' />
                <nav className='hidden md:flex gap-12 items-center'>
                    {menuOptions.map((item) => (
                        <Link href={item.path} key={item.id}>
                            <h2 className='cursor-pointer hover:font-semibold transition-all'>{item.name}</h2>
                        </Link>
                    ))}
                </nav>
                <div className='flex items-center gap-4'>
                    <UserButton />
                    <button
                        className='md:hidden p-2'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white shadow-lg z-50 md:hidden animate-in slide-in-from-top'>
                    <ul className='flex flex-col p-4'>
                        {menuOptions.map((item) => (
                            <Link
                                href={item.path}
                                key={item.id}
                                onClick={() => setIsOpen(false)}
                            >
                                <li className='py-4 border-b last:border-none text-center hover:bg-gray-50 transition-colors'>
                                    {item.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}

export default AppHeader