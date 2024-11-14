'use client';

import Link from 'next/link';
import { useState } from 'react';

import { insertApateuGameData } from '@/services/games/insertApateuGameData';
import { useMutation } from '@tanstack/react-query';

import GameModeButtons from '@/components/gamePlay/GameModeButtons';
import ParticipantList from '@/components/gamePlay/ParticipantList';
import FloorNumberAdjustmentButtons from '@/components/gamePlay/FloorNumberAdjustmentButtons';
import StartGameButton from '@/components/gamePlay/StartGameButton';

import { useTheme } from 'next-themes';
import { Card } from '@nextui-org/react';

// TODO: 저장된 데이터를 토대로 3D 애니메이션을 구현하려면 어떻게 해야 하는지 알아보기

const GamePlayPage = () => {
  const [gameMode, setGameMode] = useState<'single_mode' | 'multi_mode'>(
    'multi_mode'
  );
  const [participants, setParticipants] = useState<string[]>(['', '']);
  const [numberOfFloors, setNumberOfFloors] = useState<number>(1);
  const [floorError, setFloorError] = useState(false);

  const { theme } = useTheme();
  const MAX_PARTICIPANTS = 8;

  const mutation = useMutation({
    mutationFn: () =>
      insertApateuGameData({
        gameMode,
        participants,
        numberOfFloors,
      }),
  });

  const handleAddParticipant = () => {
    if (participants.length < MAX_PARTICIPANTS) {
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
      <GameModeButtons gameMode={gameMode} setGameMode={setGameMode} />

      {gameMode === 'multi_mode' ? (
        <ParticipantList
          participants={participants}
          handleChangeParticipantName={handleChangeParticipantName}
          handleRemoveParticipant={handleRemoveParticipant}
          handleAddParticipant={handleAddParticipant}
          MAX_PARTICIPANTS={MAX_PARTICIPANTS}
        />
      ) : (
        <span
          className={`w-full text-center p-1 ${
            theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'
          }`}
        >
          싱글 플레이는 컴퓨터와 대결하게 돼요.
        </span>
      )}

      {numberOfFloors < 1 && floorError && (
        <span className='text-pink-500 text-sm'>
          1 이상 50 이하의 층수를 입력해주세요.
        </span>
      )}
      <FloorNumberAdjustmentButtons
        numberOfFloors={numberOfFloors}
        setNumberOfFloors={setNumberOfFloors}
        handleFloorInputChange={handleFloorInputChange}
      />
      <StartGameButton
        handleStartGame={handleStartGame}
        isDisabled={
          numberOfFloors < 1 ||
          (gameMode === 'multi_mode' &&
            participants.some((name) => name === ''))
        }
      />
    </div>
  );
};

export default GamePlayPage;
