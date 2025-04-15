// src/data/index.ts
import chapters from './chapters';
import characters from './characters';
import places from './places';

export type GameType = 'chapters' | 'characters' | 'places';

export const getWordList = (type: string): string => {
  switch(type) {
    case 'chapters': return chapters;
    case 'characters': return characters;
    case 'places': return places;
    default: return chapters;
  }
};

export { chapters, characters, places };