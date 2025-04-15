declare module '@data' {
    export function getWordList(gameType: string): string;
    export type GameType = 'chapters' | 'characters' | 'places';
  }