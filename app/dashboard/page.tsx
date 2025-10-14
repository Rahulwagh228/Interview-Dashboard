import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./dashboard.module.scss";
import { useAuth } from "@/lib/useAuth";
import { LineGraphData } from "@/tempData";
import LineChart from "@/components/dashboardComponent/LineChart/LineChart";

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

  const { labels, data } = processChartData();

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

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.linechartDiv}>
        {LineGraphData && <LineChart data={Linedata} />}
      </div>
    </div>
  );
};

export default Page;
