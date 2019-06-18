import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { history } from '../../../../redux/store/Store';
import classes from './ProgramCreate.module.scss';

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

class ProgramCreate extends Component {
  state = {
    isMenu: true,
    isfade: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleHideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleHideMenu);
  }

  handleShowMenu = () => {
    this.setState(prevState => ({
      isMenu: !prevState.isMenu,
      isfade: !prevState.isfade,
    }));
  };

  handleHideMenu = e => {
    const xClose = e.offsetX;
    const yClose = e.offsetY;
    if (xClose >= '800' || yClose >= '80') {
      this.setState({
        isMenu: false,
        isfade: false,
      });
    }
  };

  handleNewIDNotaCornell = ev => {
    ev.preventDefault();
    const project = {
      tema: 'Nueva tema',
      materia: 'Nueva materia',
      preguntas: [] || null,
      importantes: [] || null,
      claves: [] || null,
      date: Date.now(),
      apuntes: [] || null,
      videoResumen: null,
      cover: 'option2',
      portada: '',
      favorite: false,
      getContent: JSON.stringify(content),
      getResumen: JSON.stringify(content),
      setContent: null,
      setResumen: null,
      videoNote: null,
      filenameVideoNote: '',
      filenamePortadaImagen: '',
    };
    this.props.firestore
      .add('notescornell', {
        ...project,
      })
      .then(doc => {
        history.push(`/notecornell/${doc.id}`);
      })
      .catch(error => console.log(error));
  };

  handleNewIDDocumentos = ev => {
    ev.preventDefault();
    const project = {
      date: Date.now(),
      tema: 'Nueva tema',
      materia: 'Nueva materia',
      addTimeline: [],
      favorito: false,
      hasVideo: false,
      cover: 'option2',
      portada: '',
      filenamePortadaImagen: '',
      filenameVideoDoc: '',
      filenamePagesDoc: [],
      imgsPages: [],
      pageGrid: true,
    };
    this.props.firestore
      .add('documentos', {
        ...project,
      })
      .then(doc => {
        history.push(`/documento/${doc.id}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { isMenu, isfade } = this.state;
    let btnHover;
    if (isfade) {
      btnHover = { backgroundColor: '#1948ca' };
    }
    return (
      <div className={classes.ProgramCreate}>
        <button
          className={classes.btnCreate}
          type="button"
          style={btnHover}
          onMouseOver={this.handleShowMenu}
          ref={a => (this.fadeMenu = a)}>
          <i className="bx bx-plus" />
        </button>
        {isMenu && (
          <div
            className={[
              classes.isMenuOpen,
              isfade ? classes.FadeOn : classes.FadeOff,
            ].join(' ')}>
            <div className={classes.Triangule} />
            <ul>
              <li>
                <Link to="/significadocreate">
                  <i
                    className="icon-funnel-outline"
                    title="El icono de Significados"
                  />
                  Signficados
                </Link>
              </li>
              <li>
                <Link
                  to="/notecornell/:id"
                  onClick={this.handleNewIDNotaCornell}>
                  <i
                    className="icon-book-outline"
                    title="El icono de Notas Cornell"
                  />
                  Notas Cornell
                </Link>
              </li>
              <li>
                <Link to="/documento/:id" onClick={this.handleNewIDDocumentos}>
                  <i
                    className="icon-file-text-outline"
                    title="El icono de Documentos"
                  />
                  Doucmento
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default compose(withFirestore)(ProgramCreate);
