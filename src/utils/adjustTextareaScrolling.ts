export const adjustTextareaScrolling = (
  e: React.ChangeEvent<HTMLTextAreaElement>
) => {
  e.target.style.height = 'auto';
  e.target.style.height = `${e.target.scrollHeight}px`;

  if (e.target.scrollHeight > 160) {
    e.target.style.height = '160px';
    e.target.style.overflowY = 'scroll';
  }
};
