import React from 'react';
import classes from './SignificadosMain.module.scss';

const SignificadosTagSinonimos = ({ sinonimos }) => (
  <div className={classes.GroupSinonimos}>
    <ul className="list-unstyled">
      {sinonimos && sinonimos.map(item => <li key={item}>{item}</li>)}
    </ul>
  </div>
);

export default SignificadosTagSinonimos;
