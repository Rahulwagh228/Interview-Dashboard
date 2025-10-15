import React from 'react'
import Link from 'next/link'
import styles from './page.module.scss'

const page = () => {
  return (
    <div className={styles.homepage}>
      {/* Background with overlay */}
      <div className={styles.backgroundContainer}>
      </div>

      {/* Floating animated icons */}
      <div className={styles.floatingIcons}>
        <div className={`${styles.icon} ${styles.icon1}`}>⭐</div>
        <div className={`${styles.icon} ${styles.icon2}`}>💼</div>
        <div className={`${styles.icon} ${styles.icon3}`}>🚀</div>
        <div className={`${styles.icon} ${styles.icon4}`}>💡</div>
        <div className={`${styles.icon} ${styles.icon5}`}>🎯</div>
        <div className={`${styles.icon} ${styles.icon6}`}>📈</div>
        <div className={`${styles.icon} ${styles.icon7}`}>⚡</div>
        <div className={`${styles.icon} ${styles.icon8}`}>🌟</div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.heroSection}>
          <h1 className={styles.mainHeading}>
            "No employee is perfect at first — when you start giving chances, they become your best hire."
          </h1>
          
          <p className={styles.subText}>
            Discover potential, nurture talent, and build exceptional teams
          </p>

          <Link href="/login" className={styles.loginButton}>
            <span className={`${styles.buttonText} text-gray-700`}>Login to see Dashboard</span>
            <div className={styles.buttonGlow}></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page