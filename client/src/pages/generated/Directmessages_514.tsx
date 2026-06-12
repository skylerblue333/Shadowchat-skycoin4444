// AUTO-GENERATED DRAFT SCREEN: DirectMessages
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface DirectMessagesProps {
  userId: string;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ userId }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Mock tRPC-like data fetching
  React.useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.8) { // Simulate error 20% of the time
        setError('Failed to load messages.');
        setMessages([]);
      } else {
        setMessages([
          { id: '1', sender: 'Alice', content: 'Hey there!', timestamp: '10:00 AM' },
          { id: '2', sender: 'You', content: 'Hi Alice!', timestamp: '10:01 AM' },
          { id: '3', sender: 'Alice', content: 'How are you?', timestamp: '10:02 AM' },
        ]);
        setError(null);
      }
      setIsLoading(false);
    }, 1000);
  }, [userId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const message: Message = {
      id: String(messages.length + 1),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Card className="w-full max-w-md mx-auto flex flex-col h-[500px] dark:bg-gray-900 dark:text-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Direct Messages</CardTitle>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">User {userId}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading messages...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-75 mt-1 block text-right">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <div className="p-4 border-t dark:border-gray-700 flex items-center space-x-2">
        <Input
          placeholder="Type your message..."
          className="flex-1 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage} className="dark:bg-blue-700 dark:hover:bg-blue-600">
          Send
        </Button>
      </div>
    </Card>
  );
};

export default DirectMessages;
