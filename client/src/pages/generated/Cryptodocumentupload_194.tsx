// AUTO-GENERATED DRAFT SCREEN: CryptoDocumentUpload
import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch'; // Assuming shadcn/ui Switch component
import { useUploadDocument } from '@/trpc/hooks/useUploadDocument'; // Placeholder for tRPC hook
import { Loader2, CheckCircle, XCircle } from 'lucide-react'; // For loading, success, and error icons

// Define schema for form validation
const formSchema = z.object({
  documentType: z.string().min(1, { message: 'Document type is required.' }),
  documentFile: z.any()
    .refine(file => file instanceof File, { message: 'A file is required.' })
    .refine(file => file && file.size <= 5 * 1024 * 1024, { message: 'Max file size is 5MB.' }) // Max 5MB file size
    .refine(file => file && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), { message: 'Only .jpg, .png, and .pdf formats are supported.' }),
});

type FormData = z.infer<typeof formSchema>;

const CryptoDocumentUpload: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { mutate: uploadDocument, isLoading, error } = useUploadDocument(); // tRPC hook usage

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: '',
    },
  });

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setValue('documentFile', event.target.files[0], { shouldValidate: true });
    }
  }, [setValue]);

  const onSubmit = useCallback(async (data: FormData) => {
    setUploadStatus('idle'); // Reset status on new submission
    try {
      // Simulate API call with tRPC hook
      await uploadDocument({ type: data.documentType, file: data.documentFile });
      setUploadStatus('success');
      reset();
    } catch (err) {
      setUploadStatus('error');
      console.error('Upload error:', err);
    }
  }, [uploadDocument, reset]);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Document Upload</CardTitle>
          <CardDescription>Upload your crypto-related documents securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Label htmlFor="dark-mode-toggle" className="flex items-center space-x-2 cursor-pointer">
              <span>Dark Mode</span>
              <Switch
                id="dark-mode-toggle"
                checked={isDarkTheme}
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            </Label>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Document Upload Form">
            <div className="grid gap-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Input
                id="documentType"
                type="text"
                placeholder="e.g., Passport, Utility Bill"
                {...register('documentType')}
                aria-describedby="document-type-error"
                aria-invalid={errors.documentType ? 'true' : 'false'}
              />
              {errors.documentType && <p id="document-type-error" className="text-red-500 text-sm" role="alert">{errors.documentType.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="documentFile">Document File</Label>
              <Input
                id="documentFile"
                type="file"
                onChange={handleFileChange}
                aria-describedby="document-file-error"
                aria-invalid={errors.documentFile ? 'true' : 'false'}
              />
              {errors.documentFile && <p id="document-file-error" className="text-red-500 text-sm" role="alert">{errors.documentFile.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Uploading...</>
              ) : (
                'Upload Document'
              )}
            </Button>
            {uploadStatus === 'success' && (
              <p className="text-green-500 text-sm flex items-center" role="status">
                <CheckCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Document uploaded successfully!
              </p>
            )}
            {uploadStatus === 'error' && error && (
              <p className="text-red-500 text-sm flex items-center" role="alert">
                <XCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Error: {error.message || 'An unknown error occurred.'}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDocumentUpload;
