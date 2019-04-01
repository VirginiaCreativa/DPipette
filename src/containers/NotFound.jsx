import React from 'react';

const urlFound = require('../assets/images/404.gif');

const NotFound = () => {
  const styled = {
    display: 'flex',
    height: '80vh',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div style={styled}>
      <img src={urlFound} alt="404 NOT FOUND sea error" />
    </div>
  );
};

export default NotFound;
