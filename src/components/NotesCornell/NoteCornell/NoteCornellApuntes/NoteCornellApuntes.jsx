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
    if (this.state.getContent === null) {
      this.setState({ editorState: EditorState.createEmpty() });
    } else {
      this.setState({
        editorState: this.onContentData(),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.editorState == null && !!this.state.editorState) {
      this.setState({
        editorState: this.onContentData(),
      });
    }
  }

  onContentData = () => {
    const id = this.props.docID;
    const getContent = this.props.notescornell[id].getContent;
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(getContent))
    );
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
    const content = JSON.stringify(convertToRaw(contentSave));
    console.log(content);
    db.update(`notescornell/${id}`, {
      getContent: content,
    });
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
