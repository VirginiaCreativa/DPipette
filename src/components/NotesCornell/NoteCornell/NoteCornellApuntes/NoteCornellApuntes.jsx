/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import classes from './NoteCornellApuntes.module.scss';

import Spinner from '../../../UI/Spinner/Spinner';

const Editor = React.lazy(() =>
  import('../../../UI/RichTextEditor/RichTextEditor')
);

class NoteCornellApuntes extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    if (this.state.setContent === null) {
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      this.setState({ editorState: this.onContentData() });
    }
  }

  onContentData = () => {
    const id = this.props.docID;
    const getContent = this.props.notescornell[id].getContent;
    const blocks = convertFromRaw(JSON.parse(getContent));
    const editorState = EditorState.createWithContent(blocks, null);
    return editorState;
  };

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  handleSavedContent = () => {
    const id = this.props.docID;
    const db = this.props.firestore;
    const rawDraftContentState = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    db.update(`notescornell/${id}`, {
      getContent: rawDraftContentState,
    });
  };

  handleCleadContent = () => {
    this.setState({ editorState: EditorState.createEmpty() });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className={classes.NoteCornellApuntes}>
        <div className={classes.BoxApuntes}>
          <React.Suspense fallback={<Spinner />}>
            <Editor
              editorState={editorState}
              onChange={this.onEditorStateChange}
              onSaved={this.handleSavedContent}
              onClead={this.handleCleadContent}
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
