import {
  CREATE_SIGNIFICADO,
  GET_UPLOADER_IMG,
  GET_UPLOADER_VIDEO_SENA,
  GET_UPLOADER_VIDEO_DESCRIP,
  SHOW_VISUAL_IMAGEN,
  SHOW_VISUAL_VIDEO,
  SHOW_VISUAL_MASEJEMPLO,
  HIDE_VISUAL_IMAGEN,
  HIDE_VISUAL_VIDEO,
  HIDE_VISUAL_MASEJEMPLO,
  ADD_UPLOADER_VIDEO_SENA,
  ADD_IMAGENES_FILES,
  ADD_UPLOADER_VIDEO_DESCRIP,
  DELETE_IMAGENES_FILES,
} from '../actions/Types';

const initialState = {
  word: '',
  imagenes: [],
  imgFiles: [],
  isVisibleImg: false,
  isVisibleVideo: false,
  isVisibleEjemplo: false,
  videoSena: '',
  videoSenaBlob: '',
  videoDescrip: '',
  videoDescripBlob: '',
};

export const createSignificadoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPLOADER_IMG:
      return {
        ...state,
        imagenes: state.imagenes.concat(action.payload),
      };
    case GET_UPLOADER_VIDEO_SENA:
      return {
        ...state,
        videoSenaBlob: action.payload,
      };
    case ADD_UPLOADER_VIDEO_SENA:
      return {
        ...state,
        videoSena: action.payload || '',
      };
    case SHOW_VISUAL_IMAGEN:
      return {
        ...state,
        isVisibleImg: action.isVisibleImagen,
      };
    case HIDE_VISUAL_IMAGEN:
      return {
        ...state,
        isVisibleImg: action.isVisibleImagen,
      };
    case SHOW_VISUAL_VIDEO:
      return {
        ...state,
        isVisibleVideo: action.isVisibleVideo,
      };
    case HIDE_VISUAL_VIDEO:
      return {
        ...state,
        isVisibleVideo: action.isVisibleVideo,
      };
    case CREATE_SIGNIFICADO:
      return {
        ...state,
        word: action.word,
      };
    case ADD_IMAGENES_FILES:
      return {
        ...state,
        imgFiles: state.imgFiles.concat(action.payload),
      };
    case DELETE_IMAGENES_FILES:
      console.log('ESTE =========>', action.index);
      return {
        ...state,
        imgFiles: state.imgFiles.filter(item => item !== action.index),
      };
    case GET_UPLOADER_VIDEO_DESCRIP:
      return {
        ...state,
        videoDescripBlob: action.payload,
      };
    case ADD_UPLOADER_VIDEO_DESCRIP:
      return {
        ...state,
        videoDescrip: action.payload || '',
      };
    case SHOW_VISUAL_MASEJEMPLO:
      return {
        ...state,
        isVisibleEjemplo: action.isVisibleEjemplo,
      };
    case HIDE_VISUAL_MASEJEMPLO:
      return {
        ...state,
        isVisibleEjemplo: action.isVisibleEjemplo,
      };
    default:
      return state;
  }
};
export default createSignificadoReducer;
