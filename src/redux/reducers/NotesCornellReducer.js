import {
  SEARCH_NOTESCORNELL,
  FILTER_MATERIA_NOTESCORNELL,
  FILTER_ALL_NOTESCORNELL,
  FILTER_DATE_NOTESCORNELL,
} from '../actions/Types';

const initialState = {
  search: '',
  materia: '',
  date: '',
  all: '',
  categoria: '',
};

const NotesCornellReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_NOTESCORNELL: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case FILTER_MATERIA_NOTESCORNELL:
      return {
        ...state,
        materia: action.payload,
      };
    case FILTER_ALL_NOTESCORNELL:
      return {
        ...state,
        materia: state.all,
        date: '',
      };
    case FILTER_DATE_NOTESCORNELL:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
export default NotesCornellReducer;
