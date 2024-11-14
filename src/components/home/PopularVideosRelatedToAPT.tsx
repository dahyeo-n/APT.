import { fetchYouTubeVideos } from '@/services/fetchYouTubeVideos';

import { useQuery } from '@tanstack/react-query';
import { youTubeVideoKeys } from '@/constants/queryKeys';

import { YouTubeVideo } from '@/types/youTubeVideoTypes';

import { VideoCameraIcon } from '../icons/homePageIcons/VideoCameraIcon';

import { Card, CardBody, CardHeader } from '@nextui-org/react';

export const PopularVideosRelatedToAPT = () => {
  const { data: videos } = useQuery<YouTubeVideo[]>({
    queryKey: [youTubeVideoKeys, 'apt'],
    queryFn: fetchYouTubeVideos,
  });

  return (
    <Card className='pt-3 w-full'>
      <CardHeader className='px-5 flex-row'>
        <VideoCameraIcon />
        <h4 className='text-xl ml-2 text-default-600 font-[family-name:var(--font-geist-mono)]'>
          APT. 관련 인기 영상
        </h4>
      </CardHeader>
      <CardBody className='text-sm text-default-600'>
        {videos?.map((video) => (
          <div key={video.id.videoId} className='w-full mb-2'>
            <div className='relative w-full rounded-lg h-0 pb-[56.25%] overflow-hidden'>
              <iframe
                className='absolute top-0 left-0 w-full h-full'
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
            <div className='p-4 flex flex-col justify-center'>
              <h5 className='text-md font-bold mb-1'>{video.snippet.title}</h5>
              <div className='flex gap-2'>
                <span className='text-xs text-zinc-500'>
                  {video.snippet.channelTitle}
                </span>
                <span className='text-xs text-zinc-600'>
                  {new Date(video.snippet.publishedAt).toLocaleDateString(
                    'ko-KR'
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
