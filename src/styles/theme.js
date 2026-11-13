import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    background: 'var(--background)',
    backgroundAlt: 'var(--background-alt)',
    backgroundLight: 'var(--background-light)',
    foreground: 'var(--foreground)',
    foregroundMuted: 'var(--foreground-muted)',
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    accent: 'var(--accent)',
    border: 'var(--border)',
    borderHover: 'var(--border-hover)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--error)',
    cardBackground: 'var(--background-alt)',
    scrollbarTrack: 'var(--scrollbar-track)',
    scrollbarThumb: 'var(--scrollbar-thumb)',
    scrollbarThumbHover: 'var(--scrollbar-thumb-hover)'
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
    large: '0 10px 40px rgba(0, 0, 0, 0.2)',
    hover: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%'
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '3rem'
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8
    }
  }
};

export const darkTheme = {
  ...lightTheme
};

export const ThemeProvider = ({ children, theme }) => {
  return (
    <>
      {children}
    </>
  );
};

export default {
  lightTheme,
  darkTheme
};