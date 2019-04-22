import React, { Component } from 'react';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
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
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createDragNDropUploadPlugin from '@mikeljames/draft-js-drag-n-drop-upload-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import HeadlinesButton from './Toolbar/HeadlinesButton';
import ImageAdd from './Toolbar/AddImageEditor';
import createColorBlockPlugin from './Toolbar/colorBlockPlugin';

import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';

import classes from './RichTextEditor.module.scss';

const theme = {
  undo: classes.UndoButton,
  redo: classes.UndoButton,
};

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const staticToolbarPlugin = createToolbarPlugin();
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { Toolbar } = staticToolbarPlugin;
const undoPlugin = createUndoPlugin({
  undoContent: <i className="bx bx-rotate-left" />,
  redoContent: <i className="bx bx-rotate-right" />,
  theme,
});
const linkifyPlugin = createLinkifyPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });
const colorBlockPlugin = createColorBlockPlugin({ decorator });
const { UndoButton, RedoButton } = undoPlugin;

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  addImage: imagePlugin.addImage,
});

const plugins = [
  staticToolbarPlugin,
  imagePlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  colorBlockPlugin,
  undoPlugin,
  emojiPlugin,
  linkifyPlugin,
];

class RichTextEditor extends Component {
  render() {
    const { editorState, onChange, ref } = this.props;
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
              <EmojiSuggestions />
              <EmojiSelect />
              <Separator {...externalProps} />
              <UndoButton />
              <RedoButton />
              <AlignmentTool />
            </React.Fragment>
          )}
        </Toolbar>
        <Editor
          ref={ref}
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
