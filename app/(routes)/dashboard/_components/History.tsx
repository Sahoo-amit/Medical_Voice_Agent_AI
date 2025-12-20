'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DoctorList from './DoctorList'
import DialogBox from './DialogBox'
import axios from 'axios'
import { HistoryTable } from './HistoryTable'
import { SessionDetails } from '../conversation/[id]/page'

const History = () => {
  const [history, setHistory] = useState<SessionDetails[]>([])

  useEffect(()=>{
    getHistory()
  },[])

  const getHistory = async ()=>{
    const result = await axios.get('/api/session-chat?sessionId=all')
    console.log(result.data)
    setHistory(result.data)
  }
  return (
    <div className='mt-10'>
      {history.length === 0 ? <div className='flex items-center justify-center flex-col gap-3 p-6 border-2 rounded-2xl'>
        <Image src={'/medical-assistance.png'} height={200} width={200} alt='doctor' />
        <h2 className='font-semibold text-xl ml-5'>No Recent Consultations</h2>
        <p>It looks like you haven't consulted with any doctors yet.</p>
        <DialogBox />
      </div> : <div>
        <HistoryTable history={history}/>
        </div>}
      <DoctorList />
    </div>
  )
}

export default History