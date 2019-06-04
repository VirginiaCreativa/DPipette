import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './DocumentoHeader.module.scss';
import CapitalizeFirstLetter from '../../../../scripts/CapitalizeFirstLetter';

import Heading from './Heading';
import InputBtnUpdate from '../../../UI/InputBtnUpdate/InputBtnUpdate';

import { showEditableDoc } from '../../../../redux/actions/DocumentosAction';

const DocumentoHeader = ({
  materia,
  tema,
  documentos,
  ID,
  firestore,
  showEditable,
}) => {
  const [isTema, setTema] = useState(tema);
  const [isMateria, setMateria] = useState(materia);
  const [isActiveEditable, setActiveEditable] = useState(false);
  const [isActiveTema, setActiveTema] = useState(false);
  const [isActiveMateria, setActiveMateria] = useState(false);
  let textInputTema = useRef(null);
  let textInputMateria = useRef(null);

  useEffect(
    () => () => {
      setActiveEditable(!showEditable);
    },
    [showEditable]
  );
  const onEditable = () => {
    setActiveEditable(!isActiveEditable);
  };
  const getChangeTema = ev => {
    const isValue = ev.target.value;
    const capitValue = CapitalizeFirstLetter(isValue);
    setTema(capitValue);
    if (isValue.length >= 0) {
      setActiveTema(false);
    }
  };

  const getChangeMateria = ev => {
    const isValue = ev.target.value;
    const capitValue = CapitalizeFirstLetter(isValue);
    setMateria(capitValue);
    if (isValue.length >= 0) {
      setActiveMateria(false);
    }
  };

  const handleSubmitTema = () => {
    firestore
      .update(`documentos/${ID}`, {
        tema: isTema,
        date: Date.now(),
      })
      .then(() => {
        setActiveTema(true);
      })
      .catch(error => console.log(error));
  };

  const handleSubmitMateria = () => {
    firestore
      .update(`documentos/${ID}`, {
        materia: isMateria,
        date: Date.now(),
      })
      .then(() => {
        setActiveMateria(true);
      })
      .catch(error => console.log(error));
  };

  const cssActiveEditable = isActiveEditable && classes.activeBtnEditable;

  return (
    <div className={classes.DocumentoHeader}>
      {isActiveEditable ? (
        <div className={classes.BoxHeadingForm}>
          <div className={classes.GroupForm}>
            <InputBtnUpdate
              label="Tema"
              onChange={getChangeTema}
              onClick={handleSubmitTema}
              ActiveBtn={isActiveTema}
              onValue={isTema}
              onRef={ref => (textInputTema = ref)}
              onFocus={() => (textInputTema.value = '')}
            />
            <InputBtnUpdate
              label="Materia"
              onChange={getChangeMateria}
              onClick={handleSubmitMateria}
              ActiveBtn={isActiveMateria}
              onValue={isMateria}
              onRef={ref => (textInputMateria = ref)}
              onFocus={() => (textInputMateria.value = '')}
            />
          </div>
          {/* <button
            type="button"
            onClick={onEditable}
            className={[classes.btnEditable, cssActiveEditable].join(' ')}>
            <i className="bx bx-pencil" />
          </button> */}
        </div>
      ) : (
        <div className={classes.BoxHeadingConfirm}>
          <Heading tema={isTema} materia={isMateria} />
          {/* <button
            type="button"
            onClick={onEditable}
            className={[classes.btnEditable, cssActiveEditable].join(' ')}>
            <i className="bx bx-pencil" />
          </button> */}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showEditableDoc }, dispatch);

export default compose(
  firestoreConnect(['documentos']),
  connect(
    state => ({
      documentos: state.firestore.data.documentos,
      showEditable: state.Documentos.Editable,
    }),
    mapDispatchToProps
  )
)(DocumentoHeader);
