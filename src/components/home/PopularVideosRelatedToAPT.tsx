import { useQuery } from '@tanstack/react-query';
import { fetchYouTubeVideos } from '@/services/fetchYouTubeVideos';

import { YouTubeVideo } from '@/types/youTubeVideoTypes';

import { VideoCameraIcon } from '../icons/homePageIcons/VideoCameraIcon';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { youTubeVideoKeys } from '@/queryKeys';

export const PopularVideosRelatedToAPT = () => {
  const { data: videos } = useQuery<YouTubeVideo[]>({
    queryKey: [youTubeVideoKeys, 'apt'],
    queryFn: fetchYouTubeVideos,
  });

  return (
    <Card className='py-3 w-full'>
      <CardHeader className='px-5 flex-row'>
        <VideoCameraIcon />
        <h4 className='text-xl ml-2 text-default-600 font-[family-name:var(--font-geist-mono)]'>
          APT. 관련 인기 영상
        </h4>
      </CardHeader>
      <CardBody className='px-5 text-sm text-default-600'>
        {videos?.map((video) => (
          <div key={video.id.videoId} className='w-full mb-6'>
            <div className='relative w-full h-0 pb-[56.25%] overflow-hidden'>
              <iframe
                className='absolute top-0 left-0 w-full h-full'
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
            <div className='p-4 flex flex-col justify-center'>
              <h5 className='text-md font-bold'>{video.snippet.title}</h5>
              <span className='text-sm text-zinc-600'>
                {video.snippet.channelTitle}
              </span>
              <span className='text-xs text-zinc-500'>
                {new Date(video.snippet.publishedAt).toLocaleDateString(
                  'ko-KR'
                )}
              </span>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
