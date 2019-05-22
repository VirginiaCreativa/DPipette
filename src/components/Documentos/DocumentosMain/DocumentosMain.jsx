import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import 'moment/locale/es';
import moment from 'moment';
import Masonry from 'react-masonry-css';
import Spinner from './Spinner/Spinner';
import Empty from '../../UI/Empty/Empty';
import classes from './DocumentosMain.module.scss';

import Item from './DocumentosItem';
import { breakpointColumnsObj } from './breakpointColumnsObj';

const DocumentosMain = ({
  documentos,
  search,
  getFilterMateriaDoc,
  getFilterDateNowDoc,
  getFilterDateYesterdayDoc,
  getFilterFavoriteDoc,
}) => {
  const dateItemNow = item =>
    moment(item)
      .locale('es')
      .format('LL');

  const dateItemYesterday = item =>
    moment(item)
      .locale('es')
      .format('LL');

  return (
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
            documentos
              .filter(item => {
                const dateToday = dateItemNow(item.date);
                const dateYesterday = dateItemYesterday(item.date);
                return (
                  item.tema.toLowerCase().includes(search.toLowerCase()) &&
                  item.materia.includes(getFilterMateriaDoc) &&
                  dateToday.includes(getFilterDateNowDoc) &&
                  dateYesterday.includes(getFilterDateYesterdayDoc) &&
                  item.favorito !== getFilterFavoriteDoc
                );
              })
              .map(item => (
                <div key={item.id}>
                  <Item {...item} linked={`documento/${item.id}`} />
                </div>
              ))}
        </Masonry>
      )}
    </div>
  );
};
export default compose(
  firestoreConnect(['documentos']),
  connect(state => ({
    documentos: state.firestore.ordered.documentos,
    search: state.Documentos.search,
    getFilterMateriaDoc: state.Documentos.materia,
    getFilterDateNowDoc: state.Documentos.date,
    getFilterDateYesterdayDoc: state.Documentos.yesterday,
    getFilterFavoriteDoc: state.Documentos.favorito,
  }))
)(DocumentosMain);
