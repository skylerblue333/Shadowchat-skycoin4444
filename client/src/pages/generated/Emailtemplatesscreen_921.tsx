// @ts-nocheck
import React, { useState, useEffect } from 'react';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import * as __ns_lucide_react_3 from 'lucide-react';
const { Loader2 } = (__ns_lucide_react_3 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: EmailTemplatesScreen

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


// --- Schema for form validation ---
const emailTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Email body is required'),
  isActive: z.boolean().default(true),
});

type EmailTemplateFormValues = z.infer<typeof emailTemplateSchema>;

// --- Mock tRPC hook for demonstration ---
// In a real application, this would interact with your tRPC backend
const useEmailTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<EmailTemplateFormValues[]>([]);

  // Mock data fetch
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTemplates([
        { name: 'Welcome Email', subject: 'Welcome to SKYCOIN4444!', body: 'Hello {{user.name}}, welcome!', isActive: true },
        { name: 'Password Reset', subject: 'Reset Your Password', body: 'Click here to reset your password: {{resetLink}}', isActive: true },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createTemplate = async (newTemplate: EmailTemplateFormValues) => {
    setIsLoading(true);
    setError(null);
    return new Promise<EmailTemplateFormValues>((resolve, reject) => {
      setTimeout(() => {
        if (newTemplate.name.includes('fail')) {
          setError('Failed to create template: Mock error');
          reject(new Error('Mock creation failure'));
        } else {
          setTemplates((prev) => [...prev, newTemplate]);
          resolve(newTemplate);
        }
        setIsLoading(false);
      }, 1500);
    });
  };

  const updateTemplate = async (name: string, updatedFields: Partial<EmailTemplateFormValues>) => {
    setIsLoading(true);
    setError(null);
    return new Promise<EmailTemplateFormValues>((resolve, reject) => {
      setTimeout(() => {
        setTemplates((prev) =>
          prev.map((t) => (t.name === name ? { ...t, ...updatedFields } : t))
        );
        resolve({ ...templates.find(t => t.name === name)!, ...updatedFields });
        setIsLoading(false);
      }, 1500);
    });
  };

  return { templates, isLoading, error, createTemplate, updateTemplate };
};

const EmailTemplatesScreen: React.FC = () => {
  const { toast } = useToast();
  const { templates, isLoading, error, createTemplate } = useEmailTemplates();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmailTemplateFormValues>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      name: '',
      subject: '',
      body: '',
      isActive: true,
    },
  });

  useEffect(() => {
    // Apply dark theme class to body for demonstration
    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const onSubmit = async (data: EmailTemplateFormValues) => {
    try {
      await createTemplate(data);
      toast({
        title: 'Success!',
        description: `Template '${data.name}' created successfully.`, 
      });
      reset();
    } catch (err) {
      toast({
        title: 'Error creating template',
        description: error || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Email Templates Management</h1>
        <p className="text-center text-lg mb-8">Manage your system's email communication templates.</p>

        <div className="flex justify-end mb-4">
          <Label htmlFor="dark-mode" className="flex items-center space-x-2 cursor-pointer">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <span>Dark Mode</span>
          </Label>
        </div>

        <Card className={isDarkTheme ? 'dark:bg-gray-800 dark:border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Email Template</CardTitle>
            <CardDescription>Define a new email template for various system notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1" role="alert">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  {...register('subject')}
                  className={errors.subject ? 'border-red-500' : ''}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1" role="alert">{errors.subject.message}</p>}
              </div>

              <div>
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  {...register('body')}
                  rows={8}
                  className={errors.body ? 'border-red-500' : ''}
                  aria-invalid={errors.body ? 'true' : 'false'}
                />
                {errors.body && <p className="text-red-500 text-sm mt-1" role="alert">{errors.body.message}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  {...register('isActive')}
                  checked={watch('isActive')}
                  onCheckedChange={(checked) => setValue('isActive', checked)}
                  aria-label="Activate template"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <Button type="submit" disabled={isSubmitting || isLoading}>
                {(isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Template
              </Button>

              {error && <p className="text-red-500 text-sm mt-2" role="alert">Error: {error}</p>}
            </form>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <Card className={isDarkTheme ? 'dark:bg-gray-800 dark:border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className="text-2xl">Existing Email Templates</CardTitle>
            <CardDescription>Overview of all configured email templates.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && templates.length === 0 ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <p>Loading templates...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">Failed to load templates: {error}</p>
            ) : templates.length === 0 ? (
              <p>No templates found. Create one above!</p>
            ) : (
              <ul className="space-y-4">
                {templates.map((template) => (
                  <li key={template.name} className="p-4 border rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Subject: {template.subject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{template.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailTemplatesScreen;
