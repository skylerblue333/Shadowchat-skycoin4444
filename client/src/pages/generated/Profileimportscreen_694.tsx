// AUTO-GENERATED DRAFT SCREEN: ProfileImportScreen
import React, { useState, useCallback, useRef } from 'react';
import { Upload, File, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { trpc } from '@/utils/trpc';

interface FileWithPreview extends File {
  preview?: string;
}

export default function ProfileImportScreen() {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState({
    progress: 0,
    error: null as string | null,
    success: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const importMutation = trpc.profile.importProfile.useMutation({
    onSuccess: () => {
      setUploadState(prev => ({ ...prev, success: true, progress: 100 }));
    },
    onError: (error) => {
      setUploadState(prev => ({ ...prev, error: error.message || 'An error occurred during profile import.', progress: 0 }));
    },
  });

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/json', 'text/csv'];
    if (!validTypes.includes(file.type)) {
      setUploadState(prev => ({ ...prev, error: 'Invalid file type. Please upload a JSON or CSV file.' }));
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadState(prev => ({ ...prev, error: 'File size exceeds 5MB limit.' }));
      return false;
    }
    setUploadState(prev => ({ ...prev, error: null }));
    return true;
  };

  const processFile = useCallback((file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
    }
  }, [validateFile]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) processFile(files[0]);
  }, [processFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) processFile(files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadState({ progress: 0, error: null, success: false });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setUploadState(prev => ({ ...prev, error: null, success: false, progress: 10 }));

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setUploadState(prev => ({ ...prev, progress: 40 }));
        const content = e.target?.result as string;
        setTimeout(() => setUploadState(prev => ({ ...prev, progress: 70 })), 500);
        importMutation.mutate({ fileContent: content, fileName: selectedFile.name });
      };
      reader.onerror = () => {
        setUploadState(prev => ({ ...prev, error: 'Failed to read file.', progress: 0 }));
      };
      reader.readAsText(selectedFile);
    } catch (err) {
      setUploadState(prev => ({ ...prev, error: 'An unexpected error occurred.', progress: 0 }));
    }
  };

  const { progress: uploadProgress, error: uploadError, success: uploadSuccess } = uploadState;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex items-center justify-center dark:bg-zinc-950">
      <Card className="w-full max-w-2xl shadow-lg border-border dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Profile Import</CardTitle>
          <CardDescription className="text-muted-foreground">
            Upload your SKYCOIN4444 profile data. Supported formats: JSON, CSV (Max 5MB).
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {uploadError && (
            <Alert variant="destructive" role="alert">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          {uploadSuccess && (
            <Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50" role="status">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your profile has been successfully imported.</AlertDescription>
            </Alert>
          )}

          {!selectedFile ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200 ease-in-out cursor-pointer
                ${isDragging 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50 dark:border-zinc-700 dark:hover:border-zinc-500'}
                `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Drag and drop file here or click to browse"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".json,.csv,application/json,text/csv"
                aria-hidden="true"
              />
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-background rounded-full shadow-sm border border-border dark:bg-zinc-900 dark:border-zinc-800">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JSON or CSV up to 5MB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-card dark:border-zinc-800">
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <File className="h-6 w-6 text-primary" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  disabled={importMutation.isPending}
                  aria-label="Remove selected file"
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {(importMutation.isPending || uploadProgress > 0) && !uploadSuccess && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Importing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4 border-t pt-6 dark:border-zinc-800">
          <Button
            variant="outline"
            onClick={handleRemoveFile}
            disabled={!selectedFile || importMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedFile || importMutation.isPending || uploadSuccess}
            className="min-w-[120px]"
          >
            {importMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing
              </>
            ) : (
              'Import Profile'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}