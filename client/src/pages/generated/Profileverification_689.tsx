// AUTO-GENERATED DRAFT SCREEN: ProfileVerification
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
import { trpc } from '../trpc';

interface VerificationStepProps {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  onAction: () => void;
  actionLabel: string;
  disabled: boolean;
  loading: boolean;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  title,
  description,
  status,
  onAction,
  actionLabel,
  disabled,
  loading,
}) => {
  const statusColors = {
    pending: 'text-gray-500',
    'in-progress': 'text-blue-500',
    completed: 'text-green-500',
    failed: 'text-red-500',
  };

  const statusText = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    failed: 'Failed',
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
      <div className="flex-1 mb-2 sm:mb-0">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <span className={cn('text-sm font-semibold', statusColors[status])}>{statusText[status]}</span>
      </div>
      <Button
        onClick={onAction}
        disabled={disabled || status === 'completed' || loading}
        className={cn(
          status === 'completed' && 'bg-gray-400 cursor-not-allowed',
          loading && 'opacity-70 cursor-not-allowed'
        )}
      >
        {loading ? 'Loading...' : actionLabel}
      </Button>
    </div>
  );
};

const ProfileVerification: React.FC = () => {
  const [step1Status, setStep1Status] = useState<'pending' | 'in-progress' | 'completed' | 'failed'>('pending');
  const [step2Status, setStep2Status] = useState<'pending' | 'in-progress' | 'completed' | 'failed'>('pending');
  const [step3Status, setStep3Status] = useState<'pending' | 'in-progress' | 'completed' | 'failed'>('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example tRPC hook usage (assuming a 'verification' router with 'submit' procedure)
  const submitVerification = trpc.hello.useMutation({
    onMutate: () => {
      setIsSubmitting(true);
      setError(null);
    },
    onSuccess: () => {
      alert('Verification submitted successfully!');
    },
    onError: (err) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleStepAction = (setStepStatus: React.Dispatch<React.SetStateAction<'pending' | 'in-progress' | 'completed' | 'failed'>>) => {
    setStepStatus('in-progress');
    // Simulate async operation
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        setStepStatus('completed');
      } else {
        setStepStatus('failed');
        setError('Step failed. Please try again.');
      }
    }, 2000);
  };

  const handleSubmit = () => {
    if (allStepsCompleted) {
      submitVerification.mutate({ name: 'Profile Verification' });
    }
  };

  const allStepsCompleted = step1Status === 'completed' && step2Status === 'completed' && step3Status === 'completed';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 antialiased">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full space-y-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center tracking-tight">
          Profile Verification
        </h1>
        <p className="text-base text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          To ensure the security and integrity of your account, please complete the following verification steps.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="space-y-4">
          <VerificationStep
            title="Step 1: Upload Identity Document"
            description="Provide a valid government-issued ID (e.g., passport, driver's license)."
            status={step1Status}
            onAction={() => handleStepAction(setStep1Status)}
            actionLabel={step1Status === 'completed' ? 'Uploaded' : 'Upload'}
            disabled={isSubmitting}
            loading={step1Status === 'in-progress'}
          />
          <VerificationStep
            title="Step 2: Facial Recognition Scan"
            description="Complete a quick facial scan to match your identity document."
            status={step2Status}
            onAction={() => handleStepAction(setStep2Status)}
            actionLabel={step2Status === 'completed' ? 'Scanned' : 'Start Scan'}
            disabled={isSubmitting || step1Status !== 'completed'}
            loading={step2Status === 'in-progress'}
          />
          <VerificationStep
            title="Step 3: Confirm Residential Address"
            description="Verify your current residential address with a proof of residency."
            status={step3Status}
            onAction={() => handleStepAction(setStep3Status)}
            actionLabel={step3Status === 'completed' ? 'Confirmed' : 'Confirm'}
            disabled={isSubmitting || step2Status !== 'completed'}
            loading={step3Status === 'in-progress'}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!allStepsCompleted || isSubmitting || submitVerification.isLoading}
          className="w-full"
        >
          {isSubmitting || submitVerification.isLoading ? 'Submitting...' : 'Submit for Review'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileVerification;
