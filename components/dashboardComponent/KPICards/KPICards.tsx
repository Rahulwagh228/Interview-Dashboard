'use client'
import React from 'react';
import styles from './KPICards.module.scss';
import { Calendar, Star, UserX, TrendingUp,} from 'lucide-react';

interface KPICardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo';
}

interface KPICardsProps {
  data?: KPICardData[];
}

const defaultKPIData: KPICardData[] = [
  {
    title: 'Interviews Scheduled',
    value: 12,
    icon: <Calendar size={24} />,
    trend: { value: 8.5, isPositive: true },
    color: 'blue'
  },
  {
    title: 'Avg Score',
    value: 4.2,
    icon: <Star size={24} />,
    trend: { value: 2.1, isPositive: true },
    color: 'green'
  },
  {
    title: 'No-Shows',
    value: 3,
    icon: <UserX size={24} />,
    trend: { value: 12.3, isPositive: false },
    color: 'red'
  }
];

const KPICards: React.FC<KPICardsProps> = ({ data = defaultKPIData }) => {
  return (
    <div className={styles.kpiContainer}>
      {data.map((kpi, index) => (
        <div key={index} className={`${styles.kpiCard} ${styles[kpi.color]}`}>
          <div className={styles.kpiHeader}>
            <div className={styles.iconWrapper}>
              {kpi.icon}
            </div>
            {kpi.trend && (
              <div className={`${styles.trend} ${kpi.trend.isPositive ? styles.positive : styles.negative}`}>
                <TrendingUp size={16} className={kpi.trend.isPositive ? '' : styles.trendDown} />
                <span>{kpi.trend.value}%</span>
              </div>
            )}
          </div>
          
          <div className={styles.kpiContent}>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={styles.kpiTitle}>{kpi.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;