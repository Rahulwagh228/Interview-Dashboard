import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./dashboard.module.scss";

const page = () => {
  return (
    <>
      <div className={styles.dashboardContainer}>
      <Sidebar />

      </div>
    </>
  );
};

export default page;
