// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  const games = [
    { 
      id: 'chapters', 
      title: 'Bible Books', 
      description: 'Test your knowledge of the books of the Bible',
      bgColor: 'bg-blue-600'
    },
    { 
      id: 'characters', 
      title: 'Bible Characters', 
      description: 'Guess names of people from biblical stories',
      bgColor: 'bg-green-600'
    },
    { 
      id: 'places', 
      title: 'Bible Places', 
      description: 'Challenge yourself with locations from scripture',
      bgColor: 'bg-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-12 px-4">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#c9d1d9] mb-4">Bible Word Games</h1>
        <p className="text-[#8b949e] max-w-2xl mx-auto">
          Test your biblical knowledge with these word puzzle games. Select a category below to begin.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {games.map(game => (
          <Link 
            key={game.id}
            to={`/game/${game.id}`}
            className={`${game.bgColor} hover:opacity-90 transition-opacity rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform`}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{game.title}</h2>
              <p className="text-white/80">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <footer className="mt-12 text-center text-sm text-[#8b949e]">
        <p>Developed by Ziga Larissa - Inspired by John N and the original Wordle game.</p>
      </footer>
    </div>
  );
};

export default HomePage;