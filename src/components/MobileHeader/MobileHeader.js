import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

const MobileHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: #ffffff;
    font-size: 0.75rem;
    letter-spacing: -0.5px;
  }

  .logo-text {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
  }
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.3);
    border-color: rgba(139, 92, 246, 0.5);
  }
`;

const MobileHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isWeb, setIsWeb] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkWeb = () => setIsWeb(!window.electronAPI);

    checkMobile();
    checkWeb();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || !isWeb) return null;

  return (
    <MobileHeaderContainer>
      <Logo>
        <div className="logo-icon">PX</div>
        <div className="logo-text">PhantomX</div>
      </Logo>
      <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </MenuButton>
    </MobileHeaderContainer>
  );
};

export default MobileHeader;
