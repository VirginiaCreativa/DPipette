/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { history } from '../../../redux/store/Store';
import classes from './SignificadosCreate.module.scss';
import CapitalizeFirstLetter from '../../../scripts/CapitalizeFirstLetter';
import GramaticalesCateg from '../../../scripts/GramaticalesCateg';
import BoxGroupFormHeading from '../../UI/CreateForm/Form/Form_Heading';
import BoxGroupVisualListGroup from '../../UI/CreateForm/Visual/Visual_ListGroup';
import DescriptionsLists from './VisualesGrid/DescriptionsLists/DescriptionsLists';
import SinonimosLists from './VisualesGrid/SinonimosLists/SinonimosLists';
import Imagenes from './VisualesGrid/Imagenes/Imagenes';
import Videos from './VisualesGrid/Videos/Videos';
import Gramaticales from './Gramaticales/Gramaticales';
import VideosUploaders from './VideosUploaders/VideosUploaders';
import ImagenesUploader from './ImagenesUploader/ImagenesUploader';
import MasEjemplosLists from './VisualesGrid/MasEjemplosLists/MasEjemplosLists';

import {
  getCreateSignificado,
  showVisiblenImagenVisual,
  hideVisiblenImagenVisual,
  showVisibleVideoVisual,
  hideVisibleVideoVisual,
  showVisibleMasEjemploVisual,
  hideVisibleMasEjemploVisual,
} from '../../../redux/actions/SignificadosAction';

class SignificadosCreate extends Component {
  state = {
    isVisible: false,
    word: '',
    definicion: '',
    ejemplo: '',
    ejemplos: [],
    descriptions: [],
    abreviatura: '',
    abrev: '',
    sinonimos: [],
    sinonimo: '',
    antonimos: [],
    antonimo: null,
    imagenes: [],
    videoSena: '',
    videoDescripcion: '',
  };

