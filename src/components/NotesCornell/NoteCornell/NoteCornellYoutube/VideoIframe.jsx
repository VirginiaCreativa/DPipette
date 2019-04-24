import React from 'react';
import YouTube from 'react-youtube';

const VideoIframe = ({ videoID }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = event => {
    event.target.pauseVideo();
  };

  return (
    <YouTube
      videoId={videoID}
      opts={opts}
      onReady={_onReady}
      className="img-fluid"
    />
  );
};

export default VideoIframe;
