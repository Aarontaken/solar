import React from 'react';

interface ControlsProps {
  speed: number;
  setSpeed: (speed: number) => void;
  scale: number;
  setScale: (scale: number) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  speed, 
  setSpeed, 
  scale, 
  setScale,
  isPaused,
  setIsPaused
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
      
      {/* Play/Pause */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-colors"
      >
        {isPaused ? (
          <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        )}
      </button>

      {/* Speed Slider */}
      <div className="flex flex-col items-center w-32">
        <div className="flex justify-between w-full text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          <span>Speed</span>
          <span>{speed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="5.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>

       {/* Scale/Zoom Slider */}
       <div className="flex flex-col items-center w-32">
        <div className="flex justify-between w-full text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          <span>Zoom</span>
          <span>{scale.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>

    </div>
  );
};

export default Controls;
