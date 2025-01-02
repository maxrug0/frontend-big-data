import styles from './owner-card.module.css'
import { formatNumber } from "@/components/maps/clusters/utils";
import { OwnerSearched } from "@/lib/types";
import { Camera, Eye, MessageCircleMore } from "lucide-react";

interface OwnerStatsProps{
    owner: OwnerSearched;
}

export function OwnerStats({ owner }: OwnerStatsProps){
    return (
        <div className={styles.stats}>
            <div className={styles.name}>{owner.name}</div>
            <div className={styles.statItem}>
                <Camera className={styles.icon} />
                <span>{formatNumber(owner.totalPhotos)} foto</span>
            </div>
            <div className={styles.statItem}>
                <Eye className={styles.icon} />
                <span>{formatNumber(owner.totalViews)} visualizzazioni</span>
            </div>
            <div className={styles.statItem}>
                <MessageCircleMore className={styles.icon} />
                <span>{formatNumber(owner.totalComments)} Commenti</span>
            </div>
        </div>
    )
}
