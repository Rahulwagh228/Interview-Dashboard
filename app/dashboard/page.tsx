import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./dashboard.module.scss";
import { useAuth } from "@/lib/useAuth";

const Page = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome to your admin dashboard</p>
          </div>
          
          <div className={styles.dashboardGrid}>
            <div className={styles.dashboardCard}>
              <h2>Welcome to Your Dashboard</h2>
              <p>This is your main dashboard area where you can manage your application. Navigate through different sections using the sidebar.</p>
            </div>
            
            <div className={styles.dashboardCard}>
              <h3>Quick Stats</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>150</span>
                  <span className={styles.statLabel}>Total Students</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>25</span>
                  <span className={styles.statLabel}>Active Interviews</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>12</span>
                  <span className={styles.statLabel}>TAs</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>5</span>
                  <span className={styles.statLabel}>Pending Reviews</span>
                </div>
              </div>
            </div>
            
            <div className={styles.dashboardCard}>
              <h3>Recent Activity</h3>
              <ul className={styles.activityList}>
                <li>New student registered 5 minutes ago</li>
                <li>Interview scheduled for John Doe</li>
                <li>TA application submitted</li>
                <li>System backup completed</li>
                <li>New panel assignment created</li>
              </ul>
            </div>
            
            <div className={styles.dashboardCard}>
              <h3>System Status</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>99.9%</span>
                  <span className={styles.statLabel}>Uptime</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>2.1s</span>
                  <span className={styles.statLabel}>Avg Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
