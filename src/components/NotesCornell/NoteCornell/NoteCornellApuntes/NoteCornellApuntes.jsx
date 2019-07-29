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
  constructor(props) {
    super(props);
    this.refPage = React.createRef();
  }

  state = {
    editorState: EditorState.createEmpty(),
    turnEdit: false,
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
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    if (currentContentLength >= 1) {
      this.setState({ turnEdit: true });
    } else {
      this.setState({ turnEdit: false });
    }
    console.log(currentContentLength);
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
    this.setState({ turnEdit: false });
  };

  handleCleadContent = () => {
    this.setState({ editorState: EditorState.createEmpty(), turnEdit: true });
  };

  render() {
    const { editorState } = this.state;
    const styleActiveTurnSave = this.state.turnEdit && classes.TurnSaved;
    return (
      <div className={classes.NoteCornellApuntes}>
        <div className={classes.BoxApuntes}>
          <React.Suspense fallback={<Spinner />}>
            <Editor
              editorState={editorState}
              onChange={this.onEditorStateChange}
              onSaved={this.handleSavedContent}
              onClead={this.handleCleadContent}
              onTurnSaved={styleActiveTurnSave}
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
