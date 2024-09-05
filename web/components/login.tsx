import React, {useEffect} from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@certifai-solana/shared";
import { Input } from "@certifai-solana/shared";
import { Label } from "@certifai-solana/shared";
import { Button } from "@certifai-solana/shared";

type FormValues = {
    email: string;
    password: string;
};

const Login: React.FC = () => {

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Login</CardTitle>
                    <CardDescription className="text-center">
                        Glad to have you back! Your document tasks are ready.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                        <form className="space-y-5">
                            <div className="space-y-1">
                                <Label htmlFor="email" className="flex">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password" className="flex">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <div className="flex flex-row justify-between">
                                    <p className="text-[0.7rem] text-muted-foreground flex">Enter your password</p>
                                    <Button variant="link" className="text-[0.7rem] p-0 font-medium flex items-start">
                                        Forgot your password?
                                    </Button>
                                </div>
                            </div>
                            <CardFooter>
                                <Button className="w-full" type="submit">Login</Button>
                            </CardFooter>
                        </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
