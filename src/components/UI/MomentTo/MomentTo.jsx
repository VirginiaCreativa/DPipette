import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

const MomentTo = ({ onColor, onFontsize, onType, onDisplay, date }) => {
  const styleDate = {
    color: onColor,
    fontSize: onFontsize,
    display: onDisplay,
  };
  return (
    <>
      <span style={styleDate}>
        {moment(date.toDate())
          .locale('es')
          .format(onType)}
      </span>
    </>
  );
};

export default MomentTo;
