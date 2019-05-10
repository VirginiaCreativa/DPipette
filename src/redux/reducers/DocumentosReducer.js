import {
  GET_TIMELINE_VIDEO_DOC,
  GET_DURATION_VIDEO_DOC,
} from '../actions/Types';

const initialState = {
  timeline: 0,
  duration: 0,
};

const DocumentosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMELINE_VIDEO_DOC: {
      return {
        ...state,
        timeline: action.payload,
      };
    }
    case GET_DURATION_VIDEO_DOC: {
      return {
        ...state,
        duration: action.payload,
      };
    }
    default:
      return state;
  }
};
export default DocumentosReducer;
