// AUTO-GENERATED DRAFT SCREEN: TeamOverview
import React, { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
}

// Mock data fetching function to simulate tRPC
const fetchTeamData = (): Promise<TeamMember[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Alice Smith',
          role: 'CEO & Founder',
          imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=AS',
          description: 'Visionary leader with a strong background in blockchain technology and finance.',
        },
        {
          id: '2',
          name: 'Bob Johnson',
          role: 'CTO',
          imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=BJ',
          description: 'Architect of the core technology, specializing in secure and scalable systems.',
        },
        {
          id: '3',
          name: 'Charlie Brown',
          role: 'Lead Developer',
          imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=CB',
          description: 'Passionate about open-source and building robust, efficient applications.',
        },
        {
          id: '4',
          name: 'Diana Prince',
          role: 'Marketing Director',
          imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=DP',
          description: 'Expert in digital marketing and community engagement for crypto projects.',
        },
      ]);
    }, 1500);
  });
};

const TeamOverview: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamData();
        setTeam(data);
      } catch (err) {
        setError('Failed to load team data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTeamData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading team data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <p className="text-lg font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
          SKYCOIN4444 Team Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500 dark:border-indigo-400"
                src={member.imageUrl}
                alt={member.name}
                aria-label={`Photo of ${member.name}`}
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h2>
              <p className="text-indigo-600 dark:text-indigo-300 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
