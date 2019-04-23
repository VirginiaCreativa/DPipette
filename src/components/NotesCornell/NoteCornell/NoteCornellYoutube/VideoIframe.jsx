import React from 'react';

const VideoIframe = ({ src }) => (
  <div>
    <iframe
      src={src}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </div>
);

export default VideoIframe;
