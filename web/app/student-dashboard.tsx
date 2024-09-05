import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ChevronDown, CheckCircle, Clock, XCircle, FileIcon, LayoutTemplate} from "lucide-react"
import logo from "@/assets/logo.svg";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ScrollArea} from "@radix-ui/react-scroll-area"
import {useState} from "react";


const templates = [
    {id: 'blank', name: 'Blank Document', description: 'Start with a clean slate'},
    {id: 'application', name: 'Job Application', description: 'Template for job applications'},
    {id: 'recommendation', name: 'Recommendation Letter', description: 'Template for writing recommendations'},
    {id: 'complaint', name: 'Complaint Letter', description: 'Template for formal complaints'},
    {id: 'cover', name: 'Cover Letter', description: 'Template for cover letters'},
    {id: 'resignation', name: 'Resignation Letter', description: 'Template for resignation letters'},
]

export default function StudentDashboard() {
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <img src={logo} className={'w-20 h-20 object-contain'} alt="certifai_logo"/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/9a/CTU_new_logo.png"
                                         alt="School"/>
                        </Avatar>
                        <div className={'flex flex-col'}>
                            <span className="font-medium">DEXTER INGUITO</span>
                            <Badge variant={'outline'} className={'flex justify-center text-[0.6rem]'}
                            >
                                Student
                            </Badge>
                        </div>
                        <ChevronDown className="h-4 w-4"/>
                    </div>
                </header>

                {/* Document Creation */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Create New Document</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className={'flex space-x-14'}>
                            <Button variant={'outline'} className="w-full flex flex-col h-48">
                                <FileIcon className="mr-2 h-8 w-8 mb-5"/> Blank Document
                            </Button>
                            <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant={'outline'} className={'w-full flex flex-col h-48'}>
                                        <LayoutTemplate className="mr-2 h-8 w-8 mb-5"/>
                                        Document Templates
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[625px]">
                                    <DialogHeader>
                                        <DialogTitle>Choose a Template</DialogTitle>
                                        <DialogDescription>
                                            Select a template to start your new document
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ScrollArea className="h-[400px] pr-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {templates.map((template) => (
                                                <Card key={template.id}
                                                      className="cursor-pointer hover:bg-gray-100 transition-colors">
                                                    <CardHeader>
                                                        <CardTitle>{template.name}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-sm text-gray-500">{template.description}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Document Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg">
                                <span className="text-2xl font-bold text-blue-600">5</span>
                                <span className="text-sm text-blue-600">Draft</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-yellow-100 rounded-lg">
                                <span className="text-2xl font-bold text-yellow-600">3</span>
                                <span className="text-sm text-yellow-600">In Review</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-green-100 rounded-lg">
                                <span className="text-2xl font-bold text-green-600">8</span>
                                <span className="text-sm text-green-600">Approved</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-red-100 rounded-lg">
                                <span className="text-2xl font-bold text-red-600">1</span>
                                <span className="text-sm text-red-600">Rejected</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent and Shared Documents */}
                <Tabs defaultValue="recent" className="mb-8">
                    <TabsList>
                        <TabsTrigger value="recent">Recent Documents</TabsTrigger>
                        <TabsTrigger value="shared">Shared Documents</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recent">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                {title: "Leave Application", status: "Draft"},
                                {title: "Project Report", status: "Certified"},
                                {title: "Assignment Submission", status: "Certified"},
                            ].map((doc, i) => (
                                <Card key={i}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold flex text-left">{doc.title}</h3>
                                                <p className="text-sm text-gray-500 flex">Last edited 2h ago</p>
                                            </div>
                                            <Badge
                                                variant={doc.status === "Certified" ? "default" : doc.status === "Rejected" ? "destructive" : "secondary"}
                                            >
                                                {doc.status === "Pending" && <Clock className="mr-1 h-4 w-4"/>}
                                                {doc.status === "Certified" && <CheckCircle className="mr-1 h-4 w-4"/>}
                                                {doc.status === "Rejected" && <XCircle className="mr-1 h-4 w-4"/>}
                                                {doc.status}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="shared">
                        <div className="space-y-4">
                            {[
                                {title: "Project Proposal", status: "Pending"},
                                {title: "Internship Report", status: "Certified"},
                                {title: "Research Paper", status: "Rejected"},
                            ].map((doc, i) => (
                                <Card key={i}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold flex">{doc.title}</h3>
                                                <p className="text-sm text-gray-500">Shared with: Prof. Johnson</p>
                                            </div>
                                            <Badge
                                                variant={doc.status === "Certified" ? "default" : doc.status === "Rejected" ? "destructive" : "secondary"}
                                            >
                                                {doc.status === "Pending" && <Clock className="mr-1 h-4 w-4"/>}
                                                {doc.status === "Certified" && <CheckCircle className="mr-1 h-4 w-4"/>}
                                                {doc.status === "Rejected" && <XCircle className="mr-1 h-4 w-4"/>}
                                                {doc.status}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Verifiable Logs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Document Transaction Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {[
                                {action: "Created", document: "Leave Application", timestamp: "2023-06-15 09:30"},
                                {action: "Edited", document: "Project Report", timestamp: "2023-06-14 14:45"},
                                {action: "Signed", document: "Assignment Submission", timestamp: "2023-06-13 16:20"},
                                {action: "Shared", document: "Research Paper", timestamp: "2023-06-12 11:10"},
                            ].map((log, i) => (
                                <li key={i} className="flex justify-between items-center text-sm">
                                    <span>{log.action} <strong>{log.document}</strong></span>
                                    <span className="text-gray-500">{log.timestamp}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}