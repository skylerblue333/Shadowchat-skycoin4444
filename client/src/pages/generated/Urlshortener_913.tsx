// AUTO-GENERATED DRAFT SCREEN: UrlShortener
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';
import { z } from 'zod';

const urlSchema = z.string().url({ message: 'Invalid URL format.' });

const UrlShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);

  const { mutate: shortenUrl, isLoading, error } = trpc.shortenUrl.useMutation({
    onSuccess: (data) => {
      setShortUrl(data.shortUrl);
      setInputError(null); // Clear input error on success
    },
    onError: (err) => {
      // tRPC error handling
      setInputError(err.message);
      setShortUrl('');
    },
  });

  const handleShortenUrl = () => {
    try {
      urlSchema.parse(longUrl);
      setInputError(null);
      shortenUrl({ url: longUrl });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setInputError(e.errors[0].message);
      } else {
        setInputError('An unexpected error occurred.');
      }
      setShortUrl('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center">URL Shortener</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            placeholder="Enter your long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-grow"
            aria-label="Long URL input"
            aria-invalid={!!inputError}
            aria-describedby={inputError ? 'url-input-error' : undefined}
          />
          <Button onClick={handleShortenUrl} disabled={isLoading} aria-label="Shorten URL">
            {isLoading ? 'Shortening...' : 'Shorten'}
          </Button>
        </div>
        {(inputError || error) && (
          <p id="url-input-error" className="text-red-500 text-center text-sm">
            {inputError || error?.message}
          </p>
        )}
        {shortUrl && (
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-grow bg-muted"
              aria-label="Shortened URL output"
            />
            <Button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              aria-label="Copy shortened URL"
            >
              Copy
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
