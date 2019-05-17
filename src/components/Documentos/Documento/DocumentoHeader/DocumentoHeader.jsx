import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from './Heading';

const DocumentoHeader = ({ materia, tema, documentos, ID }) => {
  const [isTema, setTema] = useState(tema);
  const [isMateria, setMateria] = useState(materia);

  return (
    <div>
      <Heading tema={isTema} materia={isMateria} />
    </div>
  );
};

export default compose(
  firestoreConnect(['notescornell']),
  connect(state => ({
    documento: state.firestore.data.documentos,
  }))
)(DocumentoHeader);
