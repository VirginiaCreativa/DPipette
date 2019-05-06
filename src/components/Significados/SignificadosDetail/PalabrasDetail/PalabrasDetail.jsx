import React from 'react';
import Palabra from './PalabraItem';
import classes from './PalabrasDetail.module.scss';

const PalabrasDetail = ({ sinonimos, antonimos }) => (
  <div className="row">
    <div className={classes.PalabrasDetail}>
      <div className="row">
        <div className="col">
          <div
            className={[
              classes.WrapperPalabras,
              classes.WrapperBorderGreen,
            ].join(' ')}>
            <Palabra
              title="Sinónimos"
              palabras={sinonimos}
              classed={classes.Sinonimos}
            />
          </div>
        </div>
        <div className="col">
          <div
            className={[classes.WrapperPalabras, classes.WrapperBorderRed].join(
              ' '
            )}>
            <Palabra
              title="Antónimos"
              palabras={antonimos}
              classed={classes.Antonimos}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PalabrasDetail;
