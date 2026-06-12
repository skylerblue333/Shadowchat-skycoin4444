// AUTO-GENERATED DRAFT SCREEN: NFTGallery
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sun, Moon, Wallet, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';

// --- Types ---
interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  collection: string;
}

// --- Mock tRPC/API Function ---
const fetchNFTs = async (): Promise<NFT[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate occasional error for demonstration (commented out)
  // if (Math.random() > 0.8) throw new Error("Failed to fetch NFTs from the blockchain.");

  return [
    {
      id: '1',
      name: 'CryptoPunk #7804',
      description: 'A rare alien CryptoPunk with a pipe and cap.',
      imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=400&q=80',
      price: 1200,
      currency: 'ETH',
      collection: 'CryptoPunks'
    },
    {
      id: '2',
      name: 'Bored Ape #1747',
      description: 'A bored ape with a party hat and laser eyes.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      price: 800,
      currency: 'ETH',
      collection: 'BAYC'
    },
    {
      id: '3',
      name: 'Fidenza #313',
      description: 'Generative art masterpiece by Tyler Hobbs.',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
      price: 500,
      currency: 'ETH',
      collection: 'Art Blocks'
    },
    {
      id: '4',
      name: 'Doodles #4567',
      description: 'A colorful doodle with a rainbow background.',
      imageUrl: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?auto=format&fit=crop&w=400&q=80',
      price: 15,
      currency: 'ETH',
      collection: 'Doodles'
    },
    {
      id: '5',
      name: 'Azuki #8901',
      description: 'Anime-inspired avatar with a skateboard.',
      imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=400&q=80',
      price: 12,
      currency: 'ETH',
      collection: 'Azuki'
    },
    {
      id: '6',
      name: 'CloneX #2345',
      description: 'Next-gen avatar ready for the metaverse.',
      imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80',
      price: 8,
      currency: 'ETH',
      collection: 'RTFKT'
    },
    {
      id: '7',
      name: 'Moonbird #6789',
      description: 'A pixelated owl with unique traits.',
      imageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=400&q=80',
      price: 5,
      currency: 'ETH',
      collection: 'Moonbirds'
    },
    {
      id: '8',
      name: 'Pudgy Penguin #1234',
      description: 'A cute and pudgy penguin wearing a scarf.',
      imageUrl: 'https://images.unsplash.com/photo-1569429559062-81118128362e?auto=format&fit=crop&w=400&q=80',
      price: 4,
      currency: 'ETH',
      collection: 'Pudgy Penguins'
    },
  ];
};

// --- Main Component ---
export default function NFTGallery() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fetch data using React Query (simulating tRPC hook)
  const { data: nfts, isLoading, isError, error, refetch } = useQuery<NFT[], Error>({
    queryKey: ['nfts', 'gallery'],
    queryFn: fetchNFTs,
    retry: 1,
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-md border-b ${isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">SKYCOIN<span className="text-indigo-500">4444</span></h1>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
              NFT Gallery
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-50' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'}`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-indigo-500/20">
              <Wallet size={18} />
              <span className="hidden sm:inline">Connect Wallet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Trending Collections</h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Discover, collect, and trade extraordinary NFTs on the SKYCOIN4444 network.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Loading blockchain assets...
            </p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className={`flex flex-col items-center justify-center py-16 px-4 rounded-2xl border ${isDarkMode ? 'bg-red-950/20 border-red-900/50' : 'bg-red-50 border-red-200'}`}>
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-500 mb-2">Connection Error</h3>
            <p className={`text-center max-w-md mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {error instanceof Error ? error.message : 'An unknown error occurred while fetching NFTs.'}
            </p>
            <button 
              onClick={() => refetch()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* NFT Grid */}
        {!isLoading && !isError && nfts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <div 
                key={nft.id} 
                className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-indigo-500/10' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-indigo-500/5'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-800">
                  <img 
                    src={nft.imageUrl} 
                    alt={nft.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {nft.collection}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold truncate pr-2" title={nft.name}>
                      {nft.name}
                    </h3>
                  </div>
                  
                  <p className={`text-sm line-clamp-2 mb-4 flex-grow ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {nft.description}
                  </p>

                  {/* Price and Action */}
                  <div className={`pt-4 mt-auto border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div>
                      <p className={`text-xs font-medium mb-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Current Price
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-lg">{nft.price}</span>
                        <span className="text-indigo-500 font-semibold">{nft.currency}</span>
                      </div>
                    </div>
                    
                    <button className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white' 
                        : 'bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white'
                    }`}>
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
