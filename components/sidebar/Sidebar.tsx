"use client";
import React, { useEffect, useRef } from "react";
import style from "./sidebar.module.scss";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const path = usePathname();
  const tracker = useRef<HTMLDivElement>(null);
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
      title: "All Students",
      icon: "/icons/postDatailsIcon.svg",
      link: "allposts",
      role: ["Admin"],
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
        <div className={style.allRedirects} >
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