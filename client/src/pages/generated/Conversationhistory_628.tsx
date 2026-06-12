// AUTO-GENERATED DRAFT SCREEN: ConversationHistory
import React, { useState, useEffect, useRef } from 'react';

// Define the structure for a single message in the conversation
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai'; // 'user' or 'ai' to differentiate message origin
  timestamp: string; // Timestamp for when the message was sent
}

// Main ConversationHistory component
const ConversationHistory: React.FC = () => {
  // State to hold the list of messages in the conversation
  const [messages, setMessages] = useState<Message[]>([]);
  // State to manage loading status during API calls
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages that occur
  const [error, setError] = useState<string | null>(null);
  // Ref for auto-scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect hook to fetch initial conversation messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        // Simulate an asynchronous API call to fetch messages
        const response = await new Promise<Message[]>((resolve) =>
          setTimeout(() => {
            resolve([
              { id: '1', text: 'Hello, how can I help you today?', sender: 'ai', timestamp: '10:00 AM' },
              { id: '2', text: 'I need assistance with my account.', sender: 'user', timestamp: '10:01 AM' },
              { id: '3', text: 'Certainly, what seems to be the issue?', sender: 'ai', timestamp: '10:02 AM' },
              { id: '4', text: 'I forgot my password and need to reset it.', sender: 'user', timestamp: '10:03 AM' },
              { id: '5', text: 'No problem. I can guide you through the password reset process. Please check your registered email for a reset link.', sender: 'ai', timestamp: '10:04 AM' },
              { id: '6', text: 'I haven\'t received any email yet.', sender: 'user', timestamp: '10:05 AM' },
              { id: '7', text: 'Please check your spam folder. If it\'s still not there, we can try sending it again or verify your email address.', sender: 'ai', timestamp: '10:06 AM' },
            ]);
          }, 1500) // Simulate network delay
        );
        setMessages(response); // Update messages state with fetched data
      } catch (err) {
        // Catch and set error if the API call fails
        setError('Failed to load conversation history. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching, regardless of success or failure
      }
    };
    fetchMessages(); // Execute the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  // Effect hook to scroll to the bottom of the messages whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Display loading indicator while messages are being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300" role="status" aria-live="polite">
        <p className="text-lg">Loading conversation...</p>
      </div>
    );
  }

  // Display error message if fetching fails
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-red-600 dark:text-red-400" role="alert" aria-live="assertive">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  // Render the conversation history UI
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header section for the conversation history screen */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white" id="screen-title">AI Conversation History</h1>
        {/* Placeholder for a dark mode toggle button or other header actions */}
        <button
          aria-label="Toggle dark mode"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* Sun/Moon icon would go here */}
          <span className="sr-only">Toggle dark mode</span>
          ☀️
        </button>
      </header>

      {/* Main conversation display area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4" aria-labelledby="screen-title">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start`}
            role="log" // ARIA role for a chat log
            aria-atomic="false" // Indicates that the entire region is not re-rendered when new messages arrive
          >
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-xl shadow-md transition-all duration-200 ease-in-out
                ${message.sender === 'user'
                  ? 'bg-blue-600 text-white dark:bg-blue-700 ml-auto rounded-br-none'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none'}
              `}
              aria-label={`${message.sender} said at ${message.timestamp}`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-80 mt-1 block text-right font-light">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {/* Ref for auto-scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer section with message input and send button */}
      <footer className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <label htmlFor="message-input" className="sr-only">Type your message</label>
          <input
            id="message-input"
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base transition-colors duration-200"
            aria-label="Message input field"
          />
          <button
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ConversationHistory;
