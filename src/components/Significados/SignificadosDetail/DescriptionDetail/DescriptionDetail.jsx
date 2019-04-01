import React from 'react';
import DescriptionsList from './DescriptionList';
import PalabrasList from './PalabrasLists';
import classes from './DescriptionDetail.module.scss';

const DescriptionDetail = ({ descriptions, sinonimos, antonimos }) => (
  <div className={classes.DescriptionDetail}>
    <div className="row">
      <div className="col-8">
        <div className={classes.Wrapper}>
          <DescriptionsList descriptions={descriptions} />
        </div>
      </div>
      <div className="col-4">
        <div
          className={[classes.WrapperPalabras, classes.WrapperBorderGreen].join(
            ' '
          )}>
          <PalabrasList
            title="Sinónimos"
            palabras={sinonimos}
            classed={classes.Sinonimos}
          />
        </div>
        <div
          className={[classes.WrapperPalabras, classes.WrapperBorderRed].join(
            ' '
          )}>
          <PalabrasList
            title="Antónimos"
            palabras={antonimos}
            classed={classes.Antonimos}
          />
        </div>
      </div>
    </div>
  </div>
);

export default DescriptionDetail;
