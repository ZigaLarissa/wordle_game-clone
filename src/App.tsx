import { useState, useEffect, useCallback } from 'react';
import words from './data/words';
import Keyboard from './components/Keyboard';

type GameStatus = 'playing' | 'won' | 'lost';

function App() {
  const [solution] = useState(() => {
    const wordsList = words.split('\n');
    return wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
  });
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [showToast, setShowToast] = useState(false);

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) return;
      if (!words.includes(currentGuess.toLowerCase())) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === solution) {
        setGameStatus('won');
      } else if (newGuesses.length === 6) {
        setGameStatus('lost');
      }
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameStatus, guesses, solution]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('⌫');
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, solution, gameStatus, handleKeyPress]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <header className="w-full border-b border-gray-700 p-4 mb-4">
        <h1 className="text-2xl font-bold text-center text-white">WORDLE</h1>
      </header>

      <div className="grid grid-rows-6 gap-2 px-2 mb-4">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {[...Array(5)].map((_, colIndex) => {
              const letter = guesses[rowIndex]?.[colIndex] ??
                (rowIndex === guesses.length ? currentGuess[colIndex] : '');
              const isCurrentRow = rowIndex === guesses.length;
              const isGuessed = rowIndex < guesses.length;

              let bgColor = 'bg-gray-800';
              if (isGuessed) {
                const solutionLetters = [...solution];
                if (letter === solution[colIndex]) {
                  bgColor = 'bg-green-600';
                } else if (solutionLetters.includes(letter)) {
                  bgColor = 'bg-yellow-600';
                } else {
                  bgColor = 'bg-gray-700';
                }
              }

              return (
                <div
                  key={colIndex}
                  className={`w-14 h-14 border-2 flex items-center justify-center text-xl font-bold uppercase transition-colors text-white
                    ${isCurrentRow ? 'border-gray-600' : 'border-gray-700'} ${bgColor}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {gameStatus !== 'playing' && (
        <div className="text-xl font-bold mb-4 text-white">
          {gameStatus === 'won' ? 'Congratulations!' : `The word was ${solution}`}
        </div>
      )}

      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          Not in word list
        </div>
      )}

      <div className="mt-auto mb-8">
        <Keyboard
          onKeyPress={handleKeyPress}
          guesses={guesses}
          solution={solution}
        />
      </div>
    </div>
  );
}

export default App;
