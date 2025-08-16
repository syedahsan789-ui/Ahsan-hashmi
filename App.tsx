
import React, { useState, useEffect, useCallback } from 'react';
// Types are used for JSDoc or comments if needed, but not in executable syntax
// import { LevelConfiguration } from './types'; 
import { GAME_LEVELS } from './constants.tsx'; // Explicitly import .tsx
import LevelDisplay from './components/LevelDisplay';
import { StarIcon, SparkleIcon } from './components/icons';

// Simple function to preload audio
const preloadAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = 'auto';
  return audio;
};

const App = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Sound effects
  const [correctSound, setCorrectSound] = useState(null);
  const [incorrectSound, setIncorrectSound] = useState(null);
  const [levelUpSound, setLevelUpSound] = useState(null);
  const [gameWinSound, setGameWinSound] = useState(null);

  useEffect(() => {
    // Basic sound data URLs (short and simple to avoid external files for this example)
    // Real app: use proper sound files. These are very basic placeholders.
    // Correct sound (simple "ding")
    setCorrectSound(preloadAudio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(300).join('A'))); // Short blip
    // Incorrect sound (simple "buzz")
    setIncorrectSound(preloadAudio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(200).join('g') + Array(100).join('A'))); // Low freq blip
    // Level up sound
    setLevelUpSound(preloadAudio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(100).join('A') + Array(100).join('Q') + Array(100).join('g'))); // Ascending blip
     // Game win sound
    setGameWinSound(preloadAudio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(50).join('A') + Array(50).join('E') + Array(50).join('I') + Array(50).join('M') + Array(50).join('Q') + Array(50).join('U') + Array(50).join('Y'))); // Longer ascending fanfare like
  }, []);

  const playSound = useCallback((sound) => {
    if (sound) {
      sound.currentTime = 0; // Rewind to start
      sound.play().catch(error => console.warn("Audio play failed:", error));
    }
  }, []);

  const handleLevelComplete = useCallback(() => {
    playSound(levelUpSound);
    if (currentLevelIndex < GAME_LEVELS.length - 1) {
      setCurrentLevelIndex(prevIndex => prevIndex + 1);
    } else {
      setGameComplete(true);
      playSound(gameWinSound);
    }
  }, [currentLevelIndex, levelUpSound, gameWinSound, playSound]);

  const handleRestartGame = () => {
    setCurrentLevelIndex(0);
    setGameComplete(false);
    setShowWelcome(true);
  };
  
  const handleStartGame = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 text-white text-center">
        <SparkleIcon className="w-24 h-24 text-yellow-300 mb-6" />
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to Drag & Drop Fun!</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Get ready to learn shapes, colors, numbers, and more by dragging items to their correct places. Let's play!
        </p>
        <button
          onClick={handleStartGame}
          className="px-12 py-4 bg-yellow-400 text-purple-700 font-bold text-2xl rounded-full shadow-xl hover:bg-yellow-300 transition-colors duration-200 transform hover:scale-105"
        >
          Start Game!
        </button>
      </div>
    );
  }


  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white text-center">
        <div className="flex mb-6">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-16 h-16 text-yellow-300 mx-1" />)}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Congratulations!</h1>
        <p className="text-xl md:text-2xl mb-8">You've completed all the levels! You're a superstar! 🌟</p>
        <button
          onClick={handleRestartGame}
          className="mt-8 px-10 py-3 bg-yellow-400 text-purple-700 font-bold text-xl rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-200 transform hover:scale-105"
        >
          Play Again?
        </button>
      </div>
    );
  }

  const currentLevelConfig = GAME_LEVELS[currentLevelIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-16 md:pt-24 bg-slate-100">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md p-3 z-10 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Drag & Drop Fun! Level {currentLevelIndex + 1}
        </h1>
        <button
          onClick={handleRestartGame}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors text-sm"
        >
          Restart Game
        </button>
      </header>
      <main className="w-full max-w-4xl">
        <LevelDisplay
          levelConfig={currentLevelConfig}
          onLevelComplete={handleLevelComplete}
          onCorrectDropSound={() => playSound(correctSound)}
          onIncorrectDropSound={() => playSound(incorrectSound)}
        />
      </main>
      <footer className="w-full text-center p-4 mt-8 text-gray-600 text-sm">
        Made with ❤️ for learning.
      </footer>
    </div>
  );
};

export default App;
