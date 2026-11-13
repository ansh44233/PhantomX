import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #000000;
    --background-alt: #0a0a0a;
    --background-light: #111111;
    --foreground: #ffffff;
    --foreground-muted: rgba(255, 255, 255, 0.7);
    --foreground-subtle: rgba(255, 255, 255, 0.5);
    --border: #1a1a1a;
    --border-hover: #333333;
    --primary: #ffffff;
    --primary-hover: #f0f0f0;
    --accent: var(--accent-color, #8b5cf6);
    --accent-hover: var(--accent-color-hover, #a78bfa);
    --accent-secondary: #06b6d4;
    --success: #2ecc71;
    --warning: #f39c12;
    --error: #e74c3c;
    --card-bg: #0a0a0a;
    --card-border: #1a1a1a;
    --scrollbar-track: #1a1a1a;
    --scrollbar-thumb: #333333;
    --scrollbar-thumb-hover: #8b5cf6;

    --font-size: 1rem;
    --font-family: 'Inter', sans-serif;
    --border-radius: 8px;
    --accent-color: #8b5cf6;
    --accent-color-hover: #a78bfa;
    --transition-speed: 0.3s;
    --transparency: 0.8;
    --spacing: 1rem;

    --card-background: #0a0a0a;
    --card-background-hover: #151515;
    --border-color: #1a1a1a;
    --border-color-hover: #333333;
    --border-color-focus: #8b5cf6;
    --text: #ffffff;
    --input-background: #1a1a1a;
    --toggle-background: #333333;
    --toggle-handle: #8b5cf6;
    --border-radius-small: var(--radius-small);
    --border-radius-medium: var(--radius-medium);

    --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.15);
    --shadow-large: 0 10px 40px rgba(0, 0, 0, 0.2);
    --shadow-hover: 0 10px 25px rgba(139, 92, 246, 0.2);

    --radius-small: 4px;
    --radius-medium: 8px;
    --radius-large: 12px;
    --radius-round: 50%;

    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  .light-theme {
    --background: #f5f5f5;
    --background-alt: #ffffff;
    --background-light: #f0f0f0;
    --foreground: #000000;
    --foreground-muted: rgba(0, 0, 0, 0.7);
    --foreground-subtle: rgba(0, 0, 0, 0.5);
    --border: #e0e0e0;
    --border-hover: #cccccc;
    --primary: #000000;
    --primary-hover: #333333;
    --accent: #8b5cf6;
    --accent-hover: #a78bfa;
    --success: #27ae60;
    --warning: #e67e22;
    --error: #c0392b;
    --card-bg: #ffffff;
    --card-border: #e0e0e0;
    --scrollbar-track: #f0f0f0;
    --scrollbar-thumb: #cccccc;
    --scrollbar-thumb-hover: #8b5cf6;

    --card-background: #ffffff;
    --card-background-hover: #f8f8f8;
    --border-color: #e0e0e0;
    --border-color-hover: #cccccc;
    --border-color-focus: #8b5cf6;
    --text: #000000;
    --input-background: #f5f5f5;
    --toggle-background: #cccccc;
    --toggle-handle: #8b5cf6;
    --border-radius-small: var(--radius-small);
    --border-radius-medium: var(--radius-medium);

    --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.08);
    --shadow-large: 0 10px 40px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 10px 25px rgba(139, 92, 246, 0.15);

    --radius-small: 4px;
    --radius-medium: 8px;
    --radius-large: 12px;
    --radius-round: 50%;

    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border-radius: var(--border-radius);
    transition: all var(--transition-speed) ease;
  }

  body {
    font-family: var(--font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: var(--font-size);
    background-color: var(--background);
    color: var(--foreground);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all var(--transition-speed) ease;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }

  .trailer-overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  }

  .trailer-overlay.visible { opacity: 1; }

  .trailer-iframe {
    width: 90%;
    height: 90%;
    border: none;
    border-radius: 8px;
  }
`;
