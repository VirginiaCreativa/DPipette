import React, { Component } from 'react';
import Page from './DocumentoPage/DocumentoPage';
import Marker from './DocumentoMarker/DocumentoMarker';
import Video from './DocumentoVideo/DocumentoVideo';
import classes from './Documento.module.scss';

class Documento extends Component {
  constructor(props) {
    super(props);
    this.refPage = React.createRef();
  }

  state = {
    addTimeline: [],
    isTimeline: '',
  };

  componentDidMount() {
    // document.addEventListener("mousemove", () => console.log(this.clientY));
    // const heightDoc = this.refDocument.addEventListener('resize', () =>
    //   console.log(this.innerHeight)
    // );
    console.log(this.refPage);
    console.log(this.refPage.clientHeight);

    // console.log((this.refPage.scrollHeight = 0));
  }

  componentDidUpdate() {
    const { isTimeline, addTimeline } = this.state;
    console.log('===>', isTimeline);
    console.log('===>', addTimeline);
    console.log(this.refPage.scrollTop);
  }

  handleChangeValueTimeline = ev => {
    this.setState({ isTimeline: ev.target.value });
  };

  handleAddTimeline = ev => {
    const { isTimeline, addTimeline } = this.state;
    this.setState(prevState => ({
      addTimeline: [...prevState.addTimeline, { isTimeline }],
    }));
    this.refInputValue.value = '';
  };

  render() {
    const { addTimeline } = this.state;
    let title;
    if (this.refPage.scrollTop >= 0) title += 'dfsñldfñds';
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
          <Marker markers={addTimeline} />
          <Page onRef={ref => (this.refPage = ref)}> {title} </Page>
          <Video />
        </div>
      </div>
    );
  }
}

export default Documento;
