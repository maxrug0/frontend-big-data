import { ClusterMapView } from '../../components/maps/clusters/ClusterMapView';
import styles from '../common.module.css';
import map_styles from './map.module.css';

export function Clusters() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mappa dei Cluster: Analisi Geografica</h2>
      </div>
      <hr></hr>
      <div>
        <p className={styles.text}>
        Esplora la distribuzione geografica dei dati attraverso i cluster.<br />
        Ogni cerchio rappresenta un cluster che aggrega informazioni basate sulla posizione geografica, 
        fornendo una visione chiara delle aree con maggiore concentrazione di dati.
        </p>
      </div>
      <div className={map_styles.mapWrapper}>
        <ClusterMapView />
      </div>
    </div>
  );
}
