// AUTO-GENERATED DRAFT SCREEN: MessageForwardingScreen
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Button } from './components/ui/button'; // shadcn/ui button
import { Input } from './components/ui/input'; // shadcn/ui input
import { Label } from './components/ui/label'; // shadcn/ui label
import { Switch } from './components/ui/switch'; // shadcn/ui switch
import { useTheme } from './context/theme-provider'; // Assuming dark theme context

// Zod schema for form validation
const formSchema = z.object({
  recipient: z.string().min(1, { message: 'Recipient is required.' }),
  messageId: z.string().min(1, { message: 'Message ID is required.' }),
  autoForward: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

const MessageForwardingScreen: React.FC = () => {
  const { theme } = useTheme(); // Dark theme context
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: '',
      messageId: '',
      autoForward: false,
    },
  });

  // tRPC mutation hook (example)
  const forwardMessageMutation = trpc.social.forwardMessage.useMutation();

  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await forwardMessageMutation.mutateAsync(data);
      setSuccess('Message forwarded successfully!');
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }, [forwardMessageMutation, reset]);

  useEffect(() => {
    // Accessibility: Announce form errors or success messages
    if (error) console.error('Form Error:', error);
    if (success) console.log('Form Success:', success);
  }, [error, success]);

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Message Forwarding</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              type="text"
              {...register('recipient')}
              className={errors.recipient ? 'border-red-500' : ''}
              aria-invalid={errors.recipient ? 'true' : 'false'}
            />
            {errors.recipient && <p className="text-red-500 text-sm mt-1" role="alert">{errors.recipient.message}</p>}
          </div>
          <div>
            <Label htmlFor="messageId">Message ID</Label>
            <Input
              id="messageId"
              type="text"
              {...register('messageId')}
              className={errors.messageId ? 'border-red-500' : ''}
              aria-invalid={errors.messageId ? 'true' : 'false'}
            />
            {errors.messageId && <p className="text-red-500 text-sm mt-1" role="alert">{errors.messageId.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoForward"
              {...register('autoForward')}
              aria-checked={register('autoForward').value ? 'true' : 'false'}
            />
            <Label htmlFor="autoForward">Auto-forward future messages from this sender</Label>
          </div>
          {error && <p className="text-red-500 text-sm mt-4" role="alert">Error: {error}</p>}
          {success && <p className="text-green-500 text-sm mt-4" role="status">Success: {success}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Forwarding...' : 'Forward Message'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageForwardingScreen;
