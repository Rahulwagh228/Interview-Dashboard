import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./dashboard.module.scss";
import { useAuth } from "@/lib/useAuth";
import {LineGraphData} from "@/tempData";
import LineChart from "@/components/dashboardComponent/LineChart/LineChart";

const Page = () => {
  const Linedata = {
    labels: "months", // Using extracted month names
    datasets: [
      {
        label: "Selected Month",
        data: LineGraphData, // Using extracted user data
        borderColor: "#7f3a73",
        pointBackgroundColor: "#7f3a73",
        pointRadius: 5,
        fill: false, // Do not fill directly below this line
        borderWidth: 2,
        // tension:0.4,
      },
      {
        label: "Shaded Area",
        data: LineGraphData.map((value: any) => value - 1), // Simulating a gap for the shaded area
        backgroundColor: "#E4C9EE",
        borderColor: "transparent", // No visible line for this dataset
        // tension: 0.2,
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
