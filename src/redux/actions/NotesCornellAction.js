import {
  SEARCH_NOTESCORNELL,
  FILTER_MATERIA_NOTESCORNELL,
  FILTER_ALL_NOTESCORNELL,
  FILTER_CATEGORIA_NOTESCORNELL,
  FILTER_DATE_NOTESCORNELL,
} from './Types';

export const SearchNotesCornell = payload => ({
  type: SEARCH_NOTESCORNELL,
  payload,
});

export const FilterMateria = payload => ({
  type: FILTER_MATERIA_NOTESCORNELL,
  payload,
});

export const FilterAll = () => ({
  type: FILTER_ALL_NOTESCORNELL,
  all: '',
});

export const FilteringCateg = payload => ({
  type: FILTER_CATEGORIA_NOTESCORNELL,
  payload,
});

export const FilterDate = payload => ({
  type: FILTER_DATE_NOTESCORNELL,
  payload,
});
