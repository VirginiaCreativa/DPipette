import { SEARCH_NOTESCORNELL, FILTER_MATERIA_NOTESCORNELL } from './Types';

export const SearchNotesCornell = payload => ({
  type: SEARCH_NOTESCORNELL,
  payload,
});

export const FilterMateriaNC = payload => ({
  type: FILTER_MATERIA_NOTESCORNELL,
  payload,
});
