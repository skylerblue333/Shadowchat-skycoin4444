// AUTO-GENERATED DRAFT SCREEN: CryptoIntegrationGuide
import React from 'react';
import { trpc } from '../utils/trpc';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button is available

interface CryptoIntegrationGuideProps {
  userId: string;
}

const CryptoIntegrationGuide: React.FC<CryptoIntegrationGuideProps> = ({ userId }) => {
  const { data, isLoading, isError, error, refetch } = trpc.skycoin.getWallet.useQuery({ userId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p>Loading integration guide...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-red-500 p-4">
        <p className="text-lg mb-4">Error loading integration guide: {error?.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center">SKYCOIN4444: Crypto Integration Guide</h1>
      <p className="text-lg mb-8 text-center max-w-2xl mx-auto">
        Welcome to the integration guide for SKYCOIN4444. This document will help you integrate our crypto services into your application.
      </p>

      <section className="mb-10 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">1. Getting Started</h2>
        <p className="mb-4">To begin, ensure you have the necessary API keys and access credentials. Refer to your SKYCOIN4444 dashboard for details.</p>
        <pre className="bg-muted text-muted-foreground p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
          <code>
            // Example code snippet for initialization
            const skycoinClient = new SkycoinClient({{ apiKey: 'YOUR_API_KEY', apiSecret: 'YOUR_API_SECRET' }});
          </code>
        </pre>
        {data && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
            <p><strong>Your Wallet Balance:</strong> {data.balance} {data.currency} (for user {data.userId})</p>
          </div>
        )}
      </section>

      <section className="mb-10 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">2. API Endpoints</h2>
        <p className="mb-4">Our API provides various endpoints for managing transactions, wallets, and market data.</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li><code>/api/v1/transactions</code> - Manage cryptocurrency transactions.</li>
          <li><code>/api/v1/wallets</code> - Access and manage user wallets.</li>
          <li><code>/api/v1/market-data</code> - Retrieve real-time market information.</li>
        </ul>
      </section>

      <section className="mb-10 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">3. Example Usage (TypeScript)</h2>
        <pre className="bg-muted text-muted-foreground p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
          <code>
            import {{ SkycoinClient }} from '@skycoin4444/sdk';

            async function getWalletBalance(userId: string) {{
              const client = new SkycoinClient({{ apiKey: 'YOUR_API_KEY' }});
              try {{
                const wallet = await client.getWallet(userId);
                console.log(`Wallet balance for ${{userId}}: ${{wallet.balance}}`);
                return wallet.balance;
              }} catch (error) {{
                console.error('Failed to fetch wallet balance:', error);
                throw error;
              }}
            }}

            // Example tRPC hook integration
            // const {{ data: walletData, isLoading: walletLoading, error: walletError }} = trpc.skycoin.getWallet.useQuery({{ userId: 'user123' }});
          </code>
        </pre>
      </section>

      <section className="mb-10 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">4. Error Handling</h2>
        <p className="mb-4">Implement robust error handling to gracefully manage API failures and network issues.</p>
        <pre className="bg-muted text-muted-foreground p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
          <code>
            // Example error handling with try-catch
            try {{
              // API call
            }} catch (error) {{
              if ((error as any).response) {{
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('API Error:', (error as any).response.data);
              }} else if ((error as any).request) {{
                // The request was made but no response was received
                console.error('Network Error:', (error as any).request);
              }} else {{
                // Something happened in setting up the request that triggered an Error
                console.error('Request Error:', (error as any).message);
              }}
            }}
          </code>
        </pre>
      </section>

      <section className="mb-10 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">5. Dark Theme Support</h2>
        <p className="mb-4">The component automatically adapts to dark mode based on system preferences or a theme toggle, thanks to Tailwind CSS and shadcn/ui.</p>
        <pre className="bg-muted text-muted-foreground p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
          <code>
            // Tailwind CSS classes handle dark mode automatically
            // e.g., bg-gray-100 dark:bg-gray-800
          </code>
        </pre>
      </section>

      <section className="mb-10 p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-4">6. Accessibility</h2>
        <p className="mb-4">We strive for an accessible user experience. Ensure proper ARIA attributes and semantic HTML are used.</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>Use semantic HTML elements (e.g., <code>&lt;h1&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;p&gt;</code>).</li>
          <li>Provide meaningful <code>alt</code> text for images.</li>
          <li>Ensure keyboard navigation is functional.</li>
          <li>Utilize shadcn/ui components which are built with accessibility in mind.</li>
        </ul>
      </section>

      <footer className="text-center text-muted-foreground mt-10 p-4 border-t">
        <p>&copy; 2026 SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CryptoIntegrationGuide;