// AUTO-GENERATED DRAFT SCREEN: AiAssistantChat
import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { SendHorizonal, Loader2 } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AiAssistantChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const aiResponse: Message = { id: Date.now().toString() + ".1", text: `AI received: "${newMessage.text}"`, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-bold">AI Assistant Chat</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline">New Chat</Button>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto space-y-4" aria-live="polite" aria-atomic="true">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'}
              `}
              role="status"
              aria-label={`${message.sender === 'user' ? 'You said' : 'AI said'}: ${message.text}`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start" role="status" aria-live="assertive">
            <div className="bg-muted p-3 rounded-lg max-w-xs flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>AI is thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center" role="alert" aria-live="assertive">
            <div className="bg-destructive text-destructive-foreground p-3 rounded-lg max-w-md">
              <p>{error}</p>
            </div>
          </div>
        )}
      </main>
      <footer className="p-4 border-t border-border flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={isLoading}
          aria-label="Message input"
        />
        <Button onClick={sendMessage} disabled={isLoading} aria-label="Send message">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <SendHorizonal className="h-4 w-4" aria-hidden="true" />}
          <span className="sr-only">Send message</span>
        </Button>
      </footer>
    </div>
  );
};

export default AiAssistantChat;