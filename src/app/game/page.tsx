'use client';

import { Button } from '@nextui-org/react';

const GamePlayPage = () => {
  return (
    <div className='flex flex-col justify-center items-center p-5 font-[family-name:var(--font-geist-sans)]'>
      <button className='w-full py-2 bg-pink-400 text-white rounded-lg mb-4 md:w-1/2'>
        싱글 플레이
      </button>
      <button className='w-full py-2 bg-violet-400 text-white rounded-lg mb-4 md:w-1/2'>
        멀티 플레이
      </button>
      <p className='mt-4 text-gray-600 md:mt-0 md:ml-4'>
        아파트 게임 설명 및 규칙
      </p>
      <Button>Next UI 버튼</Button>
    </div>
  );
};

export default GamePlayPage;
