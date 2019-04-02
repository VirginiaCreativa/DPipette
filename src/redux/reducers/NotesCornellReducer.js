import {
  SEARCH_NOTESCORNELL,
  FILTER_MATERIA_NOTESCORNELL,
} from '../actions/Types';

const initialState = {
  search: '',
  materia: '',
};

const SearchNotesCornell = (state = initialState, action) => {
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
    default:
      return state;
  }
};
export default SearchNotesCornell;