  componentDidMount() {
    this.btnSin.disabled = true;
    this.btnDes.disabled = true;
    this.btnMasEjemplo.disabled = true;
    this.boxResult.style.display = 'none';
    this.boxResultItemWor.style.display = 'none';
    this.boxResultItemDesc.style.display = 'none';
    this.boxResultItemAbrev.style.display = 'none';
    this.boxResultItemSin.style.display = 'none';
    this.boxResultItemAnto.style.display = 'none';
    this.boxResultImagenes.style.display = 'none';
    this.boxResultItemVideos.style.display = 'none';
    this.boxResultItemEjemplos.style.display = 'none';
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imagenes: nextProps.imgFiles,
      videoSena: nextProps.videoSena,
      videoDescripcion: nextProps.videoDescrip,
    });
  }

  componentDidUpdate() {
    const updateDescri = this.state.descriptions;
    const updateSin = this.state.sinonimos;
    const updateAnt = this.state.antonimos;
    const updateImgFiles = this.props.imgFiles;
    const updateVideoSena = this.props.videoSenaBlob;
    const updateVideoDescrip = this.props.videoDescripBlob;
    const updateEjemplos = this.state.ejemplos;

    if (updateDescri.length >= 6) {
      this.InputTextEj.disabled = true;
      this.InputTextDefin.disabled = true;
      this.btnDes.disabled = true;
    } else {
      this.InputTextEj.disabled = false;
      this.InputTextDefin.disabled = false;
      this.btnDes.disabled = false;
    }
    if (updateSin.length === 6) {
      this.InputTextSin.disabled = true;
    } else {
      this.InputTextSin.disabled = false;
    }

    if (updateAnt.length === 6) {
      this.InputTextAnt.disabled = true;
    } else {
      this.InputTextAnt.disabled = false;
    }

    if (updateImgFiles.length >= 4) {
      this.boxResultImagenes.style.display = 'block';
      this.InputFileImg.disabled = true;
      this.props.showVisiblenImagenVisual();
    } else if (updateImgFiles.length >= 1) {
      this.InputFileImg.disabled = false;
    } else if (updateImgFiles.length === 0) {
      this.boxResultImagenes.style.display = 'none';
      this.props.hideVisiblenImagenVisual();
    }

    if (this.InputTextEj.value !== '') {
      this.btnDes.disabled = false;
      if (this.InputTextDefin.value !== '') {
        this.btnDes.disabled = false;
      }
    } else {
      this.btnDes.disabled = true;
    }

    if (updateVideoDescrip || updateVideoSena) {
      this.boxResultItemVideos.style.display = 'block';
      this.props.showVisibleVideoVisual();
    } else {
      this.boxResultItemVideos.style.display = 'none';
      this.props.hideVisibleVideoVisual();
    }

    if (updateEjemplos.length === 6) {
      this.boxResultItemEjemplos.style.display = 'block';
      this.InputTextMasEjemplo.disabled = true;
    } else if (updateEjemplos.length >= 1) {
      this.InputTextMasEjemplo.disabled = false;
    } else if (updateEjemplos.length === 0) {
      this.boxResultItemEjemplos.style.display = 'none';
      this.props.hideVisibleMasEjemploVisual();
    }
  }

  handleChangeWord = ev => {
    const isValue = ev.target.value;
    this.boxResult.style.display = 'block';
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    this.props.getCreateSignificado(canCapitalValue);
    if (isValue.length >= 3) {
      this.boxResultItemWor.style.display = 'block';
      this.setState({
        isVisible: true,
        word: canCapitalValue,
      });
    } else {
      this.boxResultItemWor.style.display = 'none';
      this.setState({
        isVisible: false,
      });
    }
  };

  handleChangeDescription = ev => {
    const isValue = ev.target.value;
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    this.setState({ [ev.target.name]: canCapitalValue });
  };

  handleChangeDefinicion = ev => {
    const isValue = ev.target.value;
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    this.setState({ [ev.target.name]: canCapitalValue });
  };

  handleChangeEjemplo = ev => {
    const isValue = ev.target.value;
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    if (isValue.length >= 3) {
      this.btnDes.disabled = false;
    } else {
      this.btnDes.disabled = true;
    }
    this.setState({ [ev.target.name]: canCapitalValue });
  };

  handleAddDescriptions = () => {
    const { descriptions, ejemplo, definicion } = this.state;
    this.setState(prevState => ({
      descriptions: prevState.descriptions.concat({ definicion, ejemplo }),
    }));
    if (definicion.length >= 6) {
      this.boxResultItemDesc.style.display = 'block';
      if (ejemplo.length >= 6) {
        this.boxResultItemDesc.style.display = 'block';
      }
    } else {
      this.boxResultItemDesc.style.display = 'none';
    }
    if (descriptions.length >= 2) {
      this.btnDes.disabled = true;
    }
    this.InputTextDefin.value = '';
    this.InputTextEj.value = '';
    this.btnDes.disabled = true;
  };

  handleDeleteDesription = index => {
    const descriptionDelete = this.state.descriptions;
    descriptionDelete.splice(index, 1);
    this.setState({ descriptions: descriptionDelete });
  };

  handleGramaticales = ev => {
    this.boxResultItemAbrev.style.display = 'block';
    let selectIndex;
    const index =
      ev.target.value === 'Adjetivo'
        ? (selectIndex = 1)
        : ev.target.value === 'Adverbio'
        ? (selectIndex = 2)
        : ev.target.value === 'Verbos'
        ? (selectIndex = 3)
        : null;

    const abrev = GramaticalesCateg(index);
    console.log(abrev);
    this.setState({
      abreviatura: ev.target.value,
      abrev,
    });
  };

  handleChangeSinonimo = ev => {
    const isValue = ev.target.value;
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    if (isValue.length >= 3) {
      this.btnSin.disabled = false;
    } else {
      this.btnSin.disabled = true;
    }
    this.setState({ sinonimo: canCapitalValue });
  };

  handleChangeAntonimos = ev => {
    const isValue = ev.target.value;
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    this.setState({ antonimo: canCapitalValue });
  };

  handleAddSinonimos = () => {
    const { sinonimo, sinonimos, antonimo } = this.state;
    if (sinonimo.length >= 3) {
      this.boxResultItemSin.style.display = 'block';
      this.btnSin.disabled = true;
      this.setState(prevState => ({
        sinonimos: prevState.sinonimos.concat(sinonimo) || null,
      }));
    } else {
      this.boxResultItemSin.style.display = 'none';
    }
    if (antonimo === null) {
      this.setState({
        antonimo: null,
      });
    } else {
      this.boxResultItemAnto.style.display = 'block';
      this.setState(prevState => ({
        antonimos: prevState.antonimos.concat(antonimo),
      }));
    }
    if (sinonimos.length > 6) {
      this.btnSin.disabled = true;
    }
    if (this.btnSin.onclick) {
      this.setState({
        antonimo: null,
      });
    }
    this.InputTextSin.value = '';
    this.InputTextAnt.value = '';
  };

  handleDeleteSinonimos = index => {
    const sinonimosDelete = this.state.sinonimos;
    sinonimosDelete.splice(index, 1);
    console.log(sinonimosDelete);
    this.setState({ sinonimos: sinonimosDelete });
  };

  handleDeleteAntonimos = index => {
    const antonimosDelete = this.state.antonimos;
    antonimosDelete.splice(index, 1);
    this.setState({ antonimos: antonimosDelete });
  };

  handleChangeMásEjemplo = ev => {
    const isValue = ev.target.value;
    const canCapitalValue = CapitalizeFirstLetter(isValue);
    if (isValue.length >= 12) {
      this.btnMasEjemplo.disabled = false;
      this.setState({
        [ev.target.name]: canCapitalValue,
      });
    } else {
      this.btnMasEjemplo.disabled = true;
    }
  };

  handleAddMasEjemplo = () => {
    this.props.showVisibleMasEjemploVisual();
    const { ejemplo } = this.state;
    this.boxResultItemEjemplos.style.display = 'block';
    this.setState(prevState => ({
      ejemplos: prevState.ejemplos.concat(ejemplo) || null,
    }));
    this.InputTextMasEjemplo.value = '';
    if (ejemplo.length <= 12) {
      this.btnMasEjemplo.disabled = false;
    } else {
      this.btnMasEjemplo.disabled = true;
    }
  };

  handleDeleteEjemplos = index => {
    const ejemplosDelete = this.state.ejemplos;
    ejemplosDelete.splice(index, 1);
    this.setState({ ejemplos: ejemplosDelete });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const project = {
      uid: this.props.auth.uid,
      word: this.state.word || 'Desconocido',
      descriptions: this.state.descriptions || null,
      abreviatura: this.state.abreviatura || null,
      abrev: this.state.abrev || null,
      sinonimos: this.state.sinonimos || null,
      antonimos: this.state.antonimos || null,
      imagenes: this.state.imagenes || null,
      videoSena: this.state.videoSena || null,
      videoDescripcion: this.state.videoDescripcion || null,
      ejemplos: this.state.ejemplos || null,
    };
    this.props.firestore
      .add('significados', {
        ...project,
        date: Date.now(),
      })
      .then(doc => {
        history.push(`/significado/${doc.id}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const {
      word,
      descriptions,
      isVisible,
      abrev,
      abreviatura,
      sinonimos,
      antonimos,
      ejemplos,
    } = this.state;
    return (
      <React.Fragment>
        <div className={classes.SignificadosCreate}>
          <div className="row">
            <div className="col-9">
              <div className={classes.WrapperForm}>
                {/* ====== DEFINICIÓN ====== */}
                <div className={classes.Group}>
                  <BoxGroupFormHeading title="Definición" number="1" />
                  <div className={classes.Content}>
                    <form ref={ref => (this.FormDefinicion = ref)}>
                      {/* ====== GROUP PALABRA ====== */}
                      <div
                        className={[
                          classes.GroupWord,
                          classes.spaceingBottom,
                        ].join(' ')}>
                        <div className="form-group">
                          <label htmlFor="Palabra">Palabra</label>
                          <input
                            type="text"
                            className="form-control"
                            name="word"
                            title="Escribir una palabra"
                            onChange={this.handleChangeWord}
                          />
                        </div>
                      </div>
                      {/* ====== /GROUP DESCRIPICON ====== */}
                      <div
                        className={[
                          classes.GroupDescrip,
                          classes.spaceingBottom,
                        ].join(' ')}>
                        <div className="form-row justify-content-between">
                          <div className="form-group col-6">
                            <label htmlFor="Definición">Definición</label>
                            <input
                              type="text"
                              className="form-control"
                              name="definicion"
                              title="Escribir una descripción hasta 4 listas"
                              onChange={this.handleChangeDefinicion}
                              ref={ref => (this.InputTextDefin = ref)}
                            />
                          </div>
                          <div className="form-group col-5">
                            <label htmlFor="Ejemplo">Ejemplo</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ejemplo"
                              title="Escribir una descripción hasta 4 listas"
                              onChange={this.handleChangeEjemplo}
                              ref={ref => (this.InputTextEj = ref)}
                            />
                          </div>
                          <div className="form-group col-1 d-flex align-items-center justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary"
                              ref={ref => (this.btnDes = ref)}
                              onClick={this.handleAddDescriptions}>
                              <i className="bx bx-plus" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ====== GROUP SINONIMOS ====== */}
                      <div
                        className={[
                          classes.GroupSinAnt,
                          classes.spaceingBottom,
                        ].join(' ')}>
                        <div className="form-row justify-content-between">
                          <div className="form-group col-6">
                            <label htmlFor="Sinónimos">Sinónimos</label>
                            <input
                              type="text"
                              className="form-control"
                              name="sinonimos"
                              title="Escribir sinónimos hasta 4 listas"
                              onChange={this.handleChangeSinonimo}
                              ref={refSin => (this.InputTextSin = refSin)}
                            />
                          </div>
                          <div className="form-group col-5">
                            <label htmlFor="Antónimo">Antónimos</label>
                            <input
                              type="text"
                              className="form-control"
                              name="antonimos"
                              title="Escribir antónimos hasta 4 listas"
                              onChange={this.handleChangeAntonimos}
                              ref={ref => (this.InputTextAnt = ref)}
                            />
                          </div>
                          <div className="form-group col-1 d-flex align-items-center justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary"
                              ref={ref => (this.btnSin = ref)}
                              onClick={this.handleAddSinonimos}>
                              <i className="bx bx-plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* ====== GROUP GRAMATICALES ====== */}
                      <div
                        className={[
                          classes.GroupAbrev,
                          classes.spaceingBottom,
                        ].join(' ')}>
                        <Gramaticales onSelects={this.handleGramaticales} />
                      </div>
                    </form>
                  </div>
                </div>
                {/* ====== MAS EJEMPLOS ====== */}
                <div className={classes.Group}>
                  <BoxGroupFormHeading title="Más ejemplos" number="2" />
                  <div className={classes.Content}>
                    <form ref={ref => (this.FormMasEjemplos = ref)}>
                      <div className={classes.GroupMasEjemplos}>
                        <div className="form-row">
                          <div className="form-group col-11">
                            <label htmlFor="Frases">
                              Frases <span htmlFor="">({ejemplos.length})</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="ejemplo"
                              title="Escribir antónimos hasta 4 listas"
                              onChange={this.handleChangeMásEjemplo}
                              ref={ref => (this.InputTextMasEjemplo = ref)}
                            />
                          </div>
                          <div className="form-group col-1 d-flex align-items-center justify-content-end">
                            <button
                              type="button"
                              className="btn btn-primary"
                              ref={ref => (this.btnMasEjemplo = ref)}
                              onClick={this.handleAddMasEjemplo}>
                              <i className="bx bx-plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* ====== IMAGENES ====== */}
                <div className={classes.Group}>
                  <BoxGroupFormHeading title="Imagenes" number="3" />
                  <div className={classes.Content}>
                    <form ref={ref => (this.FormImagenes = ref)}>
                      <div className={classes.GroupImagenes}>
                        <div className="form-group">
                          <ImagenesUploader
                            childRef={ref => (this.InputFileImg = ref)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* ====== VIDEOS ====== */}
                <div className={classes.Group}>
                  <BoxGroupFormHeading title="Videos" number="4" />
                  <div className={classes.Content}>
                    <form ref={ref => (this.FormVideos = ref)}>
                      <div className={classes.GroupVideos}>
                        <div className="form-group">
                          <VideosUploaders />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* ====== GROUP FINAL ====== */}
                <div className={classes.ContentSubmite}>
                  <div className="d-flex justify-content-center">
                    <div className="form-group col-11">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg"
                        title="Click Salvado"
                        onClick={this.handleSubmit}>
                        Listo!
                      </button>
                    </div>
                  </div>
                </div>
                {/* ====== /GROUP FINAL ====== */}
              </div>
            </div>
            {/* ====== VISUAL ====== */}
            <div className="col-3">
              <div className={classes.WrapperVisual}>
                <BoxGroupVisualListGroup
                  title="Definición"
                  number="1"
                  isVisible={isVisible}>
                  <div ref={ref => (this.boxResult = ref)}>
                    <div
                      className={classes.GroupBox}
                      ref={refWord => (this.boxResultItemWor = refWord)}>
                      <span className={classes.Title}>Palabra</span>
                      <h5>{CapitalizeFirstLetter(word)}</h5>
                    </div>
                    <div
                      className={classes.GroupBox}
                      ref={refDes => (this.boxResultItemDesc = refDes)}>
                      <span className={classes.Title}>Descripción</span>
                      <DescriptionsLists
                        descriptions={descriptions}
                        onDelete={this.handleDeleteDesription}
                      />
                    </div>
                    <div
                      className={classes.GroupBox}
                      ref={ref => (this.boxResultItemSin = ref)}>
                      <span className={classes.Title}>Sinónimos</span>
                      <SinonimosLists
                        sinonimos={sinonimos}
                        onDelete={this.handleDeleteSinonimos}
                      />
                    </div>
                    <div
                      className={classes.GroupBox}
                      ref={ref => (this.boxResultItemAnto = ref)}>
                      <span className={classes.Title}>Antónimos</span>
                      <SinonimosLists
                        sinonimos={antonimos}
                        onDelete={this.handleDeleteAntonimos}
                      />
                    </div>
                    <div
                      className={classes.GroupBox}
                      ref={ref => (this.boxResultItemAbrev = ref)}>
                      <span className={classes.Title}>Abreviatura</span>
                      <p>
                        {abreviatura} ({abrev})
                      </p>
                    </div>
                  </div>
                </BoxGroupVisualListGroup>
                <BoxGroupVisualListGroup
                  title="Más ejemplos"
                  number="2"
                  isVisible={this.props.isVisibleEjemplo}>
                  <div ref={ref => (this.boxResultItemEjemplos = ref)}>
                    <MasEjemplosLists
                      masejemplos={ejemplos}
                      onDelete={this.handleDeleteEjemplos}
                    />
                  </div>
                </BoxGroupVisualListGroup>
                <BoxGroupVisualListGroup
                  title="Imagenes"
                  number="3"
                  isVisible={this.props.isVisibleImg}>
                  <div ref={ref => (this.boxResultImagenes = ref)}>
                    <Imagenes />
                  </div>
                </BoxGroupVisualListGroup>
                <BoxGroupVisualListGroup
                  title="Videos"
                  number="4"
                  isVisible={this.props.isVisibleVideo}>
                  <div ref={ref => (this.boxResultItemVideos = ref)}>
                    <Videos />
                  </div>
                </BoxGroupVisualListGroup>

                <BoxGroupVisualListGroup title="Conjugación" number="4" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCreateSignificado,
      showVisibleVideoVisual,
      hideVisibleVideoVisual,
      showVisiblenImagenVisual,
      hideVisiblenImagenVisual,
      showVisibleMasEjemploVisual,
      hideVisibleMasEjemploVisual,
    },
    dispatch
  );

export default compose(
  withFirestore,
  connect(
    state => ({
      imagenes: state.Significados.imagenes,
      imgFiles: state.Significados.imgFiles,
      isVisibleImg: state.Significados.isVisibleImg,
      isVisibleVideo: state.Significados.isVisibleVideo,
      isVisibleEjemplo: state.Significados.isVisibleEjemplo,
      videoSena: state.Significados.videoSena,
      videoSenaBlob: state.Significados.videoSenaBlob,
      videoDescripBlob: state.Significados.videoDescripBlob,
      videoDescrip: state.Significados.videoDescrip,
      auth: state.firebase.auth,
    }),
    mapDispatchToProps
  )
)(SignificadosCreate);
