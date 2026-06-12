// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import * as __ns_lucide_react_1 from 'lucide-react';
const { AlertCircle, Send, Search } = (__ns_lucide_react_1 as any);
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as __ns_date_fns_2 from 'date-fns';
const { formatDistanceToNow } = (__ns_date_fns_2 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: SocialMessagingScreen

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Simplified Types
interface Message { id: string; content: string; senderId: string; createdAt: Date; }
interface User { id: string; name: string; avatarUrl?: string; isOnline: boolean; }
interface Chat { id: string; user: User; lastMessage?: Message; }

export default function SocialMessagingScreen() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: currentUser } = useStubQuery();
  const { data: chats, isLoading: isLoadingChats, error: chatsError } = useStubQuery();
  const { 
    data: messages, 
    isLoading: isLoadingMessages,
    error: messagesError
  } = useStubQuery(
    { chatId: activeChatId! },
    { enabled: !!activeChatId }
  );

  const sendMessage = useStubMutation({
    onSuccess: () => { setMessageInput(''); }
  });

  useEffect(() => {
    if (scrollRef.current) { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId) return;
    sendMessage.mutate({ chatId: activeChatId, content: messageInput.trim() });
  };

  if (chatsError) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 p-4 text-zinc-50">
        <Alert variant="destructive" className="max-w-md border-red-900 bg-red-950/50 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Chats</AlertTitle>
          <AlertDescription>{chatsError.message || 'Failed to connect.'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50 dark">
      {/* Sidebar - Chat List */}
      <div className="flex w-80 flex-col border-r border-zinc-800 bg-zinc-950/50">
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">Messages</h1>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input placeholder="Search..." className="w-full border-zinc-800 bg-zinc-900 pl-9 text-zinc-100"/>
          </div>
        </div>
        <ScrollArea className="flex-1">
          {isLoadingChats ? (
            <div className="space-y-4 p-4">{[1,2,3].map((i) => (<div key={i} className="flex items-center space-x-4"><Skeleton className="h-12 w-12 rounded-full bg-zinc-800" /><div className="space-y-2"><Skeleton className="h-4 w-[150px] bg-zinc-800" /><Skeleton className="h-3 w-[100px] bg-zinc-800" /></div></div>))}
            </div>
          ) : (
            <div className="flex flex-col">
              {chats?.map((chat) => (
                <button key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`flex items-center gap-3 p-4 text-left transition-colors hover:bg-zinc-900 ${activeChatId === chat.id ? 'bg-zinc-900' : ''}`} aria-selected={activeChatId === chat.id} role="option">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-zinc-800"><AvatarFallback className="bg-zinc-800 text-zinc-300">{chat.user.name.substring(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                    {chat.user.isOnline && (<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-500" />)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-zinc-100 truncate">{chat.user.name}</span>
                      {chat.lastMessage && (<span className="text-xs text-zinc-500">{formatDistanceToNow(new Date(chat.lastMessage.createdAt), { addSuffix: false })}</span>)}
                    </div>
                    <p className="truncate text-sm text-zinc-400">{chat.lastMessage?.content || 'No messages yet'}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col bg-zinc-950">
        {activeChatId ? (
          <>
            <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-zinc-800"><AvatarFallback className="bg-zinc-800 text-zinc-300">U</AvatarFallback></Avatar>
                <div><h2 className="font-semibold text-zinc-100">Active Chat</h2><p className="text-xs text-emerald-500">Online</p></div>
              </div>
            </header>
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              {isLoadingMessages ? (
                <div className="space-y-6">{[1,2,3].map((i) => (<div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}><Skeleton className={`h-16 w-64 rounded-2xl bg-zinc-800 ${i % 2 === 0 ? 'rounded-tr-sm' : 'rounded-tl-sm'}`} /></div>))}
                </div>
              ) : messagesError ? (
                <Alert variant="destructive" className="border-red-900 bg-red-950/50 text-red-200"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>Failed to load messages.</AlertDescription></Alert>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages?.map((msg) => {
                    const isMe = msg.senderId === currentUser?.id;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'}`}>
                          <p>{msg.content}</p>
                          <span className={`mt-1 block text-[10px] ${isMe ? 'text-indigo-200' : 'text-zinc-400'}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
            <div className="border-t border-zinc-800 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 p-1 pr-2 focus-within:ring-1 focus-within:ring-zinc-700">
                <Input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message..." className="flex-1 border-0 bg-transparent text-zinc-100" disabled={sendMessage.isPending}/>
                <Button type="submit" size="icon" className="h-8 w-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" disabled={!messageInput.trim() || sendMessage.isPending}>
                  <Send className="h-4 w-4" /><span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-zinc-500">
            <h3 className="text-xl font-medium text-zinc-300">Your Messages</h3>
            <p className="mt-2 max-w-sm text-center text-sm">Select a conversation to begin messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}