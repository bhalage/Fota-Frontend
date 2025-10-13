import { useState, useEffect } from "react";
import {
  FaCarSide,
  FaThList,
  FaDatabase,
  FaChevronDown,
  FaChevronRight,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "antd";
import ApproveNotification from "./ApproveNotification";

const { Sider } = Layout;

const SidebarSection = ({ icon, title, children = [], routes, collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load open state from localStorage
  const [open, setOpen] = useState(() => {
    const savedState = localStorage.getItem(title);
    if (savedState !== null) return JSON.parse(savedState);
    // default open if current route is in children
    return routes?.children?.some((route) => route === location.pathname) || false;
  });

  useEffect(() => {
    // Save open state whenever it changes
    localStorage.setItem(title, JSON.stringify(open));
  }, [open, title]);

  // Keep section open if current route is inside its children
  useEffect(() => {
    if (routes?.children?.some((route) => route === location.pathname)) {
      setOpen(true);
    }
  }, [location.pathname, routes]);

  const handleToggleDropdown = () => {
    if (children.length > 0) {
      setOpen(!open);
    }
  };

  return (
    <div>
      {/* Parent Button */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center w-full px-2 py-2 text-gray-800 hover:bg-blue-200 rounded-md"
      >
        <span className="mr-3 text-blue-600">{icon}</span>
        <span className="flex-1 text-left font-medium">{title}</span>
        {children.length > 0 &&
          (open ? <FaChevronDown size={10} color="gray" /> : <FaChevronRight size={10} color="gray" />)}
      </button>

      {/* Dropdown Children */}
      {open && children.length > 0 && (
        <div className="mt-1 space-y-1 text-sm text-gray-600">
          {children.map((child, index) => {
            const route = routes?.children?.[index];
            const isActive = location.pathname === route;

            return (
              <div
                key={index}
                onClick={() => route && navigate(route)}
                className={`cursor-pointer py-2 pl-4  
                  hover:text-blue-950 hover:bg-blue-300
                  ${isActive ? "bg-blue-500 text-white font-semibold" : ""}`}
              >
                {child}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={220}
      theme="dark"
      style={{ minHeight: "100vh" }}
    >
      <div className="h-full w-full overflow-y-auto scrollbar-hide py-1 bg-gray-100">
        <div
          onClick={() => navigate("/fleet")}
          className={`text-black font-semibold mb-4 px-2 py-2 text-md flex items-center cursor-pointer 
            ${location.pathname === "/fleet" ? "bg-blue-500 text-white" : "bg-blue-300 hover:bg-blue-400"}`}
        >
          <FaCarSide className="mr-2" />
          {!collapsed && "Fleet"}
        </div>

        <nav className="space-y-1 font-semibold">
          <SidebarSection
            icon={<FaCarSide />}
            title={!collapsed ? "Vehicles" : ""}
            children={!collapsed ? ["All Vehicles"] : []}
            routes={{
              children: ["/vehicles"],
            }}
            collapsed={collapsed}
          />
          <SidebarSection
            icon={<FaThList />}
            title={!collapsed ? "Models" : ""}
            children={!collapsed ? ["Vehicle Models", "Model Variants", "ECU"] : []}
            routes={{
              children: ["/models", "/variants", "/ecu"],
            }}
            collapsed={collapsed}
          />
          <SidebarSection
            icon={<FaCloudDownloadAlt />}
            title={!collapsed ? "Deployments" : ""}
            children={!collapsed ? [
              // "Deployments",
               "Rollout", "Upload Binary"] : []}
            routes={{
              children: [
                // "/deployments",
                 "/rollout", "/uploadbinary"],
            }}
            collapsed={collapsed}
          />
           <SidebarSection
            icon={<FaThList />}
            title={!collapsed ? "Admin" : ""}
            children={!collapsed ? ["Approve Rollout"] : []}
            routes={{
              children: ["/admin"],
            }}
            collapsed={collapsed}
          />
        </nav>
      </div>
      <ApproveNotification/>
    </Sider>
  );
};

export default Sidebar;
