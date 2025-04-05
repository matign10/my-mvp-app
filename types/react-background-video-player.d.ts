declare module 'react-background-video-player' {
  import { FC } from 'react';

  interface BackgroundVideoProps {
    src: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    containerWidth?: number;
    containerHeight?: number;
    style?: React.CSSProperties;
  }

  const BackgroundVideo: FC<BackgroundVideoProps>;
  export default BackgroundVideo;
} 