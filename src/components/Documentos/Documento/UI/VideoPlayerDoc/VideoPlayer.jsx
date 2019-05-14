import React from 'react';
import Spinner from '../Spinner/Spinner';

const VideoPlayerImport = React.lazy(() => import('./Video'));

const VideoPlayer = ({ title, srcVideo }) => (
  <React.Suspense fallback={<Spinner />}>
    <VideoPlayerImport srcVideo={srcVideo} title={title} />
  </React.Suspense>
);

export default VideoPlayer;
