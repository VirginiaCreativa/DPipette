import {
  GET_TIMELINE_VIDEO_DOC,
  GET_DURATION_VIDEO_DOC,
  GET_PAGE_HEIGHT_DOC,
  SHOW_TAKER_MARKER_DOC,
  HIDE_TAKER_MARKER_DOC,
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
