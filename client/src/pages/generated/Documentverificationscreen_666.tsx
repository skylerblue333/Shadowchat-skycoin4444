// AUTO-GENERATED DRAFT SCREEN: DocumentVerificationScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  documentType: z.string().min(1, { message: 'Document type is required.' }),
  documentNumber: z.string().min(1, { message: 'Document number is required.' }),
  // Add more fields as necessary for document verification
});

type FormData = z.infer<typeof formSchema>;

const DocumentVerificationScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Example for dark theme toggle

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: '',
      documentNumber: '',
    },
  });

  const { mutate: verifyDocument, isLoading, error } = trpc.onboarding.verifyDocument.useMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await verifyDocument(data);
      // Handle successful verification, e.g., navigate to next step
      console.log('Document verification successful:', data);
    } catch (err) {
      console.error('Document verification failed:', err);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Document Verification</CardTitle>
          <CardDescription>Please upload your identification documents to complete the onboarding process.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Passport, Driver's License" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter document number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add file upload input here for actual document files */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify Document
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVerificationScreen;
