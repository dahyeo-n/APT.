'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

const UserFeedbackButton = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('errorRequest');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);
  const handleFeedbackTypeChange = (type: string) => setFeedbackType(type);
  const handleSendFeedback = () => {
    alert('Feedback submitted!');
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleToggleModal}
        className={`fixed z-50 bottom-20 right-10 w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
          theme === 'light'
            ? 'hover:bg-zinc-100'
            : 'bg-zinc-900 hover:bg-pink-500'
        } transition-colors duration-300`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          filter={
            theme === 'light'
              ? 'invert(17%) sepia(82%) saturate(5617%) hue-rotate(331deg) brightness(98%) contrast(101%)'
              : ''
          }
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
          className='w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
          />
        </svg>
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80'>
            {/* Close Button */}
            <button
              onClick={handleToggleModal}
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white'
            >
              &times;
            </button>

            {/* Feedback Type Toggle */}
            <div className='mb-4'>
              <label className='inline-flex items-center mr-4'>
                <input
                  type='radio'
                  className='form-radio'
                  checked={feedbackType === 'errorRequest'}
                  onChange={() => handleFeedbackTypeChange('errorRequest')}
                />
                <span className='ml-2'>에러</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  className='form-radio'
                  checked={feedbackType === 'developerMessage'}
                  onChange={() => handleFeedbackTypeChange('developerMessage')}
                />
                <span className='ml-2'>요청사항</span>
              </label>
            </div>

            {/* Feedback Form */}
            <div className='mb-4'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='이메일'
                className='w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white'
              />
            </div>
            <div className='mb-4'>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='내용을 입력하세요'
                className='w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white'
                rows={3}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSendFeedback}
              className='w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md'
            >
              전송하기
            </button>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-2'>
        <Button onPress={onOpen} className='max-w-fit'>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} placement='bottom' onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button color='primary' onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default UserFeedbackButton;
