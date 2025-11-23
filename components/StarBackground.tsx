import React, { useMemo } from 'react';
import { Star } from '../types';

const StarBackground: React.FC = () => {
  const stars = useMemo(() => {
    const tempStars: Star[] = [];
    for (let i = 0; i < 200; i++) {
      tempStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random(),
        twinkleDuration: Math.random() * 3 + 2,
      });
    }
    return tempStars;
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050510] to-black opacity-80" />
        
        {stars.map((star) => (
            <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${star.twinkleDuration}s infinite ease-in-out alternate`
            }}
            />
        ))}
        <style>{`
            @keyframes twinkle {
                0% { opacity: 0.3; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1.2); }
            }
        `}</style>
    </div>
  );
};

export default StarBackground;
