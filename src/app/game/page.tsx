'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

import { MultiPlayerIcon } from '@/components/icons/gamePlayPageIcons/MultiPlayerIcon';
import { SinglePlayerIcon } from '@/components/icons/gamePlayPageIcons/SinglePlayerIcon';
import { UserMinusIcon } from '@/components/icons/gamePlayPageIcons/UserMinusIcon';
import { UserPlusIcon } from '@/components/icons/gamePlayPageIcons/UserPlusIcon';
import { MinusIcon } from '@/components/icons/gamePlayPageIcons/MinusIcon';
import { PlusIcon } from '@/components/icons/gamePlayPageIcons/PlusIcon';

import { useTheme } from 'next-themes';
import { Button, Card } from '@nextui-org/react';

// TODO: 멀티 플레이의 경우, 최소 2명의 이름 작성란이 나오도록 지정 -> 유저 마이너스 버튼 안 보이게
// TODO: 이름 입력 안 했을 경우, 입력해달라는 문구 나오게
// TODO: 어제 커밋한 스타일링, 기능 PR 올리기
// TODO: 저장된 데이터를 토대로 애니메이션을 구현하려면 어떻게 해야 하는지 알아보기

const GamePlayPage = () => {
  const [gameMode, setGameMode] = useState<'single_mode' | 'multi_mode'>(
    'multi_mode'
  );
  const [participants, setParticipants] = useState<string[]>(['']);
  const [numberOfFloors, setNumberOfFloors] = useState<number>(1);
  const [floorError, setFloorError] = useState(false);

  const { theme } = useTheme();
  const MAX_PARTICIPANTS = 8;

  const insertApateuGameData = async () => {
    const { error } = await supabase.from('apateu_games').insert({
      game_mode: gameMode,
      participants_names: participants.filter((name) => name !== ''),
      number_of_participants: participants.filter((name) => name !== '').length,
      number_of_aparteu_floors: numberOfFloors,
    });

    if (error) throw new Error('데이터 저장에 실패했습니다.');
  };

  const mutation = useMutation({
    mutationFn: insertApateuGameData,
  });

  const handleAddParticipant = () => {
    if (
      participants.length < MAX_PARTICIPANTS &&
      participants.every((name) => name !== '')
    ) {
      setParticipants([...participants, '']);
    }
  };

  const handleRemoveParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const handleChangeParticipantName = (index: number, name: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };

  const handleFloorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= 50) {
      setNumberOfFloors(value);
      setFloorError(value < 1);
    }
  };

  const handleStartGame = () => {
    if (gameMode && numberOfFloors >= 1) {
      mutation.mutate();
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4 px-4 w-full max-w-md mx-auto font-[family-name:var(--font-geist-sans)]'>
      <Card className='w-full h-64 flex items-center justify-center'>
        애니메이션
      </Card>
      <Link
        href='/game/tutorial'
        className='w-full py-2 bg-indigo-400 text-white text-center rounded-lg sm:py-3 lg:max-w-lg hover:bg-indigo-500'
      >
        튜토리얼 보기
      </Link>
      <div
        id='game_mode'
        className='flex w-full max-w-lg rounded-lg bg-zinc-800 text-white'
      >
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

      {gameMode === 'multi_mode' ? (
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
                  className={`flex items-center justify-center w-7 h-7 text-zinc-400 rounded-full
                  ${theme === 'light' ? 'bg-zinc-200' : ' bg-zinc-700'}
                  `}
                >
                  {index + 1}
                </div>
                <input
                  id='participants_names'
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
                  className={`p-2 rounded transition-all duration-300
                  ${
                    theme === 'light'
                      ? 'bg-zinc-300 hover:bg-zinc-500'
                      : 'bg-zinc-700 hover:bg-zinc-900'
                  }`}
                  onClick={() => handleRemoveParticipant(index)}
                  disabled={participants.length <= 1}
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
          <span className='w-full text-center text-sm text-zinc-400'>
            최대 8명까지 플레이할 수 있습니다.
          </span>
        </Card>
      ) : (
        <span className='w-full text-center text-zinc-400 p-3'>
          싱글 플레이는 컴퓨터와 대결하게 됩니다.
        </span>
      )}

      {numberOfFloors < 1 && floorError && (
        <span className='text-pink-500 text-sm'>
          1 이상 50 이하의 층수를 입력해주세요.
        </span>
      )}
      <div
        id='number_of_aparteu_floors'
        className='flex gap-3 px-3 py-2 text-white bg-indigo-500 rounded-lg transition-all duration-300 hover:bg-indigo-600 shadow-lg sm:py-3'
      >
        <button
          onClick={() => setNumberOfFloors((prev) => Math.max(prev - 1, 1))}
          disabled={numberOfFloors < 1}
        >
          <MinusIcon />
        </button>
        <input
          value={numberOfFloors}
          onChange={handleFloorInputChange}
          min={1}
          max={50}
          className='w-6 text-center bg-transparent text-white border-b border-zinc-300 focus:outline-none'
        />
        층
        <button
          onClick={() => setNumberOfFloors((prev) => prev + 1)}
          disabled={numberOfFloors >= 50}
        >
          <PlusIcon />
        </button>
      </div>

      <Button
        className='w-full py-2 bg-pink-400 text-white rounded-lg sm:py-3 lg:max-w-lg hover:bg-pink-500 shadow-lg'
        onClick={handleStartGame}
        isDisabled={numberOfFloors < 1}
      >
        시작하기
      </Button>
    </div>
  );
};

export default GamePlayPage;
