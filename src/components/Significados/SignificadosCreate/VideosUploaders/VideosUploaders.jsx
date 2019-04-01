import React from 'react';
import SenaVideo from './Sena/SenaVideo';
import DescripVideo from './Descripcion/DescripVideo';
import classes from './VideosUploaders.module.scss';

const Uploaders = () => (
  <div className={classes.VideosUploaders}>
    <div className="row">
      <div className="col">
        <DescripVideo />
      </div>
      <div className="col">
        <SenaVideo />
      </div>
    </div>
  </div>
);

export default Uploaders;
