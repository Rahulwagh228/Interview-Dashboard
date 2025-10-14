import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./dashboard.module.scss";
import { useAuth } from "@/lib/useAuth";
import { LineGraphData, BarGraphData } from "@/tempData";
import LineChart from "@/components/dashboardComponent/LineChart/LineChart";
import BarChart from "@/components/dashboardComponent/BarChart/BarChart";
import KPICards from "@/components/dashboardComponent/KPICards/KPICards";

const Page = () => {
  // Extract data properly from the LineGraphData
  const processChartData = () => {
    if (!LineGraphData || LineGraphData.length === 0) {
      return { labels: [], data: [] };
    }

    const dataObject = LineGraphData[0];
    const labels = Object.keys(dataObject);
    const data = Object.values(dataObject).map(value => parseInt(value as string));

    return { labels, data };
  };

  // Extract data for BarChart
  const processBarData = () => {
    if (!BarGraphData || BarGraphData.length === 0) {
      return { labels: [], data: [] };
    }

    const dataObject = BarGraphData[0];
    const labels = Object.keys(dataObject);
    const data = Object.values(dataObject).map(value => parseInt(value as string));

    return { labels, data };
  };

  const { labels, data } = processChartData();
  const { labels: barLabels, data: barData } = processBarData();

  const Linedata = {
    labels: labels, // Using extracted month names
    datasets: [
      {
        label: "Monthly Users",
        data: data, // Using extracted user data
        borderColor: "#7f3a73",
        pointBackgroundColor: "#7f3a73",
        pointRadius: 5,
        fill: false, // Do not fill directly below this line
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Trend Area",
        data: data.map((value: number) => Math.max(0, value - 50)), // Create a lower trend line
        backgroundColor: "rgba(127, 58, 115, 0.1)",
        borderColor: "transparent", // No visible line for this dataset
        tension: 0.4,
        fill: true, // Fill the area below the line
        pointRadius: 0, // No points for the shaded area
      },
    ],
  };

  const Bardata = {
    labels: barLabels,
    datasets: [
      {
        label: "Quarterly Performance",
        data: barData,
        backgroundColor: "rgba(127, 58, 115, 0.8)",
        borderColor: "#7f3a73",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageSubtitle}>Welcome to your admin dashboard</p>
          </div>
          
          {/* KPI Cards Section */}
          <KPICards />
          
          <div className={styles.dashboardGrid}>
            <div className={styles.dashboardCard}>
              <h2>Welcome to Your Dashboard</h2>
              <p>This is your main dashboard area where you can manage your application.</p>
            </div>
            
            {/* Line Chart Section */}
            <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
              <h3>User Analytics</h3>
              <div className={styles.chartContainer}>
                {data.length > 0 ? (
                  <LineChart data={Linedata} />
                ) : (
                  <div className={styles.noData}>No chart data available</div>
                )}
              </div>
            </div>
            
            {/* Bar Chart Section */}
            <div className={`${styles.dashboardCard} ${styles.chartCard}`}>
              <h3>Quarterly Performance</h3>
              <div className={styles.chartContainer}>
                {barData.length > 0 ? (
                  <BarChart data={Bardata} />
                ) : (
                  <div className={styles.noData}>No chart data available</div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
