import React from 'react';

const GamePlayPage = () => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <button className='w-full md:w-auto py-2 bg-blue-500 text-white rounded-lg mb-4 md:w-96 mb-4'>
        싱글 플레이
      </button>
      <button className='w-full md:w-auto py-2 bg-green-500 text-white rounded-lg mb-4 md:w-96 mb-4'>
        멀티 플레이
      </button>
      <p className='mt-4 text-gray-600 md:mt-0 md:ml-4'>
        아파트 게임 설명 및 규칙
      </p>
    </div>
  );
};

export default GamePlayPage;
