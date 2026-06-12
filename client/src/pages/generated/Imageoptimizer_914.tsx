// AUTO-GENERATED DRAFT SCREEN: ImageOptimizer
import React, { useState, useCallback } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { trpc } from './trpc';
import { Loader2, Image as ImageIcon, Download, AlertCircle } from 'lucide-react';

interface OptimizationSettings {
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
}

const ImageOptimizer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [optimizedImage, setOptimizedImage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [settings, setSettings] = useState<OptimizationSettings>({
    quality: 80,
    format: 'webp',
  });

  const optimizeImageMutation = trpc.image.optimize.useMutation();
  const isLoading = optimizeImageMutation.isPending;

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setLocalError('Please select a valid image file.');
        setSelectedImage(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setLocalError('Image size must be less than 10MB.');
        setSelectedImage(null);
        return;
      }
      setSelectedImage(file);
      setOptimizedImage(null);
      setLocalError(null);
    }
  }, []);

  const handleSettingsChange = useCallback((key: keyof OptimizationSettings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleOptimize = useCallback(async () => {
    if (!selectedImage) {
      setLocalError("Please select an image to optimize.");
      return;
    }

    setLocalError(null);
    setOptimizedImage(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        try {
          const response = await optimizeImageMutation.mutateAsync({
            image: base64Image,
            quality: settings.quality,
            format: settings.format,
          });
          setOptimizedImage(response.optimizedImageUrl);
        } catch (mutationError) {
           console.error("Mutation failed:", mutationError);
           // Error is handled by tRPC hook state
        }
      };
      reader.onerror = () => {
        setLocalError("Failed to read the image file.");
      };
    } catch (err) {
      setLocalError("An unexpected error occurred.");
      console.error(err);
    }
  }, [selectedImage, settings, optimizeImageMutation]);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <Card className="w-full max-w-lg shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ImageIcon className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">Image Optimizer</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Compress and convert your images with ease.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="picture" className="text-sm font-medium">Upload Image</Label>
            <div className="relative">
              <Input
                id="picture"
                type="file"
                accept="image/jpeg, image/png, image/webp, image/gif"
                onChange={handleFileChange}
                className="cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-primary/20 transition-all"
                aria-describedby="file-upload-help"
              />
            </div>
            <p id="file-upload-help" className="text-xs text-muted-foreground">
              Supported formats: JPEG, PNG, WebP, GIF (Max 10MB)
            </p>
            {selectedImage && (
              <div className="flex items-center justify-between p-3 mt-2 bg-secondary/50 rounded-md border border-border/50">
                <span className="text-sm font-medium truncate max-w-[200px]" title={selectedImage.name}>
                  {selectedImage.name}
                </span>
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-md">
                  {formatBytes(selectedImage.size)}
                </span>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="quality" className="text-sm font-medium">Quality</Label>
                <span className="text-xs font-mono bg-secondary px-2 py-1 rounded-md">{settings.quality}%</span>
              </div>
              <Input
                id="quality"
                type="range"
                min="1"
                max="100"
                value={settings.quality}
                onChange={(e) => handleSettingsChange('quality', parseInt(e.target.value))}
                className="w-full accent-primary"
                aria-label="Image quality percentage"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="format" className="text-sm font-medium">Output Format</Label>
              <Select 
                value={settings.format} 
                onValueChange={(value: 'jpeg' | 'png' | 'webp') => handleSettingsChange('format', value)}
              >
                <SelectTrigger id="format" aria-label="Select output format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webp">WebP (Recommended)</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Handling */}
          {(localError || optimizeImageMutation.error) && (
            <div className="flex items-center space-x-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{localError || optimizeImageMutation.error?.message || "An error occurred during optimization."}</span>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleOptimize}
            disabled={!selectedImage || isLoading}
            className="w-full h-12 text-base font-medium transition-all"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                Optimizing...
              </>
            ) : (
              "Optimize Image"
            )}
          </Button>

          {/* Result Section */}
          {optimizedImage && !isLoading && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">Result</h3>
                <span className="text-xs font-medium px-2.5 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">
                  Optimization Complete
                </span>
              </div>
              
              <div className="relative group rounded-lg overflow-hidden border border-border bg-black/5">
                <img 
                  src={optimizedImage} 
                  alt="Optimized result preview" 
                  className="w-full h-auto object-contain max-h-[300px]" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" size="sm" asChild className="shadow-lg">
                    <a href={optimizedImage} download={`optimized-${selectedImage?.name.split('.')[0] || 'image'}.${settings.format}`}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12" asChild>
                <a href={optimizedImage} download={`optimized-${selectedImage?.name.split('.')[0] || 'image'}.${settings.format}`}>
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download Optimized Image
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageOptimizer;