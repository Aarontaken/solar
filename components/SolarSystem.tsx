import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PLANETS } from '../constants';
import { PlanetData } from '../types';

interface SolarSystemProps {
  speed: number;
  scale: number;
  isPaused: boolean;
  onPlanetSelect: (planet: PlanetData) => void;
  selectedPlanetId: string | undefined;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ 
  speed, 
  scale, 
  isPaused,
  onPlanetSelect,
  selectedPlanetId
}) => {
  const requestRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // To update DOM without React render cycle for performance
  const planetRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const orbitRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const animate = useCallback(() => {
    if (!isPaused) {
      // Increment time based on speed
      // Base speed factor: 0.05 gives a nice default rotation
      timeRef.current += 0.05 * speed;
    }

    PLANETS.forEach((planet) => {
      const element = planetRefs.current.get(planet.id);
      
      if (element) {
        // Calculate orbital position
        // Scale distance to fit screen somewhat
        // period is in Earth days roughly. 
        // angular velocity = 2*PI / period
        // We use a simplified formula for visual effect
        const angle = (timeRef.current / planet.period) * Math.PI * 2;
        
        // Visual distance scaler
        const visualDistance = planet.distance * scale;

        const x = Math.cos(angle) * visualDistance;
        const y = Math.sin(angle) * visualDistance;

        // Apply transform directly to DOM
        element.style.transform = `translate(${x}px, ${y}px)`;
        
        // Keep planet name/icon non-rotated or handle z-index if needed
        element.style.zIndex = Math.round(y) > 0 ? '20' : '5'; // Simple depth sorting attempt
      }

      // Update orbit rings scale if zoom changes
      const orbitEl = orbitRefs.current.get(planet.id);
      if (orbitEl) {
          const size = planet.distance * 2 * scale;
          orbitEl.style.width = `${size}px`;
          orbitEl.style.height = `${size}px`;
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [speed, scale, isPaused]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // Center helper
  const [center, setCenter] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateCenter = () => {
        setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };
    window.addEventListener('resize', updateCenter);
    updateCenter();
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none" // Main container non-interactive to let background clicks through if needed
    >
      {/* Centered System Container */}
      <div 
        className="absolute w-0 h-0"
        style={{ left: center.x, top: center.y }}
      >
        {/* Sun */}
        <div 
            className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-yellow-400 shadow-[0_0_60px_20px_rgba(253,224,71,0.6)] z-10 cursor-pointer pointer-events-auto hover:scale-110 transition-transform duration-300"
            onClick={() => onPlanetSelect({ 
                id: 'sun', 
                name: '太阳 (Sun)', 
                color: 'bg-yellow-400', 
                radius: 50, distance: 0, period: 1, 
                description: '太阳系的中心恒星，占据了太阳系总质量的99.86%。', 
                details: { temp: '5500°C', day: 'N/A', moons: 0, type: '恒星' } 
            })}
        >
             <div className="absolute inset-0 bg-orange-500 rounded-full opacity-40 animate-pulse" />
        </div>

        {/* Planet Orbits & Bodies */}
        {PLANETS.map((planet) => (
          <React.Fragment key={planet.id}>
            {/* Orbit Ring */}
            <div
              ref={(el) => { if (el) orbitRefs.current.set(planet.id, el); }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none"
              style={{
                width: `${planet.distance * 2 * scale}px`,
                height: `${planet.distance * 2 * scale}px`,
              }}
            />

            {/* Planet Group (Anchor for animation) */}
            <div
              ref={(el) => { if (el) planetRefs.current.set(planet.id, el); }}
              className="absolute left-0 top-0 pointer-events-auto"
            >
              {/* The Actual Planet Visual */}
              <div 
                onClick={() => onPlanetSelect(planet)}
                className={`
                    absolute -translate-x-1/2 -translate-y-1/2 
                    rounded-full cursor-pointer 
                    transition-all duration-300
                    hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]
                    hover:scale-125
                    ${planet.color}
                    ${selectedPlanetId === planet.id ? 'ring-2 ring-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.6)]' : ''}
                `}
                style={{
                  width: `${planet.radius * scale}px`,
                  height: `${planet.radius * scale}px`,
                  // Simple gradient overlay for 3D effect
                  backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.6) 85%)'
                }}
              >
                 {/* Planet Label (Only show on hover or selected for cleanliness, or always show for clarity) */}
                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] text-gray-300 whitespace-nowrap opacity-60 pointer-events-none">
                    {planet.name.split(' ')[0]}
                 </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SolarSystem;
