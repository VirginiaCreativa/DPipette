/* eslint-disable indent */
/* eslint-disable prettier/prettier */

import { SEARCH_SIGNIF } from '../actions/Types';

const initialState = {
  search: '',
};

const SearchSignificados = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SIGNIF: {
      return {
        ...state,
        search: action.payload,
      }
    }
    default:
      return state;
  }
}
export default SearchSignificados;
