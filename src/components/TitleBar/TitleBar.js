import React from 'react';
import styled from 'styled-components';
import { FiMinus, FiMaximize, FiX } from 'react-icons/fi';

const TitleBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  -webkit-app-region: drag;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
`;

const TitleBarLeft = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  gap: 8px;
`;

const LogoDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
`;

const AppTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.5px;
`;

const TitleBarRight = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

const WindowButton = styled.button`
  width: 46px;
  height: 32px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    color: white;
  }

  &.close:hover {
    background: #e81123;
    color: white;
  }
`;

const TitleBar = () => {
  if (!window.electronAPI) return null;

  return (
    <TitleBarContainer>
      <TitleBarLeft>
        <LogoDot />
        <AppTitle>PhantomX</AppTitle>
      </TitleBarLeft>
      <TitleBarRight>
        <WindowButton onClick={() => window.electronAPI?.minimizeWindow()}>
          <FiMinus size={12} />
        </WindowButton>
        <WindowButton onClick={() => window.electronAPI?.maximizeWindow()}>
          <FiMaximize size={12} />
        </WindowButton>
        <WindowButton className="close" onClick={() => window.electronAPI?.closeWindow()}>
          <FiX size={12} />
        </WindowButton>
      </TitleBarRight>
    </TitleBarContainer>
  );
};

export default TitleBar;
