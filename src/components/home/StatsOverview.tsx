import { Users, Camera, Eye, MessageCircle } from 'lucide-react';
import { StatCard } from './StatsCard';
import { YearlyChart } from '../charts/YearlyChart'; 
import { AccuracyChart } from '../charts/AccuracyChart'; 
import { formatNumber } from '../maps/clusters/utils'; 
import styles from '@/pages/analytics/analytics.module.css';
import common_styles from '@/pages/common.module.css';
import { Accuracy, AvgCommentsYear, AvgMdnComments, AvgMdnViews, AvgViewsYear, StatsOverviewProps, TotalCameraBrands, TotalRows, TotalUsers } from '@/lib/types';
import { RingProgress } from '../charts/RingProgress';

export function StatsOverview({
  totalRows,
  totalUsers,
  totalBrands,
  viewsStats,
  commentsStats,
  yearlyViews,
  yearlyComments,
  accuracyDistribution
}: StatsOverviewProps) {
  return (
    <div>
      <div className={common_styles.statsGrid}>
            <div className={common_styles.statCard}>
              <RingProgress
                value={100}
                label="Dataset Originale"
                count={1_523_034}
                color="#66BB6A"
              />
            </div>
            <div className={common_styles.statCard}>
              <RingProgress
                value={80}
                label="Dataset Filtrato"
                count={totalRows}
                color="#42A5F5"
              />
            </div>
          </div>
      <div className={styles.statsGridDashboard}>
        <StatCard
          title="Total Users"
          value={formatNumber(totalUsers)}
          icon={Users}
        />
        <StatCard
          title="Camera Brands"
          value={formatNumber(totalBrands)}
          icon={Camera}
        />
        <StatCard
          title="Media views"
          value={viewsStats.average_views.toFixed(2)}
          icon={Eye}
          subtitle={`Mediana: ${viewsStats.median_views}`}
        />
        <StatCard
          title="Media commenti"
          value={commentsStats.average_comments.toFixed(2)}
          icon={MessageCircle}
          subtitle={`Mediana: ${commentsStats.median_comments}`}
        />
      </div>
        <div className={styles.chartContainer}>
        <YearlyChart 
          viewsData={yearlyViews}
          commentsData={yearlyComments}
        />
        </div>
      </div>
  );
}
