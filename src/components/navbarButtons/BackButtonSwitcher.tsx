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
        strokeWidth={1.3}
        stroke='currentColor'
        className='size-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5 8.25 12l7.5-7.5'
        />
      </svg>
    </button>
  );
};

export default BackButtonSwitcher;
