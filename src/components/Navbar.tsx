'use client';

import logo from '../../public/images/APTLogo.png';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './navbarSwitchers/ThemeSwitcher';
import BackButtonSwitcher from './navbarSwitchers/BackButtonSwitcher';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-5'>
      <BackButtonSwitcher />
      <Link href='/'>
        <Image src={logo} alt='APT. 로고' width={50} />
      </Link>
      <ThemeSwitcher />
    </div>
  );
};

export default Navbar;
