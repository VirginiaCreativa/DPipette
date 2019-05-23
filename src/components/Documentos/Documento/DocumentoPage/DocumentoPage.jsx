import React, { useEffect, useRef } from 'react';
import classes from './DocumentoPage.module.scss';
import prueba from '../../../../assets/prueba.pdf';

const DocumentoPage = ({ children, onRef }) => (
  <div className={classes.DocumentoPage} ref={onRef}>
    {children}
    <embed
      src={`${prueba}#toolbar=0&navpanes=0`}
      width="100%"
      height="600px"
      title="This is a unique title"
    />
  </div>
);

export default DocumentoPage;
