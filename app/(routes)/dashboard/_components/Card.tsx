'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export interface doctorDetails {
  id: number,
  specialist: string,
  description: string,
  image: string,
  agentPrompt: string,
  voiceId: string,
  subscriptionRequired:boolean
}

interface cardProps {
  item: doctorDetails
}

const Card = ({ item }: cardProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {has} = useAuth()
  const hasPremiumAccess = has && has({plan:'pro'})

  const startConsultation = async()=>{
    setLoading(true)
    const result = await axios.post('/api/session-chat', {notes:'New Query', selectedDoctor: item})
    console.log(result.data)
    if (result.data?.sessionId) {
      router.push('/dashboard/conversation/' + result.data.sessionId)
    }
    setLoading(false)
  }

  return (
    <div className='relative'>
      {item.subscriptionRequired && <Badge className='absolute m-2 px-2 py-1 right-0'>Premium</Badge>}
      <Image src={item.image} width={200} height={300} alt='doctor' className='w-full h-[250px] object-cover rounded-2xl' />
      <h2 className='font-bold mt-1'>{item.specialist}</h2>
      <p className='line-clamp-2 text-sm text-gray-500'>{item.description}</p>
      <Button className='w-full mt-2' onClick={()=>startConsultation()} disabled={!hasPremiumAccess && item.subscriptionRequired}>Start Consultation {loading ? <Loader2 className='animate-spin'/> : <IconArrowRight />}</Button>
    </div>
  )
}

export default Card