import { useState } from 'react';
import styles from './cluster-control.module.css';

interface ClusterControlsProps {
    k: number;
    setK: React.Dispatch<React.SetStateAction<number>>;
  }

export function ClusterControls({ k, setK }: ClusterControlsProps) {
    const [tempValue, setTempValue] = useState(k); // Valore temporaneo per il cursore
  
    const handleVisualizza = () => {
      setK(tempValue); // Aggiorna il valore di k effettivo
      console.log('Numero di cluster selezionato:', tempValue);
    };
  
    return (
      <div className={styles.controls}>
        <div className={styles.sliderGroup}>
          <span className={styles.label}>Numero di clusters:</span>
          <input
            type="range"
            min={3}
            max={10}
            value={tempValue}
            onChange={(e) => setTempValue(parseInt(e.target.value))} // Aggiorna il valore temporaneo
            className={styles.slider}
          />
          <span className={styles.value}>{tempValue}</span>
        </div>
        <button onClick={handleVisualizza} className={styles.button}>
          Visualizza
        </button>
      </div>
    );
  }
  