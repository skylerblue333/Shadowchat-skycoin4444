// AUTO-GENERATED DRAFT SCREEN: ImageGeneratorScreen
import React, { useState, useCallback } from 'react';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Image as ImageIcon, Download, Share2, AlertCircle, Settings2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GenerateImageOptions {
  prompt: string;
  negativePrompt?: string;
  aspectRatio: string;
  numImages: number;
  highRes: boolean;
  style: string;
}

const ImageGenerationForm: React.FC<{ options: GenerateImageOptions; onOptionChange: (key: keyof GenerateImageOptions, value: any) => void; onSubmit: (e: React.FormEvent) => void; isPending: boolean; error: string | null; }>
  = ({ options, onOptionChange, onSubmit, isPending, error }) => (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-sm font-medium">Prompt <span className="text-destructive">*</span></Label>
        <textarea
          id="prompt"
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          placeholder="Describe the image you want to generate in detail..."
          value={options.prompt}
          onChange={(e) => onOptionChange('prompt', e.target.value)}
          required
          aria-required="true"
        />
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="style">Art Style</Label>
            <Select value={options.style} onValueChange={(val) => onOptionChange('style', val)}>
              <SelectTrigger id="style"><SelectValue placeholder="Select a style" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="photorealistic">Photorealistic</SelectItem>
                <SelectItem value="anime">Anime / Manga</SelectItem>
                <SelectItem value="digital-art">Digital Art</SelectItem>
                <SelectItem value="oil-painting">Oil Painting</SelectItem>
                <SelectItem value="3d-render">3D Render</SelectItem>
                <SelectItem value="cinematic">Cinematic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
            <Select value={options.aspectRatio} onValueChange={(val) => onOptionChange('aspectRatio', val)}>
              <SelectTrigger id="aspect-ratio"><SelectValue placeholder="Select aspect ratio" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1 (Square)</SelectItem>
                <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                <SelectItem value="3:4">3:4 (Vertical)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="negative-prompt">Negative Prompt</Label>
            <textarea
              id="negative-prompt"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="What to exclude (e.g., blurry, low quality, text)..."
              value={options.negativePrompt}
              onChange={(e) => onOptionChange('negativePrompt', e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="num-images">Number of Images</Label>
              <span className="text-sm text-muted-foreground">{options.numImages}</span>
            </div>
            <Slider
              id="num-images"
              min={1}
              max={4}
              step={1}
              value={[options.numImages]}
              onValueChange={(vals) => onOptionChange('numImages', vals[0])}
              className="py-2"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="high-res" className="text-base">High Resolution</Label>
              <p className="text-xs text-muted-foreground">Generate in 4K (costs 2x credits)</p>
            </div>
            <Switch
              id="high-res"
              checked={options.highRes}
              onCheckedChange={(checked) => onOptionChange('highRes', checked)}
            />
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || 'Failed to generate image. Please try again.'}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full mt-6" size="lg" disabled={isPending || !options.prompt.trim()}>
        {isPending ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating...</>) : (<><Sparkles className="mr-2 h-5 w-5" />Generate Image</>)}
      </Button>
    </form>
  );

const GeneratedImageResults: React.FC<{ generatedImages: string[]; isPending: boolean; options: GenerateImageOptions; onDownload: (url: string) => void; }>
  = ({ generatedImages, isPending, options, onDownload }) => (
    <Card className="h-full min-h-[600px] border-border/50 shadow-sm flex flex-col">
      <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="h-5 w-5" />Generated Results</CardTitle>
          {generatedImages.length > 0 && (
            <span className="text-sm text-muted-foreground">{generatedImages.length} image{generatedImages.length !== 1 ? 's' : ''} generated</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6 flex flex-col">
        {!isPending && generatedImages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-60">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="max-w-md space-y-1">
              <h3 className="text-xl font-semibold">No images generated yet</h3>
              <p className="text-muted-foreground">Enter a prompt and configure your settings on the left to start creating stunning AI artwork.</p>
            </div>
          </div>
        )}

        {isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {Array.from({ length: options.numImages }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <div className="space-y-2"><Skeleton className="h-4 w-[250px]" /><Skeleton className="h-4 w-[200px]" /></div>
              </div>
            ))}
          </div>
        )}

        {!isPending && generatedImages.length > 0 && (
          <div className={`grid gap-6 ${generatedImages.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {generatedImages.map((url, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden border border-border/50 bg-muted/30 shadow-sm transition-all hover:shadow-md">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Generated artwork ${index + 1}`} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full" onClick={() => onDownload(url)} title="Download Image"><Download className="h-5 w-5" /><span className="sr-only">Download</span></Button>
                    <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full" title="Share Image"><Share2 className="h-5 w-5" /><span className="sr-only">Share</span></Button>
                  </div>
                </div>
                <div className="p-3 bg-card border-t border-border/50 flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs font-normal">{options.style}</Badge>
                  <span className="text-xs text-muted-foreground">{options.aspectRatio} • {options.highRes ? '4K' : 'Standard'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

export default function ImageGeneratorScreen() {
  const [options, setOptions] = useState<GenerateImageOptions>({
    prompt: '', negativePrompt: '', aspectRatio: '1:1', numImages: 1, highRes: false, style: 'photorealistic',
  });
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const generateMutation = trpc.ai.generateImage.useMutation({
    onSuccess: (data) => { setGeneratedImages(data.imageUrls); },
  });

  const handleGenerate = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!options.prompt.trim()) return;
    generateMutation.mutate(options);
  }, [options, generateMutation]);

  const handleOptionChange = useCallback(<K extends keyof GenerateImageOptions>(
    key: K, value: GenerateImageOptions[K]
  ) => { setOptions(prev => ({ ...prev, [key]: value })); }, []);

  const handleDownload = useCallback((url: string) => { window.open(url, '_blank'); }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2"><Sparkles className="h-8 w-8 text-primary" />AI Image Generator</h1>
            <p className="text-muted-foreground mt-1">Transform your ideas into stunning visuals using advanced AI models.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1 text-sm">Credits: 1,250</Badge>
            <Button variant="secondary" size="sm">Upgrade</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Settings2 className="h-5 w-5" />Generation Settings</CardTitle>
                <CardDescription>Configure parameters for your image generation.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageGenerationForm 
                  options={options} 
                  onOptionChange={handleOptionChange} 
                  onSubmit={handleGenerate} 
                  isPending={generateMutation.isPending} 
                  error={generateMutation.error?.message || null} 
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <GeneratedImageResults 
              generatedImages={generatedImages} 
              isPending={generateMutation.isPending} 
              options={options} 
              onDownload={handleDownload} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
