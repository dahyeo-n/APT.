'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const { theme } = useTheme();
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        showButton ? 'opacity-100' : 'opacity-0'
      } fixed z-50 bottom-10 right-10 rounded-full shadow-md ${
        theme === 'light' ? 'hover:bg-pink-100' : 'hover:bg-pink-600'
      } transition-opacity duration-300`}
      style={{ transition: 'opacity 0.3s' }}
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
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-10 h-10'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
