import { MapView } from '../../components/maps/deckgl/MapView';
import styles from '../common.module.css';
import map_styles from './map.module.css';

export function SpatialPosts() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mappa delle Foto Geotaggate: Analisi Visiva</h2>
      </div>
      <hr></hr>
      <div>
        <p className={styles.text}>
          Esplora la distribuzione geografica dei post di Flickr con foto geotaggate.<br />
          Ogni esagono rappresenta un'area che aggrega le foto pubblicate, 
          permettendoti di scoprire i luoghi più documentati e popolari.
        </p>
      </div>
      <div className={map_styles.mapWrapper}>
        <MapView />
      </div>
    </div>
  );
}
