import Loadable from 'react-loadable';
import Spinner from '../components/UI/Spinner/Spinner';

const Significados = Loadable({
  loader: () =>
    import('../components/Significados/SiginificadosHome/SiginificadosHome'),
  loading: Spinner,
});

const NotesCornell = Loadable({
  loader: () =>
    import('../components/NotesCornell/NotesCornellHome/NotesCornellHome'),
  loading: Spinner,
});

const Documentos = Loadable({
  loader: () => import('../components/Documentos/Documento/Documento'),
  loading: Spinner,
});

export { Significados, NotesCornell, Documentos };
