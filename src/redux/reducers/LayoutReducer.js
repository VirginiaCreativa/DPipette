import { GET_OPEN_SETTING_LAYOUT } from '../actions/Types';

const initialState = {
  colorSetting: '#9ca7b4',
};

const SearchSignificados = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPEN_SETTING_LAYOUT: {
      return {
        ...state,
        colorSetting: action.payload,
      };
    }
    default:
      return state;
  }
};
export default SearchSignificados;
