import React, { forwardRef } from 'react';

import { AnonymousChatProps } from '@/types/types';

import { formatTimeAgo } from '@/utils/formatTimeAgo';
import { adjustTextareaScrolling } from '@/utils/adjustTextareaScrolling';

import { ChatBubbleLeftRightIcon } from '@/components/icons/homePageIcons/ChatBubbleLeftRightIcon';

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react';
import { useTheme } from 'next-themes';

export const AnonymousChat = forwardRef<HTMLDivElement, AnonymousChatProps>(
  (
    {
      comments,
      newComment,
      setNewComment,
      handleSubmitComment,
      scrollContainerRef,
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <Card className='py-2 w-full'>
        <CardHeader className='px-5 flex-row'>
          <ChatBubbleLeftRightIcon />
          <h4 className='text-xl ml-2 text-default-600 font-[family-name:var(--font-geist-mono)]'>
            익명 채팅
          </h4>
          <span className='text-tiny text-default-500 ml-2'>
            {comments ? comments.length : 0}개
          </span>
        </CardHeader>
        <div className='max-h-[350px] overflow-y-auto' ref={ref}>
          {(comments ?? []).map((comment) => (
            <CardBody
              key={comment.comment_id}
              className='px-5 text-sm text-default-600'
            >
              <div className='flex items-start gap-4'>
                <Avatar
                  isBordered
                  radius='full'
                  size='md'
                  className='flex-shrink-0'
                />
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h4
                      className={`text-sm leading-none ${
                        theme === 'light' ? 'text-zinc-500' : 'text-zinc-400'
                      }`}
                    >
                      {comment.nickname}
                    </h4>
                    <h5
                      className={`text-xs tracking-tight ${
                        theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'
                      }`}
                    >
                      {formatTimeAgo(comment.created_at)}
                    </h5>
                  </div>
                  <span
                    className={`${
                      theme === 'light' ? 'text-zinc-900' : 'text-zinc-200'
                    }`}
                  >
                    {comment.content.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </div>
            </CardBody>
          ))}
        </div>
        <CardFooter className='px-4'>
          <div className='flex items-center gap-4 w-full'>
            <Avatar
              isBordered
              radius='full'
              size='md'
              className='flex-shrink-0'
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onInput={adjustTextareaScrolling}
              rows={1}
              className='resize-none flex-1 px-4 py-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='내용을 입력해주세요.'
            />
            <Button
              size='sm'
              onClick={handleSubmitComment}
              isDisabled={!newComment.trim()}
              className='flex text-white justify-center items-center rounded-full h-9 p-2 bg-gradient-to-r from-sky-400 to-violet-500 hover:from-pink-400 hover:to-violet-500 cursor-pointer transition-color'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-5 h-5'
              >
                <path
                  fill='currentColor'
                  d='M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z'
                />
              </svg>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);
