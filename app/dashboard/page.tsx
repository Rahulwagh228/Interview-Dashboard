import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./dashboard.module.scss";
import { useAuth } from "@/lib/useAuth";

const Page = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
     
    </div>
  );
};

export default Page;
