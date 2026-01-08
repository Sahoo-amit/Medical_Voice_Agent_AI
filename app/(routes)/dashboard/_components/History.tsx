// 'use client'

// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import DoctorList from './DoctorList'
// import DialogBox from './DialogBox'
// import axios from 'axios'
// import { HistoryTable } from './HistoryTable'
// import { SessionDetails } from '../conversation/[id]/page'

// const History = () => {
//   const [history, setHistory] = useState<SessionDetails[]>([])

//   useEffect(()=>{
//     getHistory()
//   },[])

//   const getHistory = async ()=>{
//     const result = await axios.get('/api/session-chat?sessionId=all')
//     console.log(result.data)
//     setHistory(result.data)
//   }
//   return (
//     <div className='mt-10'>
//       {history.length === 0 ? <div className='flex items-center justify-center flex-col gap-3 p-6 border-2 rounded-2xl'>
//         <Image src={'/medical-assistance.png'} height={200} width={200} alt='doctor' />
//         <h2 className='font-semibold text-xl ml-5'>No Recent Consultations</h2>
//         <p>It looks like you haven't consulted with any doctors yet.</p>
//         <DialogBox />
//       </div> : <div>
//         <HistoryTable history={history}/>
//         </div>}
//       <DoctorList />
//     </div>
//   )
// }

// export default History

'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DoctorList from './DoctorList'
import DialogBox from './DialogBox'
import axios from 'axios'
import { HistoryTable } from './HistoryTable'
import { SessionDetails } from '../conversation/[id]/page'
import { Loader2 } from 'lucide-react' // Import the loader icon

const History = () => {
  const [history, setHistory] = useState<SessionDetails[]>([])
  const [loading, setLoading] = useState(true) // 1. Initialize loading state

  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async () => {
    try {
      setLoading(true) // Ensure loading is true if re-fetching
      const result = await axios.get('/api/session-chat?sessionId=all')
      setHistory(result.data)
    } catch (error) {
      console.error("Error fetching history:", error)
    } finally {
      setLoading(false) // 2. Stop loading regardless of success or error
    }
  }

  return (
    <div className='mt-10'>
      {/* 3. Conditional Rendering Logic */}
      {loading ? (
        <div className='flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-2xl'>
          <Loader2 className='h-10 w-10 text-blue-600 animate-spin' />
          <p className='mt-4 text-gray-500 animate-pulse'>Fetching your consultations...</p>
        </div>
      ) : history.length === 0 ? (
        <div className='flex items-center justify-center flex-col gap-3 p-6 border-2 rounded-2xl'>
          <Image src={'/medical-assistance.png'} height={200} width={200} alt='doctor' />
          <h2 className='font-semibold text-xl'>No Recent Consultations</h2>
          <p className='text-gray-500'>It looks like you haven't consulted with any doctors yet.</p>
          <DialogBox />
        </div>
      ) : (
        <div>
          <HistoryTable history={history} />
        </div>
      )}

      <DoctorList />
    </div>
  )
}

export default History