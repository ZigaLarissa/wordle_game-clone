import chapters from './chapters';
import characters from './characters';
import places from './places';

export const getWordList = (type) => {
  switch(type) {
    case 'chapters': return chapters;
    case 'characters': return characters;
    case 'places': return places;
    default: return chapters;
  }
};

export { chapters, characters, places };