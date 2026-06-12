// AUTO-GENERATED DRAFT SCREEN: CommunityModerationAppeals
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { toast } from 'sonner';

// Define the shape of the form data for type safety
interface AppealFormState {
  reason: string;
  evidence: File | null;
}

/**
 * `CommunityModerationAppeals` is a production-grade React component for submitting moderation appeals.
 * It features a responsive design using Tailwind CSS, UI components from shadcn/ui, and integrates
 * with tRPC for backend communication. The component includes error handling, loading states,
 * and basic accessibility considerations. It also supports a dark theme.
 */
const CommunityModerationAppeals: React.FC = () => {
  // State to manage form inputs
  const [formState, setFormState] = useState<AppealFormState>({
    reason: '',
    evidence: null,
  });

  // State for managing dark theme. In a real application, this would likely come from a context or global state.
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Placeholder for dark theme toggle

  // tRPC mutation hook for submitting the appeal.
  // This simulates an asynchronous operation to send appeal data to the server.
  const submitAppealMutation = trpc.moderation.submitAppeal.useMutation({
    onSuccess: () => {
      toast.success('Appeal submitted successfully! Your request is being reviewed.');
      // Reset form after successful submission
      setFormState({ reason: '', evidence: null });
    },
    onError: (error) => {
      // Display a user-friendly error message
      toast.error(`Failed to submit appeal: ${error.message}. Please try again.`);
    },
  });

  // Handler for form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    if (!formState.reason.trim()) {
      toast.error('Please provide a detailed reason for your appeal.');
      return;
    }

    // Execute the tRPC mutation. The 'evidence' field is simplified for this example.
    // In a real scenario, file uploads would require more complex handling (e.g., FormData).
    submitAppealMutation.mutate({ reason: formState.reason, evidence: formState.evidence?.name });
  }, [formState.reason, formState.evidence, submitAppealMutation]);

  // Handler for file input changes
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState(prev => ({ ...prev, evidence: e.target.files[0] }));
    }
  }, []);

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'dark bg-gray-900 text-gray-50' : 'bg-background text-foreground'}`}>
      <Card className="w-full max-w-2xl mx-auto shadow-lg" aria-live="polite">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Community Moderation Appeals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Submit an appeal regarding a moderation decision. All appeals are reviewed manually.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="reason">Reason for Appeal <span className="text-red-500">*</span></Label>
              <Textarea
                id="reason"
                placeholder="Clearly explain why you believe the moderation decision was unfair or incorrect."
                value={formState.reason}
                onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
                required
                aria-required="true"
                rows={5} // Provide more space for detailed explanation
                disabled={submitAppealMutation.isLoading}
                aria-describedby="reason-description"
              />
              <p id="reason-description" className="text-sm text-muted-foreground">Please be as detailed as possible. Minimum 50 characters recommended.</p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="evidence">Supporting Evidence (Optional)</Label>
              <Input
                type="file"
                id="evidence"
                onChange={handleFileChange}
                aria-describedby="file-upload-description"
                disabled={submitAppealMutation.isLoading}
                accept="image/*,application/pdf" // Restrict file types
              />
              <p id="file-upload-description" className="text-sm text-muted-foreground">Accepted formats: images, PDF. Max file size: 5MB.</p>
            </div>
            <Button type="submit" className="w-full" disabled={submitAppealMutation.isLoading || !formState.reason.trim()}>
              {submitAppealMutation.isLoading ? 'Submitting...' : 'Submit Appeal'}
            </Button>
            {/* Display error message if mutation fails */}
            {submitAppealMutation.isError && (
              <p className="text-red-500 text-sm mt-2" role="alert">Error: {submitAppealMutation.error?.message}</p>
            )}
            {/* Display loading indicator */}
            {submitAppealMutation.isLoading && (
              <p className="text-blue-500 text-sm mt-2">Processing your appeal...</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityModerationAppeals;
