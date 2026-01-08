// 'use client'

// import axios from 'axios'
// import { useParams, useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { doctorDetails } from '../../_components/Card'
// import { Circle, PhoneCall, PhoneOff } from 'lucide-react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import Vapi from '@vapi-ai/web'
// import { toast } from 'sonner'

// interface SessionDetails {
//   id: number,
//   notes: string,
//   sessionId: string,
//   createdOn: string,
//   report: JSON,
//   selectedDoctor: doctorDetails,
// }

// interface message {
//   role: string,
//   text: string
// }

// const MedicalVoiceAgent = () => {
//   const { id } = useParams()
//   const [sessionDetail, setSessionDetail] = useState<SessionDetails>()
//   const [callStarted, setCallStarted] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [vapiInstance, setVapiInstance] = useState<any>()
//   const [role, setRole] = useState<string | null>()
//   const [liveTranscript, setLiveTranscript] = useState<string>()
//   const [messages, setMessages] = useState<message[]>([])

//   const router = useRouter()

//   useEffect(() => {
//     id && getDetails()
//   }, [id])

//   const getDetails = async () => {
//     const result = await axios.get('/api/session-chat?sessionId=' + id)
//     setSessionDetail(result.data)
//   }

//   const startCall = () => {
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!)
//     setVapiInstance(vapi)
//     setLoading(true)

//     const VapiAgentConfig = {
//       name: "AI MedicalDoctor Voice Agent",
//       firstMessage: "Hi there! I'm your AI Medical Assistance. I'm here to help you with any health questions or concerns you might have today. How are you felling?",
//       transcriber: {
//         provider: 'assembly-ai',
//         language: 'en'
//       },
//       voice: {
//         provider: 'elevenlabs',
//         voiceId: sessionDetail?.selectedDoctor?.voiceId
//       },
//       model: {
//         provider: 'openai',
//         model: 'gpt-4o-mini',
//         messages: [
//           {
//             role: 'system',
//             content: sessionDetail?.selectedDoctor?.agentPrompt
//           }
//         ]
//       }
//     }

//     vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
//     // @ts-ignore
//     // vapi.start(VapiAgentConfig)
//     vapi.on('call-start', () => {
//       console.log('Call started')
//       setLoading(false)
//       setCallStarted(true)
//     });
//     vapi.on('call-end', () => {
//       console.log('Call ended')
//       setLoading(false)
//       setCallStarted(false)
//     });
//     vapi.on('message', (message) => {
//       if (message.type === 'transcript') {
//         const { role, transcript, transcriptType } = message
//         if (transcriptType == 'partial') {
//           setLiveTranscript(transcript)
//           setRole(role)
//         } else if (transcriptType == 'final') {
//           setMessages((prev: any) => [...prev, { role: role, text: transcript }])
//           setLiveTranscript('')
//           setRole(null)
//         }
//       }
//     });

//     vapiInstance.on('speech-start', () => {
//       console.log('Assistant started speaking');
//       setRole('assistance')
//     });
//     vapiInstance.on('speech-end', () => {
//       console.log('Assistant stopped speaking');
//       setRole('user');
//     });
//   }

//   const endCall = async () => {
//     const result = await generalReport()
//     if (!vapiInstance) return
//     vapiInstance.stop();
//     vapiInstance.off('call-start')
//     vapiInstance.off('call-end')
//     vapiInstance.off('message')
//     setCallStarted(false)
//     setVapiInstance(null)
//     toast.success('Your report is generated.')
//     router.replace('/dashboard')
//   };

//   const generalReport = async () => {
//     const result = await axios.post('/api/report', {
//       messages: messages,
//       sessionDetail: sessionDetail,
//       sessionId: id
//     })
//     console.log(result.data)
//     return result.data
//   }

//   return (
//     <div className='p-4 mt-4 border rounded-3xl bg-secondary'>
//       <div className='flex justify-between items-center'>
//         <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-lime-600' : 'bg-red-600'}`} /> {loading ? 'Connecting....' : (callStarted ? 'Connected....' : 'Not Connected')}</h2>
//         <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
//       </div>
//       {sessionDetail && <div className='flex items-center flex-col mt-10'>
//         <Image src={sessionDetail?.selectedDoctor?.image} alt='doctor' height={120} width={120} className='h-[100px] w-[100px] object-cover rounded-full' />
//         <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor?.specialist}</h2>
//         <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>
//         <div className='mt-10 flex justify-between items-center flex-col'>
//           {messages?.slice(-4).map((msg: message, index) => (
//             <div key={index}>
//               <h2 className='text-gray-400'>{msg.role}: {msg.text}</h2>
//             </div>
//           ))}
//           {liveTranscript && <h2 className='text-lg'>{role}: {liveTranscript}</h2>}
//         </div>
//         {callStarted ? <Button className='mt-20 cursor-pointer' variant={'destructive'} onClick={endCall}><PhoneOff />End Call</Button> : <Button className='mt-20 cursor-pointer' onClick={startCall}><PhoneCall />Start Call</Button>}
//       </div>}
//     </div>
//   )
// }

// export default MedicalVoiceAgent




