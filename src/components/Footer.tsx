import EmailButton from './footerButtons/EmailButton';
import GitHubButton from './footerButtons/GitHubButton';
import InstagramButton from './footerButtons/InstagramButton';

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
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
