import {
  SEARCH_NOTESCORNELL,
  FILTER_MATERIA_NOTESCORNELL,
  FILTER_ALL_NOTESCORNELL,
} from '../actions/Types';

const initialState = {
  search: '',
  materia: '',
  all: [],
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
        all: state.all.concat(action.payload),
      };
    default:
      return state;
  }
};
export default NotesCornellReducer;
