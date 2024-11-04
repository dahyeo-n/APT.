'use client';

import ScrollToTopButton from './footerButtons/ScrollToTopButton';
import UserFeedbackButton from './footerButtons/UserFeedbackButton';
import EmailButton from './footerButtons/EmailButton';
import GitHubButton from './footerButtons/GitHubButton';
import InstagramButton from './footerButtons/InstagramButton';

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center p-5 mb-4 font-[family-name:var(--font-geist-sans)]'>
      <ScrollToTopButton />
      <UserFeedbackButton />
      <p className='text-gray-500 text-sm mb-5'>
        Copyright ⓒ Dahyeon JIN. All Rights Reserved.
      </p>

      <div className='flex'>
        <GitHubButton />
        <EmailButton />
        <InstagramButton />
      </div>
    </div>
  );
};

export default Footer;
