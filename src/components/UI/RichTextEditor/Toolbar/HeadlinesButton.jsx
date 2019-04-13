import React, { Component } from 'react';
import classes from './HeadlinesPicker.module.scss';
import HeadlinesPicker from './HeadlinesPicker';

class HeadlinesButton extends Component {
  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={classes.headlineButtonWrapper}>
        <button
          onClick={this.onClick}
          className={classes.headlineButton}
          type="button">
          H
        </button>
      </div>
    );
  }
}
export default HeadlinesButton;
