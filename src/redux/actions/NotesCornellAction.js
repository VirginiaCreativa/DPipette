import {
  SEARCH_NOTESCORNELL,
  FILTER_MATERIA_NOTESCORNELL,
  FILTER_ALL_NOTESCORNELL,
  FILTER_DATE_NOW_NOTESCORNELL,
  FILTER_DATE_YESTERDAY_NOTESCORNELL,
  FILTER_FAVORITE_NOTESCORNELL,
} from './Types';

export const SearchNotesCornell = payload => ({
  type: SEARCH_NOTESCORNELL,
  payload,
});

export const getFilterMateriaNC = payload => ({
  type: FILTER_MATERIA_NOTESCORNELL,
  payload,
});

export const getFilterAllNC = () => ({
  type: FILTER_ALL_NOTESCORNELL,
  all: '',
});

export const getFilterDateNowNC = payload => ({
  type: FILTER_DATE_NOW_NOTESCORNELL,
  payload,
});

export const getFilterDateYesterdayNC = payload => ({
  type: FILTER_DATE_YESTERDAY_NOTESCORNELL,
  payload,
});

export const getFilterFavoriteNC = payload => ({
  type: FILTER_FAVORITE_NOTESCORNELL,
  payload,
});
