'use client';

import logo from '../../public/images/APTLogo.png';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './navbarButtons/ThemeSwitcher';
import BackButtonSwitcher from './navbarButtons/BackButtonSwitcher';

const Navbar = () => {
  return (
    <div className='flex flex-col items-center justify-items-center my-4'>
      <div className='flex items-center justify-between w-full max-w-[650px] px-5'>
        <BackButtonSwitcher />
        <Link href='/'>
          <Image src={logo} alt='APT. 로고' width={50} priority />
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
