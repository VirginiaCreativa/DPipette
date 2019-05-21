import {
  GET_TIMELINE_VIDEO_DOC,
  GET_DURATION_VIDEO_DOC,
  GET_PAGE_HEIGHT_DOC,
  SHOW_TAKER_MARKER_DOC,
  HIDE_TAKER_MARKER_DOC,
  GET_TIMELINE_SAME_DOC,
  GET_CHANGE_PAGE_GRID_DOC,
  GET_VIDE_DOC,
} from './Types';

export const getTimelineVideoDoc = payload => ({
  type: GET_TIMELINE_VIDEO_DOC,
  payload,
});

export const getDurationVideoDoc = payload => ({
  type: GET_DURATION_VIDEO_DOC,
  payload,
});

export const getPageHeightDoc = payload => ({
  type: GET_PAGE_HEIGHT_DOC,
  payload,
});

export const isShowTakerMarkerDoc = () => ({
  type: SHOW_TAKER_MARKER_DOC,
  viewTakeTimeline: true,
});

export const isHideTakerMarkerDoc = () => ({
  type: HIDE_TAKER_MARKER_DOC,
  viewTakeTimeline: false,
});

export const getTimelineSame = payload => ({
  type: GET_TIMELINE_SAME_DOC,
  payload,
});

export const getChangePageGrid = payload => ({
  type: GET_CHANGE_PAGE_GRID_DOC,
  payload,
});

export const getVideoDoc = payload => ({
  type: GET_VIDE_DOC,
  payload,
});
