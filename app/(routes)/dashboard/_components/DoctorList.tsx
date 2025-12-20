import { AIDoctorAgents } from '@/list'
import React from 'react'
import Card from './Card'

const DoctorList = () => {
  return (
    <div>
        <h2 className='text-lg mt-5 font-bold'>AI Specialist Doctors</h2>
        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {AIDoctorAgents.map((item,index)=>(
                <div key={index}>
                    <Card item={item}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorList