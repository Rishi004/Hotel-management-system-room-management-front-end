import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        clsName: "nav-text",
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <AiIcons.AiFillProfile />,
        clsName: "nav-text",
    },
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdIcons.MdDashboard />,
        clsName: "nav-text",
    },
    {
        title: "Booking",
        path: "/booking",
        icon: <BsIcons.BsBookmarkFill />,
        clsName: "nav-text",
    },
    {
        title: "Rooms",
        path: "/rooms",
        icon: <AiIcons.AiOutlineKey />,
        clsName: "nav-text",
    },
    {
        title: "Reports",
        path: "/reports",
        icon: <AiIcons.AiFillFile />,
        clsName: "nav-text",
    },
    {
        title: "Logout",
        path: "/logout",
        icon: <IoIcons.IoLogOutSharp />,
        clsName: "nav-text",
    },
];
