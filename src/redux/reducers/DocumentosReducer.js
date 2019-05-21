import {
  GET_TIMELINE_VIDEO_DOC,
  GET_DURATION_VIDEO_DOC,
  GET_PAGE_HEIGHT_DOC,
  SHOW_TAKER_MARKER_DOC,
  HIDE_TAKER_MARKER_DOC,
  GET_TIMELINE_SAME_DOC,
  GET_CHANGE_PAGE_GRID_DOC,
  GET_VIDE_DOC,
} from '../actions/Types';

const initialState = {
  timeline: 0,
  duration: 0,
  pageHeight: 0,
  viewTakeTimeline: false,
  timelineSame: null,
  pageGrid: true,
  hasVideo: false,
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
    case GET_PAGE_HEIGHT_DOC: {
      return {
        ...state,
        pageHeight: action.payload,
      };
    }
    case SHOW_TAKER_MARKER_DOC: {
      return {
        ...state,
        viewTakeTimeline: action.viewTakeTimeline,
      };
    }
    case HIDE_TAKER_MARKER_DOC: {
      return {
        ...state,
        viewTakeTimeline: action.viewTakeTimeline,
      };
    }
    case GET_TIMELINE_SAME_DOC: {
      return {
        ...state,
        timelineSame: action.payload,
      };
    }
    case GET_CHANGE_PAGE_GRID_DOC: {
      return {
        ...state,
        pageGrid: action.payload,
      };
    }
    case GET_VIDE_DOC: {
      return {
        ...state,
        hasVideo: action.payload,
      };
    }
    default:
      return state;
  }
};
export default DocumentosReducer;
