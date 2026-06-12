// @ts-nocheck
import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import { z } from 'zod';
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: HelpFeedbackScreen

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Simulate tRPC hook
const useFeedbackMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const mutate = async (feedback: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (feedback.includes('error')) {
        throw new Error('Simulated API error');
      }
      console.log('Feedback submitted via tRPC simulation:', feedback);
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading: isLoading || isPending, error };
};

const feedbackSchema = z.object({
  feedback: z.string().min(10, 'Feedback must be at least 10 characters.').max(500, 'Feedback must not exceed 500 characters.'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const HelpFeedbackScreen: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate, isLoading, error: mutationError } = useFeedbackMutation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    const result = await mutate(data.feedback);
    if (result.success) {
      setIsSubmitted(true);
      reset();
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground" role="status" aria-live="polite">
        <h2 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h2>
        <p className="text-center text-muted-foreground">Your input helps us improve our services.</p>
        <Button onClick={() => setIsSubmitted(false)} className="mt-6" aria-label="Submit more feedback">Submit More Feedback</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border">
        <h1 className="text-3xl font-bold text-center text-card-foreground" id="feedback-form-title">Help Feedback</h1>
        <p className="text-center text-muted-foreground">We appreciate your thoughts and suggestions.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-labelledby="feedback-form-title">
          <div>
            <Label htmlFor="feedback" className="text-card-foreground">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              className="mt-1 block w-full bg-input text-input-foreground border-border focus:ring-primary focus:border-primary"
              {...register('feedback')}
              disabled={isLoading}
              aria-invalid={errors.feedback ? "true" : "false"}
              aria-describedby={errors.feedback ? "feedback-error" : undefined}
            />
            {errors.feedback && <p id="feedback-error" className="text-red-500 text-sm mt-1" role="alert">{errors.feedback.message}</p>}
          </div>

          {mutationError && <p className="text-red-500 text-sm text-center" role="alert">{mutationError}</p>}

          <Button type="submit" className="w-full" disabled={isLoading} aria-live="assertive">
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HelpFeedbackScreen;
