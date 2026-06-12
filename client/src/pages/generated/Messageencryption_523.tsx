// AUTO-GENERATED DRAFT SCREEN: MessageEncryption
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MessageEncryption: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const [message, setMessage] = useState<string>('');
  const [encryptedMessage, setEncryptedMessage] = useState<string>('');
  const [decryptedMessage, setDecryptedMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simple Base64 encoding for demonstration
      setEncryptedMessage(btoa(message));
    } catch (err) {
      setError("Encryption failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrypt = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simple Base64 decoding for demonstration
      setDecryptedMessage(atob(encryptedMessage));
    } catch (err) {
      setError("Decryption failed. Invalid Base64 string or other error.");
      setDecryptedMessage("Error: Invalid Base64 string");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Message Encryption</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none sr-only">Original Message</label>
            <Textarea
              id="message"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-center space-x-4">
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleEncrypt} disabled={isLoading}>Encrypt</Button>
            <Button onClick={handleDecrypt} disabled={isLoading}>Decrypt</Button>
          </div>

          <div className="space-y-2">
            <label htmlFor="encryptedMessage" className="text-sm font-medium leading-none sr-only">Encrypted Message</label>
            <Textarea
              id="encryptedMessage"
              placeholder="Encrypted message will appear here..."
              value={encryptedMessage}
              readOnly
              className="min-h-[100px] bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="decryptedMessage" className="text-sm font-medium leading-none sr-only">Decrypted Message</label>
            <Textarea
              id="decryptedMessage"
              placeholder="Decrypted message will appear here..."
              value={decryptedMessage}
              readOnly
              className="min-h-[100px] bg-muted"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageEncryption;