import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const menuOptions=[
    {
        id:1,
        name:'Home',
        path:'/dashboard'
    },
    {
        id: 2,
        name: 'History',
        path: '/dashboard/history'
    },
    {
        id: 3,
        name: 'Pricing',
        path: '/dashboard/billing'
    },
    {
        id: 4,
        name: 'Profile',
        path: '/dashboard/profile'
    }
]

const AppHeader = () => {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
        <Image src={'/logo.png'} width={90} height={50} alt='logo'/>
        <div className='hidden md:flex gap-12 items-center'>
            {menuOptions.map((item,index)=>(
                <Link href={item.path} key={index}>
                    <h2 className='cursor-pointer hover:font-semibold transition-all'>{item.name}</h2>
                </Link>
            ))}
        </div>
        <UserButton />
    </div>
  )
}

export default AppHeader