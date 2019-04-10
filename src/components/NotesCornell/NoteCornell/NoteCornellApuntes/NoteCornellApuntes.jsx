import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './NoteCornellApuntes.module.scss';

import Heading from '../UI/Heading';

class NoteCornellApuntes extends Component {
  state = {
    isOnEditable: false,
    readOnly: true,
    editorState: EditorState.createEmpty(),
    setContent: '',
  };

  componentDidMount() {
    const { readOnly } = this.state;
    const id = this.props.docID;
    const getContentDB = this.props.notescornell[id].getContent;
    const setContent = this.props.notescornell[id].setContent;
    const content = convertFromRaw(getContentDB);
    if (this.state.setContent === null) {
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      this.setState({
        editorState: EditorState.createWithContent(content),
        readOnly: !readOnly,
        setContent,
      });
    }
  }

  onEditorStateChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.onContentSave(contentState);
    this.setState({
      editorState,
    });
  };

  onContentSave = contentSave => {
    const id = this.props.docID;
    const db = this.props.firestore;
    const content = convertToRaw(contentSave);
    const html = stateToHTML(contentSave);
    db.update(`notescornell/${id}`, {
      getContent: content,
      setContent: html,
    });
  };

  handleEditable = () => {
    const id = this.props.docID;
    const setContentDB = this.props.notescornell[id].setContent;
    this.setState(prevState => ({
      isOnEditable: !prevState.isOnEditable,
      setContent: setContentDB,
    }));
  };

  render() {
    const { isOnEditable, editorState, setContent, readOnly } = this.state;
    const visibleText = (
      <div dangerouslySetInnerHTML={{ __html: setContent }} />
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
              <Editor
                readOnly={readOnly}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
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
