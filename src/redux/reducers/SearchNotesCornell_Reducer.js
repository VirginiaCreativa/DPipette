import { SEARCH_NOTESCORNELL } from '../actions/Types';

const initialState = {
  search: '',
};

const SearchNotesCornell = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_NOTESCORNELL: {
      return {
        ...state,
        search: action.payload,
      };
    }
    default:
      return state;
  }
};
export default SearchNotesCornell;
