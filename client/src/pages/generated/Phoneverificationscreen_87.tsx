// AUTO-GENERATED DRAFT SCREEN: PhoneVerificationScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Loader2 } from 'lucide-react';

// Simulate tRPC hook for phone verification
const usePhoneVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const verifyPhoneNumber = async (phoneNumber: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (phoneNumber === '+15551234567') {
        setIsVerified(true);
      } else {
        throw new Error('Invalid phone number or verification code.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyPhoneNumber, isLoading, error, isVerified };
};

const formSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).max(15, { message: 'Phone number must not exceed 15 digits.' }),
  verificationCode: z.string().min(4, { message: 'Verification code must be 4 digits.' }).max(4, { message: 'Verification code must be 4 digits.' }).optional(),
});

type FormData = z.infer<typeof formSchema>;

const PhoneVerificationScreen: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { verifyPhoneNumber, isLoading, error, isVerified } = usePhoneVerification();

  const onSubmit = async (data: FormData) => {
    await verifyPhoneNumber(data.phoneNumber);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Phone Verification</CardTitle>
          <CardDescription>Enter your phone number to receive a verification code.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register('phoneNumber')}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
            </div>

            {isVerified && (
              <div className="grid gap-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="1234"
                  {...register('verificationCode')}
                  className={errors.verificationCode ? 'border-red-500' : ''}
                />
                {errors.verificationCode && <p className="text-red-500 text-sm">{errors.verificationCode.message}</p>}
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isVerified ? 'Verify Code' : 'Send Code'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneVerificationScreen;
