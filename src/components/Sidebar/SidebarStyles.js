import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 110px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(139, 92, 246, 0.15);
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.5);

  &:hover {
    width: 320px;
    background: rgba(5, 5, 15, 0.95);
    border-right: 1px solid rgba(139, 92, 246, 0.25);
    box-shadow: 2px 0 30px rgba(139, 92, 246, 0.1);
  }

  @media (max-width: 768px) {
    display: none;

    &.open {
      display: block;
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 80px;
      width: 280px;
      z-index: 1100;
      background: rgba(0, 0, 0, 0.97);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(139, 92, 246, 0.2);
      transform: none;
      overflow-y: auto;
    }
  }
`;

export const Logo = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover { transform: scale(1.05); }

  .logo-icon {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: #ffffff;
    font-size: 0.85rem;
    letter-spacing: -0.5px;
    min-width: 42px;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
    transition: all 0.3s ease;
  }

  .logo-text {
    margin-left: 1.5rem;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    transform: translateX(-15px);

    span {
      font-size: 1.6rem;
      font-weight: 900;
      color: #ffffff;
      display: block;
      letter-spacing: -0.8px;
    }

    small {
      font-size: 0.8rem;
      color: #8b5cf6;
      margin-top: 0.3rem;
      display: block;
      font-weight: 500;
    }
  }

  ${SidebarContainer}:hover & .logo-text {
    opacity: 1;
    transform: translateX(0);
  }

  ${SidebarContainer}:hover & .logo-icon {
    box-shadow: 0 6px 25px rgba(139, 92, 246, 0.6);
  }
`;

export const NavSection = styled.nav`
  flex: 1;
  padding: 0 1rem;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.3rem 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    transform: scaleY(0);
    transition: transform 0.3s ease;
    border-radius: 0 3px 3px 0;
  }

  ${props => props.active === "true" && `
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);

    &::before { transform: scaleY(1); }

    svg, span { color: #c4b5fd !important; }
  `}

  &:hover {
    background: ${props => props.active === "true"
      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)'
      : 'rgba(139, 92, 246, 0.1)'};
    transform: translateX(3px);

    &::before { transform: scaleY(0.8); }
  }
`;

export const NavIcon = styled.div`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.3rem;
`;

export const NavText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-left: 1.2rem;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  transform: translateX(-10px);

  ${SidebarContainer}:hover & {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    ${SidebarContainer}.open & {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const UserSection = styled.div`
  margin-top: auto;
  padding: 1rem 0.5rem;
  border-top: 1px solid rgba(139, 92, 246, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 700;
  margin: 0 auto 1rem;
  box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
`;

export const UserInfo = styled.div`
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;

  ${SidebarContainer}:hover & { opacity: 1; }
`;

export const UserName = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
`;

export const UserRole = styled.div`
  font-size: 0.7rem;
  color: #8b5cf6;
`;