'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { doctorDetails } from '../../_components/Card'
import { Circle, PhoneCall, PhoneOff, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Vapi from '@vapi-ai/web'
import { toast } from 'sonner'

export interface SessionDetails {
  id: number;
  notes: string;
  sessionId: string;
  createdOn: string;
  report: any;
  selectedDoctor: doctorDetails;
}

interface message {
  role: string;
  text: string;
}

const MedicalVoiceAgent = () => {
  const { id } = useParams()
  const router = useRouter()

  const [sessionDetail, setSessionDetail] = useState<SessionDetails>()
  const [callStarted, setCallStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEnding, setIsEnding] = useState(false) // New state for report generation progress
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null)
  const [role, setRole] = useState<string | null>()
  const [liveTranscript, setLiveTranscript] = useState<string>("")
  const [messages, setMessages] = useState<message[]>([])

  // Timer State
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (id) getDetails()
  }, [id])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStarted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [callStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + id)
    setSessionDetail(result.data)
  }

  const onCallStart = useCallback(() => {
    setLoading(false)
    setCallStarted(true)
    toast.info("Consultation started");
  }, []);

  const onCallEnd = useCallback(() => {
    setLoading(false)
    setCallStarted(false)
  }, []);

  const onMessage = useCallback((message: any) => {
    if (message.type === 'transcript') {
      const { role, transcript, transcriptType } = message
      if (transcriptType === 'partial') {
        setLiveTranscript(transcript)
        setRole(role)
      } else if (transcriptType === 'final') {
        setMessages((prev) => [...prev, { role: role, text: transcript }])
        setLiveTranscript('')
        setRole(null)
      }
    }
  }, []);

  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!)
    setVapiInstance(vapi)
    setLoading(true)

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);

    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
  }

  const endCall = async () => {
    if (!vapiInstance) return;

    setIsEnding(true); // Show loading on the button
    vapiInstance.stop();

    try {
      // 1. Generate report
      await generalReport();

      // 2. Cleanup listeners
      vapiInstance.off('call-start', onCallStart);
      vapiInstance.off('call-end', onCallEnd);
      vapiInstance.off('message', onMessage);

      setVapiInstance(null);
      setCallStarted(false);
      toast.success('Your report is generated.');
      router.replace('/dashboard');
    } catch (error) {
      toast.error("Call ended, but report failed to save.");
      router.replace('/dashboard');
    } finally {
      setIsEnding(false);
    }
  };

  const generalReport = async () => {
    return await axios.post('/api/report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: id
    })
  }

  return (
    <>
      {isEnding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-4 bg-background p-6 rounded-2xl shadow-xl">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              Generating your medical report...
            </p>
          </div>
        </div>
      )}

    <div className='p-4 mt-4 border rounded-3xl bg-secondary shadow-sm'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-3 border rounded-full bg-background flex gap-2 items-center text-sm font-medium'>
          <Circle className={`h-3 w-3 rounded-full ${callStarted ? 'fill-lime-600 text-lime-600 animate-pulse' : 'fill-red-600 text-red-600'}`} />
          {loading ? 'Connecting...' : (callStarted ? 'Live' : 'Disconnected')}
        </h2>
        <h2 className='font-mono font-bold text-xl text-primary'>{formatTime(timer)}</h2>
      </div>

      {sessionDetail && (
        <div className='flex items-center flex-col mt-10'>
          <div className="relative">
            <Image
              src={sessionDetail?.selectedDoctor?.image}
              alt='doctor'
              height={120}
              width={120}
              className={`h-[120px] w-[120px] object-cover rounded-full border-4 ${callStarted ? 'border-lime-500' : 'border-background'}`}
            />
            {callStarted && <span className="absolute bottom-2 right-2 h-4 w-4 bg-lime-500 border-2 border-white rounded-full"></span>}
          </div>

          <h2 className='mt-4 text-2xl font-semibold'>{sessionDetail?.selectedDoctor?.specialist}</h2>
          <p className='text-sm text-muted-foreground'>AI Medical Expert</p>

          <div className='mt-8 flex flex-col items-center w-full max-w-md min-h-[120px] px-4 py-6 bg-background/50 rounded-2xl border border-dashed'>
            {messages.length === 0 && !liveTranscript && (
              <p className="text-muted-foreground text-sm italic">Waiting for conversation to start...</p>
            )}
            {messages?.slice(-3).map((msg, index) => (
              <div key={index} className="mb-2 w-full">
                <p className={`text-sm ${msg.role === 'assistant' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  <span className="capitalize">{msg.role}</span>: {msg.text}
                </p>
              </div>
            ))}
            {liveTranscript && (
              <p className='text-md text-center font-medium animate-in fade-in slide-in-from-bottom-1'>
                {role === 'assistant' ? '👨‍⚕️' : '👤'}: {liveTranscript}
              </p>
            )}
          </div>

          {callStarted ? (
            <Button
              className="mt-12 w-full max-w-[200px] h-12 rounded-full shadow-lg transition-all hover:scale-105"
              variant="destructive"
              onClick={endCall}
              disabled={isEnding}
            >
              {isEnding ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Ending...
                </>
              ) : (
                <>
                  <PhoneOff className="mr-2 h-5 w-5" />
                  End Call
                </>
              )}
            </Button>
          ) : (
            <Button
              className="mt-12 w-full max-w-[200px] h-12 rounded-full shadow-lg transition-all hover:scale-105 bg-lime-600 hover:bg-lime-700"
              onClick={startCall}
              disabled={loading}
            >
              <PhoneCall className="mr-2 h-5 w-5" />
              Start Consultation
            </Button>
          )}

        </div>
      )}
    </div>
    </>
  )
}

export default MedicalVoiceAgent