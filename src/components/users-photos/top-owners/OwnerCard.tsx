import { Eye } from 'lucide-react'
import type { Owner } from '../../../lib/types'
import { formatNumber } from '../../maps/clusters/utils'
import styles from './owner-card.module.css'

interface OwnerProps{
    owner: Owner
}

export function OnwerCard({ owner }: OwnerProps){
    return(
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={owner.bestPhoto.url}
                    className={styles.image}
                />
                <div className={styles.overlay}>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <Eye className={styles.icon} />
                            <span>{formatNumber(owner.bestPhoto.views)} visualizzazioni</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.profile}>
                    <img 
                        src={owner.avatarUrl}
                        alt={owner.name}
                        className={styles.avatar}
                    /> 
                    <div className={styles.details}>
                        <h3 className={styles.name}>{owner.name}</h3>
                        <p className={styles.totalPhotos}>
                            {formatNumber(owner.totalPhotos)} foto
                        </p>
                    </div>
                    <div className={styles.rank}>#{owner.rank}</div>
                </div>
            </div>
        </div>
    );
}
