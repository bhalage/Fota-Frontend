import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";

const { Content } = AntLayout;

const Layout = () => {

  return (
    <AntLayout style={{ minHeight: "100vh" }}>

      <ErrorBoundary>
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
          <Header />
        </div>

        <AntLayout style={{ marginTop: 45, position: "fixed", top: 0, bottom: 3, left: 0, right: 0 }}>
          <Sidebar />

          <Content
            style={{
              padding: 5,
              margin: 0,
              minHeight: "calc(100vh - 64px)",
              overflow: "auto",
              background: "#fff",
            }}
          >
            <Outlet />
          </Content>
        </AntLayout>
      </ErrorBoundary>
    </AntLayout>
  );
};

export default Layout;
