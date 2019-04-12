import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import classes from './NoteCornellApuntes.module.scss';

import Spinner from '../../../UI/Spinner/Spinner';
import Heading from '../UI/Heading';

const Editor = React.lazy(() => import('./RichTextEditor'));

class NoteCornellApuntes extends Component {
  state = {
    isOnEditable: false,
    editorState: EditorState.createEmpty(),
    isTextActive: '',
  };

  componentDidMount() {
    if (this.state.getContent === null) {
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      this.setState({
        editorState: this.onContentData(),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isTextActive } = this.state;
    if (isTextActive !== prevState.isTextActive) {
      if (isTextActive.length >= 1) {
        this.setState({ isOnEditable: true });
      } else {
        this.setState({ isOnEditable: false });
      }
    }
  }

  onContentData = () => {
    const id = this.props.docID;
    const getContent = this.props.notescornell[id].getContent;
    const content = convertFromRaw(getContent);
    const editorState = EditorState.createWithContent(content);
    return editorState;
  };

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
    this.setState({ isTextActive: content.blocks[0].text });
    db.update(`notescornell/${id}`, {
      getContent: content,
    });
  };

  render() {
    const { isOnEditable, editorState, isTextActive } = this.state;
    return (
      <div className={classes.NoteCornellApuntes}>
        <Heading
          title="Apuntes"
          onClick={this.handleEditable}
          onActive={isOnEditable}
        />
        <div className={classes.BoxApuntes}>
          <React.Suspense fallback={<Spinner />}>
            <Editor
              editorState={editorState}
              onChange={this.onEditorStateChange}
            />
          </React.Suspense>
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
