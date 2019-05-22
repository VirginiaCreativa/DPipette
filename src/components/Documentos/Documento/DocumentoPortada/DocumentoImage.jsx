import React from 'react';
import classes from './DocumentoPortada.module.scss';

const DocumentoImage = ({ src, alt, onClick, onRef }) => (
  <div ref={onRef}>
    <img src={src} alt={alt} className="img-fluid" />
    <button type="button" className={classes.BtnRemove} onClick={onClick}>
      <i className="bx bxs-x-circle" />
    </button>
  </div>
);

export default DocumentoImage;
