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
import { SessionDetails } from "../conversation/[id]/page"
import moment from 'moment'
import { CalendarDays, Activity, FileText, User, Clock, Pill, ClipboardCheck } from "lucide-react"

interface props {
    item: SessionDetails
}

export function ReportDialog({ item }: props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" size={'sm'} variant={'link'}>
                    View Report
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto print:max-w-full print:h-auto print:shadow-none">
                <DialogHeader>
                    <DialogTitle asChild>
                        <h2 className="text-3xl text-blue-600 font-extrabold tracking-tight border-b pb-4 text-center">
                            Medical Consultation Report
                        </h2>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="text-slate-700 space-y-6 pt-4">
                            <section className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-700 text-sm uppercase tracking-wider flex items-center gap-2 mb-3">
                                    <FileText className="h-4 w-4" /> Session Information
                                </h3>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <p className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">Specialist:</span> {item.selectedDoctor?.specialist}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">Agent:</span> {item?.report?.agent || "AI Assistant"}
                                    </p>
                                    <p className="flex items-center gap-2 col-span-2">
                                        <CalendarDays className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">Date:</span> {moment(item.createdOn).format('MMMM DD, YYYY')}
                                    </p>
                                    <p className="flex items-center gap-2 col-span-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">Time:</span> {moment(item.createdOn).format('hh:mm A')} ({moment(item?.createdOn).fromNow()})
                                    </p>
                                </div>
                            </section>
                            <section>
                                <h3 className="font-bold text-blue-600 text-lg border-l-4 border-blue-500 pl-3 mb-2">Chief Complaint</h3>
                                <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border italic">
                                    "{item.report?.chiefComplaint || "No complaint recorded."}"
                                </p>
                            </section>
                            <section>
                                <h3 className="font-bold text-blue-600 text-lg border-l-4 border-blue-500 pl-3 mb-2">Clinical Summary</h3>
                                <p className="leading-relaxed text-slate-600 text-sm">
                                    {item.report?.summary || "Summary generation pending..."}
                                </p>
                            </section>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <section>
                                    <h3 className="font-bold text-blue-600 border-l-4 border-blue-500 pl-3 mb-2 text-sm uppercase tracking-wide">Symptoms</h3>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                        {item.report?.symptoms?.map((val: string, index: number) => (
                                            <li key={index} className="capitalize">{val}</li>
                                        ))}
                                        {(!item.report?.symptoms || item.report.symptoms.length === 0) && (
                                            <li className="text-slate-400 italic">No specific symptoms identified.</li>
                                        )}
                                    </ul>
                                </section>

                                <section className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-blue-600 text-sm uppercase tracking-wider mb-1">Duration</h3>
                                        <p className="text-sm bg-slate-50 p-2 rounded border">{item?.report?.duration || "Not specified"}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-blue-600 text-sm uppercase tracking-wider mb-1">Severity</h3>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item?.report?.severity?.toLowerCase() === 'severe'
                                            ? 'bg-red-50 text-red-600 border-red-200'
                                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                            }`}>
                                            {item?.report?.severity?.toUpperCase() || "NORMAL"}
                                        </span>
                                    </div>
                                </section>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <section className="bg-slate-50 p-4 rounded-xl border border-dashed">
                                    <h3 className="font-bold text-emerald-700 text-md flex items-center gap-2 mb-3">
                                        <Pill className="h-4 w-4" /> Medications Mentioned
                                    </h3>
                                    <ul className="space-y-1">
                                        {item.report?.medicationsMentioned?.map((val: string, index: number) => (
                                            <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                                <span className="text-emerald-500">•</span> {val}
                                            </li>
                                        )) || <li className="text-xs italic text-slate-400">None mentioned.</li>}
                                    </ul>
                                </section>

                                <section className="bg-blue-50/30 p-4 rounded-xl border border-dashed">
                                    <h3 className="font-bold text-blue-700 text-md flex items-center gap-2 mb-3">
                                        <ClipboardCheck className="h-4 w-4" /> Recommendations
                                    </h3>
                                    <ul className="space-y-1">
                                        {item?.report?.recommendations?.map((val: string, index: number) => (
                                            <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                                                <span className="text-blue-500">•</span> {val}
                                            </li>
                                        )) || <li className="text-xs italic text-slate-400">Standard monitoring advised.</li>}
                                    </ul>
                                </section>
                            </div>

                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 border-t pt-4 print:hidden">
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={() => window.print()}>
                        Print Report
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}