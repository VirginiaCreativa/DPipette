import React, { Component } from 'react';
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import classes from './RichTextEditor.module.scss';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

class RichTextEditor extends Component {
  render() {
    return (
      <div className={classes.RichTextEditor}>
        <Toolbar />
        <Editor
          placeholder="Escribir aquí"
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}

export default RichTextEditor;
