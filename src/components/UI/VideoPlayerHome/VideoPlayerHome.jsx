import React from 'react';
import Spinner from './Spinner/Spinner';

const VideoPlayerHome = React.lazy(() => import('./Video'));

const VideoPlayer = ({ title, srcVideo }) => (
  <React.Suspense fallback={<Spinner />}>
    <VideoPlayerHome srcVideo={srcVideo} title={title} />
  </React.Suspense>
);

export default VideoPlayer;
