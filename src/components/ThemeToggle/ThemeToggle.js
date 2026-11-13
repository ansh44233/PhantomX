import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  background: ${props => props.theme === 'dark' ? 'var(--background-light)' : 'var(--background-alt)'};
  border: 2px solid ${props => props.theme === 'dark' ? 'var(--border-hover)' : 'var(--border)'};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 60px;
  height: 30px;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px var(--primary);
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  
  svg {
    color: ${props => props.theme === 'dark' ? '#f8e3a1' : '#f88748'};
    &:first-child {
      transform: ${props => props.theme === 'dark' ? 'translateY(0)' : 'translateY(100px)'};
      transition: transform 0.3s ease;
    }
    &:last-child {
      transform: ${props => props.theme === 'dark' ? 'translateY(100px)' : 'translateY(0)'};
      transition: transform 0.3s ease;
    }
  }
`;

const ToggleThumb = styled(motion.div)`
  background-color: var(--primary);
  border-radius: 50%;
  height: 20px;
  left: 5px;
  position: absolute;
  top: 5px;
  width: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ThemeToggle = ({ toggleTheme, currentTheme, ...props }) => {
  return (
    <ToggleContainer onClick={toggleTheme} theme={currentTheme} {...props}>
      <Icons theme={currentTheme}>
        <FiSun size={12} />
        <FiMoon size={12} />
      </Icons>
      <ToggleThumb 
        animate={{ 
          x: currentTheme === 'dark' ? 0 : 30
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </ToggleContainer>
  );
};

export default ThemeToggle;