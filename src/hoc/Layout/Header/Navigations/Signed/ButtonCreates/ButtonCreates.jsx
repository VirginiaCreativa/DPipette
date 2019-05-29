/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { history } from '../../../../../../redux/store/Store';
import classes from './ButtonCreates.module.scss';

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

class ButtonCreates extends Component {
  state = {
    isMenu: false,
    fade: false,
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
      fade: !prevState.fade,
    }));
  };

  handleHideMenu = e => {
    const xClose = e.offsetX;
    const yClose = e.offsetY;
    if (xClose >= '800' || yClose >= '80') {
      this.setState({
        isMenu: false,
        fade: false,
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
    const { isMenu, fade } = this.state;
    let btnHover;
    if (fade) {
      btnHover = { backgroundColor: '#1948ca' };
    }

    let showMenu = null;
    if (isMenu) {
      showMenu = (
        <div
          className={[
            classes.isMenuOpen,
            fade ? classes.FadeOn : classes.FadeOff,
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
              <Link to="/notecornell/:id" onClick={this.handleNewIDNotaCornell}>
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
      );
    }

    return (
      <>
        <div className={classes.ButtonCreates}>
          <button
            className={classes.btnCreate}
            type="button"
            style={btnHover}
            onMouseOver={this.handleShowMenu}
            ref={a => (this.fadeMenu = a)}>
            Crear nuevo
            <i className="bx bx-plus" />
          </button>
          <div>{showMenu}</div>
        </div>
      </>
    );
  }
}

export default compose(withFirestore)(ButtonCreates);
