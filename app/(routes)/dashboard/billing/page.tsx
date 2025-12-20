import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='px-10 md:px-24 lg:px-48 md:mt-20 mt-5'>
        <h2 className='font-bold text-3xl mb-5 md:mb-10'>Join Subscription</h2>
        <PricingTable />
    </div>
  )
}

export default page