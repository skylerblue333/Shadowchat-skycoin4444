// AUTO-GENERATED DRAFT SCREEN: CryptoFeedbackForm
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Assuming shadcn/ui components are imported like this
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Assuming tRPC setup and a mutation hook
// For demonstration, we'll mock the tRPC hook
const useFeedbackMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (data: FeedbackFormValues) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Feedback submitted:', data);
      setIsSuccess(true);
      return { message: 'Feedback submitted successfully!' };
    } catch (error) {
      setIsError(true);
      throw new Error('Failed to submit feedback.');
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, isError, isSuccess };
};

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }).optional().or(z.literal('')),
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }).max(100, { message: 'Subject must not exceed 100 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500, { message: 'Message must not exceed 500 characters.' }),
});

type FeedbackFormValues = z.infer<typeof formSchema>;

export function CryptoFeedbackForm() {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
    },
  });

  const { mutate, isLoading, isError, isSuccess } = useFeedbackMutation();

  const onSubmit = async (values: FeedbackFormValues) => {
    try {
      await mutate(values);
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-foreground dark:text-white">Feedback Form</h2>
        <p className="text-center text-muted-foreground dark:text-gray-300">We appreciate your feedback!</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-white">Email (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} className="bg-input dark:bg-gray-700 dark:text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-white">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Regarding your service..." {...field} className="bg-input dark:bg-gray-700 dark:text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-white">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your feedback here..." {...field} rows={5} className="bg-input dark:bg-gray-700 dark:text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isError && (
              <p className="text-red-500 text-sm text-center">Failed to submit feedback. Please try again.</p>
            )}
            {isSuccess && (
              <p className="text-green-500 text-sm text-center">Feedback submitted successfully!</p>
            )}
            <Button type="submit" className="w-full bg-primary dark:bg-blue-600 text-primary-foreground dark:text-white hover:bg-primary/90 dark:hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function Cryptofeedbackform_204() { return null; }
