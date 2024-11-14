import { ParticipantListTypes } from '@/types/ParticipantListTypes';

import { UserMinusIcon } from '../icons/gamePlayPageIcons/UserMinusIcon';
import { UserPlusIcon } from '../icons/gamePlayPageIcons/UserPlusIcon';

import { useTheme } from 'next-themes';
import { Button, Card } from '@nextui-org/react';

const ParticipantList = ({
  participants,
  handleAddParticipant,
  handleRemoveParticipant,
  handleChangeParticipantName,
  MAX_PARTICIPANTS,
}: ParticipantListTypes) => {
  const { theme } = useTheme();

  return (
    <Card className='w-full p-5 gap-4 text-center rounded-xl shadow-md max-w-lg'>
      <ul className='space-y-3'>
        {participants.map((name, index) => (
          <li
            key={index}
            className={`flex items-center justify-between px-4 py-2 rounded-lg
                ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-800'}
                `}
          >
            <div
              className={`flex items-center justify-center w-6 h-6 text-sm sm:w-7 sm:h-7 rounded-full
                  ${
                    theme === 'light'
                      ? 'bg-zinc-200 text-zinc-500'
                      : ' bg-zinc-700 text-zinc-400'
                  }
                  `}
            >
              {index + 1}
            </div>
            <input
              className={`bg-transparent ${
                theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'
              }`}
              placeholder='이름을 입력해주세요.'
              value={name}
              onChange={(e) =>
                handleChangeParticipantName(index, e.target.value)
              }
            />
            <button
              className={`p-2 rounded transition-all duration-300 ${
                participants.length > 2
                  ? theme === 'light'
                    ? 'bg-zinc-300 hover:bg-zinc-500'
                    : 'bg-zinc-700 hover:bg-zinc-900'
                  : 'opacity-0 cursor-default'
              }`}
              onClick={() =>
                participants.length > 2 && handleRemoveParticipant(index)
              }
            >
              <UserMinusIcon />
            </button>
          </li>
        ))}
      </ul>
      <Button
        className='flex justify-center w-full py-2 text-white bg-indigo-400 rounded-lg transition-all duration-300 hover:bg-indigo-600'
        onClick={handleAddParticipant}
        isDisabled={participants.length >= MAX_PARTICIPANTS}
      >
        <UserPlusIcon />
        추가
      </Button>
      <span
        className={`w-full text-center text-sm ${
          theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'
        }`}
      >
        최대 8명까지 플레이할 수 있어요.
      </span>
    </Card>
  );
};

export default ParticipantList;
