// AUTO-GENERATED DRAFT SCREEN: StoryViewer
import React, { useState, useEffect } from 'react';

interface Story {
  id: string;
  imageUrl: string;
  duration: number;
  seen: boolean;
}

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  stories: Story[];
}

interface StoryViewerProps {
  user: User;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ user, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = user.stories[currentStoryIndex];

  useEffect(() => {
    if (!currentStory) return;

    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          handleNextStory();
          return 100;
        }
        return prev + (100 / currentStory.duration);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStoryIndex, currentStory]);

  const handleNextStory = () => {
    if (currentStoryIndex < user.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // Optionally go to previous user's story or close
    }
  };

  if (!currentStory) {
    return null; // Or a loading/error state
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-full max-w-md h-full max-h-[80vh] bg-gray-800 rounded-lg overflow-hidden">
        <img src={currentStory.imageUrl} alt="Story" className="w-full h-full object-cover" />

        <div className="absolute top-0 left-0 right-0 p-2 flex items-center space-x-2">
          {user.stories.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-grow rounded-full ${index < currentStoryIndex ? 'bg-white' : 'bg-gray-500'}`}
            >
              {index === currentStoryIndex && (
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
          <span className="text-white font-semibold">{user.name}</span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          &times;
        </button>

        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button onClick={handlePrevStory} className="text-white text-4xl opacity-50 hover:opacity-100">&lt;</button>
          <button onClick={handleNextStory} className="text-white text-4xl opacity-50 hover:opacity-100">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;