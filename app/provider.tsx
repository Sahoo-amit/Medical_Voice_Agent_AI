'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { UserDetailsContext } from '@/context/UserDetailsContext'

export interface UserDetails{
  name: string,
  email: string,
  credits: number
}

const Provider = ({children}:Readonly<{children: React.ReactNode}>) => {
    const {user} = useUser()
    const [userDetail, setUserDetail] = useState<UserDetails | undefined>()

    useEffect(()=>{
        user && createNewUser()
    },[user])

    const createNewUser = async ()=>{
        const result = await axios.post('/api/users')
        setUserDetail(result.data)
    }
  return (
    <div>
      <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
        {children}
      </UserDetailsContext.Provider>
    </div>
  )
}

export default Provider