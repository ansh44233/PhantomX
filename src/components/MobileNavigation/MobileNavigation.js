import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FiHome, FiSearch, FiBookmark, FiMusic,
  FiTrendingUp
} from 'react-icons/fi';

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(139, 92, 246, 0.2);
  padding: 0.5rem;
  z-index: 1000;
  display: none;

  @media (max-width: 768px) { display: block; }
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
  max-width: 400px;
  margin: 0 auto;
`;

const NavItem = styled.button`
  background: ${props => props.active === 'true' ? 'rgba(139, 92, 246, 0.2)' : 'transparent'};
  border: none;
  border-radius: 10px;
  padding: 0.65rem 0.5rem;
  color: ${props => props.active === 'true' ? '#a78bfa' : 'rgba(255, 255, 255, 0.5)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 56px;
  justify-content: center;

  &:hover {
    background: rgba(139, 92, 246, 0.15);
    color: #c4b5fd;
  }

  &:active { transform: scale(0.95); }

  svg { font-size: 1.2rem; }

  span {
    font-size: 0.65rem;
    font-weight: 500;
    text-align: center;
    line-height: 1;
  }
`;

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (window.electronAPI) return null;

  const navItems = [
    { icon: FiHome, text: 'Home', path: '/' },
    { icon: FiSearch, text: 'Search', path: '/search' },
    { icon: FiTrendingUp, text: 'Trending', path: '/trending' },
    { icon: FiBookmark, text: 'Library', path: '/library' },
    { icon: FiMusic, text: 'Music', path: '/music' }
  ];

  return (
    <NavigationContainer>
      <NavGrid>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            active={location.pathname === item.path ? 'true' : 'false'}
            onClick={() => navigate(item.path)}
          >
            <item.icon />
            <span>{item.text}</span>
          </NavItem>
        ))}
      </NavGrid>
    </NavigationContainer>
  );
};

export default MobileNavigation;
