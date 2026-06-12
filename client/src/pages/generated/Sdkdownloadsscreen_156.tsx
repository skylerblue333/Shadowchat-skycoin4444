// AUTO-GENERATED DRAFT SCREEN: SdkDownloadsScreen
import React, { useState } from 'react';
import {
  Download,
  Terminal,
  FileCode2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Moon,
  Sun,
  MonitorSmartphone,
  Server,
  Database,
  Shield,
  ChevronRight,
  Search
} from 'lucide-react';

// Mock types for tRPC
type SdkVersion = {
  id: string;
  version: string;
  language: string;
  releaseDate: string;
  size: string;
  changelog: string;
  downloads: number;
};

// Mock tRPC hook
const useSdkDownloads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock data
  const sdks: SdkVersion[] = [
    { id: '1', version: 'v2.4.1', language: 'TypeScript', releaseDate: '2026-05-15', size: '2.4 MB', changelog: 'Added new trading pairs support', downloads: 14500 },
    { id: '2', version: 'v2.4.0', language: 'Python', releaseDate: '2026-05-10', size: '1.8 MB', changelog: 'Performance improvements for async operations', downloads: 12200 },
    { id: '3', version: 'v1.8.5', language: 'Go', releaseDate: '2026-04-28', size: '4.2 MB', changelog: 'Fixed memory leak in WebSocket connection', downloads: 8900 },
    { id: '4', version: 'v3.0.0-beta', language: 'Rust', releaseDate: '2026-06-01', size: '3.1 MB', changelog: 'Initial beta release of v3 API', downloads: 3400 },
    { id: '5', version: 'v2.1.0', language: 'Java', releaseDate: '2026-03-20', size: '5.6 MB', changelog: 'Updated dependencies and security patches', downloads: 6700 },
  ];

  return {
    data: sdks,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
};

export default function SdkDownloadsScreen() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data: sdks, isLoading, error } = useSdkDownloads();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => setDownloadingId(null), 2000);
  };

  const filteredSdks = sdks?.filter(sdk => {
    const matchesSearch = sdk.language.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sdk.version.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage ? sdk.language === selectedLanguage : true;
    return matchesSearch && matchesLanguage;
  });

  const languages = Array.from(new Set(sdks?.map(sdk => sdk.language) || []));

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
        <div className="max-w-md p-6 rounded-xl border border-red-500/20 bg-red-500/10 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load SDKs</h2>
          <p className="text-slate-400 mb-4">{error.message}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b backdrop-blur-sm ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">SKYCOIN<span className="text-blue-500">4444</span> SDKs</h1>
          </div>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-50' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Build with SKYCOIN4444</h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Integrate powerful crypto trading capabilities into your applications with our official SDKs. 
            Fully typed, well-documented, and built for production.
          </p>
          
          {/* Quick Install Command */}
          <div className={`relative rounded-xl p-4 flex items-center justify-between group ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="flex items-center gap-3 font-mono text-sm">
              <span className="text-blue-500">$</span>
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>npm install @skycoin4444/sdk</span>
            </div>
            <button 
              className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-500'}`}
              aria-label="Copy command"
            >
              <FileCode2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className={`relative flex-1 rounded-lg border flex items-center px-3 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 focus-within:border-blue-500' : 'bg-white border-slate-200 focus-within:border-blue-500'}`}>
            <Search className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
            <input 
              type="text" 
              placeholder="Search SDKs by language or version..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent border-none outline-none px-3 py-2.5 ${theme === 'dark' ? 'text-slate-100 placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setSelectedLanguage(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${!selectedLanguage ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              All Languages
            </button>
            {languages.map(lang => (
              <button 
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedLanguage === lang ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* SDK List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Loading SDKs...</p>
          </div>
        ) : filteredSdks?.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
            <Terminal className={`w-12 h-12 mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`} />
            <h3 className="text-lg font-medium mb-1">No SDKs found</h3>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSdks?.map((sdk) => (
              <div 
                key={sdk.id} 
                className={`group relative rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg ${theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      {sdk.language === 'TypeScript' ? <MonitorSmartphone className="w-5 h-5 text-blue-400" /> :
                       sdk.language === 'Python' ? <Database className="w-5 h-5 text-yellow-400" /> :
                       sdk.language === 'Go' ? <Server className="w-5 h-5 text-cyan-400" /> :
                       <Terminal className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{sdk.language}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        {sdk.version}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`text-sm mb-6 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {sdk.changelog}
                </p>
                
                <div className={`flex items-center justify-between text-xs mb-6 pb-6 border-b ${theme === 'dark' ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> {sdk.size}</span>
                  <span>{new Date(sdk.releaseDate).toLocaleDateString()}</span>
                  <span>{sdk.downloads.toLocaleString()} dl</span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDownload(sdk.id)}
                    disabled={downloadingId === sdk.id}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      downloadingId === sdk.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20'
                    }`}
                  >
                    {downloadingId === sdk.id ? (
                      <><CheckCircle2 className="w-4 h-4" /> Downloaded</>
                    ) : (
                      <><Download className="w-4 h-4" /> Download SDK</>
                    )}
                  </button>
                  <button className={`p-2.5 rounded-lg border transition-colors ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}