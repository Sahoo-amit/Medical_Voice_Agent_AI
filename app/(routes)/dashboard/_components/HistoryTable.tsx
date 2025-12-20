import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SessionDetails } from "../conversation/[id]/page"
import moment from 'moment'
import { ReportDialog } from "./ReportDialog"

interface props{
    history:SessionDetails[]
}

export function HistoryTable({history}:props) {
    return (
        <Table>
            <TableCaption>Previous consulation Report</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Medical Specialist</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((item:SessionDetails,index)=>(
                    <TableRow key={index}>
                        <TableCell>{item.selectedDoctor.specialist}</TableCell>
                        <TableCell>{item.notes}</TableCell>
                        <TableCell>{moment(new Date(item.createdOn)).fromNow() }</TableCell>
                        <TableCell className="text-right">
                            <ReportDialog item={item}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
