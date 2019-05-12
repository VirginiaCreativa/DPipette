import React, { useEffect } from 'react';
import classes from './DocumentoMarker.module.scss';

const DocumentoMarker = ({ markers, onRef }) => (
  <div className={classes.DocumentoMarker}>
    <ul className="list-unstyled">
      {markers.map((item, index) => (
        <li
          key={index}
          style={{ top: `${item}px` }}
          ref={onRef}
          className="listMarkers">
          <div className={classes.pinMarker} />
        </li>
      ))}
    </ul>
  </div>
);

export default DocumentoMarker;
