import {
  GET_TIMELINE_VIDEO_DOC,
  GET_DURATION_VIDEO_DOC,
  GET_PAGE_HEIGHT_DOC,
  SHOW_TAKER_MARKER_DOC,
  HIDE_TAKER_MARKER_DOC,
  GET_TIMELINE_SAME_DOC,
  GET_CHANGE_PAGE_GRID_DOC,
  FILTER_MATERIA_DOCUMENTOS,
  FILTER_ALL_DOCUMENTOS,
  FILTER_DATE_NOW_DOCUMENTOS,
  FILTER_DATE_YESTERDAY_DOCUMENTOS,
  FILTER_FAVORITE_DOCUMENTOS,
  SEARCH_DOCUMENTOS,
  SHOW_EDITABLE_DOC,
  HAS_PAGE_DOC,
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

export const getFilterMateriaDoc = payload => ({
  type: FILTER_MATERIA_DOCUMENTOS,
  payload,
});

export const getFilterAllDoc = () => ({
  type: FILTER_ALL_DOCUMENTOS,
  all: '',
});

export const getFilterDateNowDoc = payload => ({
  type: FILTER_DATE_NOW_DOCUMENTOS,
  payload,
});

export const getFilterDateYesterdayDoc = payload => ({
  type: FILTER_DATE_YESTERDAY_DOCUMENTOS,
  payload,
});

export const getFilterFavoriteDoc = payload => ({
  type: FILTER_FAVORITE_DOCUMENTOS,
  payload,
});

export const SearchDocumentos = payload => ({
  type: SEARCH_DOCUMENTOS,
  payload,
});

export const showEditableDoc = payload => ({
  type: SHOW_EDITABLE_DOC,
  payload,
});

export const hasPageDoc = payload => ({
  type: HAS_PAGE_DOC,
  payload,
});
