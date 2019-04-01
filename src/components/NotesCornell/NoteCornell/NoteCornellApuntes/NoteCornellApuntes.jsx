/* eslint-disable no-use-before-define */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from './NoteCornellApuntes.module.scss';

import Heading from '../UI/Heading';
import { modules, formats } from '../UI/ControlEditorApunte';

class NoteCornellApuntes extends Component {
  state = {
    isText: '',
    isOnEditable: false,
    isContents: [],
  };

  componentDidMount() {
    if (this.state.isOnEditable) {
      this.attachQuillRefs();
    }
  }

  componentDidUpdate() {
    if (this.state.isOnEditable) {
      this.attachQuillRefs();
    }
  }

  handleEditable = () => {
    this.setState(prevState => ({
      isOnEditable: !prevState.isOnEditable,
    }));
  };

  handleChangeText = value => {
    this.setState({ isText: value });

    const range = this.quillRef.getContents().ops;
    this.setState({ isContents: range });

    const id = this.props.docID;
    const db = this.props.firestore;
    db.update(`notescornell/${id}`, {
      getContent: this.state.isText,
      setContent: this.state.isContents,
    });
  };

  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) {
      this.quillRef = quillRef;
    }

    const id = this.props.docID;
    const setContentDB = this.props.notescornell[id].setContent;
    this.quillRef.setContents(setContentDB, 'api');
  }

  render() {
    const { getContent } = this.props;
    const { isText, isOnEditable } = this.state;
    const visibleText = (
      <div dangerouslySetInnerHTML={{ __html: getContent }} />
    );
    return (
      <div className={classes.NoteCornellApuntes}>
        <Heading
          title="Apuntes"
          onClick={this.handleEditable}
          onActive={isOnEditable}
        />
        <div className={classes.BoxApuntes}>
          {isOnEditable ? (
            <>
              <ReactQuill
                ref={e => (this.reactQuillRef = e)}
                defaultValue={isText || ''}
                onChange={this.handleChangeText}
                modules={modules}
                formats={formats}
                className={classes.BoxEditor}
              />
            </>
          ) : (
            <>
              <div className={classes.BoxApunte} ref={e => (this.btnRef = e)}>
                {visibleText}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(['notescornell']),
  connect(state => ({
    notescornell: state.firestore.data.notescornell,
  }))
)(NoteCornellApuntes);
