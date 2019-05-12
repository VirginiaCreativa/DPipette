import {
  GET_TIMELINE_VIDEO_DOC,
  GET_DURATION_VIDEO_DOC,
  GET_PAGE_HEIGHT_DOC,
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
