import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from './RichTextEditor';
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
    const getContent = this.props.notescornell[id].getContent;
    const content = convertFromRaw(getContent);
    if (this.state.setContent === null) {
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      this.setState({
        editorState: EditorState.createWithContent(content),
        readOnly: !readOnly,
      });
    }
  }

  onEditorStateChange = editorState => {
    console.log(editorState);
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
    db.update(`notescornell/${id}`, {
      getContent: content,
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
    return (
      <div className={classes.NoteCornellApuntes}>
        <Heading
          title="Apuntes"
          onClick={this.handleEditable}
          onActive={isOnEditable}
        />
        <div className={classes.BoxApuntes}>
          <Editor
            editorState={editorState}
            onChange={this.onEditorStateChange}
          />
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
