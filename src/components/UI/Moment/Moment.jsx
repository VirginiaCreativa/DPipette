import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

const Moment = ({ date, onColor, onFontsize, onType }) => {
  const styleDate = {
    color: onColor,
    fontSize: onFontsize,
  };
  return (
    <>
      <span style={styleDate}>
        {moment(date)
          .locale('es')
          .format(onType)}
      </span>
    </>
  );
};

export default Moment;
