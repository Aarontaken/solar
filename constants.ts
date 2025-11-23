import { PlanetData } from './types';

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: '水星 (Mercury)',
    color: 'bg-stone-400',
    radius: 8,
    distance: 60,
    period: 88,
    description: '太阳系中最小且最接近太阳的行星。它的表面布满陨石坑，看起来很像月球。',
    details: { temp: '430°C / -180°C', day: '59 Earth days', moons: 0, type: '类地行星' }
  },
  {
    id: 'venus',
    name: '金星 (Venus)',
    color: 'bg-yellow-600',
    radius: 12,
    distance: 90,
    period: 225,
    description: '太阳系中最热的行星，拥有厚厚的有毒大气层，主要由二氧化碳组成，并有硫酸云。',
    details: { temp: '462°C', day: '243 Earth days', moons: 0, type: '类地行星' }
  },
  {
    id: 'earth',
    name: '地球 (Earth)',
    color: 'bg-blue-500',
    radius: 13,
    distance: 130,
    period: 365,
    description: '我们的家园，目前已知唯一孕育生命的星球。表面覆盖着70%的水。',
    details: { temp: '14°C (Avg)', day: '24 Hours', moons: 1, type: '类地行星' }
  },
  {
    id: 'mars',
    name: '火星 (Mars)',
    color: 'bg-red-500',
    radius: 10,
    distance: 170,
    period: 687,
    description: '被称为红色星球，是一颗多尘、寒冷、类似沙漠的世界，拥有极薄的大气层。',
    details: { temp: '-63°C', day: '24.6 Hours', moons: 2, type: '类地行星' }
  },
  {
    id: 'jupiter',
    name: '木星 (Jupiter)',
    color: 'bg-orange-300',
    radius: 35,
    distance: 260,
    period: 4333,
    description: '太阳系中最大的行星，是一颗气体巨星。著名的大红斑是一场持续了数百年的巨大风暴。',
    details: { temp: '-108°C', day: '9.9 Hours', moons: 79, type: '气体巨星' }
  },
  {
    id: 'saturn',
    name: '土星 (Saturn)',
    color: 'bg-yellow-200',
    radius: 30,
    distance: 350,
    period: 10759,
    description: '以其壮观的环系而闻名，主要由冰粒、岩石碎片和尘埃组成。',
    details: { temp: '-139°C', day: '10.7 Hours', moons: 82, type: '气体巨星' }
  },
  {
    id: 'uranus',
    name: '天王星 (Uranus)',
    color: 'bg-cyan-300',
    radius: 20,
    distance: 430,
    period: 30687,
    description: '一颗冰巨星，大气中含有甲烷，使其呈现蓝绿色。它的自转轴几乎与轨道平面平行。',
    details: { temp: '-197°C', day: '17.2 Hours', moons: 27, type: '冰巨星' }
  },
  {
    id: 'neptune',
    name: '海王星 (Neptune)',
    color: 'bg-blue-700',
    radius: 19,
    distance: 500,
    period: 60190,
    description: '太阳系中最遥远的行星，是一颗寒冷、黑暗且风力极强的冰巨星。',
    details: { temp: '-201°C', day: '16.1 Hours', moons: 14, type: '冰巨星' }
  }
];
