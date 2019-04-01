/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import CapitalizeFirstLetter from '../../../../scripts/CapitalizeFirstLetter';
import classes from './NoteCornellIdeas.module.scss';

import InputRadioIcon from '../../../UI/InputRadioIcon/InputRadioIcon';
import InputBtnAdd from '../../../UI/InputBtnAdd/InputBtnAdd';
import ItemsIdeas from './ItemsIdeas';
import Heading from '../UI/Heading';

const NoteCornellIdeas = ({
  importantes,
  preguntas,
  claves,
  notescornell,
  docID,
  firestore,
}) => {
  const [isActiveEditable, setActiveEditable] = useState(false);
  const [isBtnDisable, setBtnDisable] = useState(true);

  const [isTag, setTag] = useState('');
  const [isChangeTag, setChangeTag] = useState('');

  const [isActiveHeadingClaves, setActiveHeadingClaves] = useState(true);
  const [isActiveHeadingPreguntas, setActiveHeadingPreguntas] = useState(true);
  const [isActiveHeadingImports, setActiveHeadingImports] = useState(true);

  let textInputTag;

  useEffect(() => {
    const id = docID;
    const cantTagsClaves = notescornell[id].claves;
    const cantTagsPreg = notescornell[id].preguntas;
    const cantTagsImp = notescornell[id].importantes;
    if (cantTagsPreg.length === 0) {
      setActiveHeadingPreguntas(false);
    } else {
      setActiveHeadingPreguntas(true);
    }
    if (cantTagsClaves.length === 0) {
      setActiveHeadingClaves(false);
    } else {
      setActiveHeadingClaves(true);
    }
    if (cantTagsImp.length === 0) {
      setActiveHeadingImports(false);
    } else {
      setActiveHeadingImports(true);
    }
  }, [docID, notescornell]);

  const handleDeleteClaves = (index, item) => {
    const id = docID;
    const db = firestore;
    const ideasArry = notescornell[id].claves;
    db.update(`notescornell/${id}`, {
      claves: ideasArry.filter(delId => delId !== index),
    });
  };
  const handleDeletePreguntas = (index, item) => {
    const id = docID;
    const db = firestore;
    const preguntasArry = notescornell[id].preguntas;
    db.update(`notescornell/${id}`, {
      preguntas: preguntasArry.filter(delId => delId !== index),
    });
  };
  const handleDeleteImportantes = (index, item) => {
    const id = docID;
    const db = firestore;
    const arrayImportants = notescornell[id].importantes;
    db.update(`notescornell/${id}`, {
      importantes: arrayImportants.filter(delId => delId !== index),
    });
  };

  const handleCheckTags = ev => {
    setChangeTag(ev.target.value);
    if (ev.target.value === '') {
      setBtnDisable(true);
    }
  };
  const handleChangeValueTag = ev => {
    const { value } = ev.target;
    if (value.length >= 2) {
      setBtnDisable(false);
    }
    setTag(CapitalizeFirstLetter(value));
  };
  const handleSubmitUpdate = () => {
    const id = docID;
    const db = firestore;
    const arrayTags = notescornell[id][isChangeTag];
    db.update(`notescornell/${id}`, {
      [isChangeTag]: arrayTags.concat(isTag),
    });
    textInputTag.value = '';
    setBtnDisable(true);
  };

  const handleEditable = () => {
    setActiveEditable(!isActiveEditable);
  };
  return (
    <div className={classes.NoteCornellIdeas}>
      <Heading
        title="Ideas"
        onClick={handleEditable}
        onActive={isActiveEditable}
      />
      <div className={classes.boxGroup}>
        <div className={classes.BoxActiveEditable}>
          {isActiveEditable ? (
            <div className={classes.GroupForm}>
              <div className={classes.GroupCheckbox}>
                <InputRadioIcon
                  onValue="claves"
                  onChange={handleCheckTags}
                  typeIcon="bx-flag"
                  colorIcon="#10c78d"
                  label="Clave"
                />
                <InputRadioIcon
                  onValue="importantes"
                  onChange={handleCheckTags}
                  typeIcon="bx-star"
                  colorIcon="#f33d48"
                  label="Importante"
                />
                <InputRadioIcon
                  onValue="preguntas"
                  onChange={handleCheckTags}
                  typeIcon="bx-question-mark"
                  colorIcon="#925ae1"
                  label="Pregunta"
                />
              </div>
              <InputBtnAdd
                label=""
                onChange={handleChangeValueTag}
                onClick={handleSubmitUpdate}
                onRefInput={ref => (textInputTag = ref)}
                onDisabled={isBtnDisable}
              />
            </div>
          ) : null}
        </div>
        <div className={classes.BoxResultTag}>
          <ItemsIdeas
            titleTag="Claves"
            tags={claves}
            onDelete={handleDeleteClaves}
            onActive={isActiveHeadingClaves}
            iconType="bx-flag"
            colorIcon="#10c78d"
            colorTag="#00b77d"
            bgTag="#dbf7f6"
          />
          <ItemsIdeas
            titleTag="Importantes"
            tags={importantes}
            onDelete={handleDeleteImportantes}
            onActive={isActiveHeadingImports}
            iconType="bx-star"
            colorIcon="#f33d48"
            colorTag="#f33d48"
            bgTag="#ffefef"
          />
          <ItemsIdeas
            titleTag="Preguntas"
            tags={preguntas}
            onDelete={handleDeletePreguntas}
            onActive={isActiveHeadingPreguntas}
            iconType="bx-question-mark"
            colorIcon="#925ae1"
            colorTag="#7834d8"
            bgTag="#f4effd"
          />
        </div>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect(['notescornell']),
  withRouter,
  connect(state => ({
    notescornell: state.firestore.data.notescornell,
  }))
)(NoteCornellIdeas);
