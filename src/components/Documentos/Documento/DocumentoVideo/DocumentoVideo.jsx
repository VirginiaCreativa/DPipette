import React from 'react';
import classes from './DocumentoVideo.module.scss';
import VideoPlayer from '../../../UI/VideoPlayer/VideoPlayer';

const DocumentVideo = () => (
  <div className={classes.DocumentVideo}>
    <VideoPlayer srcVideo="https://firebasestorage.googleapis.com/v0/b/dpipette-ff5ee.appspot.com/o/notescornell%2Feconomia%2Fciencia_economica%2Fresumen?alt=media&token=14e72533-38ae-4715-94fd-327846c32410" />
  </div>
);

export default DocumentVideo;
