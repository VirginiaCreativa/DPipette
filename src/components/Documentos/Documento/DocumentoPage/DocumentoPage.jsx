import React, { useEffect, useState } from 'react';
import { PDFtoIMG } from 'react-pdf-to-image';
import { pdfjs } from 'react-pdf';
import Spinner from '../UI/Spinner/Spinner';
import classes from './DocumentoPage.module.scss';

import prueba from '../../../../assets/virginiapdf.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const DocumentoPage = ({ children, onRef }) => {
  console.log();
  return (
    <div className={classes.DocumentoPage} ref={onRef}>
      <PDFtoIMG file={prueba}>
        {({ pages }) => {
          if (!pages.length) return <Spinner />;
          return pages.map((page, index) => (
            <img key={index} src={page} alt="PDF" />
          ));
        }}
      </PDFtoIMG>
      {/* <h2>fkdsñlfksda</h2> */}
    </div>
  );
};

export default DocumentoPage;
