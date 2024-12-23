import { MapView } from '../components/map/MapView';
import styles from './common.module.css';

export function MapPage() {
  return (
    <div className={styles.container}>
      <div>
        <h2>Distribuzione delle foto</h2>
      </div>
      <div className={styles.mapWrapper}>
        <MapView />
      </div>
    </div>
  );
}
