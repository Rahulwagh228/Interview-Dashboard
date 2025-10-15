import React from 'react';
import styles from './InfoCard.module.scss';

interface InfoCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface InfoRowProps {
  icon: string;
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, className }) => {
  return (
    <div className={styles.infoRow}>
      <span className={styles.label}>
        <span className={styles.labelIcon}>{icon}</span>
        {label}
      </span>
      <span className={`${styles.value} ${className || ''}`}>
        {value}
      </span>
    </div>
  );
};

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, className }) => {
  return (
    <div className={`${styles.infoCard} ${className || ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default InfoCard;