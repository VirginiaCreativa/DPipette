import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from './Spinner/Spinner';
import VideoPlayer from '../../UI/VideoPlayerSignificados/VideoPlayer';
import classes from './SignificadosMain.module.scss';

import Images from './SignificadosImages';
import TagSinonimos from './SignificadosTagSinonimos';
import Heading from './SignificadosHeader';

class SignificadosMain extends Component {
  render() {
    const { significados, search } = this.props;
    return (
      <div className={classes.SignificadosMain}>
        {!isLoaded(significados) ? (
          <Spinner />
        ) : isEmpty(significados) ? (
          <Spinner />
        ) : (
          <div className={classes.GridMultiple}>
            {significados &&
              significados
                .filter(item =>
                  item.word.toLowerCase().includes(search.toLowerCase())
                )
                .map(item => (
                  <Link
                    key={item.id}
                    to={`/significado/${item.id}/${item.word}`}>
                    <div className={classes.BoxLists}>
                      <Heading {...item} />
                      <div className={classes.boxVideo}>
                        <VideoPlayer
                          srcVideo={item.videoDescripcion}
                          title={item.word}
                        />
                      </div>
                      <div className={classes.GroupParagh}>
                        <p>{item.descriptions[0].definicion}</p>
                        <p>{item.descriptions[1].definicion}</p>
                      </div>
                      <div className={classes.Line} />
                      <div className={classes.GroupBox}>
                        <Images {...item} />
                        <TagSinonimos {...item} />
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        )}
      </div>
    );
  }
}
export default compose(
  connect(state => ({
    significados: state.firestore.ordered.significados,
    search: state.searchSign.search,
  })),
  firestoreConnect(() => [
    {
      collection: 'significados',
      orderBy: ['date', 'desc'],
    },
  ])
)(SignificadosMain);
