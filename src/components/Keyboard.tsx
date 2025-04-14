interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  solution: string;
  lastPressed: string;
}

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function Keyboard({ onKeyPress, guesses, solution, lastPressed }: KeyboardProps) {
  const getKeyStatus = (key: string) => {
    const flatGuesses = guesses.join('');
    if (!flatGuesses.includes(key)) return 'bg-[#21262d]';

    if (guesses.some((guess) =>
      guess.split('').some((letter, i) => letter === key && solution[i] === key)
    )) {
      return 'bg-[#238636]';
    }

    if (guesses.some((guess) =>
      guess.includes(key) && solution.includes(key)
    )) {
      return 'bg-[#9e6a03]';
    }

    return 'bg-[#30363d]';
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${key.length > 1 ? 'w-12 sm:w-16 text-xs sm:text-sm' : 'w-8 sm:w-10'}
                h-12 sm:h-14 flex items-center justify-center rounded font-bold text-[#c9d1d9] 
                ${key === 'DEL' || key === 'ENTER' ? 'bg-[#21262d]' : getKeyStatus(key)}
                transition-all duration-200 hover:opacity-90 active:scale-95 touch-manipulation
                ${lastPressed === key ? 'ring-1 ring-[#58a6ff] ring-opacity-50' : ''}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}