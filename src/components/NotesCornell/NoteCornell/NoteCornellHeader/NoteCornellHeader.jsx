import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classes from './NoteCornellHeader.module.scss';
import CapitalizeFirstLetter from '../../../../scripts/CapitalizeFirstLetter';

import InputBtnUpdate from '../../../UI/InputBtnUpdate/InputBtnUpdate';
import NoteCornellPortada from '../NoteCornellPortada/NoteCornellPortada';
import Header from './Header';

const NoteCornellHeader = ({
  tema,
  materia,
  onDelete,
  onFavorite,
  date,
  docID,
  firestore,
  favorite,
  portada,
  notescornell,
}) => {
  const [isActiveEditable, setActiveEditable] = useState(false);
  const [isActivePopever, setActivePopever] = useState(false);
  const [isTema, setTema] = useState(tema);
  const [isMateria, setMateria] = useState(materia);
  const [isActiveTema, setActiveTema] = useState(false);
  const [isActiveMateria, setActiveMateria] = useState(false);
  const [isOpenPortada, setOpenPortada] = useState(false);
  let textInputTema = useRef(null);
  let textInputMateria = useRef(null);

  const handleEditable = () => {
    setActiveEditable(!isActiveEditable);
  };

  const handleChangeUpdateTema = ev => {
    const isValue = ev.target.value;
    const capitValue = CapitalizeFirstLetter(isValue);
    setTema(capitValue);
    if (isValue.length >= 0) {
      setActiveTema(false);
    }
  };

  const handleChangeUpdateMateria = ev => {
    const isValue = ev.target.value;
    const capitValue = CapitalizeFirstLetter(isValue);
    setMateria(capitValue);
    if (isValue.length >= 0) {
      setActiveMateria(false);
    }
  };

  const handleSubmiteTema = () => {
    firestore
      .update(`notescornell/${docID}`, {
        tema: isTema,
        date: Date.now(),
      })
      .then(() => {
        setActiveTema(true);
      })
      .catch(error => console.log(error));
  };

  const handleSubmiteMateria = () => {
    firestore
      .update(`notescornell/${docID}`, {
        materia: isMateria,
        date: Date.now(),
      })
      .then(() => {
        setActiveMateria(true);
      })
      .catch(error => console.log(error));
  };

  const handleOpenPoprever = () => {
    setOpenPortada(!isOpenPortada);
    setActivePopever(!isActivePopever);
  };

  const cssActiveEditable = isActiveEditable && classes.activeBtnEditable;
  const cssActivePopever = isActivePopever && classes.activeBtnPopever;

  return (
    <div className={classes.LayoutHeader}>
      <div className="row">
        <div className="col-10">
          {isActiveEditable ? (
            <div className={classes.BoxHeadingForm}>
              <div className={classes.GroupForm}>
                <InputBtnUpdate
                  label="Tema"
                  onChange={handleChangeUpdateTema}
                  onClick={handleSubmiteTema}
                  ActiveBtn={isActiveTema}
                  onValue={isTema}
                  onRef={ref => (textInputTema = ref)}
                  onFocus={() => (textInputTema.value = '')}
                />
                <InputBtnUpdate
                  label="Materia"
                  onChange={handleChangeUpdateMateria}
                  onClick={handleSubmiteMateria}
                  ActiveBtn={isActiveMateria}
                  onValue={isMateria}
                  onRef={ref => (textInputMateria = ref)}
                  onFocus={() => (textInputMateria.value = '')}
                />
              </div>
              <button
                type="button"
                onClick={handleEditable}
                className={[classes.btnEditable, cssActiveEditable].join(' ')}>
                <i className="bx bx-pencil" />
              </button>
            </div>
          ) : (
            <div className={classes.BoxHeadingConfirm}>
              <Header tema={isTema} materia={isMateria} date={date} />
              <button
                type="button"
                onClick={handleEditable}
                className={[classes.btnEditable, cssActiveEditable].join(' ')}>
                <i className="bx bx-pencil" />
              </button>
            </div>
          )}
        </div>
        <div className="col-2">
          <div className={classes.boxButtons}>
            <button
              type="button"
              onClick={handleOpenPoprever}
              className={[classes.btnPoprever, 'mr-1', cssActivePopever].join(
                ' '
              )}>
              <i className="bx bx-image" />
            </button>
            <button type="button" onClick={onFavorite} className="mr-1">
              {favorite ? (
                <i className="bx bxs-bookmark" />
              ) : (
                <i className="bx bx-bookmark" />
              )}
            </button>
            <button type="button" onClick={onDelete}>
              <i className="bx bx-trash-alt" />
            </button>
            {isOpenPortada && (
              <div className={classes.OpenPopever}>
                <NoteCornellPortada ID={docID} tema={tema} portada={portada} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(['notescornell']),
  connect(state => ({
    notescornell: state.firestore.data.notescornell,
  }))
)(NoteCornellHeader);
