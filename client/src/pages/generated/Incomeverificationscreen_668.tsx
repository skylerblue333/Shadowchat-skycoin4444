// AUTO-GENERATED DRAFT SCREEN: IncomeVerificationScreen
import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2, FileText, X } from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

export default function IncomeVerificationScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState<string | null>(null);

  const verifyIncomeMutation = trpc.onboarding.verifyIncome.useMutation({
    onSuccess: () => {
      // Handle success, e.g., navigate to next step or show success state
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateAndSetFile = (selectedFile: File) => {
    setFileError(null);
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setFileError('Invalid file type. Please upload a PDF, JPEG, or PNG.');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File is too large. Maximum size is 10MB.');
      return;
    }
    
    setFile(selectedFile);
    simulateUpload();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  }, []);

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileError(null);
    verifyIncomeMutation.reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || uploadProgress < 100) return;
    
    // In a real app, we would upload the file to a storage service first,
    // get a URL or ID, and pass that to the tRPC mutation.
    // For this example, we'll just pass a mock document ID.
    verifyIncomeMutation.mutate({ documentId: file.name });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Verify Your Income
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Please upload a recent pay stub, W-2, or tax return to verify your income.
          </p>
        </div>

        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl">Upload Document</CardTitle>
              <CardDescription>
                Supported formats: PDF, JPEG, PNG. Max size: 10MB.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {fileError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Invalid File</AlertTitle>
                  <AlertDescription>{fileError}</AlertDescription>
                </Alert>
              )}

              {verifyIncomeMutation.isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    {verifyIncomeMutation.error.message || 'Failed to verify income. Please try again.'}
                  </AlertDescription>
                </Alert>
              )}

              {verifyIncomeMutation.isSuccess && (
                <Alert className="border-green-500/50 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your income document has been successfully verified.
                  </AlertDescription>
                </Alert>
              )}

              {!file ? (
                <div
                  className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-zinc-900 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    aria-label="Upload income document"
                  />
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                    <Upload className="w-10 h-10 mb-3 text-zinc-400 dark:text-zinc-500" />
                    <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      PDF, PNG, or JPG (MAX. 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <FileText className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Remove file"
                      disabled={verifyIncomeMutation.isPending}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {uploadProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={!file || uploadProgress < 100 || verifyIncomeMutation.isPending || verifyIncomeMutation.isSuccess}
                aria-busy={verifyIncomeMutation.isPending}
              >
                {verifyIncomeMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Verifying...
                  </>
                ) : (
                  'Submit for Verification'
                )}
              </Button>
              
              <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                Your data is securely encrypted and stored. We will never share your financial information.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}