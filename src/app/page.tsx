'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { supabase } from '../lib/supabaseClient';
import { addChat, fetchChats } from '../services/chats';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatQueryKeys } from '@/queryKeys';

import { Chat } from '@/types/chatTypes';

import { PlayIcon } from '@/components/icons/homePageIcons/PlayIcon';
import { EyeIcon } from '@/components/icons/homePageIcons/EyeIcon';
import { AnonymousChat } from '@/components/home/AnonymousChat';

import { useTheme } from 'next-themes';
import { PopularVideosRelatedToAPT } from '@/components/home/PopularVideosRelatedToAPT';

const generateRandomNickname = () => {
  const nicknames = [
    '연차쓴루피',
    '어리둥절고양이',
    '넘어갈게요',
    '망그러진곰',
    'T1롤드컵5회우승축하해',
    '페이커의F점멸',
    '흑백벨루가',
    '마루킁킁',
    '마루쫑긋',
    '브루노업고튀어',
    '잘자요아가씨',
    '침착맨',
    '밈그만보라고?너누군데',
    '너는무슨헤어지자는말을나밥볶을때하니',
  ];
  return nicknames[Math.floor(Math.random() * nicknames.length)];
};

// NOTE: 현재 몇 명이 접속해있는지 추적하는 기능
// NOTE: DB 연동 / 닉네임: 랜덤 자동 생성, 시맨틱 태그
// NOTE: comment -> chat으로 변수명, 파일명 모두 변경 => 커밋
// NOTE: Tanstack Query 쿼리키, 타입 폴더 및 파일 생성 -> 따로 저장
// NOTE: 유튜브 영상 띄우기(제목, 채널 이름, 조회수, 업로드 날짜, 썸네일 이미지 / 조회수), 컴포넌트 분리
// TODO: 접속자 수, 채팅: 변경 즉시 바로바로 UI에 업데이트

export default function HomePage() {
  const { theme } = useTheme();
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [nickname] = useState(generateRandomNickname());
  const [newChat, setNewChat] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: { key: `user-${Math.random().toString(36).substring(2)}` },
      },
    });

    // NOTE: Presence 상태 트래킹
    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track({
          online_at: new Date().toISOString(),
        });
      }
    });

    // NOTE: Presence sync 이벤트로 현재 접속자 수 가져옴
    presenceChannel.on('presence', { event: 'sync' }, () => {
      const currentUsers = presenceChannel.presenceState();
      setConnectedUsers(Object.keys(currentUsers).length);
    });

    return () => {
      presenceChannel.unsubscribe();
    };
  }, []);

  const { data: chats, refetch } = useQuery<Chat[]>({
    queryKey: chatQueryKeys.chats,
    queryFn: fetchChats,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const chatMutation = useMutation({
    mutationFn: (newChat: string) => addChat(newChat, nickname),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.chats });
      setNewChat('');
      await refetch();

      // TODO: 최신 댓글로 스크롤 조정 기능 - 더 좋은 방법 강구해보기
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            scrollContainerRef.current.scrollHeight;
        }
      }, 100);
    },
    onError: (error) =>
      console.error('채팅 작성 중 오류가 발생했습니다.', error.message),
  });

  const handleSubmitChat = () => {
    if (newChat.trim() === '') return;
    chatMutation.mutate(newChat);
  };

  return (
    <div className='flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-6 items-center w-full max-w-lg px-2'>
        <section>
          <Image
            className='rounded-lg mb-6'
            src='/images/APTAlbumCover.jpeg'
            alt='APT. Album Cover'
            width={280}
            height={280}
            priority
          />
          <div className='flex flex-col gap-4 items-center'>
            <Link
              className='font-[family-name:var(--font-geist-mono)] text-sm sm:text-base h-11 sm:h-12 px-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 py-3 text-white hover:from-indigo-600 hover:to-violet-400 shadow-lg hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-2xl hover:shadow-neutral-400 hover:-tranneutral-y-px'
              href='/game'
              rel='noopener noreferrer'
            >
              <PlayIcon />
              APT 게임 시작하기
            </Link>
            <div className='flex items-center gap-2'>
              <EyeIcon />
              <span
                className={`text-sm ${
                  theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'
                }`}
              >
                현재 {connectedUsers}명이 접속해 있습니다.
              </span>
            </div>
          </div>
        </section>
        <AnonymousChat
          ref={scrollContainerRef}
          scrollContainerRef={scrollContainerRef}
          chats={chats ?? []}
          newChat={newChat}
          setNewChat={setNewChat}
          handleSubmitChat={handleSubmitChat}
        />
        <PopularVideosRelatedToAPT />
      </main>
    </div>
  );
}
