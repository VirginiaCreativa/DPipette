import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { throws } from 'assert';
import classes from './Imagenes.module.scss';
import Imagen from './Imagen';

import {
  deleteImagenesFiles,
  getCreateSignificado,
} from '../../../../../redux/actions/Action';

class Imagenes extends Component {
  handleDeleteImg = (item, index) => {
    const {
      firebase: { storage },
      word,
      imagenes,
      imgFiles,
    } = this.props;
    const image = imagenes[index];
    console.log(image);
    console.log(item);

    // const storageRef = storage().ref(`significados/${word}/imagenes/${image}`);
    // storageRef
    //   .delete()
    //   .then(() => {
    //     console.log('SI DELETE');
    //   })
    //   .catch(error => {
    //     console.error('Error removing document: ', error);
    //   });
    this.props.deleteImagenesFiles(item);
  };

  render() {
    const { imgFiles, word, imagenes } = this.props;
    return (
      <div className={classes.Imagenes}>
        {imgFiles &&
          imgFiles.map((item, index) => (
            <Imagen
              key={item}
              src={item}
              alt={imagenes[index]}
              ref={this.refImage}
              onDelete={() => this.handleDeleteImg(item, index)}
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
