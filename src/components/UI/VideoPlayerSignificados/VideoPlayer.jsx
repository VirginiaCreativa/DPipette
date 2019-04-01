import React from 'react';
import Spinner from './Spinner/Spinner';

const VideoPlayer = React.lazy(() => import('./Video'));

const VideoPlayerSign = ({ title, srcVideo }) => (
  <React.Suspense fallback={<Spinner />}>
    <VideoPlayer srcVideo={srcVideo} title={title} />
  </React.Suspense>
);

export default VideoPlayerSign;
