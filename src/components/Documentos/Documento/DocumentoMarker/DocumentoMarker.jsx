import React, { useEffect } from 'react';
import classes from './DocumentoMarker.module.scss';

const DocumentoMarker = ({ markers, onRef, onRefUl }) => {
  // const listMaker = document.querySelectorAll('listMarkers');
  // console.log(listMaker);
  useEffect(() => () => {}, []);
  return (
    <div className={classes.DocumentoMarker}>
      <ul className="list-unstyled" ref={onRefUl}>
        {markers.map((item, index) => (
          <li
            key={index}
            style={{ top: `${item.timeline}px` }}
            ref={onRef}
            className="listMarkers">
            <div className={classes.pinMarker} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentoMarker;
