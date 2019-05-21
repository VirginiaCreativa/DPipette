import React from 'react';

const DocumentoVideo = ({
  onRefVideo,
  onTimeUpdate,
  onSrc,
  onDurationChange,
}) => (
  <>
    <video
      className="img-fluid"
      ref={onRefVideo}
      muted
      preload="auto"
      src={onSrc}
      onTimeUpdate={onTimeUpdate}
      onDurationChange={onDurationChange}
    />
  </>
);

export default DocumentoVideo;
