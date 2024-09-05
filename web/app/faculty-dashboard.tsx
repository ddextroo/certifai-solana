import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, CheckCircle, XCircle, Signature } from "lucide-react"
import logo from "@/assets/logo.svg"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const pendingDocuments = [
    { id: 1, title: "Leave Application", student: "John Doe", submittedAt: "2023-06-15 09:30" },
    { id: 2, title: "Project Report", student: "Jane Smith", submittedAt: "2023-06-14 14:45" },
    { id: 3, title: "Research Proposal", student: "Alex Johnson", submittedAt: "2023-06-13 16:20" },
]

export default function FacultyDashboard() {
    const [signature, setSignature] = useState("")


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <main className="flex-1 p-8 overflow-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <img src={logo} className="w-20 h-20 object-contain" alt="certifai_logo"/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/9a/CTU_new_logo.png"
                                         alt="School"/>
                        </Avatar>
                        <div className={'flex flex-col'}>
                            <span className="font-medium">PROF. JOHNSON</span>
                            <Badge className={'flex justify-center text-[0.6rem]'}
                            >
                                Faculty
                            </Badge>
                        </div>
                        <ChevronDown className="h-4 w-4"/>
                    </div>
                </header>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Documents Pending Certification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pendingDocuments.map((doc) => (
                                <Card key={doc.id}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                            <h3 className="font-semibold">{doc.title}</h3>
                                                <p className="text-sm text-gray-500">Submitted by: {doc.student}</p>
                                                <p className="text-sm text-gray-500">Submitted at: {doc.submittedAt}</p>
                                            </div>
                                            <Button onClick={() => console.log("hyey")}>
                                                <Signature className="mr-2 h-4 w-4" />
                                                Certify
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="certified" className="mb-8">
                    <TabsList>
                        <TabsTrigger value="certified">Certified Documents</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected Documents</TabsTrigger>
                    </TabsList>
                    <TabsContent value="certified">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: "Thesis Approval", student: "Emily Brown", certifiedAt: "2023-06-10 11:30" },
                                { title: "Internship Report", student: "Michael Lee", certifiedAt: "2023-06-09 15:45" },
                                { title: "Research Grant", student: "Sarah Davis", certifiedAt: "2023-06-08 09:20" },
                            ].map((doc, i) => (
                                <Card key={i}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{doc.title}</h3>
                                                <p className="text-sm text-gray-500">Student: {doc.student}</p>
                                                <p className="text-sm text-gray-500">Certified: {doc.certifiedAt}</p>
                                            </div>
                                            <Badge variant="default">
                                                <CheckCircle className="mr-1 h-4 w-4" />
                                                Certified
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="rejected">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: "Course Exemption", student: "David Wilson", rejectedAt: "2023-06-11 10:15" },
                                { title: "Lab Access Request", student: "Linda Taylor", rejectedAt: "2023-06-10 14:30" },
                            ].map((doc, i) => (
                                <Card key={i}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{doc.title}</h3>
                                                <p className="text-sm text-gray-500">Student: {doc.student}</p>
                                                <p className="text-sm text-gray-500">Rejected: {doc.rejectedAt}</p>
                                            </div>
                                            <Badge variant="destructive">
                                                <XCircle className="mr-1 h-4 w-4" />
                                                Rejected
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <Card>
                    <CardHeader>
                        <CardTitle>Document Certification Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                            <ul className="space-y-2">
                                {[
                                    { action: "Certified", document: "Thesis Approval", student: "Emily Brown", timestamp: "2023-06-10 11:30" },
                                    { action: "Rejected", document: "Course Exemption", student: "David Wilson", timestamp: "2023-06-11 10:15" },
                                    { action: "Certified", document: "Internship Report", student: "Michael Lee", timestamp: "2023-06-09 15:45" },
                                    { action: "Certified", document: "Research Grant", student: "Sarah Davis", timestamp: "2023-06-08 09:20" },
                                    { action: "Rejected", document: "Lab Access Request", student: "Linda Taylor", timestamp: "2023-06-10 14:30" },
                                ].map((log, i) => (
                                    <li key={i} className="flex justify-between items-center text-sm">
                    <span>
                      {log.action} <strong>{log.document}</strong> for {log.student}
                    </span>
                                        <span className="text-gray-500">{log.timestamp}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}