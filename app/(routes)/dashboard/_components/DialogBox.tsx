'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { ArrowRight, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { doctorDetails } from "./Card"
import DoctorSuggestion from "./DoctorSuggestion"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { SessionDetails } from "../conversation/[id]/page"

const DialogBox = () => {
    const [note, setNote] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [aidoctor, setAidoctor] = useState<doctorDetails[]>()
    const [selectedDoctor, setSelectedDoctor] = useState<doctorDetails>()
    const router = useRouter()
    const [historyList, setHistoryList] = useState<SessionDetails[]>([])
    const {has} = useAuth()

    const paidUser = has && has({plan:'pro'})

    useEffect(()=>{
        getHistoryList()
    },[])

    const getHistoryList = async()=>{
        const result = await axios.get('/api/session-chat?sessionId=all')
        setHistoryList(result.data)
    }

    const handleClick = async () => {
        setLoading(true)
        try {
            const result = await axios.post('/api/ai', { notes: note })
            setAidoctor(result.data)
        } catch (error) {
            console.error("AI fetch failed", error)
        } finally {
            setLoading(false)
        }
    }

    const onStartConsaltation = async () => {
        setLoading(true)
        try {
            const result = await axios.post('/api/session-chat', {
                notes: note,
                selectedDoctor: selectedDoctor
            })
            if (result.data?.sessionId) {
                router.push('/dashboard/conversation/' + result.data.sessionId)
            }
        } catch (error) {
            console.error("Consultation start failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-3" disabled={!paidUser && historyList?.length >=1}>+ Start a Consultation</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        {!aidoctor ? (
                            <div className="space-y-2">
                                <h2 className="font-medium text-foreground">Add Symptoms or Any Other Details</h2>
                                <Textarea
                                    placeholder="Add Details Here..."
                                    className="h-[150px]"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <h2 className="font-medium text-foreground">Select the doctor</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    {aidoctor.map((item, index) => (
                                        <DoctorSuggestion
                                            item={item}
                                            key={index}
                                            setSelectedDoctor={() => setSelectedDoctor(item)}
                                            selectedDoctor={selectedDoctor!}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>

                    {!aidoctor ? (
                        <Button onClick={handleClick} disabled={!note || loading}>
                            Next {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    ) : (
                        <Button disabled={!selectedDoctor || loading} onClick={onStartConsaltation}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Start Consultation
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogBox