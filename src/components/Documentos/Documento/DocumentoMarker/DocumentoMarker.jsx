import React from 'react';
import classes from './DocumentoMarker.module.scss';

const DocumentoMarker = ({ markers }) => (
  <div className={classes.DocumentoMarker}>
    <ul className="list-unstyled">
      {markers.map((item, index) => (
        <li key={index}>
          <div className={classes.pageMarker} />
        </li>
      ))}
    </ul>
  </div>
);

export default DocumentoMarker;
