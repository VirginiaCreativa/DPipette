import React from 'react';
import DescriptionsList from './DescriptionList';
import PalabrasList from './PalabrasLists';
import classes from './DescriptionDetail.module.scss';

const DescriptionDetail = ({ descriptions, sinonimos, antonimos }) => (
  <div className={classes.DescriptionDetail}>
    <div className={classes.Wrapper}>
      <DescriptionsList descriptions={descriptions} />
    </div>
  </div>
);

export default DescriptionDetail;
