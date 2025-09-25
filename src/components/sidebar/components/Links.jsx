/* eslint-disable */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export function SidebarLinks(props) {
  let location = useLocation();
  const { routes } = props;

  const [openDropdown, setOpenDropdown] = useState(null);

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "/admin" || route.layout === "/auth" || route.layout === "/rtl") {
        // ✅ If route has children → show dropdown instead of normal link
        if (route.children) {
  const isOpen = openDropdown === route.name;
  return (
    <div key={index} className="mb-3">
      <div
        onClick={() => setOpenDropdown(isOpen ? null : route.name)}
        className="relative mb-3 flex cursor-pointer items-center px-8"
      >
        <span
          className={`${
            isOpen
              ? "font-bold text-brand-500 dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {route.icon ? route.icon : <DashIcon />}
        </span>
        <p
          className={`leading-1 ms-4 flex ${
            isOpen
              ? "font-bold text-navy-700 dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {route.name}
        </p>

        {/* DropDown Button*/}
        <span className="ml-auto">
          {isOpen ? (
            <MdKeyboardArrowUp className="h-5 w-5 text-gray-600 dark:text-white" />
          ) : (
            <MdKeyboardArrowDown className="h-5 w-5 text-gray-600 dark:text-white" />
          )}
        </span>
        {/* 👆 UNTIL HERE */}
      </div>


              {isOpen && (
                <ul className="ml-12">
                  {route.children.map((child, idx) => (
                    <Link key={idx} to={child.layout + "/" + child.path}>
                      <li
                        className={`my-[3px] cursor-pointer ${
                          activeRoute(child.path)
                            ? "font-bold text-brand-500 dark:text-white"
                            : "font-medium text-gray-600"
                        }`}
                      >
                        {child.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        // ✅ Normal link (unchanged from your code)
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8" key={index}>
                <span
                  className={`${
                    activeRoute(route.path)
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 flex ms-4 ${
                    activeRoute(route.path)
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
      return null;
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;
