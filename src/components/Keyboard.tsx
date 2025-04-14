
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  solution: string;
}

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export default function Keyboard({ onKeyPress, guesses, solution }: KeyboardProps) {
  const getKeyStatus = (key: string) => {
    const flatGuesses = guesses.join('');
    if (!flatGuesses.includes(key)) return 'bg-gray-400';

    if (guesses.some((guess) =>
      guess.split('').some((letter, i) => letter === key && solution[i] === key)
    )) {
      return 'bg-green-600';
    }

    if (guesses.some((guess) =>
      guess.includes(key) && solution.includes(key)
    )) {
      return 'bg-yellow-600';
    }

    return 'bg-gray-700';
  };

  return (
    <div className="w-full max-w-lg px-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${key.length > 1 ? 'w-16' : 'w-10'
                } h-14 flex items-center justify-center rounded font-bold text-white ${key === '⌫' || key === 'ENTER' ? 'bg-gray-400' : getKeyStatus(key)
                } transition-colors hover:opacity-90`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}