"use client";
import React, { useEffect, useRef } from "react";
import style from "./sidebar.module.scss";
import logo from "@/public/logo/whitelogo.svg";
import Image from "next/image";
import Link from "next/link";
import logoutIcon from "@/public/icons/logOutIcon.svg";
import { usePathname } from "next/navigation";
// import { useAuth } from "@/authentication/authentication";
import { useRouter } from "next/navigation";

const Page = () => {
  const path = usePathname();
//   const { getUserRole } = ;
  const tracker = useRef<HTMLDivElement>(null);
  const allRedirects = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname=usePathname()
  const list = [
    {
      title: "Dashboard",
      icon: "/icons/dashboardSidebar.svg",
      link: "dashboard",
      role: ["Admin"],
    },
    {
      title: "All Posts",
      icon: "/icons/postDatailsIcon.svg",
      link: "allposts",
      role: ["Admin"],
    },
    {
      title: "Users",
      icon: "/icons/users.svg",
      link: "alluser",
      role: ["Admin"],
    },
    {
      title: "Writers",
      icon: "/icons/writers.svg",
      link: "allwriters",
      role: ["Admin"],
    },
    {
      title: "Help",
      icon: "/icons/help.svg",
      link: "allHelp?tab=user",
      role: ["Admin"],
    },
    {
      title: "Transaction",
      icon: "/icons/transaction.svg",
      link: "allTransaction",
      role: ["Admin"],
    },
    {
      title: "Contact Us",
      icon: "/icons/contactus.svg",
      link: "contactus",
      role: ["Admin"],
    },
    {
      title: "New User",
      icon: "/icons/addUser.svg",
      link: "newUser",
      role: ["Admin"],
    },
    {
      title: "Errors",
      icon: "/icons/error.svg",
      link: "errors",
      role: ["Admin"],
    },
    {
      title: "UTM",
      icon: "/icons/utm.svg",
      link: "utm-manager",
      role: ["Admin"],
    },
    {
      title: "WriteyfyReady",
      icon: "/icons/marketplace.svg",
      link: "alllistings",
      role: ["Admin"],
    },
    {
      title: "Leaderboard",
      icon: "/icons/leaderboard.svg",
      link: "leaderboard",
      role: ["Admin"],
    },
    {
      title: "All Reviews",
      icon: "/icons/allreviews.svg",
      link: "reviews",
      role: ["Admin"],
    },
    {
      title: "PlagReports",
      icon: "/icons/plagCheck.svg",
      link: "plagReports",
      role: ["Admin", "HR"],
    }
  ];

//   const userRole = getUserRole() || "";
//   const filteredList = list.filter(item => item.role.includes(userRole));

//   useEffect(() => {
//     const currentPath = path.split("/").at(-1);
//     const currentIndex = filteredList.findIndex(item => item.link === currentPath)+1;
//     if (tracker.current && allRedirects.current && currentIndex !== -1) {
//       const itemElements = allRedirects.current.children;
//       if (itemElements.length > 0) {
//         const targetElement = itemElements[currentIndex] as HTMLElement;
//         const topPosition = targetElement.offsetTop;
//         tracker.current.style.top = `${topPosition}px`;
//       }
//     }
//   }, [path]);

  return (
    <div className={style.overFlowControl}>
      <div className={style.sideContainer}>
        <div className={style.logoName} onClick={()=>{
          router.push("/newadmin/dashboard")
        }}>
          <img src={"/adminassets/writeyfyWlogo.svg"} alt="" />
          <div className={style.absOverflow}>
            <div className={style.line}></div>
            <span>Admin</span>
          </div>
        </div>
        <div className={style.line}></div>
        <div className={style.allRedirects} ref={allRedirects}>
          <div className={style.tracker} ref={tracker}></div>
          {list.map((item, index) => (
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
                  <img src={item.icon} alt="" />
                  <span style={item.title === "WriteyfyReady" ? { color: "#eea828" } : {}}>{item.title}</span>
                </div>
              </abbr>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;