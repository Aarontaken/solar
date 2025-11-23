import React, { useState } from 'react';
import SolarSystem from './components/SolarSystem';
import StarBackground from './components/StarBackground';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import { PlanetData } from './types';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [speed, setSpeed] = useState<number>(1.0);
  const [scale, setScale] = useState<number>(1.0); // Zoom level
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* 1. Background Layer */}
      <StarBackground />

      {/* 2. Main Title Overlay */}
      <div className="absolute top-6 left-8 z-30 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
          SOLAR EXPLORER
        </h1>
        <p className="text-sm text-gray-400 mt-1 tracking-widest uppercase">Interactive 3D Simulation</p>
      </div>

      {/* 3. Solar System Layer */}
      <div className="absolute inset-0 z-20">
        <SolarSystem 
            speed={speed} 
            scale={scale}
            isPaused={isPaused}
            onPlanetSelect={setSelectedPlanet}
            selectedPlanetId={selectedPlanet?.id}
        />
      </div>

      {/* 4. UI Layer - Info Panel */}
      <InfoPanel 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
      />

      {/* 5. UI Layer - Controls */}
      <Controls 
        speed={speed} 
        setSpeed={setSpeed} 
        scale={scale}
        setScale={setScale}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

        {/* Footer/Credits */}
      <div className="absolute bottom-4 right-6 text-xs text-gray-600 z-30 pointer-events-none">
        Powered by React & Gemini API
      </div>
    </div>
  );
};

export default App;
