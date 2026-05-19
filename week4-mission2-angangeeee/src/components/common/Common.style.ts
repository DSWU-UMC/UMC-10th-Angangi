import styled from "styled-components";

// Header
export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;

  width: 100%;
  height: 72px;
  padding: 0 28px;

  background-color: #111;
  border-bottom: 1px solid #222;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const MenuButton = styled.button`
  border: none;
  background: none;
  color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.h1`
  margin: 0;
  color: #ff2ea6;
  font-size: 24px;
  font-weight: 800;
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const WelcomeText = styled.span`
  color: white;
  font-size: 14px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const NavButton = styled.button<{ $variant: "login" | "signup" }>`
  min-width: 72px;
  height: 36px;
  padding: 0 14px;

  border: ${({ $variant }) =>
    $variant === "login" ? "1px solid #ffffff" : "none"};
  border-radius: 8px;

  background-color: ${({ $variant }) =>
    $variant === "signup" ? "#ff2ea6" : "transparent"};

  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

// Sidebar
export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

    position: fixed;
    inset: 72px 0 0 0;
    z-index: 90;

    background: rgba(0, 0, 0, 0.5);
  }
`;

export const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: 200px;
  min-height: calc(100vh - 72px);
  padding: 28px 20px;

  background-color: #111;
  border-right: 1px solid #222;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    position: fixed;
    top: 72px;
    left: 0;
    z-index: 95;

    height: calc(100vh - 72px);

    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.25s ease;
  }
`;

export const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SidebarItem = styled.button`
  border: none;
  background: none;

  color: white;
  font-size: 15px;
  text-align: left;

  cursor: pointer;

  &:hover {
    color: #ff2ea6;
  }
`;

export const WithdrawButton = styled.button`
  border: none;
  background: none;

  color: white;
  font-size: 14px;
  text-align: left;

  cursor: pointer;

  &:hover {
    color: #ff2ea6;
  }
`;

// Modal
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.div`
  width: 320px;
  padding: 28px 24px;
  border-radius: 16px;
  background: white;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
  color: #111;
`;

export const Description = styled.p`
  margin: 0 0 24px;
  font-size: 15px;
  color: #555;
  line-height: 1.5;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: #ff2ea6;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;
