'use client';
import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

export default function TimerTab() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Optional: Add alarm sound here
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  // Calculate progress percentage
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="text-center space-y-8 p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-indigo-800 mb-2">Focus Session</h1>
      <h4 className=" subheading text-indigo-600 mb-6">Stay productive with timed intervals</h4>
      
      {/* Circular Timer with Progress */}
      <div  className=" relative w-70 h-70 mx-auto mb-8">
        {/* Background Circle */}
      
        
       
        
        {/* Time Display */}
        <div className=" Time-Display absolute inset-0 flex items-center justify-center flex-col">
          <span className="Time-left text-5xl font-bold text-indigo-700">
            {formatTime(timeLeft)}
          </span>
          <span className="Time-Text text-indigo-500 mt-2">
            {isRunning ? 'Focusing...' : 'Ready to work'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`Timer-button flex items-center gap-2 px-8 py-3 rounded-full text-white shadow-lg transition-all ${
            isRunning 
              ? 'bg-rose-500 hover:bg-rose-600' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isRunning ? (
            <>
              <PauseIcon className=" w-5 h-5" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5" />
              Start Focus
            </>
          )}
        </button>
        
        <button 
          onClick={resetTimer}
          className="Timer-button"
        >
          Reset
        </button>
      </div>

      {/* Session Tips */}
      <div className="mt-8 text-sm text-gray-600">
        <p className='Tip'>Tip: Try working in 25-minute intervals with 5-minute breaks</p>
      </div>
    </div>
  );
}