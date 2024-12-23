import styles from './common.module.css';

export function Analytics() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>Analytics content will go here</p>
      </div>
    </div>
  );
}