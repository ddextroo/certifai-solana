'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@certifai-solana/shared';
import { User, Mail, GraduationCap } from 'lucide-react';
import { WalletButton } from '@/components/solana/solana-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-hot-toast';
import {
  useCertifaiProgram,
  useCertifaiProgramAccount,
} from '../components/certifai/certifai-data-access';

export default function Auth() {
  const { connected, publicKey, disconnect } = useWallet();
  const walletAddress = publicKey || null;
  const { createEntry } = useCertifaiProgram();
  const [formData, setFormData] = useState({
    first_name: 'Dex',
    last_name: 'Tro',
    email_address: 'dexter@gmail.com',
    school_name: 'CTU',
    user_role: 'Student',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error('Please connect your wallet first!');
      return;
    }

    try {
      await createEntry.mutateAsync({
        owner: publicKey!,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email_address: formData.email_address,
        school_name: formData.school_name,
      });

      toast.success('User entry created successfully!');
    } catch (error) {
      toast.error('Failed to create user entry');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[35rem]">
        <CardHeader>
          <CardTitle>Auth</CardTitle>
          <CardDescription>
            Glad to have you back! Your document tasks are ready.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="w-full flex justify-center">
              <WalletButton />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="first_name">First Name</Label>
                  <div className="relative">
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="last_name">Last Name</Label>
                  <div className="relative">
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email_address">Email</Label>
                  <div className="relative">
                    <Input
                      id="email_address"
                      name="email_address"
                      type="email"
                      value={formData.email_address}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="school_name">School Name</Label>
                  <div className="relative">
                    <Input
                      id="school_name"
                      name="school_name"
                      value={formData.school_name}
                      onChange={handleInputChange}
                      placeholder="University of Example"
                    />
                    <GraduationCap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {connected && (
            <>
              <Button variant="outline" onClick={disconnect}>
                Disconnect
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Sign Up
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
