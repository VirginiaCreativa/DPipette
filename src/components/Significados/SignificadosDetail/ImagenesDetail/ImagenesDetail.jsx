import React, { useRef } from 'react';
import SkyLight from 'react-skylight';

import classes from './ImagenesDetail.module.scss';

const ImagenesDetail = ({ imagenes, word }) => {
  const animated = useRef(null);

  const handlePopImg = () => {
    animated.current.show();
    console.log('dmjflaksdj');
  };

  const classPopup = {
    width: '65%',
    minHeight: '600px',
    top: '30%',
    left: '20%',
    marginTop: '-100px',
    marginLeft: '-30px',
  };
  const classClosedNone = { display: 'none' };
  return (
    <div className={classes.ImagenesDetail}>
      {imagenes.map(item => (
        <div
          className={classes.ImagenOverw}
          key={item}
          role="button"
          tabIndex="0"
          onClick={handlePopImg}>
          <img src={item} alt={word} />
        </div>
      ))}
      <SkyLight
        hideOnOverlayClicked
        dialogStyles={classPopup}
        closeButtonStyle={classClosedNone}
        ref={animated}>
        Hello, I dont have any callback.
      </SkyLight>
    </div>
  );
};

export default ImagenesDetail;
