import React, {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent} from "@/components/ui/card"
import {Avatar, AvatarImage} from "@/components/ui/avatar"
import {Wand2, Save, ArrowLeft, ChevronDown, Upload, FileText, Clock, Send} from "lucide-react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"

const templates = [
    {id: 'blank', name: 'Blank Letter', content: ''},
    {
        id: 'application',
        name: 'Job Application',
        content: 'Dear Hiring Manager,\n\nI am writing to apply for the position of...'
    },
    {id: 'recommendation', name: 'Recommendation', content: 'To Whom It May Concern,\n\nI am writing to recommend...'},
    {
        id: 'complaint',
        name: 'Complaint Letter',
        content: 'Dear Sir/Madam,\n\nI am writing to express my dissatisfaction with...'
    },
]

const initialLogs = [
    {id: 1, user: 'Jane Smith', action: 'Created document', timestamp: '2023-06-15 10:30 AM'},
    {id: 2, user: 'Jane Smith', action: 'Modified content', timestamp: '2023-06-15 11:45 AM'},
    {id: 3, user: 'Prof. Johnson', action: 'Reviewed document', timestamp: '2023-06-16 09:15 AM'},
    {id: 4, user: 'Jane Smith', action: 'Updated content', timestamp: '2023-06-16 02:30 PM'},
    {id: 5, user: 'Prof. Johnson', action: 'Signed document', timestamp: '2023-06-17 11:00 AM'},
]

const users = [
    {id: 1, name: 'Prof. Johnson', role: 'Professor'},
    {id: 2, name: 'Dr. Smith', role: 'Advisor'},
    {id: 3, name: 'Jane Doe', role: 'Teaching Assistant'},
    {id: 4, name: 'John Smith', role: 'Department Head'},
]

