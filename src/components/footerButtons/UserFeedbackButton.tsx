'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

import { useTheme } from 'next-themes';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  Tab,
  Input,
} from '@nextui-org/react';

import { BulbIcon } from '../icons/footerIcons/BulbIcon';
import { SpeechBubbleIcon } from '../icons/footerIcons/SpeechBubbleIcon';
import { ErrorIcon } from '../icons/footerIcons/ErrorIcon';
import { RequestIcon } from '../icons/footerIcons/RequestIcon';
import { CheckIcon } from '../icons/footerIcons/CheckIcon';
import { PaperAirplaneIcon } from '../icons/footerIcons/PaperAirplaneIcon';
import { adjustTextareaScrolling } from '@/utils/adjustTextareaScrolling';

const UserFeedbackButton = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('에러');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailCheckColor, setEmailCheckColor] = useState('');

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);
  const handleFeedbackTypeChange = (type: string) => setFeedbackType(type);

  const validateForm = (email: string, content: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    return {
      isFormValid: isEmailValid && content.trim() !== '',
      emailCheckColor: !email
        ? ''
        : isEmailValid
        ? 'text-green-500'
        : 'text-red-500',
    };
  };

  useEffect(() => {
    const { isFormValid, emailCheckColor } = validateForm(email, content);
    setIsFormValid(isFormValid);
    setEmailCheckColor(emailCheckColor);
  }, [email, content]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const { isFormValid, emailCheckColor } = validateForm(email, content);
    setIsFormValid(isFormValid);
    setEmailCheckColor(emailCheckColor);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaScrolling(e);

    setContent(e.target.value);

    const { isFormValid } = validateForm(email, content);
    setIsFormValid(isFormValid);
  };

  const handleSendFeedback = async () => {
    try {
      const nowKST = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

      const { error } = await supabase
        .from('User_Requests')
        .insert([{ type: feedbackType, email, content, created_at: nowKST }]);

      if (error) {
        console.error('피드백 제출 중 오류 발생:', error.message);
      } else {
        alert('제출 완료!');
        setEmail('');
        setContent('');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('피드백 제출 중 오류 발생: ', error);
    }
  };

  return (
    <>
      <button
        onClick={handleToggleModal}
        className={`fixed z-50 bottom-20 right-10 w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
          theme === 'light'
            ? 'hover:bg-zinc-200'
            : 'bg-zinc-800 hover:bg-pink-500'
        } transition-colors duration-300`}
      >
        <BulbIcon theme={theme ?? 'light'} />
      </button>

      <Modal
        className='font-[family-name:var(--font-geist-sans)]'
        isOpen={isModalOpen}
        onOpenChange={handleToggleModal}
        scrollBehavior='inside'
        placement='bottom'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex items-center gap-2'>
                <SpeechBubbleIcon />
                에러/요청사항
              </ModalHeader>
              <ModalBody>
                <Tabs
                  className='flex justify-center mb-2'
                  color='secondary'
                  variant='bordered'
                  selectedKey={feedbackType}
                  onSelectionChange={(key) =>
                    handleFeedbackTypeChange(key as string)
                  }
                >
                  <Tab
                    key='에러'
                    onChange={() => handleFeedbackTypeChange('에러')}
                    title={
                      <div className='flex items-center space-x-2'>
                        <ErrorIcon />
                        <span>에러</span>
                      </div>
                    }
                  />
                  <Tab
                    key='요청사항'
                    onChange={() => handleFeedbackTypeChange('요청사항')}
                    title={
                      <div className='flex items-center space-x-2'>
                        <RequestIcon />
                        <span>요청사항</span>
                      </div>
                    }
                  />
                </Tabs>
                <div id='emailInput' className='mb-2'>
                  <Input
                    isRequired
                    className='mb-2'
                    type='email'
                    label='이메일'
                    labelPlacement='outside'
                    variant='faded'
                    placeholder='이메일을 입력해주세요.'
                    onChange={handleEmailChange}
                  />
                  <div
                    id='emailCheck'
                    className={`flex items-center gap-1 ${emailCheckColor}`}
                  >
                    <CheckIcon />
                    <span className='text-xs'>
                      이메일 형식에 맞춰주세요 (example@gmail.com)
                    </span>
                  </div>
                </div>
                <div id='contentTextarea'>
                  <div
                    className='group flex flex-col is-filled'
                    data-filled-within='true'
                  >
                    <label
                      htmlFor='content'
                      className="z-10 subpixel-antialiased text-sm text-foreground-500 after:content-['*'] after:text-danger after:ml-0.5 group-data-[filled-within=true]:text-foreground pb-1.5"
                    >
                      내용
                    </label>
                  </div>
                  <textarea
                    id='content'
                    required
                    className={`w-full px-3 py-2 text-sm ${
                      theme === 'light'
                        ? 'bg-zinc-100 border-neutral-200 hover:border-zinc-400 placeholder:text-zinc-500'
                        : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                    } border-2  rounded-xl shadow-sm resize-none overflow-y-auto`}
                    rows={1}
                    placeholder='내용을 입력해주세요.'
                    value={content}
                    onInput={handleContent}
                    style={{ maxHeight: '160px' }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className='w-full'
                  color='secondary'
                  isDisabled={!isFormValid}
                  onClick={() => {
                    handleSendFeedback();
                    onClose();
                  }}
                >
                  <PaperAirplaneIcon />
                  <span>제출하기</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserFeedbackButton;
