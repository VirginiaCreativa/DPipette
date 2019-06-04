import {
  CREATE_SIGNIFICADO,
  GET_UPLOADER_IMG,
  GET_UPLOADER_VIDEO_SENA,
  GET_UPLOADER_VIDEO_DESCRIP,
  ADD_UPLOADER_VIDEO_SENA,
  ADD_UPLOADER_VIDEO_DESCRIP,
  ADD_IMAGENES_FILES,
  SHOW_VISUAL_IMAGEN,
  SHOW_VISUAL_VIDEO,
  SHOW_VISUAL_MASEJEMPLO,
  HIDE_VISUAL_IMAGEN,
  HIDE_VISUAL_VIDEO,
  HIDE_VISUAL_MASEJEMPLO,
  DELETE_IMAGENES_FILES,
  SEARCH_SIGNIF,
} from './Types';

export const getCreateSignificado = payload => ({
  type: CREATE_SIGNIFICADO,
  word: payload,
});

export const getUploaderImg = payload => ({
  type: GET_UPLOADER_IMG,
  payload,
});

export const getUploaderVideoSena = payload => ({
  type: GET_UPLOADER_VIDEO_SENA,
  payload,
});

export const addUploaderVideoSena = payload => ({
  type: ADD_UPLOADER_VIDEO_SENA,
  payload,
});

export const getUploaderVideoDescrip = payload => ({
  type: GET_UPLOADER_VIDEO_DESCRIP,
  payload,
});

export const addUploaderVideoDescrip = payload => ({
  type: ADD_UPLOADER_VIDEO_DESCRIP,
  payload,
});

export const showVisiblenImagenVisual = () => ({
  type: SHOW_VISUAL_IMAGEN,
  isVisibleImagen: true,
});

export const hideVisiblenImagenVisual = () => ({
  type: HIDE_VISUAL_IMAGEN,
  isVisibleImagen: false,
});

export const showVisibleVideoVisual = () => ({
  type: SHOW_VISUAL_VIDEO,
  isVisibleVideo: true,
});

export const hideVisibleVideoVisual = () => ({
  type: HIDE_VISUAL_VIDEO,
  isVisibleVideo: false,
});

export const addImagenesFiles = payload => ({
  type: ADD_IMAGENES_FILES,
  payload,
});
export const deleteImagenesFiles = index => ({
  type: DELETE_IMAGENES_FILES,
  index,
});
export const showVisibleMasEjemploVisual = () => ({
  type: SHOW_VISUAL_MASEJEMPLO,
  isVisibleEjemplo: true,
});

export const hideVisibleMasEjemploVisual = () => ({
  type: HIDE_VISUAL_MASEJEMPLO,
  isVisibleEjemplo: false,
});

export const searchSignificados = payload => ({
  type: SEARCH_SIGNIF,
  payload,
});
