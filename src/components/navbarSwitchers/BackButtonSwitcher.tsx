'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { useTheme } from 'next-themes';

const BackButtonSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  if (pathname === '/') return null;

  return (
    <button onClick={() => router.back()}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        filter={
          theme === 'light'
            ? 'invert(17%) sepia(82%) saturate(5617%) hue-rotate(331deg) brightness(98%) contrast(101%)'
            : ''
        }
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        />
      </svg>
    </button>
  );
};

export default BackButtonSwitcher;
