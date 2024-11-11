export async function fetchYouTubeVideos() {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=apt&key=${API_KEY}&maxResults=10&type=video`
    );

    if (!response.ok) {
      console.log('유튜브 영상 데이터 일일 할당량을 다 채웠습니다.');
      return [];
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('유튜브 API 요청 중 에러가 발생했습니다: ', error);
    return [];
  }
}
