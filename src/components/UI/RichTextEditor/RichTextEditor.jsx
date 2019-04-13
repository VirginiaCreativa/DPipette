import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
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
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';

import HeadlinesButton from './Toolbar/HeadlinesButton';
import ImageAdd from './Toolbar/AddImageEditor';

import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import classes from './RichTextEditor.module.scss';

const imagePlugin = createImagePlugin();
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, imagePlugin];

class RichTextEditor extends Component {
  render() {
    const { editorState, onChange } = this.props;
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
              <Separator {...externalProps} />
              <ImageAdd
                editorState={editorState}
                onChange={onChange}
                modifier={imagePlugin.addImage}
              />
            </React.Fragment>
          )}
        </Toolbar>
        <Editor
          placeholder="Escribir aquí..."
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
        />
      </div>
    );
  }
}

export default RichTextEditor;
