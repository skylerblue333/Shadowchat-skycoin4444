// AUTO-GENERATED DRAFT SCREEN: CryptoPodcastPlayer
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider'; // Placeholder for shadcn/ui Slider
import { Volume2, VolumeX, Play, Pause, Sun, Moon } from 'lucide-react'; // Placeholder for icons

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // Duration in seconds
}

// Simulate a tRPC-like hook for fetching podcast episodes
const usePodcastEpisodes = () => {
  return useQuery<PodcastEpisode[], Error>({
    queryKey: ['podcastEpisodes'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call delay
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch podcast episodes.');
      }
      return [
        { id: '1', title: 'The Future of DeFi', description: 'An in-depth look into decentralized finance and its potential to revolutionize traditional financial systems. Featuring expert interviews and market analysis.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: 1800 },
        { id: '2', title: 'NFTs and Digital Art', description: 'Exploring the burgeoning world of non-fungible tokens, their impact on digital art, and future investment opportunities. Discussions on popular marketplaces and artist spotlights.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: 2400 },
        { id: '3', title: 'Blockchain Scalability Solutions', description: 'Discussing layer 2 solutions, sharding, and other innovative approaches to enhance blockchain network efficiency and transaction speed. A deep dive into the technical challenges and advancements.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: 2000 },
        { id: '4', title: 'Decentralized Autonomous Organizations (DAOs)', description: 'Understanding the structure, governance, and future of DAOs in the crypto ecosystem. Case studies of successful DAOs and their community-driven initiatives.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: 2200 },
        { id: '5', title: 'Crypto Gaming and the Metaverse', description: 'The convergence of blockchain technology with gaming and virtual worlds. Exploring play-to-earn models, virtual land ownership, and the immersive experiences of the metaverse.', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: 1900 },
      ];
    },
  });
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const CryptoPodcastPlayer: React.FC = () => {
  const { data: episodes, isLoading, isError, error } = usePodcastEpisodes();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, currentEpisode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentEpisode]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  const playEpisode = (episode: PodcastEpisode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current && currentEpisode) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 dark:text-gray-100" aria-live="polite" aria-atomic="true">
        <p className="text-lg font-medium">Loading podcast episodes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 dark:text-gray-100 p-4" role="alert">
        <p className="text-red-500 text-xl mb-4">Error: {error?.message || 'Something went wrong while fetching episodes.'}</p>
        <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Retry Loading
        </Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <header className="flex flex-col sm:flex-row justify-between items-center p-6 shadow-md dark:shadow-gray-700 bg-white dark:bg-gray-800">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-0">Crypto Podcast Player</h1>
        <Button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDarkTheme ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </header>

      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {episodes?.map(episode => (
              <Card key={episode.id} className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">{episode.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{episode.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Duration: {formatTime(episode.duration)}</span>
                    <Button
                      onClick={() => playEpisode(episode)}
                      aria-label={`Play ${episode.title}`}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                      {currentEpisode?.id === episode.id && isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-6">Now Playing</h2>
          <Card className="sticky top-8 dark:bg-gray-800 dark:border-gray-700 shadow-lg">
            <CardContent className="p-6">
              {currentEpisode ? (
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold mb-2 text-center">{currentEpisode.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-4">{currentEpisode.description}</p>
                  <audio ref={audioRef} src={currentEpisode.audioUrl} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} preload="metadata" />
                  <div className="w-full flex items-center space-x-4 mt-4">
                    <Button onClick={() => setIsPlaying(prev => !prev)} variant="ghost" size="icon" aria-label={isPlaying ? "Pause" : "Play"}>
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Slider
                      value={[progress]}
                      max={100}
                      step={0.1}
                      onValueChange={handleProgressChange}
                      className="w-full"
                      aria-label="Playback progress"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(currentEpisode.duration)}
                    </span>
                  </div>
                  <div className="w-full flex items-center space-x-2 mt-4">
                    <Button onClick={() => setVolume(prev => (prev === 0 ? 0.7 : 0))} variant="ghost" size="icon" aria-label={volume === 0 ? "Unmute" : "Mute"}>
                      {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <Slider
                      value={[volume * 100]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="w-full"
                      aria-label="Volume control"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">Select an episode to play.</p>
              )}
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
};

export default CryptoPodcastPlayer;
