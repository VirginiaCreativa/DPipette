import React, { Component } from 'react';
import classes from './PruebaMove.module.scss';

class PruebaMove extends Component {
  state = {
    touchMoveBox: 0,
  };

  componentDidMount() {
    this.refPage.addEventListener('click', ev => {
      console.log('====> document', ev);
    });
    console.log(this.refBox);
  }

  onTouchBoxMove = ev => {
    // console.log(ev.pageX);
  };

  pageHeighMove = ev => {
    console.log(ev);
    const pointClic = ev.clientY - 44;
    this.setState({ touchMoveBox: pointClic });
  };

  render() {
    const { touchMoveBox } = this.state;
    const boxStyle = {
      top: `${touchMoveBox}px`,
    };
    return (
      <div>
        <div
          className={classes.PageDoc}
          role="presentation"
          ref={ref => (this.refPage = ref)}
          onClick={this.pageHeighMove}>
          <div
            role="presentation"
            className={classes.Box}
            ref={ref => (this.refBox = ref)}
            style={boxStyle}></div>
        </div>
      </div>
    );
  }
}

export default PruebaMove;
