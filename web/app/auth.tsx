import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../shared/src/components/ui/tabs"
import Login from "../components/login";
import Signup from "../components/login";

const Auth: React.FC = () => {
    return (
        <>
            <div className={'flex items-center justify-center min-h-dvh'}>
                <Tabs defaultValue="account" className="w-[500px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Login</TabsTrigger>
                        <TabsTrigger value="password">Sign up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Login/>
                    </TabsContent>
                    <TabsContent value="password">
                        <Signup/>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default Auth;