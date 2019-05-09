import React, { Component } from 'react';
import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarker/DocumentoMarker';
import Video from './DocumentoVideo/DocumentoVideo';
import classes from './Documento.module.scss';

class Documento extends Component {
  constructor(props) {
    super(props);
    this.refPage = React.createRef();
    this.refMarke = React.createRef();
  }

  state = {
    addTimeline: [],
    isTimeline: '',
  };

  componentDidMount() {
    console.log(this.refPage);
    console.log(this.refPage.clientHeight);

    // console.log((this.refPage.scrollHeight = 0));
  }

  componentDidUpdate() {
    const { isTimeline, addTimeline } = this.state;
    console.log('===>', isTimeline);
    console.log('===>', addTimeline);
    // console.log(this.refPage.scrollTop);
  }

  handleChangeValueTimeline = ev => {
    this.setState({ isTimeline: ev.target.value });
  };

  handleAddTimeline = ev => {
    const { isTimeline, addTimeline } = this.state;
    const pageSizeH = this.refPage.clientHeight;
    // const resultNumbTime = Math.floor(isTimeline);
    // const resultNumbPage = pageSizeH / isTimeline;
    // console.log(isTimeline, resultNumbTime, resultNumbPage);
    const timeline = Math.floor((pageSizeH / 180.0) * isTimeline);
    console.log(timeline);
    this.setState(prevState => ({
      addTimeline: [...prevState.addTimeline, { timeline }],
    }));
    this.refInputValue.value = '';
  };

  render() {
    const { addTimeline } = this.state;
    let title;
    if (this.refPage.offsetHeight === 0) title += 'dfsñldfñds';
    return (
      <div className={classes.Documento}>
        <div className={classes.formAddMarker}>
          <div className="row justify-content-start">
            <input
              type="text"
              name="time"
              ref={ref => (this.refInputValue = ref)}
              onChange={this.handleChangeValueTimeline}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleAddTimeline}>
              Crear un marcador
            </button>
          </div>
        </div>
        <div className={classes.Wrapper}>
          <Marker
            markers={addTimeline}
            onRef={ref => (this.refMarke = ref)}
            onRefUl={ref => (this.refMarkeUl = ref)}
          />
          <Page onRef={ref => (this.refPage = ref)}> {title} </Page>
          <Video />
        </div>
      </div>
    );
  }
}

export default Documento;
