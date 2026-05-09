import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./common/Header";
import Sidebar from "./common/Sidebar";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name") ?? "";
  const isLoggedIn = Boolean(accessToken);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <PageWrapper>
      <Header
        isLoggedIn={isLoggedIn}
        name={name}
        onToggleSidebar={handleToggleSidebar}
        onLogout={handleLogout}
      />

      <ContentWrapper>
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #000;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  flex: 1;
  min-height: calc(100vh - 64px);
  padding: 32px 48px;
  background-color: #000;

  @media (max-width: 768px) {
    padding: 24px 18px;
  }
`;
