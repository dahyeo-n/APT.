import { GameModeButtonsTypes } from '@/types/GameModeButtonsTypes';

import { MultiPlayerIcon } from '../icons/gamePlayPageIcons/MultiPlayerIcon';
import { SinglePlayerIcon } from '../icons/gamePlayPageIcons/SinglePlayerIcon';

import { useTheme } from 'next-themes';

const GameModeButtons = ({ gameMode, setGameMode }: GameModeButtonsTypes) => {
  const { theme } = useTheme();

  return (
    <div className='flex w-full max-w-lg rounded-lg bg-zinc-800 text-white'>
      <button
        className={`flex justify-center gap-2 flex-1 py-3 rounded-l-lg transition-all duration-300 ${
          gameMode === 'multi_mode'
            ? 'bg-indigo-500 hover:bg-indigo-500'
            : ` ${
                theme === 'light' ? 'bg-zinc-300' : 'bg-transparent'
              } hover:bg-indigo-600`
        }`}
        onClick={() => setGameMode('multi_mode')}
      >
        <MultiPlayerIcon />
        여러 명
      </button>
      <button
        className={`flex justify-center gap-2 flex-1 py-3 rounded-r-lg transition-all duration-300 ${
          gameMode === 'single_mode'
            ? 'bg-indigo-500 hover:bg-indigo-500'
            : ` ${
                theme === 'light' ? 'bg-zinc-300' : 'bg-transparent'
              } hover:bg-indigo-600`
        }`}
        onClick={() => setGameMode('single_mode')}
      >
        <SinglePlayerIcon />
        혼자
      </button>
    </div>
  );
};

export default GameModeButtons;