export default function DocumentEdit() {
    const [letterContent, setLetterContent] = useState({
        sender: "",
        senderAddress: "",
        date: new Date().toISOString().split('T')[0],
        recipient: "",
        recipientAddress: "",
        subject: "",
        body: "",
    })
    const [signature, setSignature] = useState<string | null>(null)
    const [selectedTemplate, setSelectedTemplate] = useState('blank')
    const [logs, setLogs] = useState(initialLogs)
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
    const [documentStatus, setDocumentStatus] = useState<'draft' | 'pending' | 'approved' | 'rejected'>('rejected')
    const [facultyComments, setFacultyComments] = useState<string | null>("Hi everyone")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setLetterContent(prev => ({...prev, [name]: value}))
        addLog('Jane Smith', `Modified ${name}`)
    }

    const handleAIAssist = () => {
        setLetterContent(prev => ({
            ...prev,
            body: "Dear [Recipient],\n\nI hope this letter finds you well. I am writing to...\n\nSincerely,\n[Your Name]"
        }))
        addLog('Jane Smith', 'Used AI Assist')
    }

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSignature(reader.result as string)
                addLog('Jane Smith', 'Uploaded signature')
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId)
        const selectedTemplateContent = templates.find(t => t.id === templateId)?.content || ''
        setLetterContent(prev => ({...prev, body: selectedTemplateContent}))
        addLog('Jane Smith', `Selected ${templates.find(t => t.id === templateId)?.name} template`)
    }

    const addLog = (user: string, action: string) => {
        const newLog = {
            id: logs.length + 1,
            user,
            action,
            timestamp: new Date().toLocaleString(),
        }
        setLogs(prev => [newLog, ...prev])
    }

    const handleSubmitForReview = () => {
        console.log("Submitting for review:", {letterContent, selectedUser})
        addLog('Jane Smith', `Submitted for review to ${users.find(u => u.id.toString() === selectedUser)?.name}`)
        setIsSubmitModalOpen(false)
        setDocumentStatus('pending')
    }

    const getStatusBadge = () => {
        switch (documentStatus) {
            case 'draft':
                return <Badge variant="outline">Draft</Badge>
            case 'pending':
                return <Badge variant="secondary">Pending Review</Badge>
            case 'approved':
                return <Badge variant="default">Approved</Badge>
            case 'rejected':
                return <Badge variant="destructive">Rejected</Badge>
        }
    }

    return (
        <div className="min-h-screen p-8">
            <header className="flex justify-between items-center mb-8">
                <Button variant="ghost" className="text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Dashboard
                </Button>
                <div className="flex items-center space-x-4">
                    <Button variant="outline">
                        <Save className="mr-2 h-4 w-4"/>
                        Save Draft
                    </Button>
                    <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Send className="mr-2 h-4 w-4"/>
                                Submit for Review
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Submit for Review</DialogTitle>
                                <DialogDescription>
                                    Choose a recipient to submit your document for review.
                                </DialogDescription>
                            </DialogHeader>
                            <Select onValueChange={setSelectedUser}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a recipient"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            {user.name} - {user.role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSubmitForReview} disabled={!selectedUser}>
                                Submit
                            </Button>
                        </DialogContent>
                    </Dialog>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/9a/CTU_new_logo.png"
                                             alt="School"/>
                            </Avatar>
                            <div className={'flex flex-col'}>
                                <span className="font-medium">DEXTER INGUITO</span>
                                <Badge variant={'outline'} className={'flex justify-center text-[0.6rem]'}>
                                    Student
                                </Badge>
                            </div>
                            <ChevronDown className="h-4 w-4"/>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex gap-8">
                {/* Left Panel - Templates */}
                <Card className="w-64 h-fit bg-white p-4 shadow-lg">
                    <h2 className="font-bold mb-4">Templates</h2>
                    <div className="space-y-2">
                        {templates.map((template) => (
                            <Button
                                key={template.id}
                                variant={selectedTemplate === template.id ? "default" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => handleTemplateSelect(template.id)}
                            >
                                <FileText className="mr-2 h-4 w-4"/>
                                {template.name}
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Main Content - Letter Editor */}
                <Card className="flex-1 bg-white p-8 shadow-lg">
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                            {/*<h2 className="text-2xl font-bold">{letterContent.subject || "Untitled Document"}</h2>*/}
                            <div>
                                <Input
                                    name="title"
                                    placeholder="Title"
                                    value={letterContent.title || "Untitled Document"}
                                    onChange={handleInputChange}
                                    className="text-2xl font-bold"
                                />
                            </div>
                            {getStatusBadge()}
                        </div>

                        {(documentStatus === 'approved' || documentStatus === 'rejected') && facultyComments && (
                            <Alert variant={documentStatus === 'approved' ? "default" : "destructive"}>
                                <AlertTitle>{documentStatus === 'approved' ? "Approved" : "Rejected"} by
                                    Faculty</AlertTitle>
                                <AlertDescription>{facultyComments}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex justify-between">
                            <div className="space-y-2 w-1/2">
                                <Input
                                    name="sender"
                                    placeholder="Your Name"
                                    value={letterContent.sender}
                                    onChange={handleInputChange}
                                    className="font-bold"
                                />
                                <Textarea
                                    name="senderAddress"
                                    placeholder="Your Address"
                                    value={letterContent.senderAddress}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>
                            <div className="">
                                <Input
                                    type="date"
                                    name="date"
                                    value={letterContent.date}
                                    onChange={handleInputChange}
                                    className="text-right"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Input
                                name="recipient"
                                placeholder="Recipient's Name"
                                value={letterContent.recipient}
                                onChange={handleInputChange}
                                className="font-bold"
                            />
                            <Textarea
                                name="recipientAddress"
                                placeholder="Recipient's Address"
                                value={letterContent.recipientAddress}
                                onChange={handleInputChange}
                                rows={3}
                                className="resize-none"
                            />
                        </div>

                        <Input
                            name="subject"
                            placeholder="Subject"
                            value={letterContent.subject}
                            onChange={handleInputChange}
                            className="font-bold"
                        />

                        <div className="relative">
                            <Textarea
                                name="body"
                                placeholder="Start writing your letter here..."
                                value={letterContent.body}
                                onChange={handleInputChange}
                                rows={15}
                                className="resize-none"
                            />
                            <Button
                                className="absolute bottom-2 right-2"
                                size="sm"
                                onClick={handleAIAssist}
                            >
                                <Wand2 className="mr-2 h-4 w-4"/>
                                AI Assist
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="signature-upload"
                                   className="block text-sm text-left font-medium text-gray-700">
                                Upload Signature
                            </label>
                            <div className="flex items-center">
                                <Input
                                    id="signature-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleSignatureUpload}
                                    className="hidden"
                                />
                                <Button asChild>
                                    <label htmlFor="signature-upload" className="cursor-pointer">
                                        <Upload className="mr-2 h-4 w-4"/>
                                        Choose File
                                    </label>
                                </Button>
                                {signature && (
                                    <div className="border border-gray-300 ml-5">
                                        <img src={signature} alt="Signature" className="max-h-10"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Panel - Transaction Logs */}
                <Card className="w-80 bg-white p-4 h-full shadow-lg">
                    <h2 className="font-bold mb-4">Transaction Logs</h2>
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-4">
                            {logs.map((log) => (
                                <div key={log.id} className="border-b pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold flex">{log.user}</p>
                                            <p className="text-[0.7rem] text-gray-600 flex text-left">{log.action}</p>
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
                </Card>
            </div>
        </div>
    )
}