import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {ScrollArea} from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Badge} from "@/components/ui/badge"
import {ArrowLeft, ChevronDown, Clock, FileText, Save, Signature, CheckCircle, XCircle} from "lucide-react"

const initialLogs = [
    {id: 1, user: 'Jane Smith', action: 'Submitted document', timestamp: '2023-06-15 10:30 AM'},
    {id: 2, user: 'Prof. Johnson', action: 'Viewed document', timestamp: '2023-06-15 11:45 AM'},
    {id: 3, user: 'Prof. Johnson', action: 'Requested changes', timestamp: '2023-06-16 09:15 AM'},
    {id: 4, user: 'Jane Smith', action: 'Updated content', timestamp: '2023-06-16 02:30 PM'},
    {id: 5, user: 'Prof. Johnson', action: 'Reviewed changes', timestamp: '2023-06-17 11:00 AM'},
]

const assignedLetters = [
    {
        id: 1,
        title: "Leave Application",
        student: "John Doe",
        status: "Pending",
        content: "Dear Prof. Johnson,\n\nI am writing to request a leave of absence..."
    },
    {
        id: 2,
        title: "Research Proposal",
        student: "Jane Smith",
        status: "Pending",
        content: "Dear Prof. Johnson,\n\nI am submitting my research proposal on..."
    },
    {
        id: 3,
        title: "Internship Report",
        student: "Alex Johnson",
        status: "Certified",
        content: "Dear Prof. Johnson,\n\nI am pleased to submit my internship report..."
    },
    {
        id: 4,
        title: "Thesis Draft",
        student: "Emily Brown",
        status: "Rejected",
        content: "Dear Prof. Johnson,\n\nAttached is the first draft of my thesis..."
    },
    {
        id: 5,
        title: "Course Exemption Request",
        student: "Michael Lee",
        status: "Pending",
        content: "Dear Prof. Johnson,\n\nI am writing to request an exemption from..."
    },
]

export default function FacultyDocumentEditor() {
    const [selectedLetter, setSelectedLetter] = useState(assignedLetters[0])
    const [facultyComments, setFacultyComments] = useState("")
    const [logs, setLogs] = useState(initialLogs)
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
    const [pin, setPin] = useState("")

    const addLog = (user: string, action: string) => {
        const newLog = {
            id: logs.length + 1,
            user,
            action,
            timestamp: new Date().toLocaleString(),
        }
        setLogs(prev => [newLog, ...prev])
    }

    const handleSaveComments = () => {
        console.log("Comments saved")
        addLog('Prof. Johnson', 'Saved comments')
    }

    const handleReject = () => {
        console.log("Document rejected")
        addLog('Prof. Johnson', 'Rejected document')
        setSelectedLetter(prev => ({...prev, status: "Rejected"}))
    }

    const handleApprove = () => {
        if (pin === "123456") { // In a real application, this should be validated securely
            console.log("Document approved")
            addLog('Prof. Johnson', 'Approved document')
            setIsApproveModalOpen(false)
            setPin("")
            setSelectedLetter(prev => ({...prev, status: "Certified"}))
        } else {
            console.log("Invalid PIN")
        }
    }

    const handleLetterSelect = (letter) => {
        setSelectedLetter(letter)
        setFacultyComments("")
        addLog('Prof. Johnson', `Viewed ${letter.title}`)
    }

    return (
        <div className="min-h-screen p-8">
            <header className="flex justify-between items-center mb-8">
                <Button variant="ghost" className="text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Dashboard
                </Button>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/9a/CTU_new_logo.png" alt="School"/>
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

            <div className="flex gap-8">
                {/* Main Content - Letter Viewer */}
                <Card className="flex-1 bg-white p-8 shadow-lg">
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{selectedLetter.title}</h2>
                            <Badge
                                variant={
                                    selectedLetter.status === "Certified" ? "default" :
                                        selectedLetter.status === "Rejected" ? "destructive" : "secondary"
                                }
                            >
                                {selectedLetter.status === "Certified" && <CheckCircle className="mr-1 h-4 w-4"/>}
                                {selectedLetter.status === "Rejected" && <XCircle className="mr-1 h-4 w-4"/>}
                                {selectedLetter.status === "Pending" && <Clock className="mr-1 h-4 w-4"/>}
                                {selectedLetter.status}
                            </Badge>
                        </div>
                        <div className="space-y-2">
                            <p><strong>Student:</strong> {selectedLetter.student}</p>
                            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                        <Textarea
                            value={selectedLetter.content}
                            rows={15}
                            className="resize-none"
                            readOnly
                        />
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Faculty Comments
                            </label>
                            <Textarea
                                name="comments"
                                placeholder="Add your comments here..."
                                rows={5}
                                className="resize-none"
                                value={facultyComments}
                                onChange={(e) => setFacultyComments(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-5 items-center">
                            <Button variant="outline" onClick={handleSaveComments}>
                                <Save className="mr-2 h-4 w-4"/>
                                Save Comments
                            </Button>
                            <Button variant="destructive" onClick={handleReject}>
                                <XCircle className="mr-2 h-4 w-4"/>
                                Reject Document
                            </Button>
                            <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <CheckCircle className="mr-2 h-4 w-4"/>
                                        Certify Document
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Certify Document</DialogTitle>
                                        <DialogDescription>
                                            Please enter your 6-digit PIN to approve this document.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="self-start items-center gap-4">
                                            <Label htmlFor="pin" className="text-right">
                                                PIN
                                            </Label>
                                            <Input
                                                id="pin"
                                                type="password"
                                                maxLength={6}
                                                value={pin}
                                                onChange={(e) => setPin(e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleApprove}>Certify Document</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Panel - Transaction Logs */}
                <Card className="w-80 bg-white p-4 h-full shadow-lg">
                    <CardHeader>
                        <CardTitle>Transaction Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-300px)]">
                            <div className="space-y-4">
                                {logs.map((log) => (
                                    <div key={log.id} className="border-b pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold">{log.user}</p>
                                                <p className="text-sm text-gray-600">{log.action}</p>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="mr-1 h-3 w-3"/>
                                                {log.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Assigned Letters List */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Assigned Letters</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-64">
                        <div className="space-y-4">
                            {assignedLetters.map((letter) => (
                                <Card
                                    key={letter.id}
                                    className={`cursor-pointer transition-colors ${selectedLetter.id === letter.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                    onClick={() => handleLetterSelect(letter)}
                                >
                                    <CardContent className="flex justify-between items-center p-4">
                                        <div>
                                            <h3 className="font-semibold">{letter.title}</h3>
                                            <p className="text-sm text-gray-500">Student: {letter.student}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                letter.status === "Certified" ? "default" :
                                                    letter.status === "Rejected" ? "destructive" : "secondary"
                                            }
                                        >
                                            {letter.status === "Certified" && <CheckCircle className="mr-1 h-4 w-4"/>}
                                            {letter.status === "Rejected" && <XCircle className="mr-1 h-4 w-4"/>}
                                            {letter.status === "Pending" && <Clock className="mr-1 h-4 w-4"/>}
                                            {letter.status}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}