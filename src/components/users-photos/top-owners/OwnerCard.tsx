import type { OwnerSearched } from '../../../lib/types'
import { CameraStats } from '@/components/charts/RadarChart';
import styles from './owner-card.module.css'
import { OwnerStats } from './OwnerStats';
import { PhotoDisplay } from './PhotoDisplay';

interface OwnerProps{
    owner: OwnerSearched
}

export function OnwerCard({ owner }: OwnerProps){
    return(
        <div className={styles.card}>
            <div className={styles.rank}>
                #{owner.rank}
            </div>
            <div className={styles.topRow}>
                <div className={styles.userInfo}>
                    <img
                        src={owner.avatarUrl}
                        alt={owner.name}
                        className={styles.avatar}
                    />
                    <OwnerStats owner={owner} />
                </div>
                <div className={styles.chartSection}>
                    <CameraStats cameraStats={owner.cameraInfo}/>
                </div>
            </div>
            <div className={styles.bottomoRow}>
                <PhotoDisplay photo={owner.bestPhoto}/>
            </div>
        </div>
    );
}
