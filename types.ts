export interface PlanetData {
  id: string;
  name: string;
  color: string;
  radius: number; // Relative visual radius
  distance: number; // Relative distance from sun
  period: number; // Arbitrary orbital period units
  description: string;
  details: {
    temp: string;
    day: string;
    moons: number;
    type: string;
  };
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
}
