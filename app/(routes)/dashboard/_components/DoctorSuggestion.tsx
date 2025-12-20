import React from 'react'
import { doctorDetails } from './Card'
import Image from 'next/image'

interface cardProps{
    item:doctorDetails,
    setSelectedDoctor:any,
    selectedDoctor:doctorDetails 
}

const DoctorSuggestion = ({item, setSelectedDoctor, selectedDoctor}:cardProps) => {
  return (
    <div className={`flex flex-col items-center justify-between border rounded-2xl shadow p-5 hover:border-blue-600 cursor-pointer ${selectedDoctor?.id==item.id && "border-blue-600"}`} onClick={()=>setSelectedDoctor(item)}>
        <Image src={item.image} width={70} height={70} alt='doc'className='h-[50px] w-[50px] rounded-4xl object-cover'/>
        <h2 className='font-bold text-sm'>{item.specialist}</h2>
        <p className='text-xs text-center line-clamp-2'>{item.description}</p>
    </div>
  )
}

export default DoctorSuggestion