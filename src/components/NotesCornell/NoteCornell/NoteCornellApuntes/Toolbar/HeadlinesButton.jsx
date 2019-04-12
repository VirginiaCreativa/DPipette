import React, { Component } from 'react';
import editorStyles from './editorStyles.module.css';
import HeadlinesPicker from './HeadlinesPicker';

class HeadlinesButton extends Component {
  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={editorStyles.headlineButtonWrapper}>
        <button
          onClick={this.onClick}
          className={editorStyles.headlineButton}
          type="button">
          H
        </button>
      </div>
    );
  }
}
export default HeadlinesButton;
