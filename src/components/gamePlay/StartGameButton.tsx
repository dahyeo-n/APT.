import { StartGameButtonTypes } from '@/types/StartGameButtonTypes';

import { Button } from '@nextui-org/react';

const StartGameButton = ({
  handleStartGame,
  isDisabled,
}: StartGameButtonTypes) => {
  return (
    <Button
      className='w-full py-2 bg-pink-400 text-white rounded-lg sm:py-3 lg:max-w-lg hover:bg-pink-500 shadow-lg'
      onClick={handleStartGame}
      isDisabled={isDisabled}
    >
      시작하기
    </Button>
  );
};

export default StartGameButton;
