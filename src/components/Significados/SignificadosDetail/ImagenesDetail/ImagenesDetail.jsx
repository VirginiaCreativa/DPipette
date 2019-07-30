import React, { useRef, useState } from 'react';
import SkyLight from 'react-skylight';

import classes from './ImagenesDetail.module.scss';

const ImagenesDetail = ({ imagenes, word }) => {
  const [isSelectImage, setSelectImage] = useState(null);
  const animated = useRef(null);

  const handlePopImg = (item, index) => {
    console.log(item);
    animated.current.show();
    setSelectImage(item);
  };

  const classPopup = {
    top: '30%',
    width: '40%',
    minHeight: 'auto',
    left: '50%',
    right: '50%',
    // marginTop: '-100px',2
    // marginLeft: '-30px',
  };
  const classClosedNone = { display: 'none' };

  return (
    <div className={classes.ImagenesDetail}>
      {imagenes.map((item, index) => (
        <div
          className={classes.ImagenOverw}
          key={item}
          role="button"
          tabIndex="0"
          onClick={() => handlePopImg(item, index)}>
          <img src={item} alt={word} />
        </div>
      ))}
      <SkyLight
        hideOnOverlayClicked
        dialogStyles={classPopup}
        closeButtonStyle={classClosedNone}
        ref={animated}>
        <img src={isSelectImage} alt={word} className="img-fluid" />
      </SkyLight>
    </div>
  );
};

export default ImagenesDetail;
