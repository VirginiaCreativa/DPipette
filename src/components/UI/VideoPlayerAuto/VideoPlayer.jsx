import React from 'react';
import Spinner from './Spinner/Spinner';

const Video = React.lazy(() => import('./Video'));

const VideoPlayer = ({ title, src }) => (
  <React.Suspense fallback={<Spinner />}>
    <Video src={src} title={title} />
  </React.Suspense>
);

export default VideoPlayer;
