import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome, FiSearch, FiBookmark, FiSettings,
  FiTrendingUp, FiStar, FiClock, FiGrid, FiPlay, FiHeart,
  FiMusic
} from 'react-icons/fi';
import {
  SidebarContainer, Logo, NavSection, NavItem, NavIcon,
  NavText, UserSection, UserAvatar, UserInfo, UserName,
  UserRole
} from './SidebarStyles';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  const navItems = [
    { icon: FiHome, text: 'Home', path: '/' },
    { icon: FiSearch, text: 'Search', path: '/search' },
    { icon: FiTrendingUp, text: 'Trending', path: '/trending' },
    { icon: FiStar, text: 'Top Rated', path: '/top-rated' },
    { icon: FiGrid, text: 'Categories', path: '/categories' },
    { icon: FiBookmark, text: 'My Library', path: '/library' },
    { icon: FiMusic, text: 'Music', path: '/music' },
    { icon: FiClock, text: 'Continue Watching', path: '/continue' },
    { icon: FiPlay, text: 'Watch History', path: '/history' },
    { icon: FiHeart, text: 'Favorites', path: '/favorites' },
    { icon: FiSettings, text: 'Settings', path: '/settings' }
  ];

  return (
    <SidebarContainer
      as={motion.aside}
      initial={{ x: -60 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={sidebarOpen ? 'open' : ''}
    >
      <Logo>
        <div className="logo-icon">PX</div>
        <div className="logo-text">
          <span>PhantomX</span>
          <small>by Ansh</small>
        </div>
      </Logo>

      <NavSection>
        {navItems.map((item, index) => (
          <NavItem
            key={item.path}
            as={motion.div}
            whileTap={{ scale: 0.95 }}
            active={location.pathname === item.path ? "true" : "false"}
            onClick={() => handleNavigation(item.path)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavIcon as={item.icon} />
            <NavText>{item.text}</NavText>
          </NavItem>
        ))}
      </NavSection>

      <UserSection>
        <UserAvatar>A</UserAvatar>
        <UserInfo>
          <UserName>Ansh</UserName>
          <UserRole>Premium User</UserRole>
        </UserInfo>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;
