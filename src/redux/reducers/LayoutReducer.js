import { ACTIVE_SETTING_LAYOUT, GET_ON_SETTING } from '../actions/Types';

const initialState = {
  colorSetting: '#9ca7b4',
  onSetting: false,
};

const SearchSignificados = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_SETTING_LAYOUT: {
      return {
        ...state,
        colorSetting: action.payload,
      };
    }
    case GET_ON_SETTING: {
      return {
        ...state,
        onSetting: action.payload,
      };
    }
    default:
      return state;
  }
};
export default SearchSignificados;
