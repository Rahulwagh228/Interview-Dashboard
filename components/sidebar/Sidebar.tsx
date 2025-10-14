"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./sidebar.module.scss";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import LogoutModal from "./LogoutModal";

const Page = () => {
  const path = usePathname();
  const tracker = useRef<HTMLDivElement>(null);
  const allRedirects = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { getUserRole, getRoleDisplayName, getUserDisplayName, logout, isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Define navigation items with role-based access
  const navigationItems = [
    {
      title: "Dashboard",
      icon: "/icons/dashboardSidebar.svg",
      link: "dashboard",
      roles: ["ta_admin", "ta_member", "panelist"],
    },
    {
      title: "All Students",
      icon: "/icons/studentsIcon.svg",
      link: "students",
      roles: ["ta_admin", "ta_member"],
    },
    {
      title: "Interview Panel",
      icon: "/icons/panelIcon.svg",
      link: "panel",
      roles: ["panelist", "ta_admin"],
    },
     ];

  // Filter navigation items based on user role
  const userRole = getUserRole();
  const filteredList = navigationItems.filter(item => item.roles.includes(userRole));

  useEffect(() => {
    const currentPath = path.split("/").at(-1);
    const currentIndex = filteredList.findIndex(item => item.link === currentPath);
    if (tracker.current && allRedirects.current && currentIndex !== -1) {
      const itemElements = allRedirects.current.children;
      if (itemElements.length > 1) { // +1 because tracker is first child
        const targetElement = itemElements[currentIndex + 1] as HTMLElement;
        const topPosition = targetElement.offsetTop;
        tracker.current.style.top = `${topPosition}px`;
      }
    }
  }, [path, filteredList]);

  // Role-based heading configuration
  const getRoleBasedHeading = () => {
    switch (userRole) {
      case 'ta_admin':
        return {
          title: 'TA Admin Panel',
          subtitle: 'Administrative Dashboard'
        };
      case 'ta_member':
        return {
          title: 'TA Dashboard',
          subtitle: 'Teaching Assistant Portal'
        };
      case 'panelist':
        return {
          title: 'Interview Panel',
          subtitle: 'Panelist Dashboard'
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'User Portal'
        };
    }
  };

  const headingConfig = getRoleBasedHeading();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (!isAuthenticated()) {
    return null; // Don't render sidebar if not authenticated
  }

  return (
    <div className={style.overFlowControl}>
      <div className={style.sideContainer}>
        {/* Logo and Header */}
        <div className={style.logoName} onClick={() => {
          router.push("/dashboard")
        }}>
          <CircleUserRound size={24} color="white" />
          <div className={style.absOverflow}>
            <div className={style.line}></div>
            <span>{getRoleDisplayName()}</span>
          </div>
        </div>
        
        {/* User Info Section */}
        <div className={style.userInfo}>
          <div className={style.userName}>{getUserDisplayName()}</div>
          <div className={style.userRole}>{headingConfig.subtitle}</div>
        </div>
        
        <div className={style.line}></div>
        
        {/* Navigation Items */}
        <div className={style.allRedirects} ref={allRedirects}>
          <div className={style.tracker} ref={tracker}></div>
          {filteredList.map((item, index) => (
            <div
              key={index}
              className={`${style.logoWrapper} ${
                pathname.split("/").at(-1) === item.link ? style.active : ""
              }`}
            >
              <div className={style.indicatorline}></div>
              <abbr title={item.title}>
                <div
                  onClick={() => {
                    router.push(`/${item.link}`);
                  }}
                  className={style.logo}
                >
                  <img src={item.icon} alt={item.title} />
                  <span>{item.title}</span>
                </div>
              </abbr>
            </div>
          ))}
        </div>
        
        {/* Logout Button - Fixed at bottom */}
        <div className={style.logoutSection}>
          <div className={style.logoWrapper}>
            <div className={style.indicatorline}></div>
            <abbr title="Logout">
              <div
                onClick={handleLogout}
                className={`${style.logo} ${style.logoutButton}`}
              >
                <LogOut size={20} color="#ff6b6b" />
                <span>Logout</span>
              </div>
            </abbr>
          </div>
        </div>
      </div>
      
      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        userName={getUserDisplayName()}
      />
    </div>
  );
};

export default Page;