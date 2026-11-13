import styled from 'styled-components';

export const NavbarContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: var(--background);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 2rem;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: var(--primary);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: var(--background);
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
  }
  
  .logo-text {
    margin-left: 0.75rem;
    
    span {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--foreground);
      display: block;
      letter-spacing: -0.5px;
    }
    
    small {
      font-size: 0.7rem;
      color: var(--foreground-subtle);
      display: block;
      font-weight: 500;
    }
  }
  
  @media (max-width: 768px) {
    .logo-text small {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .logo-text {
      display: none;
    }
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.active ? 'var(--background-light)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'var(--border-hover)' : 'transparent'};
  
  &:hover {
    background: var(--background-light);
    border-color: var(--border-hover);
  }
`;

export const NavIcon = styled.div`
  font-size: 1.1rem;
  color: var(--foreground);
  display: flex;
  align-items: center;
`;

export const NavText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--foreground);
  margin-left: 0.5rem;
  white-space: nowrap;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 220px;
  background: var(--background-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  color: var(--foreground);
  background: ${props => props.active ? 'var(--background-light)' : 'transparent'};
  
  &:hover {
    background: var(--background-light);
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--background);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--foreground);
`;

export const UserRole = styled.div`
  font-size: 0.7rem;
  color: var(--foreground-subtle);
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--foreground);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: var(--background-alt);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

export const MobileNavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  color: var(--foreground);
  border-left: 3px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  background: ${props => props.active ? 'var(--background-light)' : 'transparent'};
  
  &:hover {
    background: var(--background-light);
  }
`;