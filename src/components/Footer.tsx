'use client';

import ScrollToTopButton from './footerButtons/ScrollToTopButton';
import UserFeedbackButton from './footerButtons/UserFeedbackButton';
import EmailButton from './footerButtons/EmailButton';
import GitHubButton from './footerButtons/GitHubButton';
import InstagramButton from './footerButtons/InstagramButton';

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center p-5 my-4 font-[family-name:var(--font-geist-sans)]'>
      <ScrollToTopButton />
      <UserFeedbackButton />
      <span className='text-zinc-500 text-xs mb-5'>
        Copyright ⓒ Dahyeon JIN. All Rights Reserved.
      </span>

      <div className='flex'>
        <GitHubButton />
        <EmailButton />
        <InstagramButton />
      </div>
    </div>
  );
};

export default Footer;
