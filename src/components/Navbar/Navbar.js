import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiSearch, FiBookmark, FiSettings,
  FiTrendingUp, FiStar, FiClock, FiGrid, FiPlay, FiHeart,
  FiMenu, FiX, FiChevronDown
} from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import {
  NavbarContainer, NavbarContent, Logo, NavLinks, NavLink,
  NavIcon, NavText, UserSection, UserAvatar, UserInfo,
  UserName, UserRole, MobileMenuButton, MobileMenu,
  MobileNavLink, DropdownMenu, DropdownItem
} from './NavbarStyles';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const mainNavItems = [
    { icon: FiHome, text: 'Home', path: '/' },
    { icon: FiSearch, text: 'Search', path: '/search' },
    { icon: FiTrendingUp, text: 'Trending', path: '/trending' },
    { icon: FiStar, text: 'Top Rated', path: '/top-rated' },
    { icon: FiGrid, text: 'Categories', path: '/categories' }
  ];

  const libraryNavItems = [
    { icon: FiBookmark, text: 'My Library', path: '/library' },
    { icon: FiClock, text: 'Continue Watching', path: '/continue' },
    { icon: FiPlay, text: 'Watch History', path: '/history' },
    { icon: FiHeart, text: 'Favorites', path: '/favorites' }
  ];

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo onClick={() => navigate('/')}>
          <div className="logo-icon">PX</div>
          <div className="logo-text">
            <span>PhantomX</span>
            <small>by Ansh</small>
          </div>
        </Logo>

        <NavLinks>
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              as={motion.div}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavIcon as={item.icon} />
              <NavText>{item.text}</NavText>
            </NavLink>
          ))}

          <NavLink
            as={motion.div}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            active={libraryNavItems.some(item => location.pathname === item.path)}
          >
            <NavIcon as={FiBookmark} />
            <NavText>Library</NavText>
            <FiChevronDown style={{ marginLeft: '4px', fontSize: '14px' }} />

            <AnimatePresence>
              {dropdownOpen && (
                <DropdownMenu
                  as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {libraryNavItems.map((item) => (
                    <DropdownItem
                      key={item.path}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(item.path);
                        setDropdownOpen(false);
                      }}
                      active={location.pathname === item.path}
                    >
                      <item.icon style={{ marginRight: '8px' }} />
                      {item.text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </AnimatePresence>
          </NavLink>

          <NavLink
            active={location.pathname === '/settings'}
            onClick={() => navigate('/settings')}
            as={motion.div}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavIcon as={FiSettings} />
            <NavText>Settings</NavText>
          </NavLink>
        </NavLinks>

        <UserSection>
          <ThemeToggle />
          <UserAvatar onClick={() => navigate('/settings')}>A</UserAvatar>
        </UserSection>

        <MobileMenuButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          as={motion.button}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              as={motion.div}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div style={{ padding: '20px' }}>
                <UserAvatar style={{ margin: '0 auto 10px' }}>A</UserAvatar>
                <UserInfo style={{ opacity: 1, textAlign: 'center', marginBottom: '20px' }}>
                  <UserName>Ansh</UserName>
                  <UserRole>Premium User</UserRole>
                </UserInfo>
                <ThemeToggle style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }} />
              </div>

              {mainNavItems.map((item) => (
                <MobileNavLink
                  key={item.path}
                  active={location.pathname === item.path}
                  onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                >
                  <item.icon style={{ marginRight: '10px' }} />
                  {item.text}
                </MobileNavLink>
              ))}

              <div style={{ margin: '10px 0', padding: '0 20px', opacity: 0.5, fontSize: '0.75rem', letterSpacing: '1px' }}>
                LIBRARY
              </div>

              {libraryNavItems.map((item) => (
                <MobileNavLink
                  key={item.path}
                  active={location.pathname === item.path}
                  onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                >
                  <item.icon style={{ marginRight: '10px' }} />
                  {item.text}
                </MobileNavLink>
              ))}

              <MobileNavLink
                active={location.pathname === '/settings'}
                onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }}
              >
                <FiSettings style={{ marginRight: '10px' }} />
                Settings
              </MobileNavLink>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
