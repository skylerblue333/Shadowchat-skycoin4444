// AUTO-GENERATED DRAFT SCREEN: UserProfile
import React, { useState } from 'react';
import { User, Mail, MapPin, Calendar, Link as LinkIcon, Edit2, Shield, Activity, Settings, LogOut, CheckCircle2 } from 'lucide-react';

// Mock tRPC hooks for standalone demonstration
const trpc = {
  user: {
    getProfile: {
      useQuery: () => ({
        data: {
          id: 'usr_123',
          username: 'skywalker',
          fullName: 'Luke Skywalker',
          email: 'luke@skycoin.net',
          bio: 'Crypto enthusiast, Jedi master, and early adopter of SKYCOIN. Building the decentralized future one block at a time.',
          location: 'Tatooine',
          joinedDate: '2023-05-04',
          website: 'https://skycoin.net/luke',
          verified: true,
          stats: {
            followers: 12400,
            following: 42,
            posts: 108,
            reputation: 98
          }
        },
        isLoading: false,
        error: null
      })
    }
  }
};

export default function UserProfile() {
  const { data: user, isLoading, error } = trpc.user.getProfile.useQuery();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-sky-500 rounded-full animate-spin"></div>
          <p className="text-zinc-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-50">
        <div className="bg-red-950/30 border border-red-900 p-6 rounded-xl max-w-md text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-400 mb-2">Failed to load profile</h2>
          <p className="text-red-300/80">We couldn't retrieve the user data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
          <div className="h-48 bg-gradient-to-r from-sky-900 via-indigo-900 to-purple-900 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>
          
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-4 gap-4">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <User className="w-16 h-16 text-zinc-500" />
                  </div>
                  {user.verified && (
                    <div className="absolute bottom-2 right-2 bg-sky-500 rounded-full p-1 border-2 border-zinc-900">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    {user.fullName}
                  </h1>
                  <p className="text-sky-400 font-medium">@{user.username}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors font-medium border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
                  Follow
                </button>
              </div>
            </div>

            <p className="text-zinc-300 max-w-2xl leading-relaxed mb-6">
              {user.bio}
            </p>

            <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4" />
                <a href={user.website} className="text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 rounded">
                  {user.website.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Stats & Info */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                Activity Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                  <div className="text-2xl font-bold text-zinc-100">{user.stats.followers.toLocaleString()}</div>
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Followers</div>
                </div>
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                  <div className="text-2xl font-bold text-zinc-100">{user.stats.following.toLocaleString()}</div>
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Following</div>
                </div>
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                  <div className="text-2xl font-bold text-zinc-100">{user.stats.posts.toLocaleString()}</div>
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Posts</div>
                </div>
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                  <div className="text-2xl font-bold text-sky-400">{user.stats.reputation}</div>
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Reputation</div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-zinc-400" />
                  </div>
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-300 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-2 hover:bg-red-950/50 rounded-lg transition-colors text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activity */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Posts</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-zinc-800 text-zinc-100 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-sky-500">All</button>
                  <button className="px-3 py-1 text-sm text-zinc-400 hover:text-zinc-200 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-sky-500">Articles</button>
                  <button className="px-3 py-1 text-sm text-zinc-400 hover:text-zinc-200 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-sky-500">Media</button>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Placeholder for posts */}
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-zinc-100 group-hover:text-sky-400 transition-colors">The Future of Decentralized Finance</h4>
                    <span className="text-xs text-zinc-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    Exploring how layer 2 solutions are transforming the landscape of decentralized finance and making it more accessible to the masses...
                  </p>
                </div>
                
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-zinc-100 group-hover:text-sky-400 transition-colors">Why I'm Bullish on SKYCOIN</h4>
                    <span className="text-xs text-zinc-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    After analyzing the whitepaper and the recent protocol upgrades, the fundamental value proposition of SKYCOIN has never been stronger...
                  </p>
                </div>
                
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-zinc-100 group-hover:text-sky-400 transition-colors">My Web3 Setup for 2024</h4>
                    <span className="text-xs text-zinc-500">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    A comprehensive guide to the hardware wallets, browser extensions, and security practices I use to keep my digital assets safe...
                  </p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500">
                Load More Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}