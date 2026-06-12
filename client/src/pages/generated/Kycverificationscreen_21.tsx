// AUTO-GENERATED DRAFT SCREEN: KycVerificationScreen
import React, { useState } from 'react';
import { Button } from './ui/button'; // Assuming shadcn/ui button
import { Input } from './ui/input';   // Assuming shadcn/ui input
import { Label } from './ui/label';   // Assuming shadcn/ui label
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card

// Mock tRPC hooks for demonstration purposes
const useKycStatusQuery = (userId: string) => {
  const [data, setData] = useState<{ status: 'pending' | 'verified' | 'rejected' }>({ status: 'pending' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate fetching status
      // setData({ status: 'verified' });
    }, 1000);
    return () => clearTimeout(timer);
  }, [userId]);

  return { data, isLoading, error };
};

const useKycSubmitMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (data: { idType: string; idNumber: string }) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      // if (Math.random() > 0.8) throw new Error('Submission failed');
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, isSuccess };
};

interface KycVerificationScreenProps {
  userId: string;
}

const KycVerificationScreen: React.FC<KycVerificationScreenProps> = ({ userId }) => {
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const { data: kycStatus, isLoading: isStatusLoading, error: statusError } = useKycStatusQuery(userId);
  const { mutate: submitKyc, isLoading: isSubmitting, error: submitError, isSuccess: isSubmitSuccess } = useKycSubmitMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitKyc({ idType, idNumber });
  };

  if (isStatusLoading) return <div className="flex justify-center items-center h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">Loading KYC Status...</div>;
  if (statusError) return <div className="flex justify-center items-center h-screen text-red-500 dark:bg-gray-900">Error: {statusError}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">KYC Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {kycStatus?.status === 'verified' && (
            <p className="text-green-600 dark:text-green-400 text-center text-lg">Your KYC is Verified!</p>
          )}
          {kycStatus?.status === 'rejected' && (
            <p className="text-red-600 dark:text-red-400 text-center text-lg">KYC Rejected. Please contact support.</p>
          )}
          {kycStatus?.status === 'pending' && !isSubmitSuccess && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-center text-gray-700 dark:text-gray-300">Please submit your identification details.</p>
              <div>
                <Label htmlFor="idType">ID Type</Label>
                <Input
                  id="idType"
                  type="text"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  placeholder="e.g., Passport, Driver's License"
                  className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Enter ID number"
                  className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  required
                />
              </div>
              {submitError && <p className="text-red-500 text-sm">Error: {submitError}</p>}
              {isSubmitSuccess && <p className="text-green-500 text-sm">Submission successful!</p>}
              <Button type="submit" className="w-full dark:bg-blue-600 dark:hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
              </Button>
            </form>
          )}
           {isSubmitSuccess && kycStatus?.status === 'pending' && (
            <p className="text-blue-600 dark:text-blue-400 text-center text-lg">Your submission is pending review.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KycVerificationScreen;
