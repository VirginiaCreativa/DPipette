import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './NoteCornellApuntes.module.scss';

import Heading from '../UI/Heading';

class NoteCornellApuntes extends Component {
  state = {
    isOnEditable: true,
    contentState: {},
    readOnly: true,
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    const { contentState, readOnly, editorState } = this.state;
    const id = this.props.docID;
    const getContentDB = this.props.notescornell[id].getContent;
    const content = convertFromRaw(JSON.parse(getContentDB));
    if (getContentDB) {
      this.state.editorState = EditorState.createWithContent(content);
      this.setState({ contentState, readOnly: !readOnly });
    } else {
      this.state.editorState = EditorState.createEmpty();
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
    const content = JSON.stringify(convertToRaw(contentSave));
    db.update(`notescornell/${id}`, {
      getContent: content,
    });
  };

  render() {
    const { isOnEditable, editorState, contentState, readOnly } = this.state;
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
              <div className={classes.BoxApunte} ref={e => (this.btnRef = e)} />
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
