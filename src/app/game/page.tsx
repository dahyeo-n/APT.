'use client';

import Link from 'next/link';

import { MultiPlayerIcon } from '@/components/icons/\bgamePlayPageIcons/MultiPlayerIcon';
import { SinglePlayerIcon } from '@/components/icons/\bgamePlayPageIcons/SinglePlayerIcon';
import { UserMinusIcon } from '@/components/icons/\bgamePlayPageIcons/UserMinusIcon';
import { UserPlusIcon } from '@/components/icons/\bgamePlayPageIcons/UserPlusIcon';
import { MinusIcon } from '@/components/icons/\bgamePlayPageIcons/MinusIcon';
import { PlusIcon } from '@/components/icons/\bgamePlayPageIcons/PlusIcon';

import { Card } from '@nextui-org/react';

// TODO: 최대 몇 명까지 플레이 가능하게 할지
// TODO: 'singleMode', 'multiMode' 다르게 화면 표시

const GamePlayPage = () => {
  return (
    <div className='flex flex-col justify-center items-center px-4 w-full max-w-md mx-auto font-[family-name:var(--font-geist-sans)]'>
      <Card className='px-44 py-48 mb-6'>애니메이션</Card>
      <Link
        href='/game/tutorial'
        className='w-full py-2 bg-blue-400 text-white text-center rounded-lg mb-4 sm:py-3 lg:max-w-lg hover:bg-blue-500'
      >
        튜토리얼 보기
      </Link>
      <div className='flex mb-4 w-full max-w-lg rounded-lg bg-zinc-800 text-white'>
        <button className='flex justify-center gap-2 flex-1 py-3 rounded-l-lg bg-indigo-500 transition-all duration-300 hover:bg-indigo-600'>
          <MultiPlayerIcon />
          여러 명
        </button>
        <button className='flex justify-center gap-2 flex-1 py-3 rounded-r-lg bg-zinc-500 transition-all duration-300 hover:bg-zinc-700'>
          <SinglePlayerIcon />
          혼자
        </button>
      </div>
      <div className='w-full p-6 mb-4 text-center bg-zinc-200 rounded-xl shadow-md max-w-lg'>
        <ul className='space-y-4'>
          <li className='flex items-center justify-between px-4 py-2 bg-white rounded-lg'>
            <div className='flex items-center justify-center w-7 h-7 bg-violet-400 text-white rounded-full text-lg font-bold'>
              1
            </div>
            <input
              className='text-zinc-800  bg-transparent rounded-lg'
              placeholder='이름을 입력해주세요.'
            />
            <button className='p-2 bg-zinc-300 rounded transition-all duration-300 hover:bg-zinc-400'>
              <UserMinusIcon />
            </button>
          </li>
        </ul>
        <button className='flex justify-center gap-2 w-full py-2 mt-4 text-white bg-indigo-500 rounded-lg transition-all duration-300 hover:bg-indigo-600'>
          <UserPlusIcon />
          추가
        </button>
      </div>
      <div className='flex gap-3 mb-4 px-4 py-2 text-white bg-indigo-500 rounded-lg transition-all duration-300 hover:bg-indigo-600'>
        <button>
          <MinusIcon />
        </button>
        8층
        <button>
          <PlusIcon />
        </button>
      </div>
      <button className='w-full py-2 bg-pink-400 text-white rounded-lg sm:py-3 lg:max-w-lg hover:bg-pink-500'>
        시작하기
      </button>
    </div>
  );
};

export default GamePlayPage;
