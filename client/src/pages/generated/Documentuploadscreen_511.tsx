// AUTO-GENERATED DRAFT SCREEN: DocumentUploadScreen
import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button
import { Input } from '@/components/ui/input';   // Assuming shadcn/ui input
import { Label } from '@/components/ui/label';   // Assuming shadcn/ui label
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming shadcn/ui card
import { Loader2, UploadCloud, CheckCircle, XCircle } from 'lucide-react'; // Lucide icons

// Mock tRPC hook for file upload
// In a real application, this would interact with a tRPC backend
const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (file.size > 5 * 1024 * 1024) { // Simulate file size limit error (e.g., 5MB)
        throw new Error('File size exceeds 5MB limit.');
      }
      console.log('Uploading file:', file.name);
      setIsSuccess(true);
      return { success: true, fileName: file.name };
    } catch (err: any) {
      setError(err.message || 'Failed to upload file.');
      setIsSuccess(false);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { uploadFile, isLoading, error, isSuccess };
};

interface DocumentUploadScreenProps {
  userId: string;
}

const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFile, isLoading, error, isSuccess } = useFileUpload();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.jpeg', '.png'] },
  });

  const handleFileUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 dark">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Document Upload for Crypto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFileUpload} className="space-y-6">
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-muted' : 'border-border hover:border-primary/70'}
                ${error ? 'border-destructive' : ''}
              `}
            >
              <input {...getInputProps()} aria-label="File upload area" />
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Uploading document" />
              ) : isSuccess ? (
                <CheckCircle className="h-8 w-8 text-green-500" aria-label="Upload successful" />
              ) : error ? (
                <XCircle className="h-8 w-8 text-destructive" aria-label="Upload failed" />
              ) : (
                <UploadCloud className="h-8 w-8 text-muted-foreground" aria-label="Drag and drop files" />
              )}
              <p className="mt-4 text-sm text-muted-foreground text-center">
                {isDragActive ? 'Drop the files here ...' : 'Drag & drop your document here, or click to select'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPEG, PNG (Max 5MB)</p>
              {selectedFile && (
                <p className="mt-2 text-sm font-medium text-foreground">Selected: {selectedFile.name}</p>
              )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file-input" className="sr-only">Or select file manually</Label>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90
                "
                accept=".pdf, .jpeg, .png"
                aria-describedby="file-input-description"
              />
              <p id="file-input-description" className="sr-only">Select a PDF, JPEG, or PNG file, maximum 5 megabytes.</p>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center" role="alert" aria-live="assertive">
                Error: {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!selectedFile || isLoading}
              aria-label="Upload document"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {isLoading ? 'Uploading...' : 'Upload Document'}
            </Button>

            {isSuccess && (
              <p className="text-green-500 text-sm text-center" role="status" aria-live="polite">
                Document uploaded successfully!
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploadScreen;
