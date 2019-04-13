import React, { Component } from 'react';
import classes from './AddImageEditor.module.scss';

export default class ImageAdd extends Component {
  state = {
    url: '',
    open: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addImage = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, this.state.url));
  };

  changeUrl = evt => {
    this.setState({ url: evt.target.value });
  };

  render() {
    const popoverClassName = this.state.open
      ? classes.addImagePopover
      : classes.addImageClosedPopover;
    const buttonClassName = this.state.open
      ? classes.addImagePressedButton
      : classes.addImageButton;

    return (
      <div className={classes.addImage}>
        <button
          className={buttonClassName}
          onMouseUp={this.openPopover}
          type="button">
          <i className="bx bx-image" />
        </button>
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
          role="button"
          tabIndex={0}>
          <div className={classes.Triangule} />
          <input
            type="text"
            placeholder="Pegar la URL de la imagen..."
            className={classes.addImageInput}
            onChange={this.changeUrl}
            value={this.state.url}
            ref={ref => (this.InputTextEj = ref)}
          />
          <button
            className={classes.addImageConfirmButton}
            type="button"
            onClick={this.addImage}>
            Añadir
          </button>
        </div>
      </div>
    );
  }
}
