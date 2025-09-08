import React from "react";
import { Breadcrumb } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // split pathname → e.g. "/rollout/new" → ["rollout", "new"]
  if (location.pathname === "/rollout") {
    return null;
 }
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSnippets.length - 1;

    return {
      title: (
        <span
          className={`cursor-pointer ${isLast ? "font-semibold" : "text-blue-600"}`}
          onClick={() => !isLast && navigate(url)}
        >
          {snippet.charAt(0).toUpperCase() + snippet.slice(1)}
        </span>
      ),
    };
  });

  return <Breadcrumb items={breadcrumbItems} className="mb-4 px-4 py-2" />;
};

export default Breadcrumbs;
