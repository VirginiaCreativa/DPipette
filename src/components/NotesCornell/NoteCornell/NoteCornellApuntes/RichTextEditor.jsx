import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import HeadlinesButton from './Toolbar/HeadlinesButton';

import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import classes from './RichTextEditor.module.scss';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

class RichTextEditor extends Component {
  render() {
    return (
      <div className={classes.RichTextEditor}>
        <Toolbar>
          {externalProps => (
            <React.Fragment>
              <HeadlinesButton {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <Separator {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
            </React.Fragment>
          )}
        </Toolbar>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}

export default RichTextEditor;
