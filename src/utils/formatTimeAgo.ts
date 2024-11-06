export const formatTimeAgo = (date: string) => {
  const now = new Date();
  const timeDiff = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000
  );

  if (timeDiff < 60) return `${timeDiff}초 전`;
  if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)}분 전`;
  if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)}시간 전`;
  if (timeDiff < 2592000) return `${Math.floor(timeDiff / 86400)}일 전`;
  if (timeDiff < 31536000) return `${Math.floor(timeDiff / 2592000)}개월 전`;
  return `${Math.floor(timeDiff / 31536000)}년 전`;
};
