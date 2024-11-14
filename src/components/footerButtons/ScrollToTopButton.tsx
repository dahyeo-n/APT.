'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

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
      } fixed z-50 bottom-32 right-10 w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
        theme === 'light'
          ? 'hover:bg-zinc-100'
          : 'bg-zinc-800 hover:bg-pink-500'
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
        stroke='currentColor'
        strokeWidth={1.5}
        className='w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
