import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Masonry from 'react-masonry-css';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './DocumentosMain.module.scss';

import Item from './DocumentosItem';
import { breakpointColumnsObj } from './breakpointColumnsObj';

const DocumentosMain = ({ documentos }) => (
  <div className={classes.DocumentosMain}>
    {!isLoaded(documentos) ? (
      <Spinner />
    ) : isEmpty(documentos) ? (
      <Empty />
    ) : (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {documentos &&
          documentos.map(item => (
            <div key={item.id}>
              <Item {...item} linked={`documento/${item.id}`} />
            </div>
          ))}
      </Masonry>
    )}
  </div>
);

export default compose(
  firestoreConnect(['documentos']),
  connect(state => ({
    documentos: state.firestore.ordered.documentos,
  }))
)(DocumentosMain);
