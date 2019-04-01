import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import classes from './Imagenes.module.scss';
import Imagen from './Imagen';

import {
  deleteImagenesFiles,
  getCreateSignificado,
} from '../../../../../redux/actions/Action';

class Imagenes extends Component {
  deleteImg = index => {
    this.props.deleteImagenesFiles(index);
  };

  render() {
    const { imgFiles, word } = this.props;

    return (
      <div className={classes.Imagenes}>
        {imgFiles &&
          imgFiles.map((item, index) => (
            <Imagen
              key={item}
              Image={item}
              alt={word}
              onDelete={() => this.deleteImg(item, index)}
            />
          ))}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteImagenesFiles, getCreateSignificado }, dispatch);

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      word: state.createSing.word,
      imgFiles: state.createSing.imgFiles,
      imagenes: state.createSing.imagenes,
    }),
    mapDispatchToProps
  )
)(Imagenes);
