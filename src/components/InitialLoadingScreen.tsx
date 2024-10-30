const InitialLoadingScreen = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <img
        src='/images/APTLogo.png'
        alt='APT. Logo'
        className='w-48 animate-bounce'
      />
    </div>
  );
};

export default InitialLoadingScreen;