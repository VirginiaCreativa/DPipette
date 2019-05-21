import React from 'react';
import Controls from './DocumentoControls';

const DocumentoVideo = ({
  onRefVideo,
  onTimeUpdate,
  onSrc,
  onDurationChange,
  hasVideo,
  isCurrentTime,
  onPlay,
  onPause,
  onMarker,
  onControlPlay,
  onRefProgress,
  onTimeline,
  addTimeline,
}) => (
  <>
    {hasVideo ? (
      <>
        <Controls
          isCurrentTime={isCurrentTime}
          onPlay={onPlay}
          onPause={onPause}
          onMarker={onMarker}
          onControlPlay={onControlPlay}
          onRefProgress={onRefProgress}
          onTimeline={onTimeline}
          addTimeline={addTimeline}
        />
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
    ) : (
      <h1>UPLOAD VIDEO</h1>
    )}
  </>
);

export default DocumentoVideo;
