import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Schools } from "@/utils/schools";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
// import { signup } from "@/utils/anchor.ts";
import { useWallet } from '@solana/wallet-adapter-react';

const Signup: React.FC = () => {
    const {  wallet } = useWallet(); // Access wallet
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: id === 'terms' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        const { firstName, lastName, email, school, password, confirmPassword, termsAccepted } = form;

        if (!firstName || !lastName || !email || !school || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            setError('Password must be at least 8 characters long and include an uppercase letter, a number, and a symbol.');
            return;
        }

        // if (!termsAccepted) {
        //     setError('You must accept the terms and conditions.');
        //     return;
        // }

        setError(''); // Clear any previous errors

        // const result = await signup(wallet, email, password, firstName, lastName, school, 'User'); // Call signup

        if (result.success) {
            console.log('Account created successfully!');
        } else {
            setError(result.error || 'Signup failed.');
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className={'text-xl'}>Create Your Account</CardTitle>
                    <CardDescription className={'text-center'}>
                        Start securing and certifying your documents with confidence.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-y-3">
                    <div className={'grid md:grid-cols-2 grid-cols-1 gap-y-3 md:gap-y-0 gap-x-3'}>
                        <div className="space-y-1">
                            <Label htmlFor="firstName" className={'flex'}>First Name</Label>
                            <Input id="firstName" type={'text'} className={'text-sm'}
                                   value={form.firstName}
                                   onChange={handleChange}
                                   placeholder="Enter your first Name" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="lastName" className={'flex'}>Last Name</Label>
                            <Input id="lastName" type={'text'} className={'text-sm'}
                                   value={form.lastName}
                                   onChange={handleChange}
                                   placeholder="Enter your last name" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email" className={'flex'}>Email Address</Label>
                        <Input id="email" type={'email'} className={'text-sm'}
                               value={form.email}
                               onChange={handleChange}
                               placeholder="Enter your email address" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="school" className={'flex'}>School</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {value
                                        ? Schools.find((school) => school.value === value)?.label
                                        : "Select your school..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search school..." />
                                    <CommandList>
                                        <CommandEmpty>No school found.</CommandEmpty>
                                        <CommandGroup>
                                            {Schools.map((school) => (
                                                <CommandItem
                                                    key={school.value}
                                                    value={school.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue);
                                                        setForm({ ...form, school: currentValue });
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === school.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {school.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password" className={'flex'}>Password</Label>
                        <Input id="password" type={'password'} className={'text-sm'} placeholder="Password"
                               value={form.password}
                               onChange={handleChange}
                        />
                        <div className={'flex flex-row justify-between'}>
                            <p className={'text-[0.7rem] text-muted-foreground flex text-left'}>
                                Min. 8 characters, with uppercase, number, & symbol.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className={'flex'}>Confirm Password</Label>
                        <Input id="confirmPassword" type={'password'} className={'text-sm'}
                               value={form.confirmPassword}
                               onChange={handleChange}
                               placeholder="Re-enter your password" />
                        <div className="flex items-center gap-x-2">
                            <Checkbox id="terms" checked={form.termsAccepted} onChange={handleChange} />
                            <label
                                htmlFor="terms"
                                className="text-[0.7rem] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I agree to the Terms and Conditions.
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} className="w-full">
                        Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
