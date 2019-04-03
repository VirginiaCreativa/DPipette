import {
  SEARCH_NOTESCORNELL,
  FILTER_MATERIA_NOTESCORNELL,
  FILTER_ALL_NOTESCORNELL,
} from './Types';

export const SearchNotesCornell = payload => ({
  type: SEARCH_NOTESCORNELL,
  payload,
});

export const FilterMateria = payload => ({
  type: FILTER_MATERIA_NOTESCORNELL,
  payload,
});

export const FilterAll = payload => ({
  type: FILTER_ALL_NOTESCORNELL,
  payload,
});
