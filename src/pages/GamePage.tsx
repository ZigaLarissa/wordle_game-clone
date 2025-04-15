import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Keyboard from '../components/Keyboard';
import { getWordList } from '../data'

type GameStatus = 'playing' | 'won' | 'lost';

const GamePage = () => {
  const { gameType } = useParams();
  const navigate = useNavigate();
  const words = getWordList(gameType || 'chapters');
  
  const getNewWord = () => {
    const wordsList = words.split('\n');
    return wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
  };

  const [solution, setSolution] = useState(getNewWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [showToast, setShowToast] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [lastPressed, setLastPressed] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [showWordList, setShowWordList] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);

  // Get proper title based on game type
  const getGameTitle = () => {
    switch(gameType) {
      case 'chapters': return 'Bible Books';
      case 'characters': return 'Bible Characters';
      case 'places': return 'Bible Places';
      default: return 'Bible Word Game';
    }
  };

  // Rest of your existing code...
  const getHint = () => {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const vowelCount = [...solution].filter(letter => vowels.includes(letter)).length;
    return `Hint: The word starts with '${solution[0]}' and contains ${vowelCount} vowel${vowelCount !== 1 ? 's' : ''}.`;
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing' || showWordList) return; // Disable keyboard when study mode is open

    setLastPressed(key);
    // Clear the last pressed key after a short delay
    setTimeout(() => setLastPressed(''), 200);

    if (key === 'ENTER') {
      if (currentGuess.length !== solution.length) return;
      if (!words.includes(currentGuess.toLowerCase())) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      // Show hint after 3 failed attempts
      if (newGuesses.length === 3 && currentGuess !== solution) {
        setShowHint(true);
      }

      if (currentGuess === solution) {
        setGameStatus('won');
      } else if (newGuesses.length === 6) {
        setGameStatus('lost');
      }
    } else if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameStatus, guesses, solution, showWordList]);

  const markWordsAsReviewed = () => {
    setShowWordList(false);
    setIsGameActive(true);
  };

  const resetGame = () => {
    setSolution(getNewWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShowHint(false);
    setIsGameActive(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('DEL');
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, solution, gameStatus, handleKeyPress]);


  return (
    <div className="min-h-screen bg-[#0d1117] flex relative overflow-hidden">
      
      
      {/* Rest of your existing JSX... */}
            {/* Mobile Instructions Toggle Button */}
            <button
        onClick={() => setShowInstructions(prev => !prev)}
        className={`md:hidden fixed top-4 right-4 z-50 bg-[#21262d] text-[#c9d1d9] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95
          ${showInstructions ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label={showInstructions ? 'Close instructions' : 'Show instructions'}
      >
        ?
      </button>

      {/* Game Rules Section */}
      <div
        className={`fixed md:relative w-full md:w-1/4 h-screen bg-[#161b22] transform transition-transform duration-300 ease-in-out 
          ${showInstructions ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          border-r border-[#30363d] text-[#c9d1d9] overflow-y-auto
          md:block z-40`}
      >
        {/* Mobile close button - positioned on the right */}
        <button
          onClick={() => setShowInstructions(false)}
          className="md:hidden absolute top-4 right-4 z-20 bg-[#21262d] text-[#c9d1d9] w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          ×
        </button>

        <div className="p-4 opacity-0 animate-fadeIn">
          {/* Back to Home button */}
          <button
            onClick={() => navigate('/')}
            className="z-50 bg-[#21262d] text-[#c9d1d9] my-4 px-4 py-2 rounded-md hover:bg-[#30363d] transition-colors"
          >
            ← Back to Home
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white animate-slideDown">How to Play</h2>
          <div className="space-y-6">
            <div className="bg-[#21262d] rounded-lg p-4 transform animate-slideIn opacity-0" style={{ animationDelay: '100ms' }}>
              <h3 className="font-semibold mb-2 text-[#c9d1d9]">Game Rules</h3>
              <ul className="space-y-2 text-[#8b949e]">
                <li className="flex items-center">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  Guess the word in 6 tries
                </li>
                <li className="flex items-center">
                  <span className="text-[#58a6ff] mr-2">•</span>
                  Each guess must fill the provide row
                </li>
              </ul>
            </div>

            <div className="bg-[#21262d] rounded-lg p-4 transform animate-slideIn opacity-0" style={{ animationDelay: '200ms' }}>
              <h3 className="font-semibold mb-2 text-[#c9d1d9]">Tile Colors</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-[#238636] rounded mr-3 flex-shrink-0"></div>
                  <span className="text-[#8b949e]">Letter is correct and in right spot</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-[#9e6a03] rounded mr-3 flex-shrink-0"></div>
                  <span className="text-[#8b949e]">Letter is in word but wrong spot</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-[#30363d] rounded mr-3 flex-shrink-0"></div>
                  <span className="text-[#8b949e]">Letter is not in word</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#21262d] rounded-lg p-4 transform animate-slideIn opacity-0" style={{ animationDelay: '300ms' }}>
              <h3 className="font-semibold mb-2 text-[#c9d1d9]">Tips</h3>
              <p className="text-[#8b949e] text-sm">
                Start with words that have common letters. Try to use different letters in each guess to eliminate more possibilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-35 transition-opacity duration-300 md:hidden
          ${showInstructions ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowInstructions(false)}
      ></div>

      
      {/* Game Section */}
      <div className={`flex-1 flex flex-col items-center min-h-screen ${showWordList ? 'opacity-50 pointer-events-none' : ''}`}>
        <header className="w-full p-4 mb-4 pt-16">
            <h1 className="text-2xl font-bold text-center text-[#c9d1d9]">{getGameTitle()}</h1>
            <p className="text-center text-sm text-[#8b949e] mt-1">
            Developed by Ziga Larissa - Inspired by John N and the original Wordle game.
            </p>
        </header>

        {showHint && gameStatus === 'playing' && (
          <div className="mb-4 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded-lg animate-slideDown">
            {getHint()}
          </div>
        )}

        <div className="grid grid-rows-6 gap-1 sm:gap-2 px-1 sm:px-2 mb-4">
          {[...Array(6)].map((_, rowIndex) => (
            // each row has columns equal to the length of the solution
            // if it is a 5 letter word, so 5 columns
            <div 
              key={rowIndex} 
              className="grid gap-1 sm:gap-2"
              style={{ gridTemplateColumns: `repeat(${solution.length}, 1fr)` }}
            >
              {[...Array(solution.length)].map((_, colIndex) => {
                const letter = guesses[rowIndex]?.[colIndex] ??
                  (rowIndex === guesses.length ? currentGuess[colIndex] : '');
                const isCurrentRow = rowIndex === guesses.length;
                const isGuessed = rowIndex < guesses.length;

                let bgColor = 'bg-[#161b22]';
                if (isGuessed) {
                  const solutionLetters = [...solution];
                  if (letter === solution[colIndex]) {
                    bgColor = 'bg-[#238636]';
                  } else if (solutionLetters.includes(letter)) {
                    bgColor = 'bg-[#9e6a03]';
                  } else {
                    bgColor = 'bg-[#30363d]';
                  }
                }

                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-lg sm:text-xl font-bold uppercase transition-colors text-[#c9d1d9]
                      ${isCurrentRow ? 'border-[#30363d]' : 'border-[#21262d]'} ${bgColor}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {gameStatus !== 'playing' && (
          <div className="text-center">
            <div className={`text-lg sm:text-xl font-bold pt-2 ${gameStatus === 'won' ? "text-green-500" : "text-[#c9d1d9]"}`}>
              {gameStatus === 'won' ? 'Congratulations!' : `The word was ${solution}`}
            </div>
            <button
              onClick={resetGame}
              className="my-4 px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}

        {showToast && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#f0f09a] text-[#797907] text-yellow px-4 py-2 rounded shadow-lg">
            Not in word list
          </div>
        )}

        <div className="mt-10 md:mt-auto mb-4 sm:mb-8 w-full px-1 sm:px-0">
          <Keyboard
            onKeyPress={handleKeyPress}
            guesses={guesses}
            solution={solution}
            lastPressed={lastPressed}
          />
        </div>
      </div>

      {/* Word List Study Section */}
      <div className={`fixed right-0 top-0 md:relative w-full md:w-1/4 h-screen bg-[#161b22] transform transition-transform duration-300 ease-in-out 
        ${showWordList ? 'translate-x-0' : 'translate-x-full md:translate-x-full'}
        border-l border-[#30363d] text-[#c9d1d9] overflow-y-auto z-30`}
      >
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Study Mode</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#21262d] rounded-lg p-4">
              <p className="text-[#8b949e] text-sm mb-4">
                Take time to review the possible words before starting your game. This list will be hidden during gameplay to maintain the challenge.
              </p>
              <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent pr-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {words.split('\n').map((word, index) => (
                    <div key={index} className="bg-[#30363d] px-3 py-1 rounded text-[#c9d1d9] uppercase">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={markWordsAsReviewed}
                className="mt-6 w-full px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors"
              >
                Start Playing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Study Mode Toggle Button */}
      {!showWordList && (
        <button
          onClick={() => !isGameActive && setShowWordList(true)}
          className={`fixed bottom-4 right-4 z-20 px-4 py-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 
            ${isGameActive
              ? 'bg-[#30363d] text-[#8b949e] cursor-not-allowed'
              : 'bg-[#238636] text-white hover:bg-[#2ea043] active:scale-95 cursor-pointer'}`}
          disabled={isGameActive}
          title={isGameActive ? "Cannot study words during an active game" : "Study the word list"}
        >
          Study Words
        </button>
      )}

      {/* Overlay for mobile when word list is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-25 transition-opacity duration-300 md:hidden
          ${showWordList ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowWordList(false)}
      ></div>  
    </div>
  );
};

export default GamePage;